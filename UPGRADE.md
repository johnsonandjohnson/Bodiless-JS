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
- Locked at: 2.0.0-beta.2
- Reason: Downstream sites are hosting the oidc-client-ts rc 1 package and producing TS errors.
- Resolution: When OIDC client is needed update offending code src/UserManager.ts
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1243
