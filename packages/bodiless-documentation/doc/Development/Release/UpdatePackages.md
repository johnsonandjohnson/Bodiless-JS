# Updating Package Dependencies

## Hoisting

Lerna will not successfully hoist packages if their semver ranges specifiers are
different in different packages, even if the resolved version is the same. So,
if you update or install new dependencies in a bodiless package, example site or
at root, be sure to change the version of the package everywhere it appears in
the monorepo.

If you fail to do this, you will see `EHOIST` errors on bootstrap, and extraneous
packages will be installed to the `node_modules` directory under the offending
packages. Please clean this up before committing.

## Example Sites `package-lock.json`

If you update dependencies of one of the example sites, or if you pdate the
package-lock.json at the monorepo root, you will want to regenerate the
package-lock.json files in the example sites, to ensure that end-users get the
same versinos of all packages as we are using to test in the monorepo.

To do so:
1. ensure the package-lock.json at repo root is up-to-date.
2. copy it to each of the example sites
3. remove `node_modules` from all packages. `git clean -fxd` is a good way to do this.
4. run npm install *from each example site directory*
5. commit the resulting package-lock.json files.
