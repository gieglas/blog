---
title: GitLab CI/CD and React Tests
date: 2019-09-27
summary: An example of Continuous Integration, this time with unit testing react components.
image: Pasted%20image%2020240326093018.png
tags:
  - dev
  - ci-cd
---
Continuing after my previous post about [Gitlab CI/CD](../Gitlab-ci-cd-and-gitlab-pages), I would like to show another example of Continuous Integration, this time with unit testing react components.
### .gitlab-ci.yml
Just a reminder, the way to configure GitLab’s CI is by adding a [configuration file](https://doc.gitlab.com/ee/ci/quick_start/README.html#creating-a-.gitlab-ci.yml-file){target="_blank"}  called `.gitlab-ci.yml`, which tells the GitLab runner what to do.

In this example we only use the `test` stage. The script simply uses `npm` commands to install all dependencies and perform the test (i.e. using [Jest](https://jestjs.io/){target="_blank"} ). Check out the code below.

```shell
image: node:11.10.1
 
stages:
    - test
 
run-unit-test:
    stage: test
    script:
        - npm install # Install all dependencies
        - npm test # Test 
    only:
        - merge_requests
```

As you might have noticed the job will only be triggered on `merge_requests`. So after a merge request you can see the results of the tests in the `CI/CD / Pipelines` and `CI/CD / Jobs` (check out the screenshoots below)

![Pipelines test](../../img/Pasted%20image%2020240326092746.png){.img-fluid .pop-small .govcy-mb-3}

![Jobs test](../../img/Pasted%20image%2020240326092840.png){.img-fluid .pop-small .govcy-mb-3}

![Test results](../../img/Pasted%20image%2020240326092929.png){.img-fluid .pop-small .govcy-mb-3}