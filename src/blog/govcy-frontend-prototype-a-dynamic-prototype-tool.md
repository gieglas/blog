---
title: "govcy-frontend-prototype: A dynamic prototype tool"
date: 2025-03-04
summary: A tool that builds functional prototypes for gov.cy services, using data instead of code.
image: Pasted%20image%2020250304132109.png
tags:
  - dev
  - dsf
  - design
---
Building high-quality prototypes for government services is often slow and requires coding skills. Designers and researchers need **realistic, interactive prototypes** for user testing, validating designs, and stakeholder demos, but manually coding them is inefficient. To solve this, I’ve been working on a tool that lets us **build functional prototypes for gov.cy services, using data instead of code**.

[govcy-frontend-prototype](https://github.com/gov-cy/govcy-frontend-prototype){target="_blank"} takes the approach of the [renderer (discussed in a previous post)](../building-a-dynamic-html-renderer/) a step further. Instead of just rendering individual UI components, it enables teams to **prototype entire gov.cy services or websites** using the [Unified Design System](https://gov-cy.github.io/govcy-design-system-docs/){target="_blank"} without manually coding HTML.
## <span aria-hidden="true">💡</span> Use cases
We've used it in our team to: 
- Perform user research with high quality HTML prototypes 
- Showcase services to stakeholders 
- Help the design team understand how the end product will look like 
- Help developers to see how HTML elements are rendered through the [Unified Design System developed assets](https://gov-cy.github.io/govcy-design-system-docs/getting-started/developer-assets/){target="_blank"} 
- Test new design system components 
- Validate compliance with accessibility standards and guidelines early in the design process 
- Showcase the use of the [govcy-frontend-renderer](https://www.npmjs.com/package/@gov-cy/govcy-frontend-renderer){target="_blank"}

It can also be used for a wide range of use cases, such as: 
- Test and iterate on new service designs before committing to production development 
- Demonstrate the functionality and flow of a service for internal training or onboarding 
- Quickly create mockups for presentations, workshops, or stakeholder meetings 
- Collaborate with cross-functional teams by providing a tangible reference for discussions 
- Compare alternative design solutions side-by-side for decision-making 
- Test integration of design system components with service-specific content and layouts 
- Serve as a lightweight, hostable reference for external contractors or partners working on service-related projects

Check out some prototype examples <span aria-hidden="true">🚀</span> build with this tool: 
- [CRMD investigation - Cy login route (in Greek)](https://gov-cy.github.io/govcy-frontend-prototype/crmd-investigation/?route=all){target="_blank"} 
- [CRMD investigation - Unverified route (in Greek)](https://gov-cy.github.io/govcy-frontend-prototype/crmd-investigation/?route=unverified){target="_blank"} 
- [CRMD parental consent (in Greek)](https://gov-cy.github.io/govcy-frontend-prototype/crmd-consent/){target="_blank"} 
- [Task list demo](https://gov-cy.github.io/govcy-frontend-prototype/task-list-demo/){target="_blank"} 
- [Share component demo (in Greek)](https://gov-cy.github.io/govcy-frontend-prototype/crmd-consent/consent-ask/){target="_blank"} 
- [Single digital platform](https://gov-cy.github.io/govcy-frontend-prototype/stg/v2/){target="_blank"} (also showcases error handling)
## <span aria-hidden="true">🛠️</span> How does it work
This prototype tool is built using [Eleventy](https://www.11ty.dev/){target="_blank"}  as the static site generator and [govcy-frontend-renderer](https://www.npmjs.com/package/@gov-cy/govcy-frontend-renderer){target="_blank"} for dynamically rendering UI components. Here’s why:
- **Eleventy (11ty)**
    - 11ty is a lightweight and flexible **static site generator** that allows fast prototyping without requiring a complex backend.
    - Supports **Nunjucks** templates, which makes it easy to structure and reuse design components.
    - Generates pure **static HTML**, which is perfect for hosting on **GitHub Pages** or any simple web server.
    - Fast and efficient, enabling quick iteration on designs without unnecessary build complexity.
- **govcy-frontend-renderer**
    - Dynamically renders UI components based on JSON or Nunjucks templates, eliminating the need to manually write HTML.
    - Ensures **design consistency** by using the **Unified Design System** components automatically.
    - Allows easy **modification and iteration**—prototypes can be adjusted just by changing JSON data instead of editing raw HTML.
    - Helps developers preview **exactly how components will render** using the same assets as the production environment.

Together, these tools allow designers, researchers, and developers to **quickly build realistic prototypes** that are visually accurate, accessible, and easy to modify—all without writing any custom HTML.

![How the prototype tool works](../../img/Pasted%20image%2020250304132430.png)

The sites' JSON defines the prototyping sites. To simplify the creation of prototypes, our team uses a custom made Figma plugin to generate the site data in JSON format.

Here's an example JSON template page:

```json
{
  "site" : {
      "id" : "site1",
      "lang" : "en",
      "title" : {"en":"Service title", "el":"Τιτλός υπηρεσίας"}, 
      "headerTitle" : {"en":"Header title", "el":"Τιτλός επικεφαλιδας"},
      "description" : {"en":"Service description", "el":"Περιγραφή υπηρεσίας"},
      "url" : "https://gov.cy",
      "isTesting" : true,
      "cdn" : {
          "dist" : "https://cdn.jsdelivr.net/gh/gov-cy/govcy-design-system@3.0.0/dist",
          "cssIntegrity" : "sha384-1zLHWOtnS0hOIz5mVEPZp0UH5gUE6eo0CQcCGA3sF2TyYhHyKOd3Ni8Iy/NjEASU",
          "jsIntegrity" : "sha384-zOuDuogVaaTveh/Ou2iYwCk14zFiSmMk7Ax8yRnXDtOJMyKZH5+ZNibNVwZSKtw+"
      },
      "sections" : [
        {
            "name": "header",
            "elements": [
                {
                    "element": "htmlElement",
                    "params": {
                        "text": {
                            "en": "<h1>Custom header</h1>",
                            "el": "..."
                        }
                    }
                }
            ]
        }
      ]
  },
  "pages": [
      {
          "pageData": {
              "url": "page1",
              "title" : {"en": "Home page", "el": "Πρώτη σελίδα"},
              "layout" : "layouts/govcyBase.njk", 
              "mainLayout" : "max-width"
          },
          "pageTemplate": {
              "sections" :[
                  {
                      "name": "beforeMain",
                      "elements": [
                        {
                            "element": "backLink",
                            "params": {
                            }
                        }
                      ]
                  },
                  {
                      "name": "main",
                      "elements": [
                          {
                              "element": "form",
                              "params" : {
                                  "id": "DSFPrototypeForm",
                                  "elements" :[
                                      {
                                          "element": "textInput",
                                          "params": {
                                              "label": {
                                                  "en": "What is your name?",
                                                  "el": "Ποιο είναι το ονοματεπώνυμο σας;"
                                              },
                                              "isPageHeading": true,
                                              "id" :"inName",
                                              "name" :"inName"
                                          }
                                      },
                                      {
                                          "element": "button",
                                          "params": {
                                              "text": {
                                                  "en": "Continue",
                                                  "el": "Συνέχεια"
                                              },
                                              "type": "submit"
                                          }
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              ]
          }
      },
      {
          "pageData": {
              "url": "page2",
              "title" : {"en": "Page 1", "el": "Σελιδα 1"},
              "layout" : "layouts/govcyBase.njk", 
              "mainLayout" : "two-thirds"
          },
          "pageTemplate": {
              "sections" :[
                  {
                      "name": "beforeMain",
                      "elements": [
                        {
                            "element": "backLink",
                            "params": {
                            }
                        }
                      ]
                  },
                  {
                      "name": "main",
                      "elements": [
                          {
                              "element": "form",
                              "params" : {
                                "id": "DSFPrototypeForm",
                                  "elements" :[
                                      {
                                          "element": "textInput",
                                          "params": {
                                              "label": {
                                                  "en": "What is your email?",
                                                  "el": "Ποιο είναι το email σας;"
                                              },
                                              "isPageHeading": true,
                                              "id" :"inEmail",
                                              "name" :"inEmail"
                                          }
                                      },
                                      {
                                          "element": "button",
                                          "params": {
                                              "text": {
                                                  "en": "Continue",
                                                  "el": "Συνέχεια"
                                              },
                                              "type": "submit"
                                          }
                                      }
                                  ]
                              }
                          }
                      ]
                  }
              ]
          }
      }
  ], 
  "routes" : {
      "all" : [
          "site1/page1/"
          ,"site1/page2/"
          ,"site1/test/"
      ]
  } 
}
```

If there is a need for more complicated pages that are not supported through JSON, the prototype tool has the ability to [combine JSON and Nunjucks templates](https://github.com/gov-cy/govcy-frontend-prototype?tab=readme-ov-file#combine-json-and-nunjucks-templates){target="_blank"} within the same service or website prototype.

More details and instructions on how to use the package are included in the projects [read me](https://github.com/gov-cy/govcy-frontend-prototype/blob/main/README.md){target="_blank"} file.
## <span aria-hidden="true">🎯</span> Conclusion
[govcy-frontend-prototype](https://github.com/gov-cy/govcy-frontend-prototype){target="_blank"} makes prototyping **gov.cy services faster, more accessible, and easier**. By combining **Eleventy** and **govcy-frontend-renderer**, teams can create realistic, interactive prototypes that look and function like real services—without writing HTML.
