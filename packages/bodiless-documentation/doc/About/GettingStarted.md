# Getting Started

## Prerequisites

Ensure you have the following installed locally:

- Node.js: [Download](https://nodejs.org/en/download/ ':target=_blank')
  - We are currently using the LTS version 18.16+.
  - We use `npm` (v7+) as a package manager.
    - If you prefer `yarn`, feel free to try it. YMMV.

## Creating a New Site

BodilessJS provides a CLI tool for creating a new site from a template.

```shell-session
npx @bodiless/cli@next new -r next
```

  > Note: Bodiless-JS is currently in pre-1.x state, so you will need
  > to install the "next" version as described above.  A full 1.0 release is planned
  > for December, 2022.

This will walk you through the process of creating a new Bodiless site locally. It will prompt you
for:

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

To learn the basics of site-building on BodilessJS, see our tutorial: [Intro To Bodiless Concepts:
Creating a Gallery Page](/Development/Guides/IntroToBodilessConcepts).

### Choosing a Revision

When creating a new site, if you'd like to choose a specific revision of the source monorepo on
which the new site will be based, run the `new` command in _interactive_ mode via the `-i` flag:

```shell-session
npx @bodiless/cli new -i
```

By default, you will not be prompted for this, and the "latest" revision (i.e., the last tagged
version which isn't a pre-release) will be used.

## Going Live

A BodilessJS site is not too different from any other Gatsby site, and
can easily be hosted on a variety of JAMstack-optimized web platforms.
You can also host the edit application in the cloud so that content
editors can make site updates without having to run it locally.

We provide step-by-step instructions for hosting your site in the [Web Platforms](../Development/WebPlatforms/) section of the documentation.  

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
lerna ERR! npm install --legacy-peer-deps exited 1 in 'vital-monorepo'
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
## Using specific versions

If you want to build a new site based on a specific version of Bodiless, you may
supply version specifiers in the command as follows:

  ```shell-session
  npx @bodiless/cli@{VERSION} new -r {REVISION}
  ```

  Where:

  - `VERSION` is the package version of `@bodiless/cli` that you wish to use (e.g.,
    `1.0.0-rc.22`).
    - Prior to the official `1.0` release of Bodiless, you _must_ use at least `1.0.0-beta.11`.
    - You may also use `next` to use the latest pre-release version (i.e., `@bodiless/cli@next`).
    - Using `@bodiless/cli` without a version specifier will fail.
  - `REVISION` is the revision of the repository to check out when cloning.
    - Use `next` to check out the latest pre-release version.
    - Use `HEAD` to check out the latest commit on the `main` branch.
    - Use the appropriate tag to check out the revisino that matches your version.

  E.g., to use pre-release version `1.0.0-beta.12` of the CLI package while checking out the latest
  pre-release version of the Bodiless repository:

  ```shell-session
  npx @bodiless/cli@1.0.0-beta.12 new -r next
  ```
