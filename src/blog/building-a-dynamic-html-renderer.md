---
title: Building a Dynamic HTML Renderer with Nunjucks and JSON Templates
date: 2025-01-24
summary: An overview on how a dynamic HTML renderer (govcy-frontend-renderer) works
image: Pasted%20image%2020250124152306.png
tags:
  - dev
  - accessibility
  - dsf
  - ci-cd
---
I've been working on a dynamic HTML renderer ([govcy-frontend-renderer](https://github.com/gov-cy/govcy-frontend-renderer){target="_blank"}) and I thought it might be interesting to explain how it works. 
## Project Overview
The govcy-frontend-renderer project is structured to support the rendering of HTML elements based on the [gov.cy Unified Design System (UDS)](https://gov-cy.github.io/govcy-design-system-docs/){target="_blank"}. The goal is to enable the creation of gov.cy UI components using either structured data (JSON), or a powerful template engine ([Nunjucks](https://mozilla.github.io/nunjucks/){target="_blank"} ), without requiring any HTML knowledge. This approach offers significant flexibility and ease of use, making the transition from data to UI seamless. It has a wide range of applications, such as:
- Rapidly creating prototypes using static site generators (check out this [prototype example](https://gov-cy.github.io/govcy-frontend-prototype/task-list-demo/){target="_blank"} ).
- Rendering the UI in applications (check out this [SPA application example](https://gov-cy.github.io/dsf-assessment-checklist/){target="_blank"} ).
- Rendering the UI in low code products. 

By leveraging JSON and Nunjucks, this project simplifies the process of building consistent and reusable UI components that adhere to the UDS guidelines.

![using the govcy-frontend-renderer project](../../img/Pasted%20image%2020250124082931.png)

Here is an example of how the package can be used:

```js
import { govcyFrontendRenderer } from '@gov-cy/govcy-frontend-renderer';
const renderer = new govcyFrontendRenderer();

// Define the input data
const inputData = 
{    
    "site" : {
        "lang" : "en",
        "title" : {"en":"Service title", "el":"Τιτλός υπηρεσίας"}, 
        "headerTitle" : {"en":"Header title", "el":"Τιτλός επικεφαλιδας"},
        "description" : {"en":"Service description", "el":"Περιγραφή υπηρεσίας"},
        "url" : "https://gov.cy",
        "cdn" : {
            "dist" : "https://cdn.jsdelivr.net/gh/gov-cy/govcy-design-system@3.0.0/dist",
            "cssIntegrity" : "sha384-1zLHWOtnS0hOIz5mVEPZp0UH5gUE6eo0CQcCGA3sF2TyYhHyKOd3Ni8Iy/NjEASU",
            "jsIntegrity" : "sha384-zOuDuogVaaTveh/Ou2iYwCk14zFiSmMk7Ax8yRnXDtOJMyKZH5+ZNibNVwZSKtw+"
        }
    },
    "pageData": {
        "title": {"en": "Page title", "el": "Τιτλός σελιδας"},
        "layout": "layouts/govcyBase.njk",
        "mainLayout": "max-width"
    }
};

// Define the JSON template 
let inputJson =  
{
    "sections": [
        {
            "name": "main",
            "elements": [
                {
                    "element": "form",
                    "params": {
                        "elements": [
                            {
                                "element": "textInput",
                                "params": 
                                {
                                    "label":{"en":"What is your name?","el":"Ποιο είναι το όνομα σας;"}
                                    ,"id":"name"
                                    ,"name":"name"
                                    ,"isPageHeading": true
                                    ,"autocomplete":"tel"
                                }
                            },
                            {
                                "element": "button",
                                "params": 
                                {
                                    "text":{"en":"Continue","el":"Συνέχεια"}
                                    , "type":"submit"
                                }
                            }
                        ]
                    }
                }
            ]
        }
    ]
}
;

// Render
let rtn = renderer.renderFromJSON(inputJson, inputData)
console.log(rtn);
```

More details and instructions on how to use the package are included in the projects [read me file](https://github.com/gov-cy/govcy-frontend-prototype/blob/main/README.md){target="_blank"}.

## Rendering HTML 
The project uses Nunjucks, a powerful templating engine, to process templates and generate HTML.  Every call to render, goes through the `govcyFrontendRenderer` JS class, which supports two types of input templates: Nunjucks and JSON templates. 

`govcyFrontendRenderer` uses the `govcyElement` Nunjucks macro, which is the core of the rendering system. It is responsible for rendering individual design elements. The macro imports the necessary Nunjucks templates for each element and calls the appropriate macro to render the element. It uses the `component` argument to decide which macro to import and use, and the `params` argument for the element's parameters.


![Rendering HTML with govcy-frontend-renderer](../../img/Pasted%20image%2020250124115652.png)

Here's a usage example of `govcyElement` macro 

```twig
{% raw %}
{{ 
    govcyElement(
        "button",
        {
            text:{en:"Continue",el:"Συνέχεια"}, 
            variant:"success", 
            id:"success-button"
        }
    ) 
}}
{% endraw %}
```

### Reusability and consistency 
The project is designed to ensure reusability and consistency. Regardless of whether the input template is, JSON or Nunjucks, the resulting HTML is rendered using the same Nunjucks macros, guaranteeing consistent output.

It also reuses common elements across different components, such as labels, hints, and error messages.

![How elements such as labels are reused by different components](../../img/Pasted%20image%2020250124122416.png)

## Adding more elements
The project is build to be flexible and easily extensible, allowing the team add more elements over time.

The process for adding more elements is very simple. 
-  **1. Element's nunjucks macro file**. Create an `njk` file for the macro in the directory `src\njk\elements`. 
-  **2. govcyElement.njk**. Update the `src\njk\govcyElement.njk` file macro with the new component, by adding the macro name in the `macroBlocks` array.

Before going live, all changes are of course tested. 
### Testing
Testing is particularly important, as we wanted to build trust and encourage usage. Every element’s rendered HTML is verified against the definitions in the Unified Design System.

For every element supported by the project, the following process is followed:

- **1. test.njk**. The `test\test.njk` file is updated, rendering all variants of the element with `govcyElement`. 
- **2. test.json**. The `test\test.json` file is update with the same variants of  the element as in `test\test.njk`.
- **3. Manuall test**. Changes are manually tested on local host by running `npm start` against the definitions in the Unified Design System
- **4. Unit test script**. The `test\moca\unit.test.mjs` file is updated with tests for all the element's variants. 
- **5. Run unit tests**. Unit tests are run by `npm run test`
### Versioning
Having a versioning policy is crucial, especially for projects intended to be used by third parties. In this project, the Semantic Versioning (SemVer) is followed to manage versions using the three-part version number: `MAJOR.MINOR.PATCH`.

Before releasing a new version the following process is followed:
1. **Update Version Number**: the version number in `package.json` is updated according to the changes made.
2. **Update Changelog**: The `CHANGELOG.md` file is updated to document the changes included in the new version.
3. **Local tests**: All changes are tested locally.
3. **Pull request tests**: Unit tests are run using GitHub Actions on every pull request.
4. **Tag and Publish**: Tagging and publishing the new version on npm is done using GitHub Actions on every merge to the Main branch.

