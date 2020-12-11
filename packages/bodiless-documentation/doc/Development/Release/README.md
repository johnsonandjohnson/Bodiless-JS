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

1. Take a fresh clone of the reposotory.
1. Checkout ```release``` branch, eg:
   ```
   git checkout -b release origin/release
   ```
1. Merge in latest commits from master
   ```
   git merge master
   ```
1. Initialize all dependencies and build the project:
   ```
   npm run setup
   npm run build
   ```
1. Publish packages with patch version update.
   ```
   npm run publish:patch
   ```
1. Update dependencies in `package-lock.json` for each example site by following [these steps](../Release/UpdatePackages?id=updating-example-sites39-package-lockjson).
1. Create a PR to master from the ```release``` branch.  PR title should be, eg:
   ```
   chore: Release v0.0.45
   ```
    Commits in the PR should not be squashed since the tag is already attached to the appropriate commit hash.

> Ensure that you do not squash/merge the release branch, You must use the
   "fast-forward" merge strategy.

#### Notes:
- We specify an explicit version number because we are in pre-1.0, so the
  normal semver bumps which would be created by conventional-commits are not
  appropriate. We use the `--conventional-commits` option to generate the
  changelog.
- We push the commit to a release branch which must be merged to master using
  the standard PR process.
