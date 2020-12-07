# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.62](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.61...v0.0.62) (2020-12-02)

**Note:** Version bump only for package @bodiless/ui





## [0.0.61](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.60...v0.0.61) (2020-11-25)


### Features

* **components:** Content Library ([#696](https://github.com/johnsonandjohnson/bodiless-js/issues/696)) ([ee66fb8](https://github.com/johnsonandjohnson/bodiless-js/commit/ee66fb876754e17ef551bc2a87e257957b9bd2aa)), closes [#1](https://github.com/johnsonandjohnson/bodiless-js/issues/1) [#4](https://github.com/johnsonandjohnson/bodiless-js/issues/4) [#2](https://github.com/johnsonandjohnson/bodiless-js/issues/2) [#5](https://github.com/johnsonandjohnson/bodiless-js/issues/5) [#3](https://github.com/johnsonandjohnson/bodiless-js/issues/3)





## [0.0.60](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.60) (2020-11-18)


### Features

* **core, layouts, layouts-ui:**  Add "Clear" Functionality for Component Library Filters ([#669](https://github.com/johnsonandjohnson/bodiless-js/issues/669)) ([df03dbf](https://github.com/johnsonandjohnson/bodiless-js/commit/df03dbf85368ee6c9b9223a5dc356b7880d09b71)), closes [#668](https://github.com/johnsonandjohnson/bodiless-js/issues/668)





## [0.0.59](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.59) (2020-11-05)

**Note:** Version bump only for package @bodiless/ui





## [0.0.58](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.57...v0.0.58) (2020-10-23)


### Features

* **components,organisms:** Mega-menu support ([#572](https://github.com/johnsonandjohnson/bodiless-js/issues/572)) ([9f43d0e](https://github.com/johnsonandjohnson/bodiless-js/commit/9f43d0e38abd7b7ac48d8ea1c3c06a97cf48fdef)), closes [#546](https://github.com/johnsonandjohnson/bodiless-js/issues/546)





## [0.0.57](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.56...v0.0.57) (2020-10-15)

**Note:** Version bump only for package @bodiless/ui





## [0.0.56](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.55...v0.0.56) (2020-09-21)


### Features

* **ui, layouts-ui:** Simplify Component Resizing ([#532](https://github.com/johnsonandjohnson/bodiless-js/issues/532)) ([6a3896a](https://github.com/johnsonandjohnson/bodiless-js/commit/6a3896a2c9a5661b62abdb253025098d6755622e))





## [0.0.55](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.54...v0.0.55) (2020-08-28)


### Features

* **core-ui, ui:** Standardize Admin UI Icons and Labels ([#516](https://github.com/johnsonandjohnson/bodiless-js/issues/516)) ([576af00](https://github.com/johnsonandjohnson/bodiless-js/commit/576af002a3079e5dc8ddeeb3e98537f48cb698f7))
* **gatsby-theme-bodiless, core, ui:** Unify global menu modal and spinner behavior in form actions ([#503](https://github.com/johnsonandjohnson/bodiless-js/issues/503)) ([e5d7a76](https://github.com/johnsonandjohnson/bodiless-js/commit/e5d7a762694e9925c096f048421eca2535e0e8a4)), closes [#410](https://github.com/johnsonandjohnson/bodiless-js/issues/410)





## [0.0.54](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.53...v0.0.54) (2020-08-24)


### Features

* **fclasses:** Allow adding/removing classes conditionally via fclasses ([#440](https://github.com/johnsonandjohnson/bodiless-js/issues/440)) ([d3d522b](https://github.com/johnsonandjohnson/bodiless-js/commit/d3d522b22e88e39a86f7c36fb21cd7b0dfd978da))


### BREAKING CHANGES

* **fclasses:** chaining support is removed from addClasses and removeClasses. If your code contains chained addClasses/removeClasses, you need to replace the chaining with flow/flowIf or any other helpers that provides functional composition.
For example, when you have in your code
```
addClasses('classA').removeClasses('classB')
```
you need to change it to
```
flow(
  addClasses('classA'),
  removeClasses('classB'),
)
```





## [0.0.53](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.52...v0.0.53) (2020-08-13)


### Bug Fixes

* **bodiless-ui:** erroneus area error during gatsby build ([#491](https://github.com/johnsonandjohnson/bodiless-js/issues/491)) ([2dc2a49](https://github.com/johnsonandjohnson/bodiless-js/commit/2dc2a4980cbdaab8a48163072a4946de09001b01))





## [0.0.52](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.51...v0.0.52) (2020-07-29)


### Features

* **core-ui:** add a warning element for user warning messages ([f40eb6c](https://github.com/johnsonandjohnson/bodiless-js/commit/f40eb6cd8b7271f90c3895cc623e1a8778cfb9c9)), closes [#416](https://github.com/johnsonandjohnson/bodiless-js/issues/416)
* **documentation:** API Doc for Site builder ([#474](https://github.com/johnsonandjohnson/bodiless-js/issues/474)) ([14e7594](https://github.com/johnsonandjohnson/bodiless-js/commit/14e75948f2856908f24781b64469df6c8810e7c6))





## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)


### Features

* **components:** remove the # from the link URL input field ([#373](https://github.com/johnsonandjohnson/bodiless-js/issues/373)) ([9ca6caa](https://github.com/johnsonandjohnson/bodiless-js/commit/9ca6caa888c1d69f559a224e7c14f4ceec18978f)), closes [#374](https://github.com/johnsonandjohnson/bodiless-js/issues/374)





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)

**Note:** Version bump only for package @bodiless/ui





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)


### Features

* **core, ui:**  Notifications/Alerts. ([#346](https://github.com/johnsonandjohnson/bodiless-js/issues/346)) ([136abd3](https://github.com/johnsonandjohnson/bodiless-js/commit/136abd355ed7a99deb6e21718a3d6aaf5041c898)), closes [#300](https://github.com/johnsonandjohnson/bodiless-js/issues/300)





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Features

* **gatsby-theme-bodiless:** pull upstream changes. ([78a2050](https://github.com/johnsonandjohnson/bodiless-js/commit/78a2050adbb6498cc15d1d1184e068130a61d356)), closes [#303](https://github.com/johnsonandjohnson/bodiless-js/issues/303) [#303](https://github.com/johnsonandjohnson/bodiless-js/issues/303)
* **organisms:** "Filter by Tag" Component. ([#241](https://github.com/johnsonandjohnson/bodiless-js/issues/241)) ([e043bd8](https://github.com/johnsonandjohnson/bodiless-js/commit/e043bd8b508e1be2fcbd0676116b34550aa39dd6))





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)

**Note:** Version bump only for package @bodiless/ui





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/ui





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)


### Features

* **core-ui:** Implement reusable modal overlay and use in create page & … ([#216](https://github.com/johnsonandjohnson/bodiless-js/issues/216)) ([230334e](https://github.com/johnsonandjohnson/bodiless-js/commit/230334eca8a99ecb05be486c28372f9e5835b975))





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme-bodiless, starter, test-site:** purge unused css ([#195](https://github.com/johnsonandjohnson/bodiless-js/issues/195)) ([1b54d82](https://github.com/johnsonandjohnson/bodiless-js/commit/1b54d82e53d0d72291a2ed3273e5b853c182e299))


### BREAKING CHANGES

* **gatsby-theme-bodiless, starter, test-site:** bodiless/components does not export Link component anymore. One, who consumes Link component, should replace Link with a site level link component.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/ui





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/ui





## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)

**Note:** Version bump only for package @bodiless/ui





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)

**Note:** Version bump only for package @bodiless/ui





## 0.0.38 (2020-01-29)


### Features

* **core-ui, layouts, layouts-ui, ui:** Update Flexbox Fly-Out Panel UI ([#55](https://github.com/johnsonandjohnson/bodiless-js/issues/55)) ([ef21da6](https://github.com/johnsonandjohnson/bodiless-js/commit/ef21da62ccc29e7b07bf767a420dae5997f86346))





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)

**Note:** Version bump only for package @bodiless/ui
