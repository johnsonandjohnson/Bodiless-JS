# Getting Started

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/
  - We are currently using the LTS version 16.9+
  - We use `npm` (v7+) as a package manager. If you prefer `yarn` feel free to
    try it. YMMV.

## Creating a New Site

BodilessJS provides a CLI tool for creating a new site from a template.

```bash
npx @bodiless/cli new
```

This will walk you through the process of creating a new bodiless site locally.  It will prompt you for the name of the new site, the path
to the directory in which you want to create it, and the starter
template you wish to use.  The following templates are available:

- `__minimal__`; The bare bones needed to start creating a Bodiless site.
- `__vital__`: A more full-featured starter based on the vital design system.
  This is a highly extensible and custokmizable set of components enabling very rapid creation of marketing websites. 

You can then launch the editor:

```sh
cd /path/to/new/site
npm start
```

And view the site at [http://localhost:8000](http://localhost:8000). Click the
"docs" button (in the upper left corner) to view all documentation, or just
visit http://localhost:8000/___docs](http://localhost:8000/___docs).

To build and serve the production version of the site:

```
npm run build
npm run serve
```

Visit http://localhost:9000/ in your browser to view the site.


## Exploring and Developing *BodilessJS*

The BodilessJS monorepo also contains a test site which showcases all features and can
be used for local development and testing.

### Install

Clone the repository and install dependencies:

```bash
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm run setup
```
> Note: don't run `npm install` at package root unless you are trying to update dependencies.

### Launch the Test Site

```
cd sites/test-site
npm run start
```
This will build all packages in watch mode and then start `gatsby develop` on the test site.  You
can then visit the site at [http://localhost:8005](http://localhost:8005). 

The backend-server (responsible for saving content to json files) will be
listening on [http://localhost:8006](http://localhost:8006). It is also
reachable via proxy from the test site at
[http://localhost:8005/___backend](http://localhost:8005/___backend). However,
you should never need to access this directly.

The documentation will be available at
[http://localhost:8005/___docs](http://localhost:8005/___docs), or by clicking
the documentation icon in the edit environment.

You'll also see a fourth link: `http://localhost:8005/___graphql`. This is
a tool you can use to experiment with querying your data. Learn more about using
this tool in the
[Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).*

The test site can also be built and served statically.
```
cd examples/test-site
npm run build
npm run serve
```

Visit http://localhost:9000/ in your browser to view the site.

## Next Steps

- [Step-by-step walkthrough of site building](../Development/Guides/SiteBuildBasics)
- [More ways to launch sites](../Development/LocalSites.md)
- [Read our Core Principles](./CorePrinciples).
- [Understand our Platform Architecture](../Development/Architecture/Data).


## Troubleshooting Setup

### Error occurred: fatal: 'origin' does not appear to be a git repository

You may see this error in the console after starting the new site. This is because you
have not configured an 'origin' git remote.  To fix it, add one:
```
git remote add origin {url-of-your-remote}
```
Note that you don't have to do this -- the application will still function locally
even though these errors are printed to the console.

### Failures trying to use globally installed `libvips`

Depending on your system configuration, the installer may try to build libvips from
source, which will usually fail.  Example error:
```
erna ERR! npm install --legacy-peer-deps exited 1 in 'canvasx-monorepo'
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
Try removing the globally installed libvips and running again, or try 
```
.SHARP_IGNORE_GLOBAL_LIBVIPS=1 npm run setup
```
