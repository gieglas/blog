design ideas
- https://dribbble.com/shots/6172851-NathanBarry-com 

## Some cool stuff

```html
<div class="row" style="border-bottom: solid 1px #64646f33; box-shadow: #64646f33 0 10px 29px; position: relative;">
    <div class="govcy-col-6  govcy-mb-3">
        <h1 class="govcy-mt-3 govcy-mb-5 govcy-fs-2">Hello, I'm Constantinos Evangelou</h1>        
        <p class="govcy-fs-5">I am an interaction designer working for the <a href="https://dsf.dmrid.gov.cy" target="_blank">Digital Services Factory (DSF)</a> who loves to play with code.</p>
    </div>
    <div class="govcy-col-6 govcy-my-3" style="position: relative;">
        <img src="https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            class="govcy-mt-3"
             alt="Decorative image" 
             style="width: 100%; height: auto; position: absolute; top: 0; left: 0;">
    </div>
</div>

```



```html
<ul class="govcy-pl-0"> 
{% for project in site.localization[locale]["projects"] %}
    <li class="nav-side"> <a href="{{project.url}}" target="_blank">{% if project.type == "github"%}<i class="bi bi-github govcy-text-body"></i> {% elif project.type == "npm"%}<span class="govcy-text-body govcy-fw-bolder govcy-text-deco-none">npm</span> {% elif project.type == "figma"%}<img src="../../img/figmaicon.png" aria-hidden="true" class="img-icon"/>{% endif %}{{project.name}}</a><div class="govcy-mt-1">{{project.description}}</div></li>
{% endfor %}
</ul>
```

```html

                        <li class="govcy-d-block govcy-text-dark">
                                {% if accessibilityStatus.allNoIssues %}
                                    <a href="/accessibility/#report">
                                        <img src="https://a11ybadges.com/badge?logo=check-square&amp;text=a11y_passed&amp;badgeColor=green" alt="Accessibility check passed" style="
    content: url(https://a11ybadges.com/badge?logo=check-square&amp;text=a11y_passed&amp;badgeColor=green);
    width: auto;
    height: auto;
">
                                    </a>
                                {% else %}
                                        <img src="https://a11ybadges.com/badge?logo=x-square&amp;text=a11y_failed&amp;badgeColor=red" alt="Accessibility check failed" style="
    content: url(https://a11ybadges.com/badge?logo=x-square&amp;text=a11y_failed&amp;badgeColor=red);
    width: auto;
    height: auto;
">
                                {% endif %}
                            
                        </li>


```

## Accessibility test with mocha and chai

```js
import Eleventy from "@11ty/eleventy";
import pa11y from 'pa11y';
import { writeFile } from 'fs/promises';
import { expect } from 'chai';


async function testAccessibilityAndSave() {
    let elev = new Eleventy();
    let pagesJson = await elev.toJSON();
    const pages = pagesJson.filter(item => item.url.endsWith('/'));
    let serverURL = "http://localhost:8080";
    console.log(`## Run tests`);

    const resultsArray = [];
    let pageName = '';
    let i=0;
    for (var element of pages) {
        i++;
        if (i<5) {
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
        }
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
    return resultsArray;
}

describe('Accessibility Tests', () => {
    it('should have no accessibility issues on all pages', () => {
      return testAccessibilityAndSave().then(resultsArray => {
        resultsArray.forEach((result) => {
            expect(result.issues).to.be.an('array').that.is.empty;
        });
      })
    })
  })
  
```