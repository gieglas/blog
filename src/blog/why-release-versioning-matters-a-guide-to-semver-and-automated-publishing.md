---
title: "Why release versioning matters: A Guide to SemVer and automated publishing"
date: 2025-02-03
summary: A look on why versioning matters, how Semantic Versioning (SemVer) works and how to implement an automated versioning workflow for products intended to be used by external teams and developers
image: Pasted%20image%2020250125182506.png
tags:
  - dev
  - ci-cd
  - productivity
---
In the world of software development, versioning is more than just a technical detail, it’s a critical practice that ensures reliability, compatibility, and trust. Whether you’re building libraries, frameworks, or tools for third-party use, a well-defined versioning policy is essential for maintaining a healthy ecosystem. In this post, we’ll explore why versioning matters, how Semantic Versioning (SemVer) works and how to implement an automated versioning workflow for products intended to be used by external teams and developers. 

When talking about "versioning" in this post, I am not referring to Git or version control systems. Instead, I'm focusing on **release versioning**—the practice of assigning version numbers (like `1.0.0` or `2.1.3`) to software releases to communicate changes effectively. 
## Why versioning matters to your users
Versioning is the backbone of software maintenance and distribution. It provides a clear and structured way to communicate changes, updates, and improvements to users. Here’s why having a versioning crucial:

1. **Predictability**: Users can anticipate the impact of updates based on version numbers. For example:
    - A **major version** change (e.g., `1.0.0` to `2.0.0`) signals breaking changes.
    - A **minor version** change (e.g., `1.0.0` to `1.1.0`) indicates new, backward-compatible features.
    - A **patch version** change (e.g., `1.0.0` to `1.0.1`) means bug fixes without breaking existing functionality.
