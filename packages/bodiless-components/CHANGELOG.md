# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **components:**  Add google tag manager &  datalayer. ([#207](https://github.com/johnsonandjohnson/bodiless-js/issues/207)) ([9ee52e3](https://github.com/johnsonandjohnson/bodiless-js/commit/9ee52e39741004d263a5c06055520b197947f942))
* **gatsby-theme-bodiless, starter, test-site:** purge unused css ([#195](https://github.com/johnsonandjohnson/bodiless-js/issues/195)) ([1b54d82](https://github.com/johnsonandjohnson/bodiless-js/commit/1b54d82e53d0d72291a2ed3273e5b853c182e299))
* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)


### BREAKING CHANGES

* **gatsby-theme-bodiless, starter, test-site:** bodiless/components does not export Link component anymore. One, who consumes Link component, should replace Link with a site level link component.
* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)


### Bug Fixes

* **components, core:** Fix withEditPlaceholder components order ([3c1f99b](https://github.com/johnsonandjohnson/bodiless-js/commit/3c1f99b38bf437d97d4ffc2e062fd91d295184ca))





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)


### Features

* **components:** Add withEditPlaceholder HOC to bodiless-components ([#174](https://github.com/johnsonandjohnson/bodiless-js/issues/174)) ([c1380e3](https://github.com/johnsonandjohnson/bodiless-js/commit/c1380e3b9cdc7aee7e5fe018b179b0627148970c))





## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Features

* **bodiless-core:** edit ui should start in preview mode ([#170](https://github.com/johnsonandjohnson/bodiless-js/issues/170)) ([22b4f4c](https://github.com/johnsonandjohnson/bodiless-js/commit/22b4f4c74cf0ce9ab2e30cb87bffe428bddd7fb9))





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)

**Note:** Version bump only for package @bodiless/components





## 0.0.38 (2020-01-29)


### Bug Fixes

* **components:** Remove image button from left menu. ([#87](https://github.com/johnsonandjohnson/bodiless-js/issues/87)) ([ec86536](https://github.com/johnsonandjohnson/bodiless-js/commit/ec86536a6175900bc0ddc8a8d4c9acac0669b806))


### Features

* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)
