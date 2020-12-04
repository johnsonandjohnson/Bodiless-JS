# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.62](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.61...v0.0.62) (2020-12-02)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.61](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.60...v0.0.61) (2020-11-25)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.60](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.60) (2020-11-18)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.59](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.59) (2020-11-05)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.58](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.57...v0.0.58) (2020-10-23)


### Features

* **components,organisms:** Mega-menu support ([#572](https://github.com/johnsonandjohnson/bodiless-js/issues/572)) ([9f43d0e](https://github.com/johnsonandjohnson/bodiless-js/commit/9f43d0e38abd7b7ac48d8ea1c3c06a97cf48fdef)), closes [#546](https://github.com/johnsonandjohnson/bodiless-js/issues/546)





## [0.0.57](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.56...v0.0.57) (2020-10-15)


### Bug Fixes

* **core:** The forms overlay the bottom part of Local Menus ([#562](https://github.com/johnsonandjohnson/bodiless-js/issues/562)) ([cd1458f](https://github.com/johnsonandjohnson/bodiless-js/commit/cd1458f52658d372fa83921c9a331d4060f45f9e))


### Features

* **components:** youtube and iframe ([#569](https://github.com/johnsonandjohnson/bodiless-js/issues/569)) ([388166c](https://github.com/johnsonandjohnson/bodiless-js/commit/388166cdbeebedc71bd287c2794867c76f09b794))





## [0.0.56](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.55...v0.0.56) (2020-09-21)


### Features

* **core:** Improved Context Menu API ([#519](https://github.com/johnsonandjohnson/bodiless-js/issues/519)) ([463e8f6](https://github.com/johnsonandjohnson/bodiless-js/commit/463e8f61a8e13af6b6c62428d2b6a63fce197cb7)), closes [#3](https://github.com/johnsonandjohnson/bodiless-js/issues/3) [#487](https://github.com/johnsonandjohnson/bodiless-js/issues/487) [#486](https://github.com/johnsonandjohnson/bodiless-js/issues/486)





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

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.52](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.51...v0.0.52) (2020-07-29)


### Features

* **core-ui:** add a warning element for user warning messages ([f40eb6c](https://github.com/johnsonandjohnson/bodiless-js/commit/f40eb6cd8b7271f90c3895cc623e1a8778cfb9c9)), closes [#416](https://github.com/johnsonandjohnson/bodiless-js/issues/416)
* **documentation:** API Doc for Site builder ([#474](https://github.com/johnsonandjohnson/bodiless-js/issues/474)) ([14e7594](https://github.com/johnsonandjohnson/bodiless-js/commit/14e75948f2856908f24781b64469df6c8810e7c6))





## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)


### Features

* **components:** remove the # from the link URL input field ([#373](https://github.com/johnsonandjohnson/bodiless-js/issues/373)) ([9ca6caa](https://github.com/johnsonandjohnson/bodiless-js/commit/9ca6caa888c1d69f559a224e7c14f4ceec18978f)), closes [#374](https://github.com/johnsonandjohnson/bodiless-js/issues/374)





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)


### Features

* **gatsby-theme-bodiless, components, core, layouts:** Add labels and update icons for admin menu ([#361](https://github.com/johnsonandjohnson/bodiless-js/issues/361)) ([93e7033](https://github.com/johnsonandjohnson/bodiless-js/commit/93e70339b804824f167fdf53df4cca042c5ba6c0))





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)


### Features

* **core, ui:**  Notifications/Alerts. ([#346](https://github.com/johnsonandjohnson/bodiless-js/issues/346)) ([136abd3](https://github.com/johnsonandjohnson/bodiless-js/commit/136abd355ed7a99deb6e21718a3d6aaf5041c898)), closes [#300](https://github.com/johnsonandjohnson/bodiless-js/issues/300)





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Bug Fixes

* **ui:** Adjust contextual menu position ([#319](https://github.com/johnsonandjohnson/bodiless-js/issues/319)) ([e16e299](https://github.com/johnsonandjohnson/bodiless-js/commit/e16e2995dd88e0aca7ec1fbd21586358d327accd))


### Features

* **core:** Sidecar Node API ([#320](https://github.com/johnsonandjohnson/bodiless-js/issues/320)) ([1c61274](https://github.com/johnsonandjohnson/bodiless-js/commit/1c61274ea1e45e81210bfd5f05f06c6244977abb)), closes [#285](https://github.com/johnsonandjohnson/bodiless-js/issues/285) [#321](https://github.com/johnsonandjohnson/bodiless-js/issues/321)
* **organisms:** "Filter by Tag" Component. ([#241](https://github.com/johnsonandjohnson/bodiless-js/issues/241)) ([e043bd8](https://github.com/johnsonandjohnson/bodiless-js/commit/e043bd8b508e1be2fcbd0676116b34550aa39dd6))





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)


### Features

* **core-ui:** Implement reusable modal overlay and use in create page & … ([#216](https://github.com/johnsonandjohnson/bodiless-js/issues/216)) ([230334e](https://github.com/johnsonandjohnson/bodiless-js/commit/230334eca8a99ecb05be486c28372f9e5835b975))





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/core-ui






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)

**Note:** Version bump only for package @bodiless/core-ui





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **layout:** Create a location Switcher for the Edit Admin UI Menu ([#149](https://github.com/johnsonandjohnson/bodiless-js/issues/149)) ([943e960](https://github.com/johnsonandjohnson/bodiless-js/commit/943e960016718b022bcb95471977ea43b6d9afac))





## 0.0.38 (2020-01-29)


### Features

* **core-ui, layouts, layouts-ui, ui:** Update Flexbox Fly-Out Panel UI ([#55](https://github.com/johnsonandjohnson/bodiless-js/issues/55)) ([ef21da6](https://github.com/johnsonandjohnson/bodiless-js/commit/ef21da62ccc29e7b07bf767a420dae5997f86346))





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)

**Note:** Version bump only for package @bodiless/core-ui
