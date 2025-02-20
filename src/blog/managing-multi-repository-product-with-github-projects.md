---
title: Managing multi repository products with GitHub projects
date: 2025-02-20
summary: How to efficiently manage a multi-repository product using GitHub Projects.
image: github-projects1b.png
tags:
  - dev
  - productivity
---
Managing a product spread across multiple repositories can be challenging. Things like keeping track of issues, coordinating updates, and ensuring smooth integration between components require a structured approach. In this post, we’ll explore how we use [GitHub Projects](https://docs.github.com/en/issues/planning-and-tracking-with-projects/learning-about-projects/about-projects){target="_blank"} to manage our multi-repository design system effectively.
## The complexity
Let me explain how things get complicated in a multi repository environment, by walking you through the design system project I am working on.

The design system is structured as a multi-repository product, with each repo serving a distinct product while remaining interconnected. We manage several separate repositories, including:
- **Developer Assets** – A project that generates the CSS and JavaScript for all foundational styles, components, and design tokens.
- **Documentation website** –  A project that generates the documentation website with all the information needed to use the Design System
- **Renderer** – A separate package for rendering the Design System components' UI dynamically based on JSON data.
- **Prototype tool** – A repository of a tool that generates HTML prototypes sites, using the renderer package. 
- **Testing & Validation** – A package with tools and scripts used to ensure websites and services adhere to accessibility and Design System standards.

Each repository plays a role in maintaining modularity, allowing teams to work independently while ensuring seamless integration.

To add to the complexity, there are cases where we use the same versioning for multiple repositories. For example, the **Developer Assets** and **Documentation Website** share the same versioning scheme to ensure that changes in one repository are accurately reflected in the other, preventing inconsistencies and outdated information.  

On top of that, we also manage projects outside GitHub, like our Figma Library, adding another layer of complexity to our workflow.

As you can imagine, managing this product across multiple repositories presents challenges in tracking issues, maintaining consistency, and organizing development efforts. A simple question such as "what's next", is difficult to answer without the right tools in place.
## Why GitHub Projects?
GitHub Projects provides a powerful way to centralize issue tracking and streamline workflows, helping teams stay organized and productive. It provides a unified workspace that enhances collaboration across all repositories. Here’s why it works well for our setup:

- **Centralized Issue Tracking** – Instead of jumping between repositories, we can manage issues, features, and bug reports in one place.
- **Cross-Repo Visibility** – Developers and designers can see work across all repositories, reducing silos and improving communication.
- **Product & Version Organization** – We categorize issues by product and version, making it easier to plan and prioritize work.
- **Automated Workflows** – Integration with GitHub Actions allows automatic updates to project statuses based on issue progress.
- **Custom Views & Filters** – Tailoring views by repository, version, or work type helps different teams focus on relevant tasks.
- **Custom Fields** – Adding custom fields enables teams to track specific details like priority, estimated effort, or related milestones, making planning more flexible and informative.
- **Works with GitHub Issues** – Since GitHub Projects directly integrates with GitHub Issues, it fits naturally into developers' existing workflows, reducing friction and improving efficiency.
## Organizing work with GitHub Projects
![Screenshot of GitHub project, showing the "by product and version" view ](../../img/github-projects-1.png)

Different types of projects can be structured differently depending on their needs, allowing for flexibility in organizing work effectively. To keep our work structured, we have set up GitHub Projects with the following principles:

- **Grouping by Product & Version** – Each feature or update is linked to a specific project and version to ensure clear tracking.
- **Status Updates & Labels** – Using labels and status updates to indicate backlog, in progress, and completed tasks.
- **Issue linking & dependencies** – Connecting issues between repositories helps visualize dependencies and potential blockers.

Additionally, because we use GitHub Issues to record and manage GitHub Project items, we take full advantage of GitHub’s built-in features, such as linking issues with commits and pull requests. This allows us to track progress seamlessly, see which changes are associated with specific issues, and maintain a clear history of development decisions.
 ![Example of a GitHub issue connected to a project](../../img/github-issues-1.png)

This setup also provides product managers with an overall high-level view of the product across multiple repositories. They can track overall product health, identify bottlenecks, and ensure that releases stay on schedule. The ability to categorize and filter issues by product and version gives them better control over planning and prioritization, making strategic decisions more informed and data-driven.

![Example of GitHub projects burnup chart ](../../img/burnup-example.png)

## Conclusion
By leveraging GitHub Projects effectively, you can improve your ability to manage a multi-repository product efficiently, ensuring a smooth development process. The seamless integration with GitHub Issues is particularly beneficial, as it fits naturally into existing developer workflows. With a structured approach and best practices in place, you can keep your projects organized and your teams aligned.