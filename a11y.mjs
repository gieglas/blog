import Eleventy from "@11ty/eleventy";
import pa11y from 'pa11y';
import { writeFile } from 'fs/promises';

(async function() {
    let elev = new Eleventy();
    let pagesJson = await elev.toJSON();
    const filteredPagesJson = pagesJson.filter(item => item.url.endsWith('/'));

    let serverURL = "http://localhost:8080";
    console.log(`## Run tests`);
    await testAccessibilityAndSave(filteredPagesJson, serverURL);


})();

async function testAccessibilityAndSave(pages,serverURL) {
    const resultsArray = [];
    let pageName = '';
    let i=0;
    for (var element of pages) {
        // i++;
        // if (i<5) {
            if (element.outputPath.endsWith(".html")) {
                pageName = element.url.replace(/\//g, '_');
                try {
                    console.log(`Testing ${element.url}`);
                    const results = await pa11y(serverURL + element.url, {
                        standard: 'WCAG2AA'
                    });
                    resultsArray.push({ url: element.url, issues: results.issues });
                    if (results.issues.length > 0) {
                        console.error(`Accessibility issues found in ${element.url}`);
                        console.error(results.issues);
                    }
                } catch (error) {
                    console.error(`Error testing ${element.url}:`, error.message);
                }
            }
        // }
    }
    
    try {
        const resultsJSON = {
            date: new Date().toISOString().split('T')[0],
            results: resultsArray
        }
        await writeFile('src/_data/accessibilityresults.json', JSON.stringify(resultsJSON, null, 2));
        console.log('Results saved to `src/_data/accessibilityresults.json`');
    } catch (fileError) {
        console.error('Error saving results:', fileError.message);
    }
    
}