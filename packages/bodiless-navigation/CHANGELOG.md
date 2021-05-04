# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
