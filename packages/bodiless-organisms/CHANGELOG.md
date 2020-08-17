# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.53](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.52...v0.0.53) (2020-08-13)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.52](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.51...v0.0.52) (2020-07-29)


### Features

* **documentation:** API Doc for Site builder ([#474](https://github.com/johnsonandjohnson/bodiless-js/issues/474)) ([14e7594](https://github.com/johnsonandjohnson/bodiless-js/commit/14e75948f2856908f24781b64469df6c8810e7c6))





## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Features

* **components, components-ui:** Add Image Component ([#316](https://github.com/johnsonandjohnson/bodiless-js/issues/316)) ([a3fba5d](https://github.com/johnsonandjohnson/bodiless-js/commit/a3fba5dc9ad7f53f1c95168dc9aa7d3f5c4754ad))
* **components, organisms:** PLP Utilizes Filtering System ([#291](https://github.com/johnsonandjohnson/bodiless-js/issues/291)) ([9ba3fe8](https://github.com/johnsonandjohnson/bodiless-js/commit/9ba3fe88e8d0c3f861b9d8b0b69ee0217759cda4))
* **organisms:** "Filter by Tag" Component. ([#241](https://github.com/johnsonandjohnson/bodiless-js/issues/241)) ([e043bd8](https://github.com/johnsonandjohnson/bodiless-js/commit/e043bd8b508e1be2fcbd0676116b34550aa39dd6))


### BREAKING CHANGES

* **components, components-ui:** * Styles of @bodiless/components image picker changed. Functionality of image picker is not impacted, just visual appearance changed. If a site uses Image or asBodilessImage from @bodiless/components, then the site is impacted. The recommended migration path is to change Image and asBodilessImage import from "@bodiless/components" into "@bodiless/components-ui". Example of the migration can be found in test site.





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)


### Features

* **core:** component default content ([#219](https://github.com/johnsonandjohnson/bodiless-js/issues/219)) ([379e655](https://github.com/johnsonandjohnson/bodiless-js/commit/379e6559de3471214e45132ed493deed63ecfb38))





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **organisms:** Element selector enhancement for Single Accordion ([#206](https://github.com/johnsonandjohnson/bodiless-js/issues/206)) ([6325670](https://github.com/johnsonandjohnson/bodiless-js/commit/6325670012d020d0807ee2304c156cb45dfab279))


### BREAKING CHANGES

* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/organisms






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **documentation:** Support better control over IA ([#129](https://github.com/johnsonandjohnson/bodiless-js/issues/129)) ([05c94fd](https://github.com/johnsonandjohnson/bodiless-js/commit/05c94fdd3ccd860a29d6a81bb5abc3708d7a8157))





## 0.0.38 (2020-01-29)


### Features

* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Bug Fixes

* **richtext:** Format bar persists when leaving edit mode ([#24](https://github.com/johnsonandjohnson/bodiless-js/issues/24)) ([3b09277](https://github.com/johnsonandjohnson/bodiless-js/commit/3b09277bb420fc1b7c6dc82ca19a06b16c82c48e))


### Features

* **layouts, test-site:** Add product listing template, fix a few flexbox bugs ([#13](https://github.com/johnsonandjohnson/bodiless-js/issues/13)) ([1f7307e](https://github.com/johnsonandjohnson/bodiless-js/commit/1f7307ea139ed4587916900434b36a5f0b4d9778))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)
