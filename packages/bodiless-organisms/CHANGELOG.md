# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.62](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.61...v0.0.62) (2020-12-02)


### Features

* **components:** Normalize link Href ([#659](https://github.com/johnsonandjohnson/bodiless-js/issues/659)) ([5d99541](https://github.com/johnsonandjohnson/bodiless-js/commit/5d99541919a3f17be22a9fde522dbd9b137b03c3)), closes [#633](https://github.com/johnsonandjohnson/bodiless-js/issues/633)
* **components, organisms:** Menu Trails ([#697](https://github.com/johnsonandjohnson/bodiless-js/issues/697)) ([b0b16b4](https://github.com/johnsonandjohnson/bodiless-js/commit/b0b16b445bdb6c38ab06c622313cb694e2d2e0bd))





## [0.0.61](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.60...v0.0.61) (2020-11-25)


### Bug Fixes

* moved package css compilation and purge to site level ([#707](https://github.com/johnsonandjohnson/bodiless-js/issues/707)) ([cfeb8eb](https://github.com/johnsonandjohnson/bodiless-js/commit/cfeb8eb5b3db6f896a979ce62193642d9aea7300))





## [0.0.60](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.60) (2020-11-18)


### Bug Fixes

* **richtext:** [GAPS] RTE editor doesn't allow for inline files/components (aka inline CTA styled buttons) ([#481](https://github.com/johnsonandjohnson/bodiless-js/issues/481)) ([3647e41](https://github.com/johnsonandjohnson/bodiless-js/commit/3647e41b9e8ac23e0a24ac065a5d0229dc04223c))


### Features

* **components, core, organisms:** Burger Menu with Breadcrumbs ([#637](https://github.com/johnsonandjohnson/bodiless-js/issues/637)) ([23af96d](https://github.com/johnsonandjohnson/bodiless-js/commit/23af96d68bc49a64ea71131071cd4392311a3593))
* **fclasses:** Design Keys ([#685](https://github.com/johnsonandjohnson/bodiless-js/issues/685)) ([0db060a](https://github.com/johnsonandjohnson/bodiless-js/commit/0db060ad1e7496553cd8eae3654770530d543010)), closes [#660](https://github.com/johnsonandjohnson/bodiless-js/issues/660)
* Purge CSS Enhancements ([#632](https://github.com/johnsonandjohnson/bodiless-js/issues/632)) ([9f9c6de](https://github.com/johnsonandjohnson/bodiless-js/commit/9f9c6dee725389887066702295ee447990d69b67))





## [0.0.59](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.59) (2020-11-05)

**Note:** Version bump only for package @bodiless/organisms





## [0.0.58](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.57...v0.0.58) (2020-10-23)


### Features

* **components,organisms:** Mega-menu support ([#572](https://github.com/johnsonandjohnson/bodiless-js/issues/572)) ([9f43d0e](https://github.com/johnsonandjohnson/bodiless-js/commit/9f43d0e38abd7b7ac48d8ea1c3c06a97cf48fdef)), closes [#546](https://github.com/johnsonandjohnson/bodiless-js/issues/546)





## [0.0.57](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.56...v0.0.57) (2020-10-15)


### Features

* **components:** youtube and iframe ([#569](https://github.com/johnsonandjohnson/bodiless-js/issues/569)) ([388166c](https://github.com/johnsonandjohnson/bodiless-js/commit/388166cdbeebedc71bd287c2794867c76f09b794))





## [0.0.56](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.55...v0.0.56) (2020-09-21)


### Features

* **core:** Improved Context Menu API ([#519](https://github.com/johnsonandjohnson/bodiless-js/issues/519)) ([463e8f6](https://github.com/johnsonandjohnson/bodiless-js/commit/463e8f61a8e13af6b6c62428d2b6a63fce197cb7)), closes [#3](https://github.com/johnsonandjohnson/bodiless-js/issues/3) [#487](https://github.com/johnsonandjohnson/bodiless-js/issues/487) [#486](https://github.com/johnsonandjohnson/bodiless-js/issues/486)





## [0.0.55](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.54...v0.0.55) (2020-08-28)

**Note:** Version bump only for package @bodiless/organisms





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
