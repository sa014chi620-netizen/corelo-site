# CoReLo サイト セットアップ手順

このフォルダを GitHub に置いて Cloudflare Pages で公開し、`corelo.havcp.com/admin` から本文をブラウザ編集できるようにする手順です。

予想所要時間：**約 30〜60 分**（初回のみ）

---

## 全体像

```
[ あなたのPC: corelo-site/ ]
        ↓ アップロード
[ GitHub リポジトリ ] ← Sveltia CMS が直接コミットして編集
        ↓ 自動デプロイ
[ Cloudflare Pages ]
        ↓ DNS
[ corelo.havcp.com ]
```

---

## ステップ 1. GitHub アカウントを作成（持っていなければ）

1. <https://github.com/signup> にアクセス
2. メールアドレスとパスワードでアカウント作成
3. 無料プランで OK

ユーザー名は後で何度も使うのでメモしておく（例: `corelo-jtada`）。

---

## ステップ 2. GitHub にリポジトリを作る

1. ログイン後、右上の「+」→「New repository」
2. リポジトリ名：`corelo-site`
3. 「Public」を選択（Sveltia CMS が GitHub に直接アクセスするため、無料プランでは Public が必要）
4. 「Add a README file」のチェックは**外す**
5. 「Create repository」をクリック

---

## ステップ 3. このフォルダの中身をアップロード

### 方法 A. ブラウザでドラッグ＆ドロップ（一番簡単）

1. 作成したリポジトリページの「uploading an existing file」のリンクをクリック
2. このフォルダ（`corelo-site`）の中身**すべて**をエクスプローラ/Finderで選択して、ブラウザ画面にドラッグ＆ドロップ
   - 👉 含めるもの：`src/` フォルダ、`package.json`、`.eleventy.js`、`.gitignore`、`SETUP.md`
   - 👉 含めないもの：`node_modules/`、`_site/`（ビルド生成物）
3. 下の「Commit changes」をクリック

### 方法 B. GitHub Desktop を使う（推奨：今後の更新も楽）

1. <https://desktop.github.com/> から GitHub Desktop をダウンロード・インストール
2. ログイン → 「Clone a repository」で `corelo-site` を選択 → ローカルにダウンロード
3. ダウンロードされたフォルダに、このフォルダの中身をコピー
4. GitHub Desktop で「Commit to main」→「Push origin」をクリック

---

## ステップ 4. config.yml のリポジトリ名を書き換える

`src/admin/config.yml` の 6 行目を編集：

```yaml
repo: YOUR_GITHUB_USERNAME/corelo-site
```

↓ `YOUR_GITHUB_USERNAME` を自分のGitHubユーザー名に書き換え

```yaml
repo: corelo-jtada/corelo-site   # ← 自分のGitHubユーザー名に置き換え
```

GitHub の Web 上で `src/admin/config.yml` を開いて、右上のえんぴつアイコン → 編集 → 下の「Commit changes」で保存できます。

---

## ステップ 5. Cloudflare アカウントを作成（持っていなければ）

1. <https://dash.cloudflare.com/sign-up> にアクセス
2. メールアドレスとパスワードで登録（無料）
3. メール認証を完了

---

## ステップ 6. Cloudflare Pages でデプロイ

1. Cloudflare ダッシュボード左メニュー「Workers & Pages」をクリック
2. 「Create application」→「Pages」タブ→「Connect to Git」
3. GitHub アカウントを接続（初回のみ。アクセス権限を `corelo-site` リポジトリに限定して付与）
4. `corelo-site` リポジトリを選択 →「Begin setup」
5. ビルド設定：
   - **Project name**: `corelo-site`（自動でこの名前になる）
   - **Production branch**: `main`
   - **Framework preset**: `Eleventy` を選択
   - **Build command**: `npm run build`
   - **Build output directory**: `_site`
6. 「Save and Deploy」をクリック
7. 数十秒〜数分待つと、`https://corelo-site.pages.dev` のようなURLでアクセスできるようになる ✨

---

## ステップ 7. サブドメイン corelo.havcp.com を割り当てる

### 7-1. havcp.com の DNS が Cloudflare 管理かを確認