2. **Compatibility**: A clear versioning policy ensures that users can safely update dependencies without unexpected issues. It helps maintain backward compatibility and reduces the risk of breaking changes.
3. **Transparency**: Versioning provides a documented history of changes, making it easier for users to understand what’s new, what’s fixed, and what’s changed in each release.
4. **Trust**: A consistent versioning policy builds confidence among users, demonstrating a commitment to maintaining and improving the software in a structured and predictable manner.
## Semantic versioning (SemVer)
[Semantic Versioning](https://semver.org/){target="_blank"}, or SemVer, is a widely adopted versioning scheme that uses a three-part version number: `MAJOR.MINOR.PATCH`. Here’s how it works:
- **MAJOR**: Incremented for incompatible API changes. Change here indicates to users that they will need to make changes to their code in order to use this version safely.
- **MINOR**: Incremented for backward-compatible new features. Changes here without changing the Major number, indicates to users they can safely update to this version.
- **PATCH**: Incremented for backward-compatible bug fixes. Changes here without changing the Major number, also indicates to users they can safely update to this version.

By adhering to SemVer, developers can communicate the nature of changes clearly, making it easier for other developers or teams to decide when and how to update. 
### SemVer with Git tags
![GitHub tags](../../img/Pasted%20image%2020250125185218.png)
At the heart of most versioning strategies is the use of **Git tags**. Git tags are references to specific commits in your Git history. Unlike branches, which move as new commits are added, tags are immutable—they always point to the same commit. This makes them ideal for marking release points, such as `v1.0.0` or `v2.1.3`.
### Why use git tags for versioning?
1. **Immutable releases**: Once a tag is created, it permanently points to a specific commit. This ensures that a version (e.g., `v1.0.0`) always refers to the exact same code, providing consistency and reliability.
2. **Clear history**: Tags make it easy to see when releases were made and what changes were included in each version.
3. **Automation-friendly**: Git tags integrate seamlessly with tools like GitHub, GitLab and CI/CD platforms (e.g., GitHub Actions, CircleCI), enabling automated workflows for versioning, testing, and publishing.
4. **SemVer compatibility**: By naming tags according to Semantic Versioning (e.g., `v1.0.0`), you can clearly communicate the nature of each release (major, minor, or patch).
5. **Industry standard**: Many open-source projects and organizations use Git tags to manage releases. For example, projects like Kubernetes, React, and Vue.js rely on Git tags for versioning.
6. **Traceability**: Tags provide a clear and traceable history of releases.
7. **Tooling integration**: Tools like npm and CDNs (e.g., jsDelivr) recognize Git tags as version identifiers. For example, when you publish a package to npm, it uses Git tags to map versions like `v1.0.0` to specific releases.

We’ll explore how to implement a versioning workflow and automate the creation of Git tags later on this post. 
## SemVer from the user's perspective 
The structured approach of SemVer ensures clarity which allows third-party developers to update dependencies with confidence, knowing that patch and minor updates won’t break their applications.

SemVer also simplifies dependency management. Developers can use version ranges like `^1.2.3` (for minor and patch updates) or `~1.2.3` (for patch updates only) in their `package.json` to control how updates are applied (more on that later on). 

![Example of how users can use a library with SemVer](../../img/Pasted%20image%2020250128105320.png)

This flexibility, combined with detailed changelogs, fosters trust and reliability. By following SemVer, library maintainers demonstrate a commitment to stability and transparency, making it easier for teams to adopt and maintain their libraries over time.

Let’s look at some examples of how third parties can use SemVer to load your libraries.
### 1. npm Packages
npm (Node Package Manager) uses SemVer to manage package versions and developers can specify how these packages get updated in their `package.json`. Here’s an example for updating only non major releases:

1. **Add the library**: The library consumer adds the library to their `package.json` dependencies section with a caret (`^`), which indicates npm to allow minor and patch updates:
  ```json
	"dependencies": {
	  "your-library": "^1.2.3"
	}
  ```
2. **Install dependencies**: The developer installs the library
  ```bash
  npm install
  ```
3. **Receive updates**: When there is a release of a new version (e.g., `1.2.4` or `1.3.0`), the developer can update their dependencies.
  ```bash
  npm update
  ```
  - If the new version is `1.2.4` (patch), it will be applied automatically.
  - If the new version is `1.3.0` (minor), it will also be applied.
  - If the new version is `2.0.0` (major), it will **not** be applied, as the `^` prefix restricts updates to the `1.x.x` range.
### 2. CDN providers (e.g., jsDelivr)
CDNs like [jsDelivr](https://www.jsdelivr.com/){target="_blank"} use SemVer to serve library versions. They also provide aliases for major versions, ensuring users always get the latest compatible version. Here are some examples:
- **Major Version Alias**: 
  ```html
  <script src="https://cdn.jsdelivr.net/npm/some-library@3"></script>
  ```
  Will always load the latest version within the specified major version. Example: `@3` will load the latest `3.x.x` version.
- **Specific Version**: 
  ```html
  <script src="https://cdn.jsdelivr.net/npm/some-library@3.2.1"></script>
  ```
  Will always load the exact version specified. Example: `@3.2.1` will load only version `3.2.1`.
## Deployment workflow
Following a structured workflow can ensure that every release is predictable, well-tested, and thoroughly documented. Let's see an example workflow for an npm library. 

1. **Update Version Number**  
    Increment the version in your `package.json` file based on the nature of the changes  (major, minor, or patch)
2. **Update Changelog**  
    Record all changes in the `CHANGELOG.md` file to keep a detailed history of updates, including bug fixes, new features, and deprecations.
3. **Build the Project**  
    Rebuild the project using your build script (`npm run build`) to ensure the latest changes are compiled and ready for release.
4. **Run Tests**  
    Run automated tests (`npm test`) to ensure the integrity of the code and prevent regressions.
5. **Manual Testing**  
    Test the updates locally (`npm start`) to verify functionality and ensure no issues were missed by automated tests.
6. **Update Documentation**  
    Update relevant documentation to reflect any new features, changes, or guidance on upgrading to a new major version.
7. **Tag and Publish**  
    Use tools like GitHub Actions to automate testing, tagging the release (e.g., `v1.2.3`) and publishing it to the appropriate package registry.
9. **Communicate**  
    Notify your team, users, or stakeholders about the release, highlighting key changes and any required actions.
### Automated workflow for tag and publish
Automating tag creation and publishing ensures consistency, reduces manual errors, and saves time for library maintainers, while providing users with reliable and clearly versioned releases. 

Here’s an example GitHub Actions workflow that automates versioning and publishing:

```yaml
name: Tag and Publish on Version Change

on:
  push:
    branches:
      - main
    paths:
      - '**'
jobs:
  tag-and-publish-on-version-change:
    name: Tag and publish on version change
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: EndBug/version-check@v2.1.5
        with:
          static-checking: localIsNew
          token: ${{ secrets.GITHUB_TOKEN }}
          file-url: https://raw.githubusercontent.com/your-org/your-repo-name/latest/package.json
        id: version-check
      - name: Check version not decreased
        if: steps.version-check.outputs.changed == 'true' && steps.version-check.outputs.type == 'undefined'
        run: echo "You should NEVER decrement/ decrease the version in the package.json. This will undermine confidence in our ability to follow semver rules"; exit 1
      - name: Check package.lock::version updated if ./dist changed
        if: steps.version-check.outputs.changed == 'false'
        run: echo "Version remained the same. Exiting..."; 
      - name: Create 'vX.X.X' version git tag
        if: steps.version-check.outputs.changed == 'true'
        uses: actions/github-script@v5
        with:
          script: |
            github.rest.git.createRef({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: 'refs/tags/v' + '${{ steps.version-check.outputs.version }}',
              sha: context.sha
            })
      - uses: dev-drprasad/delete-tag-and-release@v0.2.1
        if: steps.version-check.outputs.changed == 'true'
        with:
          tag_name: latest
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - name: Create 'latest' git tag
        if: steps.version-check.outputs.changed == 'true'
        uses: actions/github-script@v5
        with:
          script: |
            github.rest.git.createRef({
              owner: context.repo.owner,
              repo: context.repo.repo,
              ref: 'refs/tags/latest',
              sha: context.sha
            })
      - name: Extract Major Version
        if: steps.version-check.outputs.changed == 'true'
        id: major-version
        run: echo "major=$(echo '${{ steps.version-check.outputs.version }}' | cut -d. -f1)" >> $GITHUB_ENV
      - name: Create 'vX.x.x' version git tag
        if: steps.version-check.outputs.changed == 'true'
        uses: actions/github-script@v5
        with:
          script: |
            const majorVersion = process.env.major || "0"; // Default to "0" if not set
            console.log(`Extracted Major Version: ${majorVersion}`); // Debugging output
            const tagName = `v${majorVersion}.x.x`;
            console.log(`Tag to create: ${tagName}`); // Debugging output
            
            const tagExists = await github.rest.git.getRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: `tags/${tagName}`
            }).catch(() => null);

            if (tagExists) {
                await github.rest.git.deleteRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: `tags/${tagName}`
                });
            }

            await github.rest.git.createRef({
                owner: context.repo.owner,
                repo: context.repo.repo,
                ref: `refs/tags/${tagName}`,
                sha: context.sha
            });
      # Publish on npm
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18.x'
          registry-url: 'https://registry.npmjs.org'
      - name: Install dependencies 
        run: npm install
      - name: Publish package on NPM 📦
        run: npm publish --access=public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Let’s break it down step by step to explain what each part does:
#### Workflow Overview
- **Trigger**: The workflow runs on a `push` to the `main` branch, but only if changes are detected in any file (`paths: '**'`).
- **Purpose**: It checks if the version in `package.json` has changed, creates Git tags for the new version, and publishes the package to npm.
#### Step-by-Step Explanation
##### 1. Checkout the repository
```yaml
- uses: actions/checkout@v2
```
- This step checks out the repository code so that the workflow can access the files (e.g., `package.json`).
##### 2. Check for version changes
```yaml
- uses: EndBug/version-check@v2.1.5
  with:
    static-checking: localIsNew
    token: ${{ secrets.GITHUB_TOKEN }}
    file-url: https://raw.githubusercontent.com/your-org/your-repo-name/latest/package.json
  id: version-check
```
- **Action**: `EndBug/version-check` compares the local `package.json` version with the version in the specified `file-url` (in this case, the `latest` branch of the repository).
- **Purpose**: Determines if the version has changed and outputs:
    - `changed`: `true` if the version has changed, `false` otherwise.
    - `version`: The new version from `package.json`.
    - `type`: The type of version change (`major`, `minor`, `patch`, or `undefined` if the version decreased).
##### 3. Ensure version does not decrease
```yaml
- name: Check version not decreased
  if: steps.version-check.outputs.changed == 'true' && steps.version-check.outputs.type == 'undefined'
  run: echo "You should NEVER decrement/ decrease the version in the package.json. This will undermine confidence in our ability to follow semver rules"; exit 1
```
- **Condition**: Runs only if the version has changed (`changed == 'true'`) and the change type is `undefined` (indicating a version decrease).
- **Action**: Exits the workflow with an error message if the version has decreased, enforcing Semantic Versioning (SemVer) rules.
##### 4. Skip workflow if version unchanged
```yaml
- name: Check package.lock::version updated if ./dist changed
  if: steps.version-check.outputs.changed == 'false'
  run: echo "Version remained the same. Exiting..."; 
```
- **Condition**: Runs if the version has not changed (`changed == 'false'`).
- **Action**: Logs a message and exits the workflow early since no action is needed.
##### 5. Create a git tag for the new version
```yaml
- name: Create 'vX.X.X' version git tag
  if: steps.version-check.outputs.changed == 'true'
  uses: actions/github-script@v5
  with:
    script: |
      github.rest.git.createRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: 'refs/tags/v' + '${{ steps.version-check.outputs.version }}',
        sha: context.sha
      })
