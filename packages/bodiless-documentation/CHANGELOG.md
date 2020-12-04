# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.62](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.61...v0.0.62) (2020-12-02)


### Features

* **gatsby-theme-bodiless:** webp image presets fallback and ability to override default sharp image processing arguments ([#613](https://github.com/johnsonandjohnson/bodiless-js/issues/613)) ([898237b](https://github.com/johnsonandjohnson/bodiless-js/commit/898237bc141b7501b595efdf2e21b49cfff083af))





## [0.0.61](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.60...v0.0.61) (2020-11-25)


### Bug Fixes

* moved package css compilation and purge to site level ([#707](https://github.com/johnsonandjohnson/bodiless-js/issues/707)) ([cfeb8eb](https://github.com/johnsonandjohnson/bodiless-js/commit/cfeb8eb5b3db6f896a979ce62193642d9aea7300))





## [0.0.60](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.60) (2020-11-18)


### Features

* Purge CSS Enhancements ([#632](https://github.com/johnsonandjohnson/bodiless-js/issues/632)) ([9f9c6de](https://github.com/johnsonandjohnson/bodiless-js/commit/9f9c6dee725389887066702295ee447990d69b67))
* **search:** component library search component ([#592](https://github.com/johnsonandjohnson/bodiless-js/issues/592)) ([faa2219](https://github.com/johnsonandjohnson/bodiless-js/commit/faa2219a5dc5b66cbb3fd2a8eba6d24a04d3d38f))





## [0.0.59](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.59) (2020-11-05)


### Features

* **search:** component library search component ([#592](https://github.com/johnsonandjohnson/bodiless-js/issues/592)) ([faa2219](https://github.com/johnsonandjohnson/bodiless-js/commit/faa2219a5dc5b66cbb3fd2a8eba6d24a04d3d38f))





## [0.0.58](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.57...v0.0.58) (2020-10-23)


### Features

* **components,organisms:** Mega-menu support ([#572](https://github.com/johnsonandjohnson/bodiless-js/issues/572)) ([9f43d0e](https://github.com/johnsonandjohnson/bodiless-js/commit/9f43d0e38abd7b7ac48d8ea1c3c06a97cf48fdef)), closes [#546](https://github.com/johnsonandjohnson/bodiless-js/issues/546)





## [0.0.57](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.56...v0.0.57) (2020-10-15)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.56](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.55...v0.0.56) (2020-09-21)


### Features

* **core:** Improved Context Menu API ([#519](https://github.com/johnsonandjohnson/bodiless-js/issues/519)) ([463e8f6](https://github.com/johnsonandjohnson/bodiless-js/commit/463e8f61a8e13af6b6c62428d2b6a63fce197cb7)), closes [#3](https://github.com/johnsonandjohnson/bodiless-js/issues/3) [#487](https://github.com/johnsonandjohnson/bodiless-js/issues/487) [#486](https://github.com/johnsonandjohnson/bodiless-js/issues/486)





## [0.0.55](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.54...v0.0.55) (2020-08-28)


### Bug Fixes

* **starter-kit:** Starter kit cleanup ([#482](https://github.com/johnsonandjohnson/bodiless-js/issues/482)) ([6bf6b1f](https://github.com/johnsonandjohnson/bodiless-js/commit/6bf6b1f46d42a0d585c1eefbc346a5abf4ca3e32))





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

* **components:** Fix invalid prop warning when toggling to a fragment in preview mode. ([#495](https://github.com/johnsonandjohnson/bodiless-js/issues/495)) ([ad06710](https://github.com/johnsonandjohnson/bodiless-js/commit/ad067100a1b892319a94066bcfe5b6e20c60fb2b))





## [0.0.52](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.51...v0.0.52) (2020-07-29)


### Bug Fixes

* **test-site:** Change gallery-final header to landscape image ([#452](https://github.com/johnsonandjohnson/bodiless-js/issues/452)) ([d1457d1](https://github.com/johnsonandjohnson/bodiless-js/commit/d1457d15f173cccf3eebd61347c3c2dcf15ac156))


### Features

* **documentation:** API Doc for Site builder ([#474](https://github.com/johnsonandjohnson/bodiless-js/issues/474)) ([14e7594](https://github.com/johnsonandjohnson/bodiless-js/commit/14e75948f2856908f24781b64469df6c8810e7c6))
* **documentation:** Document API documentation standards for JSDoc ([#414](https://github.com/johnsonandjohnson/bodiless-js/issues/414)) ([95af4e2](https://github.com/johnsonandjohnson/bodiless-js/commit/95af4e2f7401e8867466414bd1277c5c9ab67903))





## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)


### Features

* **documentation:** allow to override doc site resources locally ([#369](https://github.com/johnsonandjohnson/bodiless-js/issues/369)) ([1884179](https://github.com/johnsonandjohnson/bodiless-js/commit/18841798e5d22d69c12230ec41c91e0150dbda72))





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Features

* **components, components-ui:** Add Image Component ([#316](https://github.com/johnsonandjohnson/bodiless-js/issues/316)) ([a3fba5d](https://github.com/johnsonandjohnson/bodiless-js/commit/a3fba5dc9ad7f53f1c95168dc9aa7d3f5c4754ad))
* **core:** Sidecar Node API ([#320](https://github.com/johnsonandjohnson/bodiless-js/issues/320)) ([1c61274](https://github.com/johnsonandjohnson/bodiless-js/commit/1c61274ea1e45e81210bfd5f05f06c6244977abb)), closes [#285](https://github.com/johnsonandjohnson/bodiless-js/issues/285) [#321](https://github.com/johnsonandjohnson/bodiless-js/issues/321)


### BREAKING CHANGES

* **components, components-ui:** * Styles of @bodiless/components image picker changed. Functionality of image picker is not impacted, just visual appearance changed. If a site uses Image or asBodilessImage from @bodiless/components, then the site is impacted. The recommended migration path is to change Image and asBodilessImage import from "@bodiless/components" into "@bodiless/components-ui". Example of the migration can be found in test site.





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)


### Features

* **core:** component default content ([#219](https://github.com/johnsonandjohnson/bodiless-js/issues/219)) ([379e655](https://github.com/johnsonandjohnson/bodiless-js/commit/379e6559de3471214e45132ed493deed63ecfb38))
* **layout:** Rename Flexbox to FlowContainer ([#118](https://github.com/johnsonandjohnson/bodiless-js/issues/118)) ([aa295bb](https://github.com/johnsonandjohnson/bodiless-js/commit/aa295bb77ed512a1040ed047d784a787dcd2b71a))
* **release, publish:** Automate package publication on GitHub - Update release document. ([#269](https://github.com/johnsonandjohnson/bodiless-js/issues/269)) ([f16b5c7](https://github.com/johnsonandjohnson/bodiless-js/commit/f16b5c72aa49926add2f51bbac2d6c88912017d7))





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)


### Bug Fixes

* **docs:** Docs Homepage is lost on gh-pages ([#249](https://github.com/johnsonandjohnson/bodiless-js/issues/249)) ([051eea7](https://github.com/johnsonandjohnson/bodiless-js/commit/051eea72592cc80a8f8a859f1fc6e24674c08b93))





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/documentation






## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)

**Note:** Version bump only for package @bodiless/documentation





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **documentation:** Support better control over IA ([#129](https://github.com/johnsonandjohnson/bodiless-js/issues/129)) ([05c94fd](https://github.com/johnsonandjohnson/bodiless-js/commit/05c94fdd3ccd860a29d6a81bb5abc3708d7a8157))





## 0.0.38 (2020-01-29)


### Bug Fixes

* **test-site, documentation:** Fixed a image location in documentation and make small change in test-site from demo prep ([#56](https://github.com/johnsonandjohnson/bodiless-js/issues/56)) ([4de737d](https://github.com/johnsonandjohnson/bodiless-js/commit/4de737d2f815669d93d75f90623b262233254065))


### Features

* Host docs on GitHub Pages ([#6](https://github.com/johnsonandjohnson/bodiless-js/issues/6)) ([a26c386](https://github.com/johnsonandjohnson/bodiless-js/commit/a26c38637260bff013470c169c90d832c1b203fe)), closes [#5](https://github.com/johnsonandjohnson/bodiless-js/issues/5)
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* Host docs on GitHub Pages ([#6](https://github.com/johnsonandjohnson/bodiless-js/issues/6)) ([14461ad](https://github.com/johnsonandjohnson/bodiless-js/commit/14461ad69b04653a03ecfaeb7c9cf7e52019c7f1)), closes [#5](https://github.com/johnsonandjohnson/bodiless-js/issues/5)
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
