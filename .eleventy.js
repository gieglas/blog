const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs"); 
const { execSync } = require('child_process')

const mdOptions = {
  html: true,
  breaks: true,
  linkify: false,
  typographer: true
}

module.exports = function (eleventyConfig) {
  let markdownIt = require('markdown-it')
  let markdownItAttrs = require('markdown-it-attrs')
  // Read pathPrefix from command-line arguments
  const argv = process.argv.slice(2); // Remove node and script path
  const pathPrefixArg = argv.find(arg => arg.startsWith('--pathprefix='));
  const pathPrefix = pathPrefixArg ? pathPrefixArg.split('=')[1] : '';
  console.log('pathPrefix:', );
  // Add a custom global value
  eleventyConfig.addGlobalData("pathPrefixValue", pathPrefix);
  //pagefind 
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source docs --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })

  // Markdown
  eleventyConfig.setLibrary('md',markdownIt(mdOptions)
    .use(markdownItAttrs))

  eleventyConfig.addPlugin(syntaxHighlight);

  // Add the RSS plugin
  eleventyConfig.addPlugin(pluginRss);

  // Browsersync
  // Redirect from root to default language root during --serve
  // Can also be handled by netlify.toml?
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        const content_404 = fs.readFileSync('docs/404.html');

        bs.addMiddleware('*', (req, res) => {
            // Provides the 404 content without redirect.
            res.write(content_404);
            res.end();
        });
      }
    } 
  });



  // Get only content that matches a tag
	eleventyConfig.addCollection("recentPosts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse().slice(0, 5);
	});
  
	eleventyConfig.addCollection("posts", function (collectionApi) {
    return collectionApi.getFilteredByGlob("src/blog/*.md").reverse();
	});
  //copy css
  eleventyConfig.addPassthroughCopy("./src/css");
  //copy js
  eleventyConfig.addPassthroughCopy("./src/js");
  //copy img
  eleventyConfig.addPassthroughCopy("./src/img");
  //copy manifest
  eleventyConfig.addPassthroughCopy("./src/manifest.json");

  //Add custom filter for date
  eleventyConfig.addFilter("dateOnly", function (dateVal, locale = "en-cy") {
    var theDate = new Date(dateVal);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return theDate.toLocaleDateString(locale, options);
  });
  //Add custom filter for date iso 
  eleventyConfig.addFilter("dateISO", function (dateVal) {
    var theDate = new Date(dateVal);
    return theDate.toISOString()
  });

  // Add a filter to check if all pages have no issues
  eleventyConfig.addGlobalData("accessibilityStatus", () => {
    const data = JSON.parse(fs.readFileSync("src/_data/accessibilityresults.json", "utf-8"));
    const allNoIssues = data.results.every(page => page.issues.length === 0);
    return {
      date: data.date,
      results: data.results,
      allNoIssues: allNoIssues
    };
  });
  
  return {
    dir: {
      input: "src",
      output: "docs",
    },
    markdownTemplateEngine: "njk", // Use Nunjucks for Markdown
    htmlTemplateEngine: "njk",    // Use Nunjucks for HTML
    templateFormats: ["md", "njk"], // Supported file formats
  };
};