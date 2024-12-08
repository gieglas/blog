const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
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
  //pagefind 
  eleventyConfig.on('eleventy.after', () => {
    execSync(`npx pagefind --source docs --glob \"**/*.html\"`, { encoding: 'utf-8' })
  })

  // Markdown
  eleventyConfig.setLibrary('md',markdownIt(mdOptions)
    .use(markdownItAttrs))

  eleventyConfig.addPlugin(syntaxHighlight);


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

  return {
    dir: {
      input: "src",
      output: "docs",
    },
  };
};