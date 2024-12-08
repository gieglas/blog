# dsf-design-system documentation
This is the readme for the dsf-design-system-docs-static repository, which is used to publish the GOV.CY design system documentation. 

It can be used though as a template for building and publish other static sites, based on markdown content and the GOV.CY design system. 

## How does it work?
We use [Eleventy (or 11ty)](https://www.11ty.dev/), a simple static site generator to compile [markdown files](#what-are-markdown-files) into a static site, using the GOVCY Design System. 

--------------

## How to contribute to the documentation

The site uses a Github repository and Github Pages to publish to content and npm to build the site.  In order to contribute to the documentation you need:

### 1. Clone the repository

Run  `git clone https://github.com/gov-cy/dsf-design-system-docs-static.git` from the command line

### 2. Make changes

See the [How to set up a Site](#how-to-set-up-a-site) section

### 3. Test your changes 

See the [How to Run](#how-to-run) section

### 4. Build  

- Delete the `/docs/` folder. 
- Run `npm run build-github-pages`. See the [Build to be published under domain's subfolder](#build-to-be-published-under-domains-subfolder) section.

### 5. Publish 

- Commit and push to main.

## How to make a new site? 

You need to have [Node.js](https://nodejs.org/en/) installed.

### 1. Download the tool

Download the tool or fork it. 

- [Git repository](https://github.com/gov-cy/dsf-design-system-docs-static)
- [Download](https://github.com/gov-cy/dsf-design-system-docs-static/archive/refs/heads/main.zip)

### 2. Unzip  

Unzip the file in a new folder on a local drive. Do not install the kit on a cloud-based drive (for example, Dropbox, Microsoft OneDrive), as this may cause permissions issues.

### 3. Install modules

Navigate to the unziped `dsf-design-system-docs-static-master` folder though the command line and Run the following command `npm install`

### 4. Connect it to a Github repository

### 5. Publish with Github Pages

-------

## How to Run

To run the tool Navigate to the installed folder though the command line and Run the following command `npm start`.

After the tool has started, you should see a message telling you that the tool is running:

```
[Browsersync] Access URLs:
 ----------------------------------
    Local: http://localhost:8080
 External: http://192.168.64.1:8080
 ----------------------------------
```

Copy either of these URLs on you browser to view the site.

-------

## How to build it 

Run the command `npm run build` to build the site. The resulting site is located under `\docs\` folder. You can change the location of build folder in the `/.eleventy.js` file as follows:

```js
...
...

module.exports = function (eleventyConfig) {
  ...
  ...
  ...
  return {
    dir: {
      input: "src",
      output: "docs", // the output folder
    },
  };
};
```

### Build to be published under domain's subfolder 

To build the site to be published under a domain's subfolder (such as GitHub's Public Pages) run the command `npm run build-github-pages`. This command builds the site and adds the subfolder's name in the site's URLs prefix. You can change the subfolder's name in the `package.json` file by changing the `--pathprefix` attribute of the `build-github-pages` script (see sample below).

```json
{
  "name": "dsf-design-system-docs-static",
  ...
  ...
  "scripts": {
    "build-github-pages": "npx @11ty/eleventy --pathprefix=dsf-design-system-docs-static",
    ...
    ...
  },
  ...
  ...
}
```

-------

## How to set up a Site

### Site configuration

You can change the site's configuration in the file `src/_data/sites.js`. See the comments on the sample below for more details.

```js
module.exports = {
  buildTime: new Date(), //the site's build time
  isMultiLanguage : true, //if true a dropdown will appear to change the language
  url : "https://gov-cy.github.io/dsf-design-system-docs-static", //url of site. It is used in generating things like the sidemap.xml
  showTOC: false, // if yes will show table of contents for pages based on headers (h2,h3,h4)
  showDraft: true, //if yes show draft badge
  showVersion: true, // if yes show the version badge
  languages: [ // list of languages the site supports
    {
      label: "English", 
      code: "en",
    },
    {
      label: "Ελληνικά",
      code: "el",
    },
  ],
  localization: { //labels in different values 
    "el" : {
      "title" : "GOV.CY",
      "subtitle" : "Οδηγός Σχεδίασης",
      "description" : "Design your services using GOV.CY styles, components and patterns.",
      "menu" : "Μενού",
      "draft" : "DRAFT",
      "version" : "Ver.",
      "url" : "",
      "TOC_title" : "Περιεχόμενα",
      "privacy_label":"Όροι Χρήσης",
      "cookie_label":"Προστασία Προσωπικών Δεδομένων",
      "accessibility_label":"Προσβασιμότητα",
      "copyright_label":"© Κυπριακή Δημοκρατία, 2021",
      "search_placeholder":"Έρευνα στο Design System"
    },
    "en" : {
      "title" : "GOV.CY",
      "subtitle" : "Design System",
      "description" : "Design your services using GOV.CY styles, components and patterns.",
      "menu" : "Menu",
      "draft" : "DRAFT",
      "version" : "Ver.",
      "url" : "",
      "TOC_title" : "On this page",
      "privacy_label":"Privacy statement",
      "cookie_label":"Cookie policy",
      "accessibility_label":"Accessibility statement",
      "copyright_label":"© Republic of Cyprus, 2021",
      "search_placeholder":"Search Design System"
    }
  }
};
```
### How to add a documentation page
The system can load content files of *markdown* format (`*.md`) under the `/src/` folder and serve them based on the pre-build template, which is based on the GOVCY Design System. Optionally the system can also load *HTML* files (`*.html`).

To add a page, create a markdown file, with a preferable short and meaningful file name, in the desired folder (see [How to add a category](#how-to-add-a-category) and [Add multiple languages](#add-multiple-languages) to find out in which folder to add the page).

Each language MUST have at least the `title` metadata by adding the following at the 1st line of the file. 

For example create a file named `/src/test.md` with the following content :

```yml
---
title: "Test"
date: 2022-02-01 00:00:05Z #by defining the date for each page you can contol the order they appear in the side menus
searchKeys: "fonts text Paragraph Headings Unordered Ordered list Links" #keyword that are included when using the the search function
eleventyExcludeFromCollections: false #if true exclude from all searches and lists. Default is false
hideSideMap: false #if true hide from sidemap.xml. Default is false
hideSearch: false #if true hide from search results. Default is false
---

This is a test page.

```
Note that metadata is marked in *YAML* format. 

### What are markdown files
Markdown is an easy markup language that you can use to add formatting elements to plaintext text files an `md` extention. This file is actually a markdown file. Check out this [Markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/) for the basics.

### How to add a category 
A category consists of a root page, for example `/styles` and a list of pages that are associated with that category, for example `/styles/colours`.

1. Create a folder with the name of the category, for example `/src/en/styles/`
2. Create a file under that folder named with the `folder_name.json` for the categories metadata and options. Note that the **folder name** and the **category** and **tags** metadata MUST have the same value. For example under `/src/styles/styles.json`:
```js
{
    "layout" : "base.njk", //the template used in this category to serve the pages. 
    "category" : "styles", // Category name
    "tags" : "styles", // Category name
    "showCategoryMenu" : true, // Indicate whether to show the category side menu
    "showIndexInCategoryMenu" : false // Indicate whether to add the root page in the side menu
  }
```
3. Create a file under that folder named `index.md` for the **root page**. For example:
```yml
---
title: "Styles"
---
Make your service look and feel like GOV.CY.

Use the links on this page to navigated to the desired style element.

```
4. Add more pages (see [How to add a documentation page](#how-to-add-a-documentation-page))

### How to use subcategories
Subcategories is an additional level of taxonomy to the categories described above. To use subcategories:

1. add in the categories metadata and options in the`folder_name.json` the following:
```json
    "availableSubcategories": ["subCat1","subCat2","subCat3"],
    "showSubcategoriesInMenu" : true,
```
2. add the subcategory as a tag in the page's metadata, for example: 
```yml
title: "Test page"
tags: "subCat1"
```
3. make sure you have localization lables in the `_data/site.js` file

### How to add a link on the top menu

To add a page's link on the top menu, add the tag `top_menu` and set on which position the link should appear by setting the a value under `order` on the page's file metadata. for example: 

```yml
---
title: "Getting Started"
order: 0
tags : "top_menu"
---

```

### How to change the layout (or template)

Layouts are located under the `\_includes` folder. The site is setup to use the `base.njk` layout for every page. This make's it easier to implement changes in the UI that will persist on all pages. Unless you know what you are doing do not change this file. 

-------

## Add multiple languages

- Keep content in different folders based on language locale. i.e. english in `src/en` folder.
- Remove all the language related data for **tags** and **locale** on the root folder's default metadata in the file `/src/src.json`. 
- Add the language code (which must match the folder name) in the **tags** and **locale** of the default metadata in the folder's JSON file. i.e. in english in the `src/en/en.json` 
```json
{
  "layout" : "base.njk",
  "tags" : "en",
  "locale" : "en"
}
```
- Set the appropriate values in `src/_data/site.js`. for example 
```js
module.exports = {
  ...
  ...
  ...
  isMultiLanguage : true,
  languages: [ // list of languages the site supports
    {
      label: "English",
      code: "en",
    },
    {
      label: "Ελληνικά",
      code: "el",
    },
  ],
  localization: { //labels in different values 
    "el" : {
      "title" : "GOV.CY",
      "subtitle" : "Οδηγός Σχεδίασης",
      "description" : "Design your services using GOV.CY styles, components and patterns.",
      "menu" : "Μενού",
      "url" : "",
      "privacy_label":"Όροι Χρήσης",
      "cookie_label":"Προστασία Προσωπικών Δεδομένων",
      "accessibility_label":"Προσβασιμότητα",
      "copyright_label":"© Κυπριακή Δημοκρατία, 2021",
    },
    "en" : {
      "title" : "GOV.CY",
      "subtitle" : "Design System",
      "description" : "Design your services using GOV.CY styles, components and patterns.",
      "menu" : "Menu",
      "url" : "",
      "privacy_label":"Privacy statement",
      "cookie_label":"Cookie policy",
      "accessibility_label":"Accessibility statement",
      "copyright_label":"© Republic of Cyprus, 2021",
    }
  }
  ...
  ...
  ...
};
```
- You can have a default language by adding the following code in the `index.html` : `<meta http-equiv="refresh" content="0; URL=en/" />`. This will redirect users to the `en` locale content.
