# Getting Started

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/ 
  - We are currently using the LTS version 12.19.0.
  - We use `npm` as a package manager. If you prefer `yarn` feel free to try it. YMMV.
- [NPM](https://docs.npmjs.com/) version 6.13.1+ is required.

## Creating a New Site

BodilessJS provides a Gatsby starter you can use as the basis of a new site. Currently, you must
install it from this repository as follows:

```bash
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm ci
npm run new /path/to/new/site
```

This will create a new git repository at the specified location (which defaults
to `~/gatsby-starter-bodiless`), copy the starter, and install all dependencies.

> Note: You should avoid creating a new site in the monorepo, except in the /sites
directory if you intend to check it against local packages.

You can then launch the editor:

```
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

> Note: Official Gatsby Stater (installable via `gatsby new`) is coming soon!

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
cd examples/test-site
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
- [Understand our Platform Architecture](../Development/Architecture).


