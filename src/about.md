---
title: "About Me"
hideSearch: true
category: "about"
---

Hello, I'm Constantinos Evangelou, an interaction designer working for the <a href="https://dsf.dmrid.gov.cy" target="_blank">Digital Services Factory (DSF)</a> who loves to play with code and this is where I write about stuff. 

I helped implement various online services for the <a href="https://www.gov.cy/" target="_blank">Government of Cyprus (gov.cy)</a>, but what I really enjoy is creating reusable tools to help others create simple, accessible services that improve people’s lives.

## DSF projects 

<div class="row" style=""> 
{% for project in site.localization[locale]["projects"] %}
<div class="govcy-col-12"> 
    <div style="padding: 0.5rem; border: 1px solid #d3d3d3; margin-bottom: 1rem; border-radius: 5px; /*min-height:150px*/"> 
        <a href="{{project.url}}" target="_blank">{% if project.type == "github"%}<i class="bi bi-github govcy-text-body"></i> {% elif project.type == "npm"%}<span class="govcy-text-body govcy-fw-bolder govcy-text-deco-none">npm</span> {% elif project.type == "figma"%}<img src="../img/figmaicon.png" aria-hidden="true" alt="figma icon" class="img-icon"/>{% endif %}{{project.name}}</a>
        <p style="margin-top: 1rem">{{project.description}}</p>{% if project.post %}<div class="govcy-mt-1"><a href="../blog/{{project.post}}">Related post</a></div>{% endif %}{% if project.demo %}<div class="govcy-mt-1"><a href="{{project.demo}}" target="_blank">Demo</a></div>{% endif %}
    </div>
</div>
{% endfor %}
</div>

## Older projects

<div class="row" style=""> 
{% for project in site.localization[locale]["old_projects"] %}
<div class="govcy-col-6"> 
    <div style="padding: 0.5rem; border: 1px solid #d3d3d3; margin-bottom: 1rem; border-radius: 5px; /*min-height:150px*/"> 
        <a href="{{project.url}}" target="_blank">{% if project.type == "github"%}<i class="bi bi-github govcy-text-body"></i> {% elif project.type == "npm"%}<span class="govcy-text-body govcy-fw-bolder govcy-text-deco-none">npm</span> {% elif project.type == "figma"%}<img src="../../img/figmaicon.png" aria-hidden="true" class="img-icon"/>{% endif %}{{project.name}}</a><div class="govcy-mt-1">{{project.description}}</div>{% if project.post %}<div class="govcy-mt-1"><a href="../blog/{{project.post}}">Related post</a></div>{% endif %}{% if project.demo %}<div class="govcy-mt-1"><a href="{{project.demo}}" target="_blank">Demo</a></div>{% endif %}
    </div>
</div>
{% endfor %}
</div>

## gov.cy services I worked on
- [Issue citizen documents](https://citizen-documents.service.gov.cy/){target="_blank"}
- [My documents](https://citizen-documents.service.gov.cy/Email/History/document){target="_blank"}
- [Apply for a passport](https://citizen-documents.service.gov.cy/passport-certificate){target="_blank"}
- [Apply for an ID card](https://citizen-documents.service.gov.cy/identity-certificate){target="_blank"}
- [Birth certificate](https://citizen-documents.service.gov.cy/birth-certificate){target="_blank"}
- [Death certificate](https://citizen-documents.service.gov.cy/death-certificate){target="_blank"}
- [Certificate of permanent residence](https://citizen-documents.service.gov.cy/permanent-residence-certificate){target="_blank"}
- [Certificate of origin](https://citizen-documents.service.gov.cy/student-origin){target="_blank"}
- [Displaced family ID card](https://citizen-documents.service.gov.cy/refugee-id-certificate){target="_blank"}
- [Parental consent](https://citizen-documents.service.gov.cy/parental-consent-info){target="_blank"}
- [Confirm the validity of documents](https://citizen-documents.service.gov.cy/certificate-verification-info){target="_blank"}
- [Search in the Civil Registry](https://civil-registry-search.service.gov.cy/){target="_blank"}
- [National Solidarity Fund Scheme](https://national-solidarity-fund.service.gov.cy/){target="_blank"} 
- [Voter registration](https://voter-registration.service.gov.cy/){target="_blank"} 
- [Update my personal details](https://update-my-details.service.gov.cy/){target="_blank"} 
- [Child birth grant](https://child-birth-grant.service.gov.cy/){target="_blank"}

### gov.cy services built on the Express Service Framework
- [Confirmation of assumption of duties - Supporting programs of the Ministry of Education](https://moec-eservices.service.gov.cy/){target="_blank"}
- [Submission of documents by MOEC trainers](https://moec-eservices.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Theater Organisation (ΘΟΚ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Licensing Authority](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Port Authority](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Telecommunications Authority (CYTA)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Natural Gas Public Company (ΔΕΦΑ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Electricity Authority of Cyprus (ΑΗΚ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Council for the Registration of Building and Civil Engineering Contractors](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Football Association (ΚΟΑ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Land Development Corporation (ΚΟΑΓ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Town Planning Council](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Expression of interest for the Board of Directors of the Cyprus Broadcasting Corporation (ΡΙΚ)](https://apply-for-board-of-directors.service.gov.cy/){target="_blank"}
- [Apply for an ISBN](https://cypruslibrary.service.gov.cy/){target="_blank"}
- [Report hazardous cosmetics](https://pharmaceutical-cosmetics.service.gov.cy/){target="_blank"}

## Writing

I wrote the [gov.cy Universal Design System](https://gov-cy.github.io/govcy-design-system-docs/){target="_blank"} but was heavily influenced by the gov.uk design system. For more original content on the Design System check out:
- [Structuring a service](https://gov-cy.github.io/govcy-design-system-docs/patterns/service_structure/){target="_blank"}
- [How to create a page using the gov.cy Unified Design System](https://gov-cy.github.io/govcy-design-system-docs/guides/create_a_page/){target="_blank"}
- [How to create new design elements using the gov.cy utility classes](https://gov-cy.github.io/govcy-design-system-docs/guides/create_a_design_element/){target="_blank"}
- [How to create an HTML email](https://gov-cy.github.io/govcy-design-system-docs/guides/create_an_html_email/){target="_blank"}

For all the rest check out my [blog](../blog/)


## Contact
<dl>
    <dt>
        Email
    </dt>
    <dd>
        {{ site.localization[locale].admin_email | obfuscateEmail }}
    </dd>
    <dt>
        Linkedin
    </dt>
    <dd>
        <a href="https://www.linkedin.com/in/constantinosevangelou/" target="_blank">
        Constantinos Evangelou
        </a>
    </dd>
</dl>