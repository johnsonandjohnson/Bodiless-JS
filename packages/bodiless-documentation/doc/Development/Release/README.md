# Releases

> While we adhere to the principles of
[Semantic Versioning](https://semver.org/), please note that we are currently in
["Major Version Zero"](https://semver.org/#spec-item-4) status, meaning that
*stability or backwards compatibility is not guaranteed.*,

## 0.x Versions

- All Bodiless packages will maintain a common version line at `0.y.z`.
- New "patch" versions (0.y.**Z**) will be published every two weeks, coinciding
  with our internal sprint cadence.
- In exceptional circumstances (critical bugfixes), we may publish a new version
  mid-sprint.
- New "minor" versions (0.**Y**.0) will be released periodically as we hit major
  milestones on our roadmap.

### 0.x Release Process

#### Pre-release notes

1. Code freeze on master branch. Make sure no more commits merge into master before release complete.

At end of Sprint, a new 0.0.x package version should be published as follows.

1. Log into npm:
   ```
   npm login
   ```
   > Note: You must have access to the
   [Bodiless organization](https://www.npmjs.com/settings/bodiless/packages.
   Please contact [Dewen Li](https://github.com/dewen) to obtain it.
1. Take a fresh clone of the repository.
   ```
   git clone git@github.com:johnsonandjohnson/Bodiless-JS.git
   cd Bodiless-JS
   ```
1. Checkout a new release branch from master, eg:
   ```
   git checkout -b chore/release-0.0.37
   ```
   Add new release branch to remote, this is necessary during lerna publishing process.
   ```
   git push origin chore/release-0.0.37
   ```
1. Initialize all dependencies and build the project:
   ```
   npm run setup
   npm run build
   ```
1. Publish packages.
   ```
   npx lerna publish 0.0.{x} --conventional-commits
   ```
   where `{x}` is the next *patch* version (eg 0.0.36 -> 0.0.37).

1. Update dependencies in `package-lock.json` for each example site by following [these steps](Development\/Release\/UpdatePackages?id=updating-example-sites39-package-lockjson).

1. Create a PR to master from the release branch.  PR title should be, eg:
   ```
   chore: Release v0.0.37
   ```
    Commits in the PR should not be squashed since the tag is already attached to the appropriate commit hash. If we squash the original commit the release notes can be duplicated in the next release.

> Ensure that you do not squash/merge the release branch, You must use the
   "fast-forward" merge strategy.

#### Notes:
- We specify an explicit version number because we are in pre-1.0, so the
  normal semver bumps which would be created by conventional-commits are not
  appropriate. We use the `--conventional-commits` option to generate the
  changelog.
- We push the commit to a release branch which must be merged to master using
  the standard PR process.
