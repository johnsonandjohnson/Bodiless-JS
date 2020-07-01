# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)


### Bug Fixes

* **test-site:** Component Picker titles/descriptions ([#385](https://github.com/johnsonandjohnson/bodiless-js/issues/385)) ([a74db4f](https://github.com/johnsonandjohnson/bodiless-js/commit/a74db4fffe42c43e7016b8debaa81894b6378fd3))
* **test-site:** Test site needs Footer rendered with new design api [#288](https://github.com/johnsonandjohnson/bodiless-js/issues/288) ([#378](https://github.com/johnsonandjohnson/bodiless-js/issues/378)) ([e902f48](https://github.com/johnsonandjohnson/bodiless-js/commit/e902f48aeff4fd734064743c38bd41f5ff1c1a27))


### Features

* **core, ui:** Notify of Upstream Changes in Edit Environment ([#368](https://github.com/johnsonandjohnson/bodiless-js/issues/368)) ([769d1dc](https://github.com/johnsonandjohnson/bodiless-js/commit/769d1dc1fecbbe2ca892685ff9094b7f0066f4b4))





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)


### Features

* **documentation:** allow to override doc site resources locally ([#369](https://github.com/johnsonandjohnson/bodiless-js/issues/369)) ([1884179](https://github.com/johnsonandjohnson/bodiless-js/commit/18841798e5d22d69c12230ec41c91e0150dbda72))





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)


### Bug Fixes

* **Example Test Site:** Submenu items lost their background style. ([#356](https://github.com/johnsonandjohnson/bodiless-js/issues/356)) ([0e2d719](https://github.com/johnsonandjohnson/bodiless-js/commit/0e2d719bd67b9a9171997fdfdefefa9ee9094ffb))
* **test-site:** Fix missing registerSuggestions on filter-item page ([#340](https://github.com/johnsonandjohnson/bodiless-js/issues/340)) ([211da0c](https://github.com/johnsonandjohnson/bodiless-js/commit/211da0c0bbb50222091ea0c6e5e5c5e0e26a59a7))


### Features

* **core, ui:**  Notifications/Alerts. ([#346](https://github.com/johnsonandjohnson/bodiless-js/issues/346)) ([136abd3](https://github.com/johnsonandjohnson/bodiless-js/commit/136abd355ed7a99deb6e21718a3d6aaf5041c898)), closes [#300](https://github.com/johnsonandjohnson/bodiless-js/issues/300)





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Bug Fixes

* **test-site:** Highlighting Link in Tout replaced it with actual href link ([28ad049](https://github.com/johnsonandjohnson/bodiless-js/commit/28ad049e872fdacdf238051c8959e2c8b544a48c))


### Features

* **cli:** Create CLI to install local packages ([#188](https://github.com/johnsonandjohnson/bodiless-js/issues/188)) ([4d78c7a](https://github.com/johnsonandjohnson/bodiless-js/commit/4d78c7a86aab1bc1286d14f4da50dcfb923ddde9)), closes [#187](https://github.com/johnsonandjohnson/bodiless-js/issues/187)
* **Compoenet:** "Filterable Metadata" Component ([#276](https://github.com/johnsonandjohnson/bodiless-js/issues/276)) ([159ccb0](https://github.com/johnsonandjohnson/bodiless-js/commit/159ccb0351fe6cce932099e08bc6107f458e3707))
* **components:** Youtube video component ([#328](https://github.com/johnsonandjohnson/bodiless-js/issues/328)) ([344d44e](https://github.com/johnsonandjohnson/bodiless-js/commit/344d44ef08b433427be5566330048a7a5ffe3fe5))
* **components, components-ui:** Add Image Component ([#316](https://github.com/johnsonandjohnson/bodiless-js/issues/316)) ([a3fba5d](https://github.com/johnsonandjohnson/bodiless-js/commit/a3fba5dc9ad7f53f1c95168dc9aa7d3f5c4754ad))
* **components, organisms:** PLP Utilizes Filtering System ([#291](https://github.com/johnsonandjohnson/bodiless-js/issues/291)) ([9ba3fe8](https://github.com/johnsonandjohnson/bodiless-js/commit/9ba3fe88e8d0c3f861b9d8b0b69ee0217759cda4))
* **core:** Sidecar Node API ([#320](https://github.com/johnsonandjohnson/bodiless-js/issues/320)) ([1c61274](https://github.com/johnsonandjohnson/bodiless-js/commit/1c61274ea1e45e81210bfd5f05f06c6244977abb)), closes [#285](https://github.com/johnsonandjohnson/bodiless-js/issues/285) [#321](https://github.com/johnsonandjohnson/bodiless-js/issues/321)
* **organisms:** "Filter by Tag" Component. ([#241](https://github.com/johnsonandjohnson/bodiless-js/issues/241)) ([e043bd8](https://github.com/johnsonandjohnson/bodiless-js/commit/e043bd8b508e1be2fcbd0676116b34550aa39dd6))


### BREAKING CHANGES

* **components, components-ui:** * Styles of @bodiless/components image picker changed. Functionality of image picker is not impacted, just visual appearance changed. If a site uses Image or asBodilessImage from @bodiless/components, then the site is impacted. The recommended migration path is to change Image and asBodilessImage import from "@bodiless/components" into "@bodiless/components-ui". Example of the migration can be found in test site.





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)


### Features

* **core:** component default content ([#219](https://github.com/johnsonandjohnson/bodiless-js/issues/219)) ([379e655](https://github.com/johnsonandjohnson/bodiless-js/commit/379e6559de3471214e45132ed493deed63ecfb38))
* **layout:** Rename Flexbox to FlowContainer ([#118](https://github.com/johnsonandjohnson/bodiless-js/issues/118)) ([aa295bb](https://github.com/johnsonandjohnson/bodiless-js/commit/aa295bb77ed512a1040ed047d784a787dcd2b71a))





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/test-site





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)


### Features

* **example/test-site:** Updated the test site to have the correct pa… ([#236](https://github.com/johnsonandjohnson/bodiless-js/issues/236)) ([6729765](https://github.com/johnsonandjohnson/bodiless-js/commit/6729765d3a543b11e2bc9cc4be537d3f7aa0dfc5))





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Features

* **components:**  Add google tag manager &  datalayer. ([#207](https://github.com/johnsonandjohnson/bodiless-js/issues/207)) ([9ee52e3](https://github.com/johnsonandjohnson/bodiless-js/commit/9ee52e39741004d263a5c06055520b197947f942))
* **gatsby-theme-bodiless, starter, test-site:** purge unused css ([#195](https://github.com/johnsonandjohnson/bodiless-js/issues/195)) ([1b54d82](https://github.com/johnsonandjohnson/bodiless-js/commit/1b54d82e53d0d72291a2ed3273e5b853c182e299))
* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **layouts:** Define Design for the Flexbox ([#209](https://github.com/johnsonandjohnson/bodiless-js/issues/209)) ([cd9f6ca](https://github.com/johnsonandjohnson/bodiless-js/commit/cd9f6ca68d4f4f34d5526eec9dccbcee21b54e00))
* **organisms:** Element selector enhancement for Single Accordion ([#206](https://github.com/johnsonandjohnson/bodiless-js/issues/206)) ([6325670](https://github.com/johnsonandjohnson/bodiless-js/commit/6325670012d020d0807ee2304c156cb45dfab279))


### BREAKING CHANGES

* **gatsby-theme-bodiless, starter, test-site:** bodiless/components does not export Link component anymore. One, who consumes Link component, should replace Link with a site level link component.
* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/test-site



## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/test-site





## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Features

* **layouts:** Allow specifying default width for flexbox item. ([#164](https://github.com/johnsonandjohnson/bodiless-js/issues/164)) ([9a4bc2f](https://github.com/johnsonandjohnson/bodiless-js/commit/9a4bc2f3b842fe212d57c24efec55f7fd0fe3b43)), closes [#162](https://github.com/johnsonandjohnson/bodiless-js/issues/162)





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **gatsby-theme-bodiless:** Fix revert does not refresh page ([#110](https://github.com/johnsonandjohnson/bodiless-js/issues/110)) ([629b3ef](https://github.com/johnsonandjohnson/bodiless-js/commit/629b3efebc28882932d3e136f385abaccd15b28d))
* **gatsby-theme-bodiless:** Typed chars disappear sporadically ([#52](https://github.com/johnsonandjohnson/bodiless-js/issues/52)) ([4829496](https://github.com/johnsonandjohnson/bodiless-js/commit/48294967948c75707b668f90c76c0ad5d18e6a4d)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **psh:** platform.sh files get created with lerna ([#108](https://github.com/johnsonandjohnson/bodiless-js/issues/108)) ([7192372](https://github.com/johnsonandjohnson/bodiless-js/commit/71923720b19a445a7ced190dc6c352f5ad324f0e))


### Features

* **core:** Alter the Main Menu in Preview Mode ([#132](https://github.com/johnsonandjohnson/bodiless-js/issues/132)) ([abebb43](https://github.com/johnsonandjohnson/bodiless-js/commit/abebb43c48668d8f147cb43c7c4f042b06abd48e))
* **documentation:** Support better control over IA ([#129](https://github.com/johnsonandjohnson/bodiless-js/issues/129)) ([05c94fd](https://github.com/johnsonandjohnson/bodiless-js/commit/05c94fdd3ccd860a29d6a81bb5abc3708d7a8157))
* **fclasses:** Change startWith so that it does not replace the whole item but instead just the starting Component ([#57](https://github.com/johnsonandjohnson/bodiless-js/issues/57)) ([71f0b60](https://github.com/johnsonandjohnson/bodiless-js/commit/71f0b60797f45055c58aea8bf8bbc72db2795e5a))
* **psh:** Improve psh-init with better logic for custom overrides. ([#135](https://github.com/johnsonandjohnson/bodiless-js/issues/135)) ([79bbfc5](https://github.com/johnsonandjohnson/bodiless-js/commit/79bbfc559e5ae22297191ca42bb6a2b71345a8b9))


### BREAKING CHANGES

* **fclasses:** startWith functionality will not replace any other HOC that has been previously applied





## 0.0.39 (2020-01-30)


### Bug Fixes

* **p.sh:** Fix env vars are not generated for p.sh. ([#89](https://github.com/johnsonandjohnson/bodiless-js/issues/89)) ([c3d9ed3](https://github.com/johnsonandjohnson/bodiless-js/commit/c3d9ed3f94fe8ba707a4c6e0811e745ded4d3676))





## 0.0.38 (2020-01-29)


### Bug Fixes

* **test-site, documentation:** Fixed a image location in documentation and make small change in test-site from demo prep ([#56](https://github.com/johnsonandjohnson/bodiless-js/issues/56)) ([4de737d](https://github.com/johnsonandjohnson/bodiless-js/commit/4de737d2f815669d93d75f90623b262233254065))


### Features

* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)
* **test-site:** Add Type to all of the items in the flexbox ([#46](https://github.com/johnsonandjohnson/bodiless-js/issues/46)) ([d40bcce](https://github.com/johnsonandjohnson/bodiless-js/commit/d40bcce63edbd9830f138ebbb0824e41a21f3f42)), closes [#45](https://github.com/johnsonandjohnson/bodiless-js/issues/45)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **layouts, test-site:** Add product listing template, fix a few flexbox bugs ([#13](https://github.com/johnsonandjohnson/bodiless-js/issues/13)) ([1f7307e](https://github.com/johnsonandjohnson/bodiless-js/commit/1f7307ea139ed4587916900434b36a5f0b4d9778))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
