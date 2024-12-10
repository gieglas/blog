---
title: GitLab CI/CD and GitLab Pages
date: 2019-08-27
summary: In this post I will try and explain how to deploy a simple javascript application on GitLab pages, using Continuous Deployment with a live working example.
image: Pasted%20image%2020240326093018.png
tags:
  - dev
  - ci-cd
---
In this post I will try and explain how to deploy a simple javascript application on GitLab pages, using Continuous Deployment with a live working example.

For those that don’t know about [GitLab](https://about.gitlab.com/){target="_blank"} , it’s an online GIT repository, just like GitHub that offers web-based DevOps tools. Where GitLab really shines, is it’s Continuous Integration (CI) and Continuous Delivery (CD) capabilities.

GitLab’s definitions for CI and CD:

> **Continuous Integration** is the practice of integrating code into a shared repository and building/testing each change automatically, as early as possible – usually several times a day.
> 
> **Continuous Delivery** adds that the software can be released to production at any time, often by automatically pushing changes to a staging system.  
> **Continuous Deployment** goes further and pushes changes to production automatically.
> 
> [https://about.gitlab.com/product/continuous-integration/](https://about.gitlab.com/product/continuous-integration/){target="_blank"} 

In my example I created a simple javascript application that shows some images on the screen, on which I use GitLab’s CI/CD to automatically deploy my pushed changes on GitLab’s Pages. Check out the [code](https://gitlab.com/gieglas/pages-test){target="_blank"}  and the [GitLab Page](https://gieglas.gitlab.io/pages-test/){target="_blank"}  that is created.

Oh it’s worth mentioning here that [GitLab’s Pages](https://about.gitlab.com/product/pages/){target="_blank"}  can hosts static websites only (HTML, CSS and JS).
### .gitlab-ci.yml

The way to configure GitLab’s CI is by adding a [configuration file](http://doc.gitlab.com/ee/ci/quick_start/README.html#creating-a-.gitlab-ci.yml-file){target="_blank"}  called `.gitlab-ci.yml`, which tells the GitLab runner what to do (NOTE: It needs to be placed at your root directory and file is written in [YAML](http://yaml.org/){target="_blank"} )

There are three stages which GitLab runner runs, `build`, `test`, and `deploy`. In our example we only use the `deploy` stage which is triggered only when commits are pushed on the `master` branch. Check out the code i used below.

```yaml
pages:
  stage: deploy
  script:
  - mkdir .public
  - cp -r * .public
  - mv .public public
  artifacts:
    paths:
    - public
  only:
  - master
```
Take a look also on a more detailed tutorial by GitLab on [pages setup](https://about.gitlab.com/2016/04/07/gitlab-pages-setup/){target="_blank"}  and the documentation on [.gitlab-ci.yml](https://docs.gitlab.com/ee/ci/yaml/README.html){target="_blank"}  and [GitLab Pages](https://docs.gitlab.com/ee/user/project/pages/index.html){target="_blank"} .