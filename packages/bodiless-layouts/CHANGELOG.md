# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/layouts





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)

**Note:** Version bump only for package @bodiless/layouts





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **layouts:** Define Design for the Flexbox ([#209](https://github.com/johnsonandjohnson/bodiless-js/issues/209)) ([cd9f6ca](https://github.com/johnsonandjohnson/bodiless-js/commit/cd9f6ca68d4f4f34d5526eec9dccbcee21b54e00))


### BREAKING CHANGES

* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)


### Bug Fixes

* **layouts:** Fix/no link in flexbox ([#198](https://github.com/johnsonandjohnson/bodiless-js/issues/198)) ([066f0ed](https://github.com/johnsonandjohnson/bodiless-js/commit/066f0ed6659d1f983f12b32956748df6b02d5c6a))






## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/layouts






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Features

* **layouts:** Allow specifying default width for flexbox item. ([#164](https://github.com/johnsonandjohnson/bodiless-js/issues/164)) ([9a4bc2f](https://github.com/johnsonandjohnson/bodiless-js/commit/9a4bc2f3b842fe212d57c24efec55f7fd0fe3b43)), closes [#162](https://github.com/johnsonandjohnson/bodiless-js/issues/162)





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **layout:** Easily identify a flexbox area on page so that can start… ([#99](https://github.com/johnsonandjohnson/bodiless-js/issues/99)) ([8148e1c](https://github.com/johnsonandjohnson/bodiless-js/commit/8148e1c6201d3ec64fcaf089076c4a37d3fa5923))
* **layouts:** Component Switcher ([#105](https://github.com/johnsonandjohnson/bodiless-js/issues/105)) ([1e1ce8e](https://github.com/johnsonandjohnson/bodiless-js/commit/1e1ce8e7e79dbb66d7ffdad599de117902702b1d)), closes [#69](https://github.com/johnsonandjohnson/bodiless-js/issues/69)





## 0.0.38 (2020-01-29)


### Features

* **core-ui, layouts, layouts-ui, ui:** Update Flexbox Fly-Out Panel UI ([#55](https://github.com/johnsonandjohnson/bodiless-js/issues/55)) ([ef21da6](https://github.com/johnsonandjohnson/bodiless-js/commit/ef21da62ccc29e7b07bf767a420dae5997f86346))





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **layouts:** Remove checkmark icon from component picker ([#33](https://github.com/johnsonandjohnson/bodiless-js/issues/33)) ([ab6ce73](https://github.com/johnsonandjohnson/bodiless-js/commit/ab6ce7385d0d0e5122219fa81892263d086dfb7d))
* **layouts, test-site:** Add product listing template, fix a few flexbox bugs ([#13](https://github.com/johnsonandjohnson/bodiless-js/issues/13)) ([1f7307e](https://github.com/johnsonandjohnson/bodiless-js/commit/1f7307ea139ed4587916900434b36a5f0b4d9778))
