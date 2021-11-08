# Package upgrade guide
This is a non-exhaustive list of packages that need to be upgraded on Bodiless as soon as possible.

## informed
- Locked at: ~3.13.1
- Reason: upgrading to `informed` 3.14+ breaks some custom validation functions used 
throughout Bodiless.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1171

## gatsby
- Locked at: ~3.13.0
- Reason: version 3.14 mistakenly introduced breaking changes from the `got` package. After the
update, gatsby started intercepting errors on proxied requests, responding with a generic 500 error
instead of the original one. This affected error messages sent from `bodiless-backend`.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1174
- See also: https://github.com/gatsbyjs/gatsby/issues/33333
