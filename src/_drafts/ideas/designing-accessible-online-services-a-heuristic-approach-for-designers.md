---
title: Post title
date: 2025-02-20
summary: Description of the post, will appear also in the .
image: Pasted%20image%2020241214173831.jpg
tags:
  - productivity
---
# Designing accessible online services: a heuristic approach for designers

Accessibility in online service design is not just about compliance—it ensures that all users, including those with disabilities, can interact with digital services effectively. To help designers create accessible forms, we’ve adapted **Deque’s accessibility heuristics** into a practical checklist that aligns with our design system.

This post explores the **six key heuristics**, how the **accessibility heuristics table** and **scoring system** work, how to **use heuristic evaluation**, and how **designers can apply this in practice**.

---

## **Understanding the accessibility heuristics table**

Deque’s accessibility heuristics help evaluate digital experiences based on six key principles: **perceivable, operable, understandable, robust, privacy & security, and compatible**. Each heuristic contains a set of questions to assess whether a service meets accessibility standards.

These questions are structured to ensure **both design and development teams** can identify accessibility issues early in the process. While some questions focus on implementation (e.g., HTML elements used correctly), we’ve adjusted them for **designers**, making them more relevant to UX and UI decisions.

## **How the scoring system works**

When conducting an accessibility heuristic evaluation, each question is assigned a **score from 0 to 2**:

- **0 (❌ Not met):** The heuristic is not followed, making the experience inaccessible.
- **1 (⚠️ Partially met):** Some aspects are accessible, but improvements are needed.
- **2 (✅ Fully met):** The heuristic is successfully applied, ensuring good accessibility.

A final score helps prioritize fixes. A **low score** highlights critical barriers that must be addressed, while a **high score** indicates a well-optimized experience.

## **How to use heuristic evaluation**

1. **Go through each heuristic** using the checklist.
2. **Score each item** based on how well it meets the accessibility criteria.
3. **Identify patterns**—if multiple issues exist within a category, focus efforts there.
4. **Collaborate with developers** to implement necessary fixes.

---

## **The heuristic checklist for accessible forms**

### 1. 👀 Perceivable (Can all users perceive the content?)

- ⬜ Are all form fields clearly labeled with visible text?
- ⬜ Is placeholder text not used as a replacement for labels?
- ⬜ Are error messages designed as explained in the design system to ensure clarity and visibility for all users?

### 2. 🎯 Operable (Can users interact with the form easily?)

- ⬜ Can all form elements (inputs, buttons, dropdowns) be easily clicked or tapped?
- ⬜ Is the focus indicator clear when navigating with a keyboard and designed as explained in the design system?
- ⬜ Are elements placed as defined in the vertical spacing page of the design system to be easy to tap?

### 3. 💡 Understandable (Is the form clear and easy to use?)

- ⬜ Are error messages clear, specific, and helpful? (e.g., “Enter a valid email” instead of “Invalid input”)
- ⬜ Are optional fields clearly marked? (e.g., non-required fields labeled as “(Optional)”)
- ⬜ Is the form/page layout logical and easy to follow (e.g., avoid having multiple questions in one page, grouping related fields together)? 

### 4. ⚙️ Robust (Does it support different user needs?)

- ⬜ Does the form work well in high contrast mode?
- ⬜ Does the design avoid relying only on color to indicate errors or status?
- ⬜ Is text resizable without breaking the layout?

### 5. 🔒 Privacy & Security (Is authentication and input handling accessible?)

- ⬜ If CAPTCHA is used, is there an accessible alternative (e.g., audio challenge or email verification)?
- ⬜ Are personal data entry fields designed to be accessible while maintaining user privacy? (e.g., clearly labeled fields, avoiding unnecessary data collection)
- ⬜ Does the form avoid unnecessary time limits that could make completion difficult?

### 6. 🔄 Compatible (Does it work across devices and environments?)

- ⬜ Is the form responsive and usable on mobile, tablet, and desktop screens?
- ⬜ Does it support larger text settings without cutting off information?
- ⬜ Are all interactive elements designed for both mouse and touch input?

---

## **Practical example**

Let’s say a designer is evaluating a government form for accessibility. They go through the checklist and assess all the questions:

| Heuristic              | Question                                                        | Score |
| ---------------------- | --------------------------------------------------------------- | ----- |
| **Perceivable**        | Are all form fields clearly labeled with visible text?          | ✅ 2   |
|                        | Is placeholder text not used as a replacement for labels?       | ✅ 2   |
|                        | Are error messages designed as explained in the design system?  | ⚠️ 1  |
| **Operable**           | Can all form elements be easily clicked or tapped?              | ✅ 2   |
|                        | Is the focus indicator clear when navigating with a keyboard?   | ❌ 0   |
|                        | Are elements placed correctly for easy tapping?                 | ✅ 2   |
| **Understandable**     | Are error messages clear and specific?                          | ⚠️ 1  |
|                        | Are optional fields clearly marked?                             | ✅ 2   |
|                        | Is the form layout logical and easy to follow?                  | ✅ 2   |
| **Robust**             | Does the form work well in high contrast mode?                  | ✅ 2   |
|                        | Does the design avoid relying only on color?                    | ✅ 2   |
|                        | Is text resizable without breaking the layout?                  | ✅ 2   |
| **Privacy & Security** | If CAPTCHA is used, is there an accessible alternative?         | ✅ 2   |
|                        | Are personal data entry fields accessible and private?          | ✅ 2   |
|                        | Does the form avoid unnecessary time limits?                    | ✅ 2   |
| **Compatible**         | Is the form responsive across devices?                          | ✅ 2   |
|                        | Does it support larger text settings?                           | ✅ 2   |
|                        | Are all interactive elements designed for both mouse and touch? | ✅ 2   |

**Final Score: 33/36**

By scoring these issues and discussing them with developers, the team can prioritize improvements to ensure a fully accessible form experience. For instance, they can refine error messages to be more specific and ensure a visible focus indicator is implemented according to the design system guidelines.

---

## **How designers can use this checklist**

Designers play a crucial role in ensuring accessibility. Here’s how you can integrate this checklist into your workflow:

1. **Review designs before handoff** – Ensure form elements follow best practices.
2. **Test with different users** – Try navigating with a keyboard, increasing text size, and using high contrast mode.
3. **Collaborate with developers** – Work together to ensure implementation aligns with the design system.

By making accessibility an **ongoing process**, we create forms that are inclusive, user-friendly, and compliant with best practices.

---

Do you use accessibility heuristics in your design process? Share your thoughts in the comments below!