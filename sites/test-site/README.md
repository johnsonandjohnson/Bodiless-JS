# Bodiless-JS Test Site

Example site for testing bodiless.

## Installation

As part of the installation process, you may want to configure specific environment variables for the site. You may do so by adding or updating `.env.site` file in the root folder of the site. This file allows us to overwrite env variables defined in `@bodiless` packages and/or add new env variables. Make sure you regenerated env variables after you've changed them by running any of the following:

* `npm run build:env-vars` - To regenerate env variables only.
* `npm run build` - It will regenerate env vars as part of the `build` script.
* `npm run start` - It will regenerate env vars as part of the `start` script.

## Usage

Start the development server (`gatsby develop`)
```
npm run build:watch
```

Build the static site
```
npm run build
```

Serve the static site
```
npm run serve
```

## Platform.sh integration

### Update platform.sh configuration

there is a script responsible for updating platform.sh configuration for test-site based on the changes in bodiless/psh

> Note: the script supports only edit environment now

please trigger the following command from monorepo root:

`npm run lerna -- run psh-update --scope=@bodiless/test-site`

