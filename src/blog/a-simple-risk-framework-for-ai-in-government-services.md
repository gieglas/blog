---
title: A simple risk framework for AI in government services
date: 2025-12-24
summary: A personal look at how AI can help government services, where it becomes risky, and a simple framework for deciding what belongs where.
image: A%20simple%20risk%20framework%20for%20AI%20in%20government%20services.png
tags:
  - design
  - ai
  - dsf
---
Artificial Intelligence is quickly becoming part of everyday conversations in government. From automation and analytics to content generation and decision support, the question is no longer _if_ AI can be useful, but _where_ it should be used, _where it shouldn’t_, and _where we need to be more careful_.

This post is a personal attempt to make sense of those boundaries, and to share a simple, practical way of thinking about AI risk in the context of government services.

**Sources and inspiration:**
- [UK Government’s Artificial Intelligence Playbook](https://www.gov.uk/government/publications/ai-playbook-for-the-uk-government/artificial-intelligence-playbook-for-the-uk-government-html){target="_blank"}
- [Deloitte’s Government & Public Services AI Dossier](https://www.deloitte.com/content/dam/assets-zone3/us/en/docs/services/consulting/2024/us-ai-institute-goverment-public-services-dossier.pdf){target="_blank"}
- [EU’s AI Act](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32024R1689){target="_blank"}
## Where AI is genuinely useful in government

If you strip away the hype, there’s a strong pattern in how governments are already using AI successfully.

Across both UK government guidance and Deloitte’s research, AI creates the most value when it:
- reduces complexity
- increases speed and efficiency
- improves consistency and quality
- supports people doing their jobs better

Most real-world examples focus on:
- back-office automation
- analytics, prediction, and insight
- quality checks and consistency
- decision support for professionals

In all of these cases, AI is **assistive**. It helps humans, but it does not replace authority.

That distinction turns out to be critical.
## Why government AI is different

Government services are not just digital experiences. They often relate to:
- access to public services
- legal or administrative outcomes
- citizen rights and obligations

This is why governments are far more cautious than the private sector when AI moves closer to citizens and live transactions. A confusing product recommendation is annoying, but a confusing explanation in a government service can have real consequences.

This is also why you don’t see AI-generated content embedded inside live transactional services like GOV.UK forms, not because governments lack imagination, but because **the risk profile changes dramatically**.
## A simple risk-tier framework for AI in government services
![risk-tier framework](../../img/risk-tier%20framework.png)
Before diving into risk tiers, there’s one important clarification.

> _It's about **context**, not models_
{.govcy-br-left-3 .govcy-br-left-danger .govcy-pl-3}

This guide does **not** evaluate “AI models” in isolation.

It evaluates the context:
- where the AI is used
- how it is used
- for what purpose

The same AI capability can be:
- minimal risk in one context
- high risk in another

This idea sits at the heart of the EU AI Act, and it’s a very useful mental shift for service teams.

Here’s a high-level summary of the four risk tiers, before going into more detail below.

<div class="govcy-table-responsive">
<table class="govcy-table">
  <thead>
    <tr>
      <th scope="col">Risk tier</th>
      <th scope="col">How AI is used</th>
      <th scope="col">What this means for teams</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">🔴 Unacceptable</th>
      <td>AI use that manipulates, exploits, or removes accountability. </td>
      <td>Do not use in government services.</td>
    </tr>
    <tr>
      <th scope="row">🟠 High</th>
      <td>AI that affects rights, access to services, or appears as official authority.</td>
      <td> Possible, but heavily constrained. Highly regulated, costly to govern, and requires strong justification.</td>
    </tr>
    <tr>
      <th scope="row">🟡 Limited</th>
      <td>AI that interacts with users but does not decide outcomes. </td>
      <td>Allowed with transparency, clear boundaries, and safeguards.</td>
    </tr>
    <tr>
      <th scope="row">🟢 Minimal</th>
      <td>Internal or assistive AI that supports teams and improves quality. </td>
      <td>Encouraged. Minimal additional obligations beyond existing good practice.</td>
    </tr>
  </tbody>
</table>
</div>

Below, I’ll walk through each tier in a bit more detail.
### <span aria-hidden="true">🔴</span> Unacceptable risk

AI should not be used here

AI systems that:
- manipulate behaviour
- exploit vulnerable users
- obscure accountability
- perform social scoring or covert influence

From an EU AI Act perspective, systems in this category are either explicitly prohibited or fundamentally incompatible with public-sector use.

**Simple test:**  
If users cannot reasonably understand or challenge what the AI is doing, it doesn’t belong here.

--------
### <span aria-hidden="true">🟠</span> High risk

AI is possible, but heavily constrained

AI used in contexts that:
- affect access to public services
- influence eligibility or legal outcomes
- form part of an official administrative process
- appear as authoritative government guidance

Examples include:

- AI-generated content that replaces official review or confirmation steps
- AI interpreting rules or requirements for citizens
- AI outputs that could reasonably be relied on as “the government’s answer”
- AI influencing decisions without clear human oversight

This is where the EU AI Act places the strongest obligations. In practice, this means teams must expect requirements around risk assessment, documentation, transparency to users, meaningful human oversight, and the ability to audit and reconstruct how the AI behaves.

--------
### <span aria-hidden="true">🟡</span> Limited risk

AI can be used, with clear boundaries

AI systems that:

- interact with users
- generate or transform content
- but do **not** decide outcomes

Key requirements:
- users must clearly know they are interacting with AI
- AI output must not be the sole source of truth or authoritative source of information
- behaviour must be predictable and constrained

Here, the main EU AI Act obligation is transparency: users should understand that AI is involved, what its role is, and where its limits are.

**Simple test:**  
AI may help explain, but must not redefine meaning.

--------
### <span aria-hidden="true">🟢</span> Minimal risk

AI use is encouraged

AI systems that:

- are internal-facing
- support designers, developers, and teams
- improve quality, accessibility, and consistency
- do not directly affect citizen outcomes

Examples:

- content clarity checks
- accessibility analysis
- standards compliance review
- analytics and insight
- drafting and review support with human approval

This is where AI delivers a lot of value with comparatively little risk. 

These uses typically fall into the lowest-risk category under the EU AI Act, with minimal additional obligations beyond existing good practice. 

In practice, “minimal obligations” does not mean no responsibility. It means AI use that fits within existing expectations: clear ownership, sensible testing, monitoring for obvious issues, and the ability for humans to override or ignore AI outputs.

------
## The risk framework in practice
![Minimal and high risk examples](../../img/AI%20risk%20framework%20in%20practice.png)

To make this concrete, here’s a simple comparison of two common AI directions in government services.

### <span aria-hidden="true">🧩</span> An AI tool helping service development teams

For example, an AI tool that helps designers and developers:
- review content for clarity and readability
- flag accessibility or usability issues
- check consistency against design and content standards
- highlight potential problem areas before a service goes live

In this case:
- **Risk level**: 🟢 Minimal  
- **Who it affects**: internal teams  
- **Authority**: advisory only  
- **AI Act obligations**: very light  
- **Requirements**:
    - human judgement remains final  
    - outputs can be challenged, ignored, or overridden  
- **Failure impact**: low and reversible  

This kind of AI improves **how services are built**, not how decisions are made.  
If it’s wrong, a human can simply disagree and move on.
### <span aria-hidden="true">🧾</span> AI embedded in citizen-facing services

For example, AI used to:
- generate explanations of what a question means
- summarise a user’s answers on a review page
- rephrase requirements to “make them easier to understand”

In this case:
- **Risk level**: 🟠 High  
- **Who it affects**: citizens directly  
- **Authority**: likely to be perceived as official guidance  
- **AI Act obligations**:
    - transparency to users (“this is AI-generated”)  
    - logging of AI behaviour  
    - traceability of outputs  
    - ability to reconstruct how an outcome was produced  
    - meaningful human oversight  
- **Failure impact**: asymmetric and potentially serious  

Here, even small errors can have real consequences.  
If the AI explains something incorrectly, users may reasonably assume *the government told them so*.

This doesn’t mean “never”, but it does mean **slow, careful, and heavily governed**.
## A simple way to evaluate AI risk

When thinking about an AI idea, I’ve found these questions useful:

- Does this AI influence outcomes, or only support understanding?
- Would a user reasonably treat this output as authoritative?
- If the AI is wrong, who is affected and how badly?
- Can we explain and reconstruct what the AI did?
- Can a human realistically override it?

If answering those questions makes you uncomfortable, that’s usually a signal... not a blocker, but a warning.
## Closing thoughts

AI absolutely has a place in government services.

But the most responsible uses tend to:
- sit behind the scenes
- improve quality and consistency
- support people rather than replace authority

A risk-based lens doesn’t slow innovation, it helps aim it.

And sometimes, choosing _where not to use AI_ is just as important as choosing where to use it.