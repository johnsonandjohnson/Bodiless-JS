# Getting Started

## Prerequisites

Ensure you have the following installed locally:

- Node.js: [Download](https://nodejs.org/en/download/ ':target=_blank')
  - We are currently using the LTS version 16.9+.
  - We use `npm` (v7+) as a package manager.
    - If you prefer `yarn`, feel free to try it. YMMV.

## Creating a New Site

BodilessJS provides a CLI tool for creating a new site from a template.

```shell-session
npx @bodiless/cli new
```

This will walk you through the process of creating a new Bodiless site locally. It will prompt you
for:

- The revision of the source monorepo on which the new site will be based;
- The path to the directory in which you want to create it;
- The starter template you wish to use; and
- The name of the new site.

The following templates are available:

- `__minimal__`: The bare bones needed to start creating a Bodiless site.
- `__vital__`: A more full-featured starter based on the Vital Design System.
  - This is a highly extensible and customizable set of components enabling very rapid creation of
    marketing websites.

You can then launch the editor—

```shell-session
cd /path/to/new/site
npm start
```

—And view the site at [http://localhost:8000](http://localhost:8000 ':target=_blank'). Click the
"Docs" button (in the upper-left corner) to view all documentation, or just visit
[http://localhost:8000/___docs](http://localhost:8000/___docs ':target=_blank').

To build and serve the production version of the site, execute:

```shell-session
npm run build
npm run serve
```

Visit [http://localhost:9000/](http://localhost:9000/ ':target=_blank') in your browser to view the
site.

## Exploring and Developing _BodilessJS_

The BodilessJS monorepo also contains a _Test Site_ which showcases all features, and can be used
for local development and testing.

### Install

Clone the repository and install dependencies:

```shell-session
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm run setup
```

?> **Note:** Don't run `npm install` at package root unless you are trying to update dependencies.

### Launch the Test Site

```shell-session
cd sites/test-site
npm run start
```

This will build all packages in _watch mode_, and then start `gatsby develop` on the Test Site. You
can then visit the site at [http://localhost:8005](http://localhost:8005 ':target=_blank').

The backend-server (responsible for saving content to JSON files) will be listening on
[http://localhost:8006](http://localhost:8006 ':target=_blank'). It is also reachable via proxy from
the Test Site at [http://localhost:8005/___backend](http://localhost:8005/___backend
':target=_blank'). However, you should never need to access this directly.

The documentation will be available at
[http://localhost:8005/___docs/](http://localhost:8005/___docs/ ':target=_blank') — clicking the
documentation icon in the edit environment will bring you here.

You'll also see a fourth link: [http://localhost:8005/___graphql](http://localhost:8005/___graphql
':target=\_blank'). This is a browser tool called _GraphiQL_ that you can use to experiment with
querying your data. Learn more about using this tool in the [Gatsby
tutorial](https://www.gatsbyjs.com/docs/tutorial/part-4/#use-graphiql-to-explore-the-data-layer-and-write-graphql-queries
':target=_blank').

The Test Site can also be built and served statically:

```shell-session
cd examples/test-site
npm run build
npm run serve
```

Visit [http://localhost:9000](http://localhost:9000 ':target=_blank') in your browser to view the
site.

## Next Steps

- [Step-by-step walkthrough of site-building](/Development/Guides/BuildingSites/)
- [Building and testing Bodiless sites](/Development/LocalSites)
- [Read our Core Principles](./CorePrinciples)
- [Understand our Platform Architecture](/Development/Architecture/Data)

## Troubleshooting Setup

### Error occurred: fatal: 'origin' does not appear to be a git repository

You may see this error in the console after starting the new site. This is because you have not
configured an 'origin' git remote. To fix this, add one:

```shell-session
git remote add origin <url-of-your-remote>
```

Note that you don't have to do this — the application will still function locally even though these
errors are printed to the console.

### Failures trying to use globally installed `libvips`

Depending on your system configuration, the installer may try to build `libvips` from source, which
will usually fail. Example error:

```shell-session
lerna ERR! npm install --legacy-peer-deps exited 1 in 'canvasx-monorepo'
lerna ERR! npm install --legacy-peer-deps stderr:
npm ERR! code 1
npm ERR! path .../node_modules/sharp
npm ERR! command failed
npm ERR! command sh -c (node install/libvips && node install/dll-copy && prebuild-install) || (node install/can-compile && node-gyp rebuild && node install/dll-copy)
npm ERR! sharp: Detected globally-installed libvips v8.12.1
npm ERR! sharp: Building from source via node-gyp
npm ERR!   CC(target) Release/obj.target/nothing/../node-addon-api/nothing.o
npm ERR!   LIBTOOL-STATIC Release/nothing.a
npm ERR! gyp info it worked if it ends with ok
...
npm ERR! gyp ERR! build error
npm ERR! gyp ERR! stack Error: `make` failed with exit code: 2
```

Try removing the globally installed `libvips` and running again, or try:

```shell
.SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm run setup
```
