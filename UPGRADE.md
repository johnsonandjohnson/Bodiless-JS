# Package upgrade guide
This is a non-exhaustive list of packages that need to be upgraded on Bodiless as soon as possible.

## gatsby
- Locked at: ~3.13.0
- Reason: version 3.14 mistakenly introduced breaking changes from the `got` package. After the
update, gatsby started intercepting errors on proxied requests, responding with a generic 500 error
instead of the original one. This affected error messages sent from `bodiless-backend`.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1174
- See also: https://github.com/gatsbyjs/gatsby/issues/33333

## oidc-client-ts
- Locked at: 2.0.0-rc.2
- Reason: 2.0.0-rc.3 version introduced a few type errors into Bodiless. While these are fixable,
it's better to lock into a working version while there's no stable release available.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1243


NOTES: for switching to PNPM
* Best guide
* Fixed tailwind css import types
* Switch to postcss-cli-simple as postcss-cli hangs
* Inferrered types:
  * https://stackoverflow.com/questions/73786166/material-ui-styled-component-the-inferred-type-of-x-cannot-be-named-without-a 
  * https://github.com/microsoft/TypeScript/issues/36800
  * added :any
