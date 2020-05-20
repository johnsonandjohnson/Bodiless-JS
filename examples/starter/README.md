# Gatsby Starter for [BodilessJS](https://github.com/johnsonandjohnson/Bodiless-JS)

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/ 
  - We are currently using the LTS version 12.16.3.
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

### Handling environment variables with `.env.site`
As part of the installation process, you may want to configure specific environment variables for the site. You may do so by adding or updating `.env.site` file in the root folder of the site. This file allows us to overwrite env variables defined in `@bodiless` packages and/or add new env variables. Make sure you regenerated env variables after you've changed it by running any of the following:

* `npm run build:env-vars` - To regenerate env variables only.
* `npm run build` - It will regenerate env vars as part of the `build` script.
* `npm run start` - It will regenerate env vars as part of the `start` script.


> Note: Official Gatsby Stater (installable via `gatsby new`) is coming soon!
