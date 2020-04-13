# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/richtext





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)

**Note:** Version bump only for package @bodiless/richtext





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)


### BREAKING CHANGES

* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/richtext





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/richtext







## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)



### Features

* **bodiless-core:** edit ui should start in preview mode ([#170](https://github.com/johnsonandjohnson/bodiless-js/issues/170)) ([22b4f4c](https://github.com/johnsonandjohnson/bodiless-js/commit/22b4f4c74cf0ce9ab2e30cb87bffe428bddd7fb9))





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **bodiless-richtext:** improved richtext input lag on a page with multiple richtext elements ([#104](https://github.com/johnsonandjohnson/bodiless-js/issues/104)) ([e243b2d](https://github.com/johnsonandjohnson/bodiless-js/commit/e243b2d5f348dd94c603017ee72f06fee8283cb1))


### Features

* **core:** Alter the Main Menu in Preview Mode ([#132](https://github.com/johnsonandjohnson/bodiless-js/issues/132)) ([abebb43](https://github.com/johnsonandjohnson/bodiless-js/commit/abebb43c48668d8f147cb43c7c4f042b06abd48e))





## 0.0.38 (2020-01-29)


### Features

* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Bug Fixes

* **richtext:** Format bar persists when leaving edit mode ([#24](https://github.com/johnsonandjohnson/bodiless-js/issues/24)) ([3b09277](https://github.com/johnsonandjohnson/bodiless-js/commit/3b09277bb420fc1b7c6dc82ca19a06b16c82c48e))
* **richtext:** Rich Text Editor menu appears for a moment in the bottom of a page ([#43](https://github.com/johnsonandjohnson/bodiless-js/issues/43)) ([#44](https://github.com/johnsonandjohnson/bodiless-js/issues/44)) ([28fe4c4](https://github.com/johnsonandjohnson/bodiless-js/commit/28fe4c47b75bc47163f66c875bb41e9b6ee64715))


### Features

* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
