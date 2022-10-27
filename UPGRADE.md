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
* Fixed tailwind css import types
* Switch to postcss-cli-simple as postcss-cli hangs
* Inferrered types:
  * https://stackoverflow.com/questions/73786166/material-ui-styled-component-the-inferred-type-of-x-cannot-be-named-without-a 
  * https://github.com/microsoft/TypeScript/issues/36800
  * added :any
* in sites/minimal-demo -- pnp Can't resolve '@babel/runtime/helpers/esm/regeneratorRuntime' in '/Users/heidivanyo/slate/bj-heidi2/node_modules/.pnpm/rc-trigger@5.3.3/node_modules/rc-trigger/es/Popup'
  * https://github.com/babel/babel/issues/14576
* npm run start of any site hits out of memory error during building development packages.
  * no known fix at this time.

Timings of PNPM
pnpm run setup on a fresh clone
install (npm run bootstrap):  24secs
Build Packages (npm run build:packages): 3 min 5 secs
Build test site only: cd sites/test-site && npm run build: 4 min 44 secs
 ** note this still uses npm-run-all in build command so not sure if we are leveraging pnpm but most of time is gatsby build so don't think it matters that much
