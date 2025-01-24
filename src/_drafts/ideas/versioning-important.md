---
title: Post title
date: 2025-01-24
summary: Description of the post, will appear also in the .
image: Pasted%20image%2020241214173831.jpg
tags:
  - dev
  - ci-cd
---
### Importance of Versioning Policy

Having a versioning policy is crucial, especially for projects intended to be used by third parties. A well-defined versioning policy ensures that users can reliably track changes, updates, and improvements to the software. It provides a clear framework for managing and communicating changes, which is essential for maintaining compatibility and stability.
#### Key Benefits of a Versioning Policy:

1. **Predictability**: Users can anticipate the impact of updates based on version numbers. For example, a major version change might indicate breaking changes, while a minor version change might indicate new features that are backward compatible.
2. **Compatibility**: Ensures that third-party users can safely update to newer versions without unexpected issues. It helps in maintaining backward compatibility.
3. **Transparency**: Provides a clear history of changes, making it easier for users to understand what has been added, fixed, or changed in each version.
4. **Confidence**: Builds trust with users by demonstrating a commitment to maintaining and improving the software in a structured and predictable manner.

### Versioning Policy in This Project

In this project, we follow Semantic Versioning (SemVer) to manage versions. Semantic Versioning is a widely adopted versioning scheme that uses a three-part version number: `MAJOR.MINOR.PATCH`.

- **MAJOR**: Incremented for incompatible API changes.
- **MINOR**: Incremented for backward-compatible new features.
- **PATCH**: Incremented for backward-compatible bug fixes.

### Examples of Semantic Versioning in Use

Semantic Versioning (SemVer) is a widely adopted versioning scheme that helps developers manage and communicate changes in their software. Here are some examples of how SemVer is useful, particularly in the context of npm packages and CDN providers like jsDelivr:

#### 1. npm Packages

npm (Node Package Manager) is a popular package manager for JavaScript. It uses SemVer to manage package versions, making it easier for developers to understand the impact of updates.

**Example:**

- **Major Version Update**: When a package author releases a new major version, it indicates that there are breaking changes. For example, updating from `1.0.0` to `2.0.0` means that the new version is not backward compatible with the previous version.
  
  ```sh
  npm install some-package@2.0.0
  ```

- **Minor Version Update**: A minor version update adds new features in a backward-compatible manner. For example, updating from `1.0.0` to `1.1.0` means that new features have been added, but existing functionality remains unchanged.
  
  ```sh
  npm install some-package@1.1.0
  ```

- **Patch Version Update**: A patch version update includes backward-compatible bug fixes. For example, updating from `1.0.0` to `1.0.1` means that bugs have been fixed without affecting existing functionality.
  
  ```sh
  npm install some-package@1.0.1
  ```

#### 2. CDN Providers with Major Version Aliases

CDN (Content Delivery Network) providers like jsDelivr use SemVer to manage and serve different versions of libraries. They often provide major version aliases to ensure that users can always get the latest compatible version without breaking their applications.

**Example:**

- **Major Version Alias**: jsDelivr allows you to use major version aliases to always get the latest minor and patch updates within a major version. For example, using `@3` in the URL will always fetch the latest `3.x.x` version.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/some-library@3"></script>
  ```

- **Specific Version**: You can also specify an exact version if you need to ensure that your application uses a specific version of the library.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/some-library@3.2.1"></script>
  ```

- **Version Range**: jsDelivr supports version ranges, allowing you to specify a range of versions that are compatible with your application.

  ```html
  <script src="https://cdn.jsdelivr.net/npm/some-library@^3.0.0"></script>
  ```

#### Versioning Workflow

1. **Update Version Number**: Before releasing a new version, the version number in `package.json` is updated according to the changes made.
2. **Update Changelog**: The `CHANGELOG.md` file is updated to document the changes included in the new version.
3. **Run Tests**: Ensure all tests pass by running `npm test`.
4. **Build the Project**: Re-build the project by running `npm run build`.
5. **Manual Testing**: Manually test the rendered HTML on localhost by running `npm start`.
6. **Tag and Publish**: Use GitHub Actions to automate the process of tagging and publishing the new version.
### Automated Versioning with GitHub Actions

We use GitHub Actions to automate the versioning and publishing process. The `tag-and-publish-on-version-change.yml` workflow ensures that every time a version change is detected, the following steps are executed:

1. **Version Check**: The workflow checks if the version in `package.json` has changed.
2. **Tag Creation**: If a version change is detected, a new git tag is created for the version.
3. **Publish to NPM**: The package is published to NPM, making it available for third-party users.

#### Example Workflow

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
          file-url: https://raw.githubusercontent.com/gov-cy/govcy-frontend-renderer/latest/package.json
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

By following this versioning policy and using automated workflows, we ensure that the project remains reliable, consistent, and easy to use for third-party developers.