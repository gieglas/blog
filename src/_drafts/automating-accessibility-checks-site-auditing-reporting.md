---
title: "Automating accessibility checks: Site-wide testing and reporting"
date: 2024-12-18
summary: A guide on how I automated accessibility checks across my site and displayed the results on my accessibility page
image: pa11nty_report.png
tags:
  - dev
  - accessibility
  - eleventy
  - ci-cd
---
I created a script to automate accessibility checks across my site, save the results in JSON, and display them on my accessibility page. I thought this might be interesting to share so here's how I did it. 

Before I go any further I must stress that, even though automated testing can give you a good indication, or even provide you with suggestions and best practices, it's not enough. It's important to manually test your sites for accessibility as well.
## Dependencies 
I use [Eleventy](https://www.11ty.dev/){target="_blank"} to build my site, which is a Node.js based static site generator, so it made sense to use [Node.js](https://nodejs.org/){target="_blank"} and NPM for my test script. 

My weapon of choice for accessibility testing is [Pa11y](https://github.com/pa11y/pa11y){target="_blank"} which I use frequently to automate my tests. 

So first things first, I needed to install Pa11y with this command 

```shell
npm install pa11y
```

## The script
The script is very simple really, just go through an array of pages, run pa11y to do the tests and save the results in a JSON file. 

```js
import Eleventy from "@11ty/eleventy";
import pa11y from 'pa11y';
import { writeFile } from 'fs/promises';

(async function() {
    let elev = new Eleventy();
    // retrieve Eleventy content
    let pagesJson = await elev.toJSON();
    // filter only pages ending with `/`. 
    const filteredPagesJson = pagesJson.filter(item => item.url.endsWith('/'));
    // define the server URL. Note this means the test is run on localhost
    let serverURL = "http://localhost:8080";
    console.log(`## Run tests`);
    // run tests
    await testAccessibilityAndSave(filteredPagesJson, serverURL);
})();

async function testAccessibilityAndSave(pages,serverURL) {
    const resultsArray = [];
    let failed = false; // Track failures
    // for each page
    for (var page of pages) {
        if (page.outputPath.endsWith(".html")) {
            try {
                console.log(`Testing ${page.url}`);
                // run pa11y
                const results = await pa11y(serverURL + page.url, {
                    standard: 'WCAG2AA'
                });
                // push results in an array
                resultsArray.push({ url: page.url, issues: results.issues });
                // if there are accessibility issues write on the console
                if (results.issues.length > 0) {
                    console.error(`Accessibility issues found in ${page.url}`);
                    console.error(results.issues);
                    failed = true; // Mark as failed if any issues are found
                }
            } catch (error) {
                console.error(`Error testing ${page.url}:`, error.message);
                failed = true; // Mark as failed if an error occurs
            }
        }
    }
    
    try {
        // add date and results to the json
        const resultsJSON = {
            date: new Date().toISOString().split('T')[0],
            results: resultsArray
        }
        // write to file on special `_data` folder so Eleventy can convert it into a collection
        await writeFile('src/_data/accessibilityresults.json', JSON.stringify(resultsJSON, null, 2));
        console.log('Results saved to `src/_data/accessibilityresults.json`');
    } catch (fileError) {
        console.error('Error saving results:', fileError.message);
        failed = true; // Mark as failed if an error occurs
    }

    // Exit with code 1 if any tests failed, otherwise exit with code 0
    process.exit(failed ? 1 : 0);
}
```

I tried to include comments to help everyone understand what am doing, but here's a quick breakdown.
### Imports
I import `pa11y` to run the tests and `writeFile` to write the results in a file. I also import `Eleventy` so that I can get the pages Eleventy has built. If you don't use Eleventy you will not need this. 
### Get the pages to test
Again I use Eleventy so I get the pages using it's API as follows:

```js
 let elev = new Eleventy();
// retrieve Eleventy content
let pagesJson = await elev.toJSON();
// filter only pages ending with `/`. 
const filteredPagesJson = pagesJson.filter(item => item.url.endsWith('/'));
```

You will notice that I filter the results to items with URL that ends with `/`. This is because I also build other files such as `sitemap.xml` or `feed.xml` for my atom feed which I want to exclude from my tests. 

If you do not use Eleventy you probably need to provide the URLs yourself.
### Perform the test
All the magic is done with in this line

```js
const results = await pa11y(serverURL + page.url, {
	standard: 'WCAG2AA'
});
```

Basically we pass the URL to be tested and the standard to test with, which in our case is WCAG2AA. 

If any issues are found on a given URL, they will be returned in an array in `results.issues`.

All the results are pushed into the `resultsArray`.
### Save results in JSON
Before I save the results, I add the date the test was made in this code segment:
```js
// add date and results to the json
const resultsJSON = {
	date: new Date().toISOString().split('T')[0],
	results: resultsArray
}
```
I then write the results in `src/_data/accessibilityresults.json`. You can really save them wherever you like. I opted to use the folder `_data`, because Eleventy treats this sort of like a magic folder, and everything inside it gets built into a collection which I can use in my pages.    
## Running the script
Pa11y needs to be able to access the pages to test them, so if you run your tests on the `localhost` as I do, make sure the local server is up and running before you use the script. 

All you need to do to run the script is this:
```shell
node a11y.mjs
```
## Using it in a CI/CD pipeline
I use my script in my development workflow, but it can easily be include in a CI/CD pipeline. The script indicates success of failure with this code segment, so it should be CI/CD ready:

```js
process.exit(failed ? 1 : 0);
```

I haven't tried it my self, but you could create a GitHub Actions by creating a file under `.github/workflows/accessibility-test.yml` like this (note: I got this script with the help of ChatGTP, I did not test it my self, so it might need some changes, or updates):

```yaml
name: Accessibility Test

