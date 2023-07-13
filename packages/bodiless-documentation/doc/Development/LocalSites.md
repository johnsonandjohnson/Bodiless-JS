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
npm run dev
```

You can also build and serve the static version of either site
```
cd examples/test-site # or cd examples/starter
npm run build
npm run serve
```

You can also run `start`, `build` and `serve` from the repository root; this will
execute the script on the test site onlly.

## External Sites

It is also possible to spin up a real Bodiless site (from an external
repository) and test it against the local versions of Bodiless packages in the
monorepo using the bodiless cli.

First clone the site somewhere
```
cd sites
git clone https://github.com/me/foo.git
```

Now install the local packages into the site. Note that this will modify the
`package.json` and `package-lock.json` of your site. **These changes should not
be committed**. From outside your downloaded site directory:
```
npx @bodiless/cli pack -s {path/to/your/site} -r {path/to/bodiless/repo}
```

Finally, run scripts from your site normally:
```
cd foo
npm install
npm run dev
...
npm run build
...
npm run serve
...
```
