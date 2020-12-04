# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.62](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.61...v0.0.62) (2020-12-02)


### Features

* **components, organisms:** Menu Trails ([#697](https://github.com/johnsonandjohnson/bodiless-js/issues/697)) ([b0b16b4](https://github.com/johnsonandjohnson/bodiless-js/commit/b0b16b445bdb6c38ab06c622313cb694e2d2e0bd))





## [0.0.61](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.60...v0.0.61) (2020-11-25)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.60](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.60) (2020-11-18)


### Features

* **components, core, organisms:** Burger Menu with Breadcrumbs ([#637](https://github.com/johnsonandjohnson/bodiless-js/issues/637)) ([23af96d](https://github.com/johnsonandjohnson/bodiless-js/commit/23af96d68bc49a64ea71131071cd4392311a3593))
* **fclasses:** Design Keys ([#685](https://github.com/johnsonandjohnson/bodiless-js/issues/685)) ([0db060a](https://github.com/johnsonandjohnson/bodiless-js/commit/0db060ad1e7496553cd8eae3654770530d543010)), closes [#660](https://github.com/johnsonandjohnson/bodiless-js/issues/660)





## [0.0.59](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.58...v0.0.59) (2020-11-05)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.58](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.57...v0.0.58) (2020-10-23)


### Features

* **components,organisms:** Mega-menu support ([#572](https://github.com/johnsonandjohnson/bodiless-js/issues/572)) ([9f43d0e](https://github.com/johnsonandjohnson/bodiless-js/commit/9f43d0e38abd7b7ac48d8ea1c3c06a97cf48fdef)), closes [#546](https://github.com/johnsonandjohnson/bodiless-js/issues/546)





## [0.0.57](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.56...v0.0.57) (2020-10-15)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.56](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.55...v0.0.56) (2020-09-21)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.55](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.54...v0.0.55) (2020-08-28)

**Note:** Version bump only for package @bodiless/fclasses





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

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.52](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.51...v0.0.52) (2020-07-29)


### Features

* **documentation:** API Doc for Site builder ([#474](https://github.com/johnsonandjohnson/bodiless-js/issues/474)) ([14e7594](https://github.com/johnsonandjohnson/bodiless-js/commit/14e75948f2856908f24781b64469df6c8810e7c6))





## [0.0.51](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.50...v0.0.51) (2020-07-01)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.50](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.49...v0.0.50) (2020-06-12)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.49](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.48...v0.0.49) (2020-06-08)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.47](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.46...v0.0.47) (2020-04-22)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.46](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.45...v0.0.46) (2020-04-08)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.45](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.44...v0.0.45) (2020-04-08)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.44](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.43...v0.0.44) (2020-03-26)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.43](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.42...v0.0.43) (2020-03-11)

**Note:** Version bump only for package @bodiless/fclasses





## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.42) (2020-02-28)


**Note:** Version bump only for package @bodiless/fclasses



## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


**Note:** Version bump only for package @bodiless/fclasses





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Features

* **fclasses:** Change startWith so that it does not replace the whole item but instead just the starting Component ([#57](https://github.com/johnsonandjohnson/bodiless-js/issues/57)) ([71f0b60](https://github.com/johnsonandjohnson/bodiless-js/commit/71f0b60797f45055c58aea8bf8bbc72db2795e5a))


### BREAKING CHANGES

* **fclasses:** startWith functionality will not replace any other HOC that has been previously applied





## 0.0.38 (2020-01-29)


### Features

* **@bodiless/fclasses:** Initial Commit. ([fa9ac2a](https://github.com/johnsonandjohnson/bodiless-js/commit/fa9ac2a55d0517340ca7b5c6837255d0bc704c3c))
* **organisms:** Burger Menu ([#20](https://github.com/johnsonandjohnson/bodiless-js/issues/20)) ([05f5833](https://github.com/johnsonandjohnson/bodiless-js/commit/05f58331a05e7625ad01d5a261ad76b05427ae23))
* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Bug Fixes

* **fclasses:** Design transformer does not update passthroughProps when its props are changed ([#10](https://github.com/johnsonandjohnson/bodiless-js/issues/10)) ([c2040f7](https://github.com/johnsonandjohnson/bodiless-js/commit/c2040f7c181916b912364f64d6c93f8663eab898))


### Features

* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
