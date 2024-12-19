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