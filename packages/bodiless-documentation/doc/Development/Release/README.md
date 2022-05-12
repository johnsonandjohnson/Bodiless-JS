# Releases

We adhere to the principles of [Semantic Versioning](https://semver.org/ ':target=_blank')
for the framework as a whole. All bodiless packages maintain a common version line at `X.y.z`.  This means that an individual package may receive a version bump even if it does not have any changes.

In most cases, Bodiless releases are produced automatically, and version calculation is
performed based on the [Conventional Commits]() standard.  In certain excepetional
circumstances (for example, new major releases) we may produce a new release
manually with an explicit version.

## **Normal Release Process**

### Pre-Releases

Normally, pre-releases are produced automatically in response to certain events:

- Any Pull request produces a "Canary" release. Such releases are not tagged
  in the repository, but only published to NPM.  The format of the version
  is determined as follws (get from alexey). Such releases will receive NPM
  [dist tags]() defined by (get from alexey).
- Any commit to the main branch will produce a "Beta" prerelease.  These are
  tagged in the repository.  The version numbers are calculated as follows
  (get from alexey).  Such releases will receive the "next" npm dist tag.
  > Note: You may prevent a commit to the main branch from producing a release
  > by placing a "no-release" annotation in the PR title.

### Full Releases

When you are ready to graduate a pre-release to a full release, execute the
"Release" github action manually. (Add step by step instructions).

## **Fully Manual Release Process**

In some cases we may wish to override the version calculation for a
release or pre-release.  In such cases, we can employ a fully manual process
as follows:

01. Create a fresh clone of the repository.
01. Checkout the `release` branch, e.g.:
    ```shell-session
    git checkout -b release origin/release
    ```
01. Merge in the latest commits from `main`.
    ```shell-session
    git merge main
    ```
01. Initialize all dependencies, and build the project.
    ```shell-session
    npm run setup
    npm run build
    ```
01. Create new package versions.
    ```shell-session
    npm run publish:<UPDATE_TYPE>
    ```
    This will execute the `lerna version` command with required flags.
    - For `<UPDATE_TYPE>`, substitute the type of version update (i.e., `patch`, `minor`, or
      `major`).
    - For a manual *pre*-release, you must execute `lerna version` manually and specify
      the exact version you would like to release, eg:
      ```shell-session
      npx lerna version 1.0.0-beta.1 --conventional-commits --force-publish
      ```
    - For information on these Lerna command flags, please see Lerna's documentation:
      - [`--conventional-commits`](https://github.com/lerna/lerna/blob/main/commands/version/README.md#--conventional-commits ':target=_blank')
      - [`--force-publish`](https://github.com/lerna/lerna/blob/main/commands/version/README.md#--force-publish ':target=_blank')
      ```
01. Create a PR to `main` from the `release` branch.
    - The PR title should emulate the following form: `chore: Release v1.0.45`
    - Commits in the PR should _not_ be squashed, since the tag is already attached to the
      appropriate commit hash.
    - The version you created in the previous step will be automatically published to npm via
      a Github "publish" action when you push to the `release` branch of origin. *Publication
      will happen on push, **not** on merge to `main`.

!> **IMPORTANT:** Ensure that you **do not squash/merge the release branch**. You _must_ use the
   "fast-forward" merge strategy.
