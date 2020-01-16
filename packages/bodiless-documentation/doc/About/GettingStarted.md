# Getting Started

## Prerequisites

Ensure you have the following installed locally:
- NodeJS: https://nodejs.org/en/download/ 
  - We are currently using the LTS version 10.15.0. 
  - We use `npm` as a package manager. If you prefer `yarn` feel free to try it. YMMV.

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

### Environment Variables
All environment variables are managed by an optional `env.config` file in the root of each package that needs to set or update environment variables. Default env variables can be found in `.env.default` in `@bodiless/gatsby-theme-bodiless` package and all env variables may be overwritten by setting them in `.env.site` in the root directory of the site.

#### About `env.config` file:
There is an optional `env.config` file in a package root directory that is used to configure `.env` variables by extending passed env configuration during the site build. In order for it to work it must export an `async` `configure(defaultConfig, nodeEnv)` function. This function accepts 2 params:
* `defaultConfig` - this is an env configuration object with all current env variables.
* `nodeEnv` - current node environment ( `production` or `development` ).

#### Example of `env.config` file:
```js
module.exports = {
  // We must export an async 'configure()' function. This function
  // is used by the main `generate-env-files` script.
  configure: async (defaultConfig, nodeEnv) => {
  // Here we define all env variables that the current package controls
  // based on the `nodeEnv`. We aslo recommend to have a 'default' value.
    const config = {
      production: { SOME_ENV_VARIABLE: 'value-prod' },
      development: { SOME_ENV_VARIABLE: 'value-dev' },
      default: { SOME_ENV_VARIABLE: 'value-default' },
    };

    // There might be a cases when 'config' values are same for prod and dev.
    // In this case we may keep only the 'default' option in 'config' object.
    // `validNodeEnv` ensures that 'config' object has 'nodeEnv' option.
    // If this is not a case it will return a 'default' option.
    const validNodeEnv = val => Object.keys(config).includes(val);

  // Here we just merging a default config with the one provided by the package.
  // Note that it the same env variable occurs in both configs, the one that
  // defined in 'config[nodeEnv]' will take precedence over
  // the default one passed to the function.
    return {
      ...defaultConfig,
      ...validNodeEnv(nodeEnv)
        ? config[nodeEnv]
        : config.default,
    };
  },
};
```

The `env.config` file is not limited to the plain objects and may execute any node logic to configure the env variables. The only rule is to return an extended version of the `defaultConfig` in the async `configure()` handler.

#### Dealing with precedence
Basically, there are 3 pieces of the `.env` configuration system:
* A default `.env.default` file with default env variables for bodiless sites defined in `@bodiless/gatsby-theme-bodiless`. 
* Optional `env.config` files in the root of bodiless packages. These files take precedence over the default configuration. It may either extend the default configuration or overwrite certain variables. Note that there may be an `env.config` in the site root folder which will take precedence over any other `.env` configurations.
* Site level `.env.site` file. This file is designed to take precedence over both: `.env.default` and bodiless `env.config` files. Also, there might be a need to dynamically set site-level env variables. You can do that by creating an `env.config` file in the root folder of a site. This file will take precedence over any other env configuration.

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

- [Step-by-step walkthrough of site building](About/SiteBuildBasics)
- [More ways to launch sites](Development/LocalSites.md)
- [Read our Core Principles](About/CorePrinciples).
- [Understand our Platform Architecture](About/Development/Architecture).


