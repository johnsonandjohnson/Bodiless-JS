# Gatsby Starter for [BodilessJS](https://github.com/johnsonandjohnson/Bodiless-JS)

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/ 
  - We are currently using the LTS version 12.19.0.
  - We use `npm` as a package manager. If you prefer `yarn` feel free to try it.
    YMMV.

## Creating a New Site

BodilessJS provides a Gatsby starter you can use as the basis of a new site.
Currently, you must install it from the main repository as follows:

```bash
git clone https://github.com/johnsonandjohnson/bodiless-js.git
cd bodiless-js
npm run ci
npm run new /path/to/new/site
```
Recommend path for the new site is outside the bodiless-js repo.  i.e. ../mysite.

This will copy the starter to the specified location (which defaults to
`~/gatsby-starter-bodiless`), initialize a new git repository, and install all
dependencies.

> Note: Official Gatsby Stater (installable via `gatsby new`) is coming soon!

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


### Recommended Getting Started Steps

#### Update environment variables within `.env.site`
As part of the installation process, you may want to configure specific
environment variables for the site. You may do so by adding or updating
`.env.site` file in the root folder of the site. This file allows us to
overwrite env variables defined in `@bodiless` packages and/or add new env
variables. The variables within the system are provided with the majority commented out
and not actively being used.

Many of the plugins have a dependency to know the absolute url. This can be set
once with SITE_URL. This URL is used by Canonical & Sitemap.xml plugins.

#### Add the Favicon
This can be done by replacing the favicon.png in `src/images/`.  It uses
[gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/)
to generate a set of favicons for your site to use. For more information on
options, please read the documentation for
[gatsby-plugin-manifest](https://www.gatsbyjs.org/packages/gatsby-plugin-manifest/).

If desired, this can be overridden by specifying custom options within the site's
`gatsby-config.js`.

#### Start the Editing Site and add the Logo
Start your site with:
```
npm start
```
and view the site at [http://localhost:8000](http://localhost:8000).

Click the Edit icon in toolbar.

Click on the image and you will see context menu that lets you set the image and
alt text for your logo.

For further details we highly recommend visiting the built in documentation:

Click the Docs icon in toolbar or visit
[(http://localhost:8000/___docs/#/Development/Guides/BuildingSites/) to read
more in-depth on how to start building a site.

Then continue on in Edit mode and start adding menu items, new pages, adding
content & update footer and start building your site.

Click the Docs icon in toolbar or visit
[(http://localhost:8000/___docs/#/Development/ContentEditor/) and read
more in-depth of using the editor to build your site.
