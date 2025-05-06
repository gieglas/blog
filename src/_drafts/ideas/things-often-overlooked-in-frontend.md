---
title: Things often overlooked in frontend
date: 2025-02-09
summary: 
image: 
tags:
  - dev
---
# 🧠 Title: "12 overlooked details in Frontend Development (That make a big difference)"

**Intro:**  
When we think of frontend development, our minds often go to visuals, components, and interactivity. But great services—the kind people trust and enjoy using—are built on solid foundations that often go unnoticed. These "small" details aren't really small at all. This post explores some of the most overlooked (yet essential) frontend elements, many of which are also covered in our [Unified Design System (UDS)](https://gov-cy.github.io/govcy-design-system-docs/).

---

## 🧭 1. URLs: kebab-case for clarity

Readable, consistent, and SEO-friendly URLs help users and search engines navigate better. Use lowercase and hyphens—no camelCase, no underscores. For more information refer to the “[Service name and URLs](https://dsf.dmrid.gov.cy/2022/05/09/content-design-standards-for-services/#service-name-and-urls)” 

## 🧩 2. Page Template Structure

Having a consistent page template (header, main, footer, etc.) ensures predictability and easier navigation. The UDS has a defined non-optional [page template](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/) to be used in all pages and different [layouts for the main section](https://gov-cy.github.io/govcy-design-system-docs/styles/layout/) to choose from. 

## 📝 3. Title and description

Every page should have a meaningful `<title>` and `<meta name="description">`. It improves SEO, accessibility, and how your page appears when shared. For more information refer to the “[UDS - Title and description](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/#title%2C-description)“.

## 📱 4. Favicons and app icons

Don’t stop at a `favicon.ico`. Cover Apple touch icons, Android icons, and desktop icons. Take a look at the “[UDS - theme, app manifest and apple-touch-icon](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/#theme%2C-app-manifest-and-apple-touch-icon)" to see how its done the gov.cy way. 

## 📣 5. Social tags

Set Open Graph (`og:`) and Twitter tags so that when someone shares your page, it looks good and communicates clearly. Check out the “[DSF - social tags](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/#social-tags)“ page to see how it's done. 

## 🖨️ 6. Print media

Add print styles to ensure your service is usable when printed—especially useful for receipts, applications, or summaries. The UDS developer assets has you covered on Print media, as long as your HTML is as described in the [documentation](https://gov-cy.github.io/govcy-design-system-docs/). Remember to use the `govcy-d-print-none` class on the header, footer and any other element you don't wish to appear on print.

## ♿ 7. Accessibility

Accessible services are better for everyone. From semantic HTML to proper contrast, labels, legends, roles, and screen reader support—it’s not optional. We've included in the UDS accessibility best practices in all our coded examples and added an “Accessibility“ section in most of the pages to summarize these best practices (for example check out the [accessibility section for the accordion component](https://gov-cy.github.io/govcy-design-system-docs/components/accordion/#accessibility))

## 🏷️ 8. Labels and legends matter

Clear and descriptive labels and legends aren’t just an accessibility requirement—they’re essential for usability. A form field without a proper label or a group of checkboxes without a legend leaves users guessing.

In the [UDS pattern for labels and legend headings](https://gov-cy.github.io/govcy-design-system-docs/patterns/labels_and_legend_headings/), we explain how to:
- Write labels that are clear, consistent, and multilingual-ready.
- Use legends properly to group related fields (especially radios and checkboxes).
- Do not use placeholder text as a label.
- Support screen readers and meet accessibility standards with semantic HTML.

Pay special attention to how labels and legends should be treated as page headings (`<h1>`) on [single-question pages](https://gov-cy.github.io/govcy-design-system-docs/patterns/labels_and_legend_headings/#single-question-page)—this is one of the most common issues we find in our assessments. Getting it right pays off in both accessibility audits **and** user satisfaction.

## ⏭️ 9. Skip to main content

Essential for keyboard and screen reader users—it lets them bypass repetitive elements and jump straight to the content.

The [UDS page template](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/#skip-to-main-content) includes this by default. Make sure it:
- Is the first focusable element
- Becomes visible on focu
- Points to `#main-content`
- Has the correct text for the page language
    
🔍 Try navigating with just your keyboard—do you see and use the skip link on first Tab?
## 🚫 10. Error messages and validations

Validation errors should be visible, specific, helpful, accessible and announced by screen readers. The UDS uses a combination of [Error messages](https://gov-cy.github.io/govcy-design-system-docs/components/error_message/) and [Error summary](https://gov-cy.github.io/govcy-design-system-docs/components/error_summary/) to make this happen. Make sure to pay attention to:
- [How to show the error summary](https://gov-cy.github.io/govcy-design-system-docs/components/error_summary/#how-it-works) in an accessible manner. The documentation also has examples on how to show the error summary for both server side rendering and single page applications. 
- [When not to use error summaries](https://gov-cy.github.io/govcy-design-system-docs/components/error_summary/#when-not-to-use-this-component).
- [How to write error messages](https://gov-cy.github.io/govcy-design-system-docs/components/error_message/#errors-content). The documentation also has [error content patterns](https://gov-cy.github.io/govcy-design-system-docs/components/error_message/#component-text) for most validation cases so you don't have to re-invent the wheel.  

## 🔍 11. Error pages

Design for the “what ifs.” What if the user hits a 404? What if there’s no data? Don’t leave them in the dark. Check out the patterns for:

- [‘there is a problem with the service’ pages](https://gov-cy.github.io/govcy-design-system-docs/patterns/there-is-a-problem/)
- [‘page not found’ pages](https://gov-cy.github.io/govcy-design-system-docs/patterns/page-not-found-pages/)
- [‘service unavailable’ pages](https://gov-cy.github.io/govcy-design-system-docs/patterns/service-unavailable-pages/)

## ⌨️ 12. Keyboard navigation & focus states

Test everything without a mouse. Can you navigate with just `Tab` and `Enter`? Can you see where you are on the page? The UDS has you covered on this as well, as long as your HTML is as described in the [documentation](https://gov-cy.github.io/govcy-design-system-docs/).

---

## ✅ Conclusion

These elements may seem small on their own, but together, they form the backbone of a high-quality frontend experience. All of them are already embedded into our [design system](https://gov-cy.github.io/govcy-design-system-docs/), ready for teams to adopt and implement. By paying attention to them, we build not just functional services—but services that respect users.

--------- 