```
- **Condition**: Runs if the version has changed (`changed == 'true'`).
- **Action**: Creates a Git tag for the new version (e.g., `v1.2.3`) using the `github-script` action.
##### 6. Delete the `latest` Tag (if it exists)
```yaml
- uses: dev-drprasad/delete-tag-and-release@v0.2.1
  if: steps.version-check.outputs.changed == 'true'
  with:
    tag_name: latest
  env:
    GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
- **Condition**: Runs if the version has changed (`changed == 'true'`).
- **Action**: Deletes the existing `latest` Git tag to prepare for creating a new one.
##### 7. Create a New `latest` Git Tag
```yaml
- name: Create 'latest' git tag
  if: steps.version-check.outputs.changed == 'true'
  uses: actions/github-script@v5
  with:
    script: |
      github.rest.git.createRef({
        owner: context.repo.owner,
        repo: context.repo.repo,
        ref: 'refs/tags/latest',
        sha: context.sha
      })
```
- **Condition**: Runs if the version has changed (`changed == 'true'`).
- **Action**: Creates a new `latest` Git tag pointing to the latest commit.
##### 8. Extract the Major Version
```yaml
- name: Extract Major Version
  if: steps.version-check.outputs.changed == 'true'
  id: major-version
  run: echo "major=$(echo '${{ steps.version-check.outputs.version }}' | cut -d. -f1)" >> $GITHUB_ENV
```
- **Condition**: Runs if the version has changed (`changed == 'true'`).
- **Action**: Extracts the major version number (e.g., `1` from `1.2.3`) and stores it in the `major` environment variable.
##### 9. Create a Major Version Tag (e.g., `v1.x.x`)
```yaml
- name: Create 'vX.x.x' version git tag
  if: steps.version-check.outputs.changed == 'true'
  uses: actions/github-script@v5
  with:
    script: |
      const majorVersion = process.env.major || "0"; // Default to "0" if not set
      console.log(`Extracted Major Version: ${majorVersion}`); // Debugging output
      const tagName = `v${majorVersion}.x.x`;
      console.log(`Tag to create: ${tagName}`); // Debugging output
      
      const tagExists = await github.rest.git.getRef({
          owner: context.repo.owner,
          repo: context.repo.repo,
          ref: `tags/${tagName}`
      }).catch(() => null);

      if (tagExists) {
          await github.rest.git.deleteRef({
          owner: context.repo.owner,
          repo: context.repo.repo,
          ref: `tags/${tagName}`
          });
      }

      await github.rest.git.createRef({
          owner: context.repo.owner,
          repo: context.repo.repo,
          ref: `refs/tags/${tagName}`,
          sha: context.sha
      });
```
- **Condition**: Runs if the version has changed (`changed == 'true'`).
- **Action**: Creates a major version tag (e.g., `v1.x.x`) for the new version. If the tag already exists, it is deleted and recreated.
##### 10. Publish the Package to npm
```yaml
# Publish on npm
- name: Setup Node
uses: actions/setup-node@v2
with:
  node-version: '18.x'
  registry-url: 'https://registry.npmjs.org'
- name: Install dependencies 
run: npm install
- name: Publish package on NPM 📦
run: npm publish --access=public
env:
  NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```
- **Action**: Sets up Node.js, installs dependencies using `npm install` and publishes the package to npm with public access. The `NODE_AUTH_TOKEN` environment variable is used for authentication.

This workflow ensures that every version change is automatically tagged and published, reducing manual effort and minimizing errors.
## Conclusion
A well-defined versioning policy is essential for any project used by third parties. By adopting Semantic Versioning and automating your versioning workflow, you can provide clarity, reliability, and trust to your users. Whether you’re managing npm packages or serving libraries via CDNs, versioning ensures that your software remains compatible and predictable. Investing in a structured release process not only improves adopters efficiency, but also contributes to a more stable and sustainable software ecosystem.
