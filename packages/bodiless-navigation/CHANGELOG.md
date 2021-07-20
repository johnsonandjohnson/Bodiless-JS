# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.2.7](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.6...v0.2.7) (2021-07-20)

**Note:** Version bump only for package @bodiless/navigation





## [0.2.6](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.5...v0.2.6) (2021-07-20)

**Note:** Version bump only for package @bodiless/navigation





## [0.2.5](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.4...v0.2.5) (2021-07-16)

**Note:** Version bump only for package @bodiless/navigation





## [0.2.4](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.3...v0.2.4) (2021-07-02)


### Bug Fixes

* **Navigation:** Fix asTopNav adding every submenu option to Chameleon ([#1013](https://github.com/johnsonandjohnson/bodiless-js/issues/1013)) ([e8581c8](https://github.com/johnsonandjohnson/bodiless-js/commit/e8581c8a10ed3ace7d418503af10c0750ff56be0))


### Features

* **navigation:** Menu Accessibility ([#1015](https://github.com/johnsonandjohnson/bodiless-js/issues/1015)) ([12bddcc](https://github.com/johnsonandjohnson/bodiless-js/commit/12bddcc9f13cdc3eb49abe006d3b43edfbb9b202))





## [0.2.3](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.2...v0.2.3) (2021-06-14)

**Note:** Version bump only for package @bodiless/navigation





## [0.2.2](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.1...v0.2.2) (2021-06-08)


### Bug Fixes

* **navigation:** breadcrumb current-page attribute ([#997](https://github.com/johnsonandjohnson/bodiless-js/issues/997)) ([c92773f](https://github.com/johnsonandjohnson/bodiless-js/commit/c92773f2159b02e53716d81ab154e07f331d3688))


### Features

* **components:** Link to Downloadable Files ([#985](https://github.com/johnsonandjohnson/bodiless-js/issues/985)) ([f8782b4](https://github.com/johnsonandjohnson/bodiless-js/commit/f8782b4b77964ce93b733052c9e3c31f88cac901))





## [0.2.1](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.2.0...v0.2.1) (2021-05-12)


### Bug Fixes

* **navigation, organisms, test-site:** Fix asTopNav and rename Touts to Cards ([#991](https://github.com/johnsonandjohnson/bodiless-js/issues/991)) ([3c89c62](https://github.com/johnsonandjohnson/bodiless-js/commit/3c89c625e7530b87c321c427dda3a2e26853e387))


### Features

* **navigation:** Breadcrumbs Accessibility ([#974](https://github.com/johnsonandjohnson/bodiless-js/issues/974)) ([2b70053](https://github.com/johnsonandjohnson/bodiless-js/commit/2b7005360ce5b2bcc707afe69f1e08e842645cdf))


### BREAKING CHANGES

* **navigation, organisms, test-site:** - Renamed `withToutsSubMenu` to `withCardsSubMenu`.
- `asTopNav()` now accepts `Main` key to apply default navigation styles to the Main Menu.
- `asTopNav('List' | 'Columns' | 'Cards')` is no longer applies `asTopNav('Main')` by default.





## [0.2.0](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.72...v0.2.0) (2021-04-28)

### Features

* **navigation, organisms, components:** Better DX for Menu, Breadcrumbs, BurgerMenu ([#841](https://github.com/johnsonandjohnson/bodiless-js/issues/841)) ([ad1d8dd](https://github.com/johnsonandjohnson/bodiless-js/commit/ad1d8ddb4308ab2883ba15fb918f4393f09e53c2))


### BREAKING CHANGES

* **navigation, organisms, components:**  - There is now a new `@bodiless/navigation` package for the new menu API.
 - All menu-related code is removed from `@bodiless/organisms`.
 - `withSimpleMenuDesign` and `withMegaMenuDesign` were deprecated. Use `withMenuDesign` from `@bodiless/organisms`  instead.
 - `asSimpleMenuTopNav` and `asMegaMenuTopNav` were depricated. Use `asTopNav()` from `@bodiless/organisms` instead.
 - Breadcrumbs are now configured by default for each menu item. No need for `asBreadcrumbSource`.
 - List and Menu design keys have changed. Removed extra `Wrapper` component from submenus.
 - Breadcrumb design keys have changed. Breadcrumb `Title` is now the same component as `MenuTitle` by default. The `BreadcrumbLink` design key has been deprecated. `Link` is available in `MenuTitle`. Renamed `BreadcrumbWrapper` and `BreadcrumbItem` to `Wrapper` and `Item` respectively.
- Please refer to the Upgrade Guide in `@bodiless/organisms` readme file.
