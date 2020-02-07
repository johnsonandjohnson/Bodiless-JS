# Updating Package Dependencies

## Adding a dependency at root

If you run plain `npm install` at root, it will remove from `package-lock.json`
all packages hoisted by Lerna (since they don't exist in the root
`package.json`).  To add a new root package (or to change the version), you should
therefore do the following (from root):
```
npm install --no-package-lock <package>
npm run bootstrap
```
In this way, we let Lerna manage the root `package-lock.json`.

## Things to consider when adding packages:

### Matching package semver ranges

Lerna will not successfully hoist packages if their semver ranges specifiers are
different in different packages, even if the resolved version is the same. So,
if you update or install new dependencies in a bodiless package, example site or
at root, be sure to change the version of the package everywhere it appears in
the monorepo.  As a result, we run `lerna bootstrap` with a `--strict` flag, so
that any inconsistencies will cause a failed install.

### Updating Example Sites' `package-lock.json`

If you update dependencies of one of the example sites (including cutting a new
release of any @bodiless packages), or if you update the package-lock.json at
the monorepo root, you will want to regenerate the package-lock.json files in
the example sites, to ensure that end-users get the same versions of all
packages as we are using to test in the monorepo.

To do so:
1. ensure the package-lock.json at repo root is up-to-date.
2. copy it to each of the example sites
3. remove `node_modules` from all packages. `git clean -fxd` is a good way to do this.
4. run npm install *from each example site directory*
5. commit the resulting package-lock.json files.
