# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)


### Bug Fixes

* **docs:** Docs Homepage is lost on gh-pages ([#249](https://github.com/johnsonandjohnson/bodiless-js/issues/249)) ([051eea7](https://github.com/johnsonandjohnson/bodiless-js/commit/051eea72592cc80a8f8a859f1fc6e24674c08b93))
* **migration-tool:** Improve script content transformation ([#239](https://github.com/johnsonandjohnson/bodiless-js/issues/239)) ([05117d2](https://github.com/johnsonandjohnson/bodiless-js/commit/05117d29912cca332daf06ebcb18f9425645cd92))
* **psh:** Provide default psh cache expiry for /__docs ([#261](https://github.com/johnsonandjohnson/bodiless-js/issues/261)) ([f00ead7](https://github.com/johnsonandjohnson/bodiless-js/commit/f00ead7f387c0e51492171ae6b341ce972a0a5bb))


### Features

* **core-ui:** Implement reusable modal overlay and use in create page & … ([#216](https://github.com/johnsonandjohnson/bodiless-js/issues/216)) ([230334e](https://github.com/johnsonandjohnson/bodiless-js/commit/230334eca8a99ecb05be486c28372f9e5835b975))
* **example/test-site:** Updated the test site to have the correct pa… ([#236](https://github.com/johnsonandjohnson/bodiless-js/issues/236)) ([6729765](https://github.com/johnsonandjohnson/bodiless-js/commit/6729765d3a543b11e2bc9cc4be537d3f7aa0dfc5))
* **psh:** Provide default psh cache expiry and allow local override ([#220](https://github.com/johnsonandjohnson/bodiless-js/issues/220)) ([4fb1e81](https://github.com/johnsonandjohnson/bodiless-js/commit/4fb1e8146c9d68f6195f2b96b39cd864f5c35cf0))


### BREAKING CHANGES

* **psh:** - Instead of just copying `*.platform.app.yaml` files it will merge existing local versions with a default version from `@bodiless/psh` with local versions taking precedence. Only keys from `/bodiless-psh/resources/.platform/platform.whitelist.yaml` will be merged





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)


### Bug Fixes

* **@bodiless/migration-tool:** scrape video file injected using video html element ([#210](https://github.com/johnsonandjohnson/bodiless-js/issues/210)) ([d8c7d9c](https://github.com/johnsonandjohnson/bodiless-js/commit/d8c7d9c7a1337eec25d740dda05895aeba7326d2))


### Features

* **components:**  Add google tag manager &  datalayer. ([#207](https://github.com/johnsonandjohnson/bodiless-js/issues/207)) ([9ee52e3](https://github.com/johnsonandjohnson/bodiless-js/commit/9ee52e39741004d263a5c06055520b197947f942))
* **gatsby-theme-bodiless, starter, test-site:** purge unused css ([#195](https://github.com/johnsonandjohnson/bodiless-js/issues/195)) ([1b54d82](https://github.com/johnsonandjohnson/bodiless-js/commit/1b54d82e53d0d72291a2ed3273e5b853c182e299))
* **gatsby-theme, backend, core, richtext, components, organisms:** Deleted Data Should Not be Retained ([#144](https://github.com/johnsonandjohnson/bodiless-js/issues/144)) ([0821c89](https://github.com/johnsonandjohnson/bodiless-js/commit/0821c897b1e6894c418ec78bac58fccdb969caa7)), closes [#14](https://github.com/johnsonandjohnson/bodiless-js/issues/14)
* **layouts:** Define Design for the Flexbox ([#209](https://github.com/johnsonandjohnson/bodiless-js/issues/209)) ([cd9f6ca](https://github.com/johnsonandjohnson/bodiless-js/commit/cd9f6ca68d4f4f34d5526eec9dccbcee21b54e00))
* **migration-tool:** Enhance handling of non-existing source site resources ([#191](https://github.com/johnsonandjohnson/bodiless-js/issues/191)) ([63fea0e](https://github.com/johnsonandjohnson/bodiless-js/commit/63fea0e2384bb7467856ae7f0c2c324e4eb87e7b))
* **organisms:** Element selector enhancement for Single Accordion ([#206](https://github.com/johnsonandjohnson/bodiless-js/issues/206)) ([6325670](https://github.com/johnsonandjohnson/bodiless-js/commit/6325670012d020d0807ee2304c156cb45dfab279))


### BREAKING CHANGES

* **gatsby-theme-bodiless, starter, test-site:** bodiless/components does not export Link component anymore. One, who consumes Link component, should replace Link with a site level link component.
* **gatsby-theme, backend, core, richtext, components, organisms:** 1. Submenu data model changed. The first reason is to make menu/submenu data model similar to list/sublist data models, so that menu/submenu can leverage api provided by list component. The second reason is to solve a submenu bug in which one json file stores data from multiple nodes. Particularly, submenu item stores toggle and a list sublist items. One, who has a submenu on a site, will have to either update existing submenu json files or recreate submenu. Example how to update submenu json files of existing site is demonstrated on the demo site. pr 41.
2. Accordion changes. Node is removed from SingleAccordionClean. The reason is to provide consumers more control over how the node is added to accordion. Particularly, this change was needed for burgermenu, which leverages accordions, so that burgermenu can read submenu data from accurate node. One, who uses SingleAccordionClean to compose custom accordions, should inject node to the custom accordions. Example can be found in test-site/src/components/SingleAccordion/index.tsx. withNode has been added to asSingleAccordion.





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)


### Bug Fixes

* **bodiless-migration-tool:** allow to migrate a site with bareroot domain specified ([#186](https://github.com/johnsonandjohnson/bodiless-js/issues/186)) ([4d24c07](https://github.com/johnsonandjohnson/bodiless-js/commit/4d24c072de158f395b2e5c4bf8ea2e41209d7b24))
* **components, core:** Fix withEditPlaceholder components order ([3c1f99b](https://github.com/johnsonandjohnson/bodiless-js/commit/3c1f99b38bf437d97d4ffc2e062fd91d295184ca))
* **layouts:** Fix/no link in flexbox ([#198](https://github.com/johnsonandjohnson/bodiless-js/issues/198)) ([066f0ed](https://github.com/johnsonandjohnson/bodiless-js/commit/066f0ed6659d1f983f12b32956748df6b02d5c6a))
* **migration-tool:** Header and Footer components are missing ([c4e6a82](https://github.com/johnsonandjohnson/bodiless-js/commit/c4e6a827ba4f0df425fd93ab586ab1a4ea2fdfad))
* **psh:** Platform.sh site return 502 error instead of 404 page on non-existing pages. ([ca72aa6](https://github.com/johnsonandjohnson/bodiless-js/commit/ca72aa6be33b91f9f439d92d326b4ffcb7fa9e6e))


### Features

* **migration-tool:** Provide fallback on migration errors to generate plain html. ([#175](https://github.com/johnsonandjohnson/bodiless-js/issues/175)) ([8d9a003](https://github.com/johnsonandjohnson/bodiless-js/commit/8d9a003ec81c9a1d202b8d82cfddf80a16d04044))






## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)


### Bug Fixes



### Features

* **components:** Add withEditPlaceholder HOC to bodiless-components ([#174](https://github.com/johnsonandjohnson/bodiless-js/issues/174)) ([c1380e3](https://github.com/johnsonandjohnson/bodiless-js/commit/c1380e3b9cdc7aee7e5fe018b179b0627148970c))


### BREAKING CHANGES






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Bug Fixes

* **bodiless-backend:** do not require morgan when it is disabled ([#159](https://github.com/johnsonandjohnson/bodiless-js/issues/159)) ([35a6756](https://github.com/johnsonandjohnson/bodiless-js/commit/35a6756bf3cef23b05790bb3746ee388d8ef4e32))
* **migration_tool:** Migration tool fix default value for disableTailwind ([#163](https://github.com/johnsonandjohnson/bodiless-js/issues/163)) ([65a2d3f](https://github.com/johnsonandjohnson/bodiless-js/commit/65a2d3fcc874a521e8cf45c6c1476637db5c1c55))
* npm run new & npm run sites:update starter fail with errors ([#153](https://github.com/johnsonandjohnson/bodiless-js/issues/153)) ([a998f5f](https://github.com/johnsonandjohnson/bodiless-js/commit/a998f5f220f26cfd653577dcdd1163832990352c))


### Features

* **bodiless-core:** edit ui should start in preview mode ([#170](https://github.com/johnsonandjohnson/bodiless-js/issues/170)) ([22b4f4c](https://github.com/johnsonandjohnson/bodiless-js/commit/22b4f4c74cf0ce9ab2e30cb87bffe428bddd7fb9))
* **layouts:** Allow specifying default width for flexbox item. ([#164](https://github.com/johnsonandjohnson/bodiless-js/issues/164)) ([9a4bc2f](https://github.com/johnsonandjohnson/bodiless-js/commit/9a4bc2f3b842fe212d57c24efec55f7fd0fe3b43)), closes [#162](https://github.com/johnsonandjohnson/bodiless-js/issues/162)
* **migration_tool:** Migration tool enhancement to auto turn off Bodiless-Tailwind Theme ([#155](https://github.com/johnsonandjohnson/bodiless-js/issues/155)) ([4c5203d](https://github.com/johnsonandjohnson/bodiless-js/commit/4c5203d0519c4123cf52cfbeb39987daeaf12d8a))


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
