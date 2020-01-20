# Gatsby Starter for [BodilessJS](https://github.com/johnsonandjohnson/Bodiless-JS)

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/ 
  - We are currently using the LTS version 10.15.0. 
  - We use `npm` as a package manager. If you prefer `yarn` feel free to try it. YMMV.

## Creating a New Site

BodilessJS provides a Gatsby starter you can use as the basis of a new site. Currently, you must
install it from the main repository as follows:

```bash
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm run ci
npm run new /path/to/new/site
```

This will copy the starter to the specified location (which defaults to
`~/gatsby-starter-bodiless`), initialize a new git repository, and install all
dependencies.

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
