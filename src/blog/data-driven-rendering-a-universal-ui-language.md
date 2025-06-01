---
title: "Data-driven rendering: A universal UI language"
date: 2025-05-06
summary: Explore how data-driven rendering simplifies UI development by generating interfaces from structured data, reducing the need for extensive manual coding.
image: Pasted%20image%2020250504212521.png
tags:
  - dev
  - design
  - accessibility
---
Developing consistent, scalable UI can be tedious and time-consuming. Traditionally, developers write HTML, templates, or components manually. But what if UI could be rendered dynamically, using only structured data? This is what I call data-driven rendering, where the UI is generated based on data, whether on the server or client side, without developers needing to manually code it.
## Traditional view technologies <span aria-hidden="true">🏗️</span> vs. data-driven rendering <span aria-hidden="true">⚡</span>

![Comparing the chaos of a construction site symbolizing the traditional technologies vs the order of a factory assembly line](../../img/Pasted%20image%2020250504115309.png)

Traditional MVC-style templating systems have been widely used to build dynamic web applications. These frameworks allow developers to generate HTML on the server side with embedded logic. However, they still rely on explicitly defined templates and manual UI coding, which presents several challenges. Check out below a typical Razor template:

```csharp
@page "/example"
<h3>Simple Form</h3>

<input type="text" placeholder="First name" />
<input type="text" placeholder="Last name" />

<button>Submit</button>
```

Even with Razor’s templating capabilities, developers still need to define UI components manually, making maintenance and scalability more challenging.

- **<span aria-hidden="true">🏗️</span> Manual component definitions**: Even though these technologies help with templating, developers still need to write and maintain a large number of views manually.
- **<span aria-hidden="true">🔁</span> Limited reusability**:  MVCs often mix business logic with UI code, making it harder to reuse components across different applications without modifications.
- **<span aria-hidden="true">📈</span> Scalability challenges**: As applications grow, maintaining a vast number of templates and views becomes increasingly complex.

