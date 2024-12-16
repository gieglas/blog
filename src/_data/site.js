module.exports = {
  buildTime: new Date(),
  isMultiLanguage : false,
  url : "https://gieglas.github.io/blog/",
  version:"1.3.2", 
  cssDownload: "https://raw.githubusercontent.com/gov-cy/govcy-design-system/v1.3.2/dist/css/main.min.css",
  imagesLocation: "/img/",
  languages: [
    {
      label: "English",
      code: "en",
    }
  ],
  localization: {
    "en" : {
      "title" : "Con's place",
      "logo_alt" : "Con's place logo",
      "tagline": "Be creative",
      "author": "Constantinos Evangelou",
      "subtitle" : " ",
      "admin_email" : "consevangelou@gmail.com",
      "description" : "A place where I write about things I find interesting or useful.",
      "menu" : "Menu",
      "rss_label":"RSS Feed",
      "privacy_label":"Privacy",
      "cookie_label":"Cookies",
      "accessibility_label":"Accessibility",
      "accessibility_check_date":"22/5/2024",
      "copyright_label":"© Constantinos Evangelou, 2024",
      "powered_by":"Powered by <a href='https://www.11ty.dev/' target='_blank'>Eleventy</a> and <a href='https://pages.github.com/' target='_blank'>GitHub Pages</a>.",
      "a11y_success":"Accessibility check passed",
      "a11y_fail":"Accessibility check failed",
      "search_placeholder":"Search ",
      "quick_find_placeholder":"Navigate to ...",
      "skip_to_main" : "Skip to main content",
      "top_menu" : 
        [
          {"name" : "Home", "url" : "/", category: "home"},
          {"name" : "Blog", "url" : "/blog/", category: "blog"},
          {"name" : "About", "url" : "/about/", category: "about"},
          {"name" : "Search", "url" : "/search/", category: "search"}
        ],
        "projects": 
        [
          {
            name : "govcy-design-system", 
            type : "github", 
            url : "https://github.com/gov-cy/govcy-design-system", 
            description: "The gov.cy design system developer assets project"
          },
          {
            name : "govcy-design-system-docs", 
            type : "github", 
            url : "https://gov-cy.github.io/govcy-design-system-docs/", 
            description: "The documentation pages of the govcy design system"
          },
          {
            name : "gov.cy - UDS Library in Figma", 
            type : "figma",
            url : "https://www.figma.com/community/file/1388468172430388495/dsf-gov-cy-unified-design-system-v-3", 
            description: "Figma library for the gov.cy Design System"
          },
          {
            name : "govcy-frontend-renderer", 
            type : "npm",
            url : "https://www.npmjs.com/package/@gov-cy/govcy-frontend-renderer", 
            description: "Render HTML for design elements, as they are defined in the gov.cy Design System based on JSON or njk templates"
          },
          {
            name : "govcy-frontend-tester", 
            type : "npm",
            url : "https://www.npmjs.com/package/@gov-cy/govcy-frontend-tester", 
            description: "Perform front end tests in terms of the accessibility and design guidelines established by the Digital Services Factory (DSF) Cyprus"
          },
          {
            name : "dsf-email-templates", 
            type : "npm",
            url : "https://www.npmjs.com/package/@gov-cy/dsf-email-templates", 
            description: "Produce html emails with gov.cy looks"
          },
      ],
      "old_projects": 
        [
          {
            name : "MonitrAll", 
            type : "github", 
            url : "https://github.com/gieglas/MonitrAll/", 
            description: "Monitor everything",
            demo: "http://gieglas.byethost10.com/monitralldemo",
            post: "getting-on-top-of-things-with-monitrall"
          }
          ,{
            name : "cRegistry", 
            type : "", 
            url : "https://www.dropbox.com/sh/y14kpexhg3w1ngf/AAA--Rb1bGR_KwpEMht4CXfba?dl=0", 
            description: "Create dynamic online registries",
            demo: "http://gieglas.byethost10.com/cRegistry/?i=2",
            post: "online-search-registry-cregistry"
          }
          ,{
            name : "Notificator", 
            type : "github", 
            url : "https://github.com/gieglas/Notificator", 
            description: "Send email notifications",
            post: "php-notificator"
          }
      ]
    }
  }
};