havcp.com の管理画面（ムームードメインや、お名前.com、ロリポップ等）を開いて、DNS設定（ネームサーバー）を確認します。

- **Cloudflare のネームサーバーになっている** → そのまま 7-2 へ
- **別の業者のネームサーバー（さくら、ConoHa等）** → CNAME レコードを追加する方式（7-3）

### 7-2. Cloudflare 管理の場合（推奨）

1. Cloudflare Pages の「corelo-site」プロジェクトを開く
2. 「Custom domains」タブ →「Set up a custom domain」
3. `corelo.havcp.com` を入力 →「Continue」
4. Cloudflare が自動で DNS レコードを追加してくれる → 「Activate domain」
5. 数分〜数十分で `https://corelo.havcp.com` にアクセスできるようになる（HTTPSも自動）

### 7-3. Cloudflare 管理ではない場合

ドメイン業者の DNS 管理画面で **CNAME レコード**を追加：

| ホスト名 | タイプ | 値 |
|---------|--------|-----|
| corelo  | CNAME  | corelo-site.pages.dev |

その後、Cloudflare Pages の「Custom domains」で `corelo.havcp.com` を追加し、検証完了を待つ。

> ※ havcp.com の WordPress には一切影響しません（`corelo.` というサブドメインだけが Cloudflare Pages に向くため）。

---

## ステップ 8. 管理画面にログインして編集してみる

1. ブラウザで <https://corelo.havcp.com/admin/> にアクセス
2. 「Login with GitHub」ボタンをクリック
3. GitHub アカウントで認証（初回のみ承認画面が出ます）
4. ログイン成功 → 左メニューに「📄 固定ページ」「⚙️ サイト設定」が表示されます
5. 例えば「🌿 2025年度 CoReLo研究会」を開いて本文を編集 →「Publish now」をクリック
6. 1〜2 分後に `https://corelo.havcp.com/kenkyukai/` に反映されます ✨

---

## こういう時はどうする？

### Q. セミナーを新しく追加したい
A. **既存ページを編集**するなら admin から本文編集でOKです。
**全く新しいページ**を増やしたい場合は、`src/` に新しい `xxx.md` ファイルを作り、`src/_data/site.json` のナビゲーションに追加してください。コードに不安があれば私（Claude）にご相談ください。

### Q. 画像をアップロードしたい
A. 管理画面の本文編集画面で画像挿入ボタン → ファイルを選ぶ → GitHub の `src/uploads/` に自動保存されます。

### Q. 公開前にプレビューしたい
A. 管理画面の「Save」ボタン（Publishの隣）でドラフト保存できます。「Publish」を押すまではサイトに反映されません。

### Q. デザインを変更したい
A. `src/styles.css` を編集します。Sveltia CMS では編集対象に入れていないので、GitHub 上で直接編集してください。

### Q. ローカル（自分のPC）で動作確認したい
A. このフォルダで以下のコマンドを実行：
```
npm install
npm start
```
→ `http://localhost:8080` にアクセス（要 Node.js 18 以上）

### Q. 困ったら？
A. 私（Claude）に「corelo-site で〇〇したい」と聞いてください。GitHubのファイル構造を見ながら案内できます。

---

## ファイル構造

```
corelo-site/
├── package.json           ← Node.js 設定
├── .eleventy.js           ← サイト生成ツール設定
├── .gitignore             ← Git管理から除外するファイル
├── SETUP.md               ← このファイル
└── src/
    ├── styles.css         ← サイト全体のデザイン
    ├── _data/
    │   └── site.json      ← サイト名・ナビゲーション
    ├── _includes/
    │   └── layout.njk     ← 全ページ共通レイアウト
    ├── admin/
    │   ├── index.html     ← 管理画面の入り口
    │   └── config.yml     ← CMS設定（編集できる項目の定義）
    ├── index.md           ← トップページ
    ├── kenkyukai.md       ← 2025年度 CoReLo研究会
    ├── seminans.md        ← セミナンス
    ├── kensa.md           ← 心理検査
    ├── archive.md         ← アーカイブ
    ├── contact.md         ← お問い合わせ
    ├── legal.md           ← 特定商取引法に基づく表記
    └── privacy.md         ← プライバシーポリシー
```
