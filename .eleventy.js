// const EleventyVitePlugin = require("@11ty/eleventy-plugin-vite");

module.exports = function(eleventyConfig){
  eleventyConfig.addPassthroughCopy("src/assets/*/**");
  // eleventyConfig.addPlugin(EleventyVitePlugin);

  return {
    dir: {
      input: "src",
      data: "_data",
      includes: "_includes",
      layouts: "_layouts"
    }
  };
}