Data-driven rendering libraries (like the [govcy-frontend-renderer](https://github.com/gov-cy/govcy-frontend-renderer){target="_blank"}) eliminates these limitations by fully separating the UI from the logic. Instead of manually coding templates for every scenario, a data-driven renderer can dynamically construct UI elements based on structured data (e.g., JSON). This allows applications to scale more efficiently and reduces development overhead by removing the need for repetitive template creation.

Check out below a data-driven template:
```js
let jsonTemplate = [
  {
      "element": "textInput",
      "params": {"label": { "en": "First name", "el":"Όνομα"} }
  }, 
  {
      "element": "textInput",
      "params": {"label": { "en": "Last name", "el":"Επώνυμο"} }
  }, 
  {
      "element": "button",
      "params": {"text": { "en": "Submit", "el":"Υποβολή"} }
  } 
];
```

Defining the UI as data gives developers greater flexibility and ease of use. For example, suppose you want to add an `h1` element to the example above. All you need to do is just add a new item to the array:

```js
jsonTemplate.unshift({
      "element": "textElement",
      "params": {"text": { "en": "Title", "el":"Τίτλος"}, "type": "h1"}
  } );
```

What’s more, defining UI as structured data like JSON creates a **universal UI language** across your organization. Instead of scattered conventions, you get a single, consistent format that every service, designer, and developer can use. This makes your design system not just a style guide, but an executable blueprint that is easier to test, easier to document, and easier to scale.
## <span aria-hidden="true">✨</span> The beauty of data-driven rendering

Data-driven rendering simplifies UI development in many ways. Here are some of it's key advantages.
### <span aria-hidden="true">⏳</span><span aria-hidden="true">✅</span> Saving time and promoting best practices

One of the biggest advantages of data-driven rendering is how much time it saves developers. By automating UI generation, developers spend less time writing repetitive code and more time focusing on business logic.

Additionally, data-driven rendering enforces coding best practices by ensuring that all UI elements are generated in a consistent manner. This reduces the likelihood of errors, eliminates redundant code, and promotes modularity. With a centralized rendering approach, teams can enforce accessibility, security, and performance optimizations without requiring every developer to manually implement these best practices.
### <span aria-hidden="true">🔧</span><span aria-hidden="true">🚀</span> Easier maintenance and feature expansion

Data-driven rendering makes it significantly easier for teams to maintain a product over time. Since the UI is generated dynamically, making updates or implementing new features requires modifying the data or renderer logic rather than refactoring large chunks of code. This means teams can adapt quickly to changes, whether they are design updates, accessibility improvements, or functional enhancements.

Another major benefit is the reduction of boilerplate code. When UI elements are defined in a structured format, there is far less duplicate code, making the overall codebase cleaner and easier to manage. This not only reduces technical debt but also allows developers to focus on solving more complex problems rather than manually updating UI components.

With more time freed from repetitive UI coding, teams can dedicate their efforts to innovation, improving user experience, and delivering new features faster. The streamlined workflow leads to better collaboration between designers and developers, ensuring that the product evolves efficiently over time.
### <span aria-hidden="true">🏗️</span><span aria-hidden="true">👥</span> Empowering non-developers to enhance the product

One of the most exciting benefits of data-driven rendering is that it enables non-developers to contribute to UI development. With a well-designed administration platform, product managers, designers, and content editors can modify the UI without needing to write code.

- **<span aria-hidden="true">🎨</span> Low-code/no-code flexibility**: Business users can update forms, modify layouts, or introduce new UI elements using a structured interface instead of relying on developers.
- **<span aria-hidden="true">🔄</span> Faster iteration cycles**: Non-technical teams can make UI changes without waiting for engineering resources, leading to quicker updates and more agile development. 
- **<span aria-hidden="true">🤝</span> More efficient collaboration**: Developers can focus on building and improving the rendering engine, while non-developers manage the visual and functional aspects of the product.

<figure>
<img src="../../img/Pasted%20image%2020250504115858.png" alt="Example service designed on figma"> 
<figcaption>At <a href="https://dsf.dmrid.gov.cy/" target="_blank">DSF</a> we use Figma as an administration platform where designers define a service and it's UI, and a Figma plugin to export the data definition of the UI.</figcaption>
</figure>

This shift reduces development bottlenecks and enables teams to iterate faster, improving user experience without increasing engineering overhead.
## Other benefits of data-driven rendering
### <span aria-hidden="true">📝</span> No more manually writing UI code

Instead of hardcoding templates, developers can define data structures, and a renderer takes care of the rest. This means less time spent on markup and more focus on logic.
### <span aria-hidden="true">🔄</span> Consistency across applications

When all UI is generated using a renderer, consistency is ensured because the same set of rules applies everywhere. There’s no risk of one developer implementing a component slightly differently from another.
### <span aria-hidden="true">🛠️</span> Easier maintenance

Since UI is driven by structured data, changes only need to be made in one place. If the design evolves, updating the renderer automatically updates all interfaces that depend on it.
### <span aria-hidden="true">♿</span> Better accessibility & compliance

A well-designed renderer ensures that every UI element adheres to best practices, including accessibility and design standards, without requiring developers to think about them individually.
### <span aria-hidden="true">⚡</span> Faster prototyping & iteration 

With data-driven rendering, UI updates can be done by simply modifying the data. This allows designers and developers to iterate quickly without rewriting templates.
### <span aria-hidden="true">📱</span><span aria-hidden="true">💻</span> Multi-platform support

By separating the UI definition from its rendering logic, the same data can be used to generate interfaces for web, mobile, or other platforms seamlessly.
## <span aria-hidden="true">🌍</span> Real-world applications

Data-driven rendering is widely used in various industries and tools. Some well-known examples include:

- **<span aria-hidden="true">📄</span> [Google Forms](https://workspace.google.com/products/forms/){target="_blank"}**: Forms are generated dynamically based on structured form data, eliminating the need to manually code each form.
- **<span aria-hidden="true">🏗️</span> [Notion](https://www.notion.com/){target="_blank"}**: Pages and blocks are rendered dynamically from structured content, making it easy to reorganize and display data.
- **<span aria-hidden="true">🌐</span> CMS-based websites**: Platforms like [WordPress](https://wordpress.org/){target="_blank"} and [Contentful](https://www.contentful.com/){target="_blank"} dynamically generate web pages from stored content.
- **<span aria-hidden="true">🎨</span> Design systems & component libraries**: UI libraries like [Material UI](https://mui.com/material-ui/){target="_blank"} or [Bootstrap](https://getbootstrap.com/){target="_blank"} often include systems that dynamically generate components based on predefined configurations.
- **<span aria-hidden="true">📊</span> Dashboard & data visualization tools**: Tools like [Tableau](https://www.tableau.com/){target="_blank"} and [Power BI](https://www.microsoft.com/en-us/power-platform/products/power-bi){target="_blank"} dynamically render charts and UI components based on input data.

## <span aria-hidden="true">💡</span> Final thoughts

Data-driven rendering isn't just a development technique, it’s a mindset shift. It enables automation, reduces redundancy, and makes UI more scalable and maintainable. If you're building applications with repetitive UI structures, consider leveraging a renderer to simplify your workflow.

