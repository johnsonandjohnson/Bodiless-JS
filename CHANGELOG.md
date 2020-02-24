# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **bodiless-migration-tool:** "UnhandledPromiseRejectionWarning: Error: Page crashed!" thrown by migration tool ([#82](https://github.com/johnsonandjohnson/bodiless-js/issues/82)) ([f966636](https://github.com/johnsonandjohnson/bodiless-js/commit/f966636563e8009ca5f694c71842da3228b865f5))
* **bodiless-richtext:** improved richtext input lag on a page with multiple richtext elements ([#104](https://github.com/johnsonandjohnson/bodiless-js/issues/104)) ([e243b2d](https://github.com/johnsonandjohnson/bodiless-js/commit/e243b2d5f348dd94c603017ee72f06fee8283cb1))
* **gatsby-theme-bodiless:** Deleting json file for any component does not reset content ([#145](https://github.com/johnsonandjohnson/bodiless-js/issues/145)) ([b76eb6e](https://github.com/johnsonandjohnson/bodiless-js/commit/b76eb6ec61c55f0a8864e6dcbd61e2689b6c5ff1))
* **gatsby-theme-bodiless:** Fix revert does not refresh page ([#110](https://github.com/johnsonandjohnson/bodiless-js/issues/110)) ([629b3ef](https://github.com/johnsonandjohnson/bodiless-js/commit/629b3efebc28882932d3e136f385abaccd15b28d))
* **gatsby-theme-bodiless:** Typed chars disappear sporadically ([#52](https://github.com/johnsonandjohnson/bodiless-js/issues/52)) ([4829496](https://github.com/johnsonandjohnson/bodiless-js/commit/48294967948c75707b668f90c76c0ad5d18e6a4d)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14) [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **migration_tool:** 'npm run setup' fails on Windows ([#139](https://github.com/johnsonandjohnson/bodiless-js/issues/139)) ([ac8a580](https://github.com/johnsonandjohnson/bodiless-js/commit/ac8a580887e120ce50c13d545b9ba6b9e89a714a))
* **migration_tool:** do not create a page when an internal url is redirected to an external ([#95](https://github.com/johnsonandjohnson/bodiless-js/issues/95)) ([df5077a](https://github.com/johnsonandjohnson/bodiless-js/commit/df5077abbe2403239a1e7cc5bd9ac56fb9b3d4b6))
* **migration_tool:** issues in FAQ pages ([#126](https://github.com/johnsonandjohnson/bodiless-js/issues/126)) ([2d4a6cb](https://github.com/johnsonandjohnson/bodiless-js/commit/2d4a6cbc219682e4162c5ab77eb128dfd2048c1c))
* **migration_tool:** SyntaxError: Unexpected token ([#84](https://github.com/johnsonandjohnson/bodiless-js/issues/84)) ([208d9f7](https://github.com/johnsonandjohnson/bodiless-js/commit/208d9f7a309ac9fc9fe6d6ecab4ae4a0dc2b685d))
* **psh:** platform.sh files get created with lerna ([#108](https://github.com/johnsonandjohnson/bodiless-js/issues/108)) ([7192372](https://github.com/johnsonandjohnson/bodiless-js/commit/71923720b19a445a7ced190dc6c352f5ad324f0e))
* **psh:** Private npm registry for static site. ([#148](https://github.com/johnsonandjohnson/bodiless-js/issues/148)) ([d3599f7](https://github.com/johnsonandjohnson/bodiless-js/commit/d3599f76c3b015f28b553d1c758ab50abd206ec6))


### Features

* **core:** Alter the Main Menu in Preview Mode ([#132](https://github.com/johnsonandjohnson/bodiless-js/issues/132)) ([abebb43](https://github.com/johnsonandjohnson/bodiless-js/commit/abebb43c48668d8f147cb43c7c4f042b06abd48e))
* **core:** Preview Mode Session ([#117](https://github.com/johnsonandjohnson/bodiless-js/issues/117)) ([4246986](https://github.com/johnsonandjohnson/bodiless-js/commit/4246986e449101a9c63a8043f9a1e2d1b73d0986))
* **documentation:** Support better control over IA ([#129](https://github.com/johnsonandjohnson/bodiless-js/issues/129)) ([05c94fd](https://github.com/johnsonandjohnson/bodiless-js/commit/05c94fdd3ccd860a29d6a81bb5abc3708d7a8157))
* **fclasses:** Change startWith so that it does not replace the whole item but instead just the starting Component ([#57](https://github.com/johnsonandjohnson/bodiless-js/issues/57)) ([71f0b60](https://github.com/johnsonandjohnson/bodiless-js/commit/71f0b60797f45055c58aea8bf8bbc72db2795e5a))
* **layout:** Create a location Switcher for the Edit Admin UI Menu ([#149](https://github.com/johnsonandjohnson/bodiless-js/issues/149)) ([943e960](https://github.com/johnsonandjohnson/bodiless-js/commit/943e960016718b022bcb95471977ea43b6d9afac))
* **layout:** Easily identify a flexbox area on page so that can start… ([#99](https://github.com/johnsonandjohnson/bodiless-js/issues/99)) ([8148e1c](https://github.com/johnsonandjohnson/bodiless-js/commit/8148e1c6201d3ec64fcaf089076c4a37d3fa5923))
* **layouts:** Component Switcher ([#105](https://github.com/johnsonandjohnson/bodiless-js/issues/105)) ([1e1ce8e](https://github.com/johnsonandjohnson/bodiless-js/commit/1e1ce8e7e79dbb66d7ffdad599de117902702b1d)), closes [#69](https://github.com/johnsonandjohnson/bodiless-js/issues/69)
* **psh:** Improve psh-init with better logic for custom overrides. ([#135](https://github.com/johnsonandjohnson/bodiless-js/issues/135)) ([79bbfc5](https://github.com/johnsonandjohnson/bodiless-js/commit/79bbfc559e5ae22297191ca42bb6a2b71345a8b9))


### BREAKING CHANGES

* **fclasses:** startWith functionality will not replace any other HOC that has been previously applied





## 0.0.39 (2020-01-30)


### Bug Fixes


* **p.sh:** Fix env vars are not generated for p.sh. ([#89](https://github.com/johnsonandjohnson/bodiless-js/issues/89)) ([c3d9ed3](https://github.com/johnsonandjohnson/bodiless-js/commit/c3d9ed3f94fe8ba707a4c6e0811e745ded4d3676))




## 0.0.38 (2020-01-29)


### Bug Fixes

* New page form freezes the screen after upgrading informed ([#75](https://github.com/johnsonandjohnson/bodiless-js/issues/75)) ([739a2a2](https://github.com/johnsonandjohnson/bodiless-js/commit/739a2a2c2fed278d8045e25807773e3b19430dac))
* **components:** Remove image button from left menu. ([#87](https://github.com/johnsonandjohnson/bodiless-js/issues/87)) ([ec86536](https://github.com/johnsonandjohnson/bodiless-js/commit/ec86536a6175900bc0ddc8a8d4c9acac0669b806))
* **migration_tool:** removed the logic that determines if the tool is triggered in monorepo ([#62](https://github.com/johnsonandjohnson/bodiless-js/issues/62)) ([4084d3c](https://github.com/johnsonandjohnson/bodiless-js/commit/4084d3cfe71ae754d1475104ea9fc12b8ca04e9a))
* **psh:** Remove docs app from platform.sh ([#78](https://github.com/johnsonandjohnson/bodiless-js/issues/78)) ([8b19fce](https://github.com/johnsonandjohnson/bodiless-js/commit/8b19fce9df66fad21bf98488b0a71486cc84670b)), closes [#1234](https://github.com/johnsonandjohnson/bodiless-js/issues/1234) [#4567](https://github.com/johnsonandjohnson/bodiless-js/issues/4567) [#71](https://github.com/johnsonandjohnson/bodiless-js/issues/71)
* **test-site, documentation:** Fixed a image location in documentation and make small change in test-site from demo prep ([#56](https://github.com/johnsonandjohnson/bodiless-js/issues/56)) ([4de737d](https://github.com/johnsonandjohnson/bodiless-js/commit/4de737d2f815669d93d75f90623b262233254065))


### Features

* **@bodiless/core:** Initial Commit. ([097812f](https://github.com/johnsonandjohnson/bodiless-js/commit/097812f0db2f501306fa25aa9b1612528c5cd6aa))
* **@bodiless/fclasses:** Initial Commit. ([fa9ac2a](https://github.com/johnsonandjohnson/bodiless-js/commit/fa9ac2a55d0517340ca7b5c6837255d0bc704c3c))
* **@bodiless/gatsby-theme-bodiless:** Initial Commit. ([33ab746](https://github.com/johnsonandjohnson/bodiless-js/commit/33ab746af5044c963d2a1d8a2da5e799db006626))
* **@bodiless/psh:** Initial commit. ([c475668](https://github.com/johnsonandjohnson/bodiless-js/commit/c4756681b7fd49bdfa3aab6929401feac3a70fbf))
* Host docs on GitHub Pages ([#6](https://github.com/johnsonandjohnson/bodiless-js/issues/6)) ([a26c386](https://github.com/johnsonandjohnson/bodiless-js/commit/a26c38637260bff013470c169c90d832c1b203fe)), closes [#5](https://github.com/johnsonandjohnson/bodiless-js/issues/5)
* **bodiless-js:** Initial Commit. ([d3cc4a2](https://github.com/johnsonandjohnson/bodiless-js/commit/d3cc4a29c985165bf864233cc4569fd48c6999fd))
* **core-ui, layouts, layouts-ui, ui:** Update Flexbox Fly-Out Panel UI ([#55](https://github.com/johnsonandjohnson/bodiless-js/issues/55)) ([ef21da6](https://github.com/johnsonandjohnson/bodiless-js/commit/ef21da62ccc29e7b07bf767a420dae5997f86346))
* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)
* **test-site:** Add Type to all of the items in the flexbox ([#46](https://github.com/johnsonandjohnson/bodiless-js/issues/46)) ([d40bcce](https://github.com/johnsonandjohnson/bodiless-js/commit/d40bcce63edbd9830f138ebbb0824e41a21f3f42)), closes [#45](https://github.com/johnsonandjohnson/bodiless-js/issues/45)






## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Bug Fixes

* **fclasses:** Design transformer does not update passthroughProps when its props are changed ([#10](https://github.com/johnsonandjohnson/bodiless-js/issues/10)) ([c2040f7](https://github.com/johnsonandjohnson/bodiless-js/commit/c2040f7c181916b912364f64d6c93f8663eab898))
* **richtext:** Format bar persists when leaving edit mode ([#24](https://github.com/johnsonandjohnson/bodiless-js/issues/24)) ([3b09277](https://github.com/johnsonandjohnson/bodiless-js/commit/3b09277bb420fc1b7c6dc82ca19a06b16c82c48e))
* **richtext:** Rich Text Editor menu appears for a moment in the bottom of a page ([#43](https://github.com/johnsonandjohnson/bodiless-js/issues/43)) ([#44](https://github.com/johnsonandjohnson/bodiless-js/issues/44)) ([28fe4c4](https://github.com/johnsonandjohnson/bodiless-js/commit/28fe4c47b75bc47163f66c875bb41e9b6ee64715))


### Features

* **bv:** inline ratings widget ([#9](https://github.com/johnsonandjohnson/bodiless-js/issues/9)) ([1db5ee8](https://github.com/johnsonandjohnson/bodiless-js/commit/1db5ee8fff783a4117b3da574102b5a9f22de94b))
* Host docs on GitHub Pages ([#6](https://github.com/johnsonandjohnson/bodiless-js/issues/6)) ([14461ad](https://github.com/johnsonandjohnson/bodiless-js/commit/14461ad69b04653a03ecfaeb7c9cf7e52019c7f1)), closes [#5](https://github.com/johnsonandjohnson/bodiless-js/issues/5)
* **gatsby-theme-bodiless:** GH-26 Add author to commits if possible. ([#25](https://github.com/johnsonandjohnson/bodiless-js/issues/25)) ([3297c96](https://github.com/johnsonandjohnson/bodiless-js/commit/3297c96c11b14e38106201176396be59cab19a92)), closes [#26](https://github.com/johnsonandjohnson/bodiless-js/issues/26)
* **gatsby-theme-bodiless:** Remove the Pull Changes Button from the Edit UI ([#31](https://github.com/johnsonandjohnson/bodiless-js/issues/31)) ([cb5e370](https://github.com/johnsonandjohnson/bodiless-js/commit/cb5e37010d81c0902bf99140c4da3d33ee977f2e))
* **layouts:** Remove checkmark icon from component picker ([#33](https://github.com/johnsonandjohnson/bodiless-js/issues/33)) ([ab6ce73](https://github.com/johnsonandjohnson/bodiless-js/commit/ab6ce7385d0d0e5122219fa81892263d086dfb7d))
* **layouts, test-site:** Add product listing template, fix a few flexbox bugs ([#13](https://github.com/johnsonandjohnson/bodiless-js/issues/13)) ([1f7307e](https://github.com/johnsonandjohnson/bodiless-js/commit/1f7307ea139ed4587916900434b36a5f0b4d9778))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **ssi:** restored invocation of processing ssi elements ([#19](https://github.com/johnsonandjohnson/bodiless-js/issues/19)) ([2c5ee8f](https://github.com/johnsonandjohnson/bodiless-js/commit/2c5ee8f320bde559df49b197ed34b311e881e241))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.
