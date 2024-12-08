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
      "subtitle" : " ",
      "admin_email" : "consevangelou@gmail.com",
      "description" : "A place where I write about things I find interesting or useful.",
      "menu" : "Menu",
      "privacy_label":"Privacy",
      "cookie_label":"Cookies",
      "accessibility_label":"Accessibility",
      "accessibility_check_date":"22/5/2024",
      "copyright_label":"© Constantinos Evangelou, 2024",
      "search_placeholder":"Search ",
      "quick_find_placeholder":"Navigate to ...",
      "skip_to_main" : "Skip to main content",
      "top_menu" : 
        [
          {"name" : "Home", "url" : "/", category: "home"},
          {"name" : "Blog", "url" : "/blog/", category: "blog"},
          {"name" : "Contact", "url" : "/contact/", category: "contact"},
          {"name" : "Search", "url" : "/search/", category: "search"}
        ]
    }
  }
};