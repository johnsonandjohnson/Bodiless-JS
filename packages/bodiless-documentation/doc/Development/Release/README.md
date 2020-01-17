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

At end of Sprint, a new 0.0.x package version should be published as follows.

1. Log into npm:
   ```
   npm login
   ```
   > Note: You must have access to the
   [Bodiless organization](https://www.npmjs.com/settings/bodiless/packages.
   Please contact [Dewen Li](https://github.com/dewen) to obtain it.
1. Take a fresh clone of the reposotory.
1. Checkout a new release branch from master, eg:
   ```
   git checkout -b chore/release-0.0.37
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

1. Create a PR to master from the release branch.  PR title should be, eg:
   ```
   chore: Release v0.0.37
   ```

#### Notes:
- We specify an explicit version number because we are in pre-1.0, so the
  normal semver bumps which would be created by conventional-commits are not
  appropriate. We use the `--conventional-commits` option to generate the
  changelog.
- We push the commit to a release branch which must be merged to master using
  the standard PR process.
