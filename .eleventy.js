module.exports = function (eleventyConfig) {
  // CSS とAdmin (Sveltia CMS) を通過コピー
  eleventyConfig.addPassthroughCopy("src/styles.css");
  eleventyConfig.addPassthroughCopy("src/admin");

  // 日付フォーマット用フィルタ
  eleventyConfig.addFilter("date", function (value, format) {
    if (!value) return "";
    const d = value instanceof Date ? value : new Date(value);
    if (format === "YYYY-MM-DD") {
      return d.toISOString().slice(0, 10);
    }
    return d.toLocaleDateString("ja-JP");
  });

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk", "html"],
  };
};
