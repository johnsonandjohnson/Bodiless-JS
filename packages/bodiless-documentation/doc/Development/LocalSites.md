# Building and Testing Bodiless Sites

This section describes tooling for testing Bodiless packages from the monorepo.

## Example sites

The BodilessJS monorepo contains 2 example sites:

- The "test-site", which demonstrates all Bodiless functionality, and is used
  internally for testing.
- The "starter", which is a bare-bones Gatsby starter you can use to create your own Bodiless site.

Both of these sites can be run locally, using Lerna to link to the core bodiless
packages.

First install all dependencies from the repository root:
```
npm run bootstrap
```

Then, start the development server for either site:
```
cd examples/test-site # or cd examples/starter
npm run start
```

You can also build and serve the static version of either site
```
cd examples/test-site # or cd examples/starter
npm run build
npm run serve
```

From, the repository root, you can start the test-site while watching all
packages in the monorepo
```
npm run build:watch # from repository root
```

## External Sites

It is also possible to spin up a real Bodiless site (from an external
repository) and test it against the local versions of Bodiless packages in the
monorepo using `npm pack`.

First clone the site into the `sites` directory.  From repository root:
```
cd sites
git clone https://github.com/me/foo.git
```

Now install the local packages into the site. Note that this will modify the
`package.json` and `package-lock.json` of your site. **These changes should not
be committed**. From outside your downloaded site directory:
```
npm run sites:update foo
```

Finally, run scripts from your site normally:
```
cd foo
npm install
npm run start
...
npm run build
...
npm run serve
...
```

### Running the test-site or starter using local packages

When you run the test site or starter from the `examples` directory, it uses
Lerna to link bodiless dependencies to directories on your local filesystem.
While this is fine for development, it can mask errors introduced by the npm
publishing process itself (eg files accidentally omitted from the package). You
can achieve a higher-fidelity test scenario by running the local sites as if they
were external:
```
npm run sites:clone-local test-site
npm run sites:update test-site
```
or
```
npm run sites:clone-local starter
npm run sites:update starter
```
Then
```
cd sites/test-site # or cd sites/starter
npm install
npm run start
...
npm run build
...
npm run serve
...
```

### Updating a local site

Local changes you make to bodiless packages will not be reflected in your test sites until you
repackage and reinstall.

```
npm run sites:update <your-site-dir>
```

### `/examples` vs `/sites`

When running external sites (or testing example sites using local packages), it is best to put them
under `/sites` rather than `/examples`.  The latter is managed by Lerna; when you run bootstrap
any site under `/examples` will be linked to the package source in the monorepo and have its
dependencies hoisted.  This means:

- You might alter the package-lock.json at the monorepo root.
- You have to remember not to commit the site (or the altered package-lock.json)
- You have to make sure the site has a unique package name
- Bugs related to improper packaging (eg. forgetting to include files) will still be invisible.

The `/sites` directory is git-ignored and invisible to Lerna - so anything you do there won't
affect the monorepo.  This is why all the NPM `sites:...` scripts assume this location for the
site you want to run.
