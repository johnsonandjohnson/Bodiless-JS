# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [0.0.48](https://github.com/johnsonandjohnson/bodiless-js/compare/v0.0.47...v0.0.48) (2020-05-20)


### Features

* **components, components-ui:** Add Image Component ([#316](https://github.com/johnsonandjohnson/bodiless-js/issues/316)) ([a3fba5d](https://github.com/johnsonandjohnson/bodiless-js/commit/a3fba5dc9ad7f53f1c95168dc9aa7d3f5c4754ad))


### BREAKING CHANGES

* **components, components-ui:** * Styles of @bodiless/components image picker changed. Functionality of image picker is not impacted, just visual appearance changed. If a site uses Image or asBodilessImage from @bodiless/components, then the site is impacted. The recommended migration path is to change Image and asBodilessImage import from "@bodiless/components" into "@bodiless/components-ui". Example of the migration can be found in test site.