on:
  push:
    branches:
      - main
  pull_request:

jobs:
  accessibility:
    runs-on: ubuntu-latest

    steps:
      # Checkout the code
      - name: Checkout Code
        uses: actions/checkout@v3

      # Set up Node.js
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18

      # Install dependencies
      - name: Install Dependencies
        run: npm ci

      # Build the site
      - name: Build Site
        run: npx @11ty/eleventy

      # Start a server for the static site
      - name: Start Static Server
        run: |
          npx http-server _site -p 8080 &
          echo $! > server.pid
        env:
          CI: true

      # Run Accessibility Test
      - name: Run Accessibility Test
        run: node a11y.mjs

      # Save Results as Artifact
      - name: Upload Accessibility Results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: accessibility-results
          path: src/_data/accessibilityresults.json

      # Stop the server
      - name: Stop Static Server
        if: always()
        run: kill $(cat server.pid)
        
```
## Using the results files in Eleventy
This section concerns only people who also use Eleventy, though the principle behind it can be used in other implementations as well.
### Show the report in a page
As I mentioned before, Eleventy treats the `_data` folder like a magic folder and automatically makes all `json` files into collections. This makes my life very easy. All I need to do to show the results in a page, is to use one of the Eleventy supported template engines and loop through the `accessibilityresults` collection. 

I like using [Nunjucks](https://mozilla.github.io/nunjucks/){target="_blank"} so in my `accessibility.njk` file I use the following code segment to display the report:

```html
{% raw %}
<h2 id="report">Report</h2>

<p>This report was created on <b><time datetime="{{ accessibilityresults.date }}">{{ accessibilityresults.date | dateOnly }}</time></b> based on an automated test performed with <a href="https://pa11y.org/" target="_blank">pa11y</a>.</p>

<table> 
    <thead>
        <tr>
            <th scope="col">Page</th>
            <th scope="col">Score</th>
            <th scope="col">Issues</th>
        </tr>
    </thead>
    <tbody>
    {% for result in accessibilityresults.results %}
    <tr>
        <td><a href="{{ result.url }}">{{ result.url }}</a></td>
        <td>{% if result.issues.length > 0 %}<span class="fail-tag">Fail</span>{% else %}<span class="success-tag">Pass</span>{% endif %}</td>
        <td>
             <ol>
                {% for issue in result.issues %}
                <li>{{ issue.message }}</li>
                {% endfor %}
            </ol>
        </td>
    </tr>
    {% endfor %}
    </tbody>
</table>
{% endraw %}
```

Oh yes, I have created the following CSS classes for the pass and fail tags:

```css
.fail-tag {
    margin-left: .35rem;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 14px;
    padding: 3px 12px;
    display: inline-block;
    vertical-align: top;
    width: fit-content;
    width: -moz-fit-content;
    background: #D4351C; 
    color: #ffffff;
    text-decoration: none;
}
.success-tag {
    margin-left: .35rem;
    margin-bottom: 5px;
    border-radius: 5px;
    font-size: 14px;
    padding: 3px 12px;
    display: inline-block;
    vertical-align: top;
    width: fit-content;
    width: -moz-fit-content;
    background: #00703C; 
    color: #ffffff;
    text-decoration: none;
}
```
### Bonus: show a success or fail badge 
I also show a success or fail badge on my test in every page. To do that I have added a global data in my `.eleventy.js` file with this code segment:

```js
  eleventyConfig.addGlobalData("accessibilityStatus", () => {
    const data = JSON.parse(fs.readFileSync("src/_data/accessibilityresults.json", "utf-8"));
    const allNoIssues = data.results.every(page => page.issues.length === 0);
    return {
      date: data.date,
      results: data.results,
      allNoIssues: allNoIssues
    };
  });
```

I then use the `accessibilityStatus` in my njk template like this:

```html
{% raw %}
<a href="{{ '/accessibility/#report' }}" class="general-a11y-badge">
	{% if accessibilityStatus.allNoIssues %}        
			<img src="https://a11ybadges.com/badge?logo=smile&amp;text=a11y_passed&amp;badgeColor=green" alt="{{ site.localization[locale].a11y_success}}">
	{% else %}
			<img src="https://a11ybadges.com/badge?logo=frown&amp;text=a11y_failed&amp;badgeColor=red" alt="{{ site.localization[locale].a11y_fail}}">
	{% endif %}
 </a>
 {% endraw %}
```

I use [a11y-badges](https://github.com/a11y-badges/a11y-badges){target="_blank"} to create the badges, which is a more accessible version of [shields.io](https://shields.io/){target="_blank"}.

Here are the css classes I use for the badges:

```css
.general-a11y-badge img {
    width: auto !important;
    height: 24px !important;
}
```