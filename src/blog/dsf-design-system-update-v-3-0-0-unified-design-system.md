---
title: gov.cy Design System update (V.3.0.0) – Unified Design System
date: 2024-08-07
summary: A post, about the release from Digital Services Factory (DSF) Cyprus of version 3.0.0 of the gov.cy design system. This is a total redesign of the design system, with branding and styling changes, updated and new components, to accommodate both services and websites.
image: DSIconograpy.svg
tags:
  - dsf
  - design
  - accessibility
---
The [Digital Services Factory (DSF)](https://dsf.dmrid.gov.cy/){target="_blank"}, released of version 3.0.0 of the gov.cy design system. This is a total redesign of the design system, with branding and styling changes, updated and new components, to accommodate both services and websites.

The new version includes improvements on existing components, as well as new design elements to accommodate services and websites alike. 

Drawing from the DSF's experience developing gov.cy services, user research findings, and the feedback they received from other teams that used the design system, they incorporated lessons learned, to: 

- define the gov.cy design principles  
- align design elements with these principles 
- better explain the design system’s best practices 
- accelerate the design and development of services 
- make it easier for service teams to understand and implement the design system 

Changes include:

- the introduction of the [design system principles](https://gov-cy.github.io/govcy-design-system-docs/getting-started/principles/){target="_blank"} 
- an updated [Get started page](https://gov-cy.github.io/govcy-design-system-docs/getting-started/){target="_blank"} for better understanding how to use the design system 
- an updated pattern on [structuring a gov.cy service](https://gov-cy.github.io/govcy-design-system-docs/patterns/service_structure/){target="_blank"}, featuring example variants that have been tested and proven effective 
- a dedicated page to help developers [use the design system’s developer assets](https://gov-cy.github.io/govcy-design-system-docs/getting-started/developer-assets/){target="_blank"}  to accelerate development 
- an [updated page template](https://gov-cy.github.io/govcy-design-system-docs/getting-started/page-template/){target="_blank"} with sample pages, for websites, as well as services 
- better guidance for implementing [components](https://gov-cy.github.io/govcy-design-system-docs/components/){target="_blank"} with sections, explaining: 
    - when to use a component
    - when not to use a component
    - how the component works
    - how to implement different variants of the component
    - how to display errors
    - what content to use
    - accessibility best practices

The design system also introduces the following new elements:
- Components
    - accordion
    - character count
    - cookie banner
    - data tables
    - date picker
    - inset text
    - phase banner
    - summary list
    - tag
    - textarea
    - warning text
- Styles
    - images
- Patterns
    - addresses
    - bank details
    - confirm an email address
    - confirmation pages
    - contact page
    - cookies page
    - filter results
    - gender or sex
    - numeric inputs
    - social insurance number
    - step by step navigation
    - task list page
## Accessibility enhancements

The new version of the design system emphasises accessibility. All elements have been tested and comply with the  [include everyone principle](https://gov-cy.github.io/govcy-design-system-docs/getting-started/principles/#8.-include-everyone){target="_blank"}. 

The DSF has included recommendations and best practices on how to enhance accessibility using their components and patterns (for example see the  [input text accessibility recommendations](https://gov-cy.github.io/govcy-design-system-docs/components/text_input/#accessibility){target="_blank"}). 

However, that does not mean that any implementation that uses the developer assets, automatically complies with the Standard. When implementing a gov.cy service or website, make sure to always test for compliance with the EN 301 549 Standard.
## Design system website

The  [design system’s website](https://gov-cy.github.io/govcy-design-system-docs/){target="_blank"} has been updated with the new styling and guidance. 

Anyone implementing a service or a website for gov.cy, should first go through the [Get started page](https://gov-cy.github.io/govcy-design-system-docs/getting-started/){target="_blank"}. 

## Developer assets

The developer assets (CSS and JavaScript) have also been updated for the new version. Check out the [developer assets page](https://gov-cy.github.io/govcy-design-system-docs/getting-started/developer-assets/){target="_blank"} for information on how to use the prebuilt CSS and JavaScript. 

This is a major release and the changes on CSS and JavaScript are not backward compatible with version 2. For more information about the older version visit the [v2 documentation](https://gov-cy.github.io/govcy-design-system-docs-v2/){target="_blank"}. 

## Related tools and libraries

In updating the design system, DSF also enhanced the libraries used for rapid design, development, prototyping and testing:

- [excalidraw library](https://excalidraw-libraries-git-cevangelougovcy-gov-e2dec6-excalidraw.vercel.app/?theme=light&sort=default#cevangelougovcy-gov-cy-uds-library){target="_blank"} to create rapid wireframes and sketches.
- [figma library](https://www.figma.com/community/file/1388468172430388495/dsf-gov-cy-unified-design-system-v-3){target="_blank"} to rapidly create designs and prototypes the gov.cy way 
- [dsf-email-templates](https://www.npmjs.com/package/@gov-cy/dsf-email-templates){target="_blank"} NPM package to create HTML email templates
- [govcy-frontend-tester](https://www.npmjs.com/package/@gov-cy/govcy-frontend-tester){target="_blank"} NPM package to perform front end tests in terms of the accessibility and generic guidelines of the design system

[![DSF](/img/dsf-small-white-icon.svg){.btn-image} Launch the gov.cy Design System](https://gov-cy.github.io/govcy-design-system-docs){.govcy-btn-primary target="_blank"}