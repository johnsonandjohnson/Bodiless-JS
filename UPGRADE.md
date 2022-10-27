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
* npm run start of any site hits out of memory error during building development packages.
  * no known fix at this time.

Timings of PNPM
pnpm run setup on a fresh clone

| Step                                                      | Run 1         | Run 2 | Run 3 | Run 4 |
|-----------------------------------------------------------|---------------|-------|-------|-------|
| install (npm run bootstrap)                               | 49 secs       |  3 min 9 sec|       |       |
| Build Packages (npm run build:packages)                   | 7 min 4 secs  |  5 min 50 sec |       |       |
| Build test site only: cd sites/test-site && npm run build | x min x secs  |  8 min 53 sec     |       |       |

Run 1 build link: hhttps://cloud.nx.app/orgs/635312c86ecea75875e2d826/workspaces/635312c86ecea75875e2d827/runs?withoutBranch=true&status=&branch=

Build test site only: cd sites/test-site && npm run build: 4 min 44 secs
 ** note this still uses npm-run-all in build command so not sure if we are leveraging pnpm but most of time is gatsby build so don't think it matters that much
