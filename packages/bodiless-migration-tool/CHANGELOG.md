# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.42](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.41...v0.0.42) (2020-02-28)

**Note:** Version bump only for package @bodiless/migration-tool







## [0.0.41](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.40...v0.0.41) (2020-02-28)


### Bug Fixes

* **migration_tool:** Migration tool fix default value for disableTailwind ([#163](https://github.com/johnsonandjohnson/bodiless-js/issues/163)) ([65a2d3f](https://github.com/johnsonandjohnson/bodiless-js/commit/65a2d3fcc874a521e8cf45c6c1476637db5c1c55))
* npm run new & npm run sites:update starter fail with errors ([#153](https://github.com/johnsonandjohnson/bodiless-js/issues/153)) ([a998f5f](https://github.com/johnsonandjohnson/bodiless-js/commit/a998f5f220f26cfd653577dcdd1163832990352c))


### Features

* **migration_tool:** Migration tool enhancement to auto turn off Bodiless-Tailwind Theme ([#155](https://github.com/johnsonandjohnson/bodiless-js/issues/155)) ([4c5203d](https://github.com/johnsonandjohnson/bodiless-js/commit/4c5203d0519c4123cf52cfbeb39987daeaf12d8a))





## [0.0.40](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.39...v0.0.40) (2020-02-21)


### Bug Fixes

* **bodiless-migration-tool:** "UnhandledPromiseRejectionWarning: Error: Page crashed!" thrown by migration tool ([#82](https://github.com/johnsonandjohnson/bodiless-js/issues/82)) ([f966636](https://github.com/johnsonandjohnson/bodiless-js/commit/f966636563e8009ca5f694c71842da3228b865f5))
* **migration_tool:** 'npm run setup' fails on Windows ([#139](https://github.com/johnsonandjohnson/bodiless-js/issues/139)) ([ac8a580](https://github.com/johnsonandjohnson/bodiless-js/commit/ac8a580887e120ce50c13d545b9ba6b9e89a714a))
* **migration_tool:** do not create a page when an internal url is redirected to an external ([#95](https://github.com/johnsonandjohnson/bodiless-js/issues/95)) ([df5077a](https://github.com/johnsonandjohnson/bodiless-js/commit/df5077abbe2403239a1e7cc5bd9ac56fb9b3d4b6))
* **migration_tool:** issues in FAQ pages ([#126](https://github.com/johnsonandjohnson/bodiless-js/issues/126)) ([2d4a6cb](https://github.com/johnsonandjohnson/bodiless-js/commit/2d4a6cbc219682e4162c5ab77eb128dfd2048c1c))
* **migration_tool:** SyntaxError: Unexpected token ([#84](https://github.com/johnsonandjohnson/bodiless-js/issues/84)) ([208d9f7](https://github.com/johnsonandjohnson/bodiless-js/commit/208d9f7a309ac9fc9fe6d6ecab4ae4a0dc2b685d))





## 0.0.38 (2020-01-29)


### Bug Fixes

* **migration_tool:** removed the logic that determines if the tool is triggered in monorepo ([#62](https://github.com/johnsonandjohnson/bodiless-js/issues/62)) ([4084d3c](https://github.com/johnsonandjohnson/bodiless-js/commit/4084d3cfe71ae754d1475104ea9fc12b8ca04e9a))


### Features

* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([a700a1a](https://github.com/johnsonandjohnson/bodiless-js/commit/a700a1ab3b473c509d5b6a10801c02caa1bc0ab3))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([f5d8d2a](https://github.com/johnsonandjohnson/bodiless-js/commit/f5d8d2af25096d5785203cb600af378a5160b33d)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)





## [0.0.37](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.36...v0.0.37) (2020-01-17)


### Features

* **richtext:** Refactor the RichText API ([#18](https://github.com/johnsonandjohnson/bodiless-js/issues/18)) ([d4616c7](https://github.com/johnsonandjohnson/bodiless-js/commit/d4616c74e868cf0f5c4b6f879db10741a1433785))
* **starter:** Add gatsby-starter-bodiless to monorepo ([#12](https://github.com/johnsonandjohnson/bodiless-js/issues/12)) ([242a8a4](https://github.com/johnsonandjohnson/bodiless-js/commit/242a8a420fc57bdfd3a6e0c6e99bedf672143a53)), closes [#7](https://github.com/johnsonandjohnson/bodiless-js/issues/7)


### BREAKING CHANGES

* **richtext:** The API for injecting components was refactored to use the Design API.

Co-authored-by: Andrei Beliayeu <53858490+beliayeu@users.noreply.github.com>
