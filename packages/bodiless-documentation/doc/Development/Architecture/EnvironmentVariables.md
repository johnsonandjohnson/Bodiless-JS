### Environment Variables
All environment variables are managed by an optional `bodiless.env.config` file in the root of each package that needs to set or update environment variables. Default env variables can be found in `dist/generate-env-vars/getDefaults` in `@bodiless/gatsby-theme-bodiless` package and all env variables may be overwritten by setting them in `.env.site` in the root directory of the site.

#### About `bodiless.env.config` file
There is an optional `bodiless.env.config` file in a package root directory that is used to configure `.env` variables by extending passed env configuration during the site build. In order for it to work it must export an `async` `configure(defaultConfig, appEnv)` function. This function accepts 2 params:
* `defaultConfig` - this is an env configuration object with all current env variables.
* `appEnv` - current app build environment. **Note:** `appEnv` (`development` or `production`) actually describes whether we are in an edit environment or a static site build.
  * `production` - static site build (`gatsby build` == `production`)
  * `development` - edit environment (`gatsby develop` == `development`)

#### Example of `bodiless.env.config` file
```js
module.exports = {
  // We must export an async 'configure()' function. This function
  // is used by the main `generate-env-files` script.
  configure: async (defaultConfig, appEnv) => {
  // Here we define all env variables that the current package controls
  // based on the `appEnv`. We aslo recommend to have a 'default' value.
    const defaultEnvValues = {
      BODILESS_TAILWIND_THEME_ENABLED: '1',
      BODILESS_BACKEND_COMMIT_ENABLED: '0',
      BODILESS_BACKEND_SAVE_ENABLED: '1',
    };

    // Get current git branch
    const currentGitBranch = await getCurrentGitBranch();

    // Here we define all env variables that the current package controls
    // based on the `currentGitBranch`. We aslo recommend to have a 'default' value.
    const config = currentGitBranch === 'master'
      ? { default: { ...defaultEnvValues, BODILESS_BACKEND_SAVE_ENABLED: '0' } }
      : { default: { ...defaultEnvValues } }

    // There might be a cases when 'config' values are same for prod and dev.
    // In this case we may keep only the 'default' option in 'config' object.
    // `validNodeEnv` ensures that 'config' object has 'appEnv' option.
    // If this is not a case it will return a 'default' option.
    const validNodeEnv = val => Object.keys(config).includes(val);

  // Here we just merging a default config with the one provided by the package.
  // Note that it the same env variable occurs in both configs, the one that
  // defined in 'config[appEnv]' will take precedence over
  // the default one passed to the function.
    return {
      ...defaultConfig,
      ...validNodeEnv(appEnv)
        ? config[appEnv]
        : config.default,
    };
  },
};
```

The `bodiless.env.config` file is not limited to the plain objects and may execute any node logic to configure the env variables. The only rule is to return an extended version of the `defaultConfig` in the async `configure()` handler.

#### Dealing with precedence
Basically, there are 3 pieces of the `.env` configuration system:
* A default `getDefaults.ts` file with default env variables for bodiless sites defined in `@bodiless/gatsby-theme-bodiless`. 
* Optional `bodiless.env.config` files in the root of bodiless packages. These files take precedence over the default configuration. It may either extend the default configuration or overwrite certain variables. Note that there may be an `bodiless.env.config` in the site root folder which will take precedence over any other `.env` configurations.
* Site level `.env.site` file. This file is designed to take precedence over both: `getDefaults.ts` in `@bodiless/gatsby-theme-bodiless` and `bodiless.env.config` files. Also, there might be a need to dynamically set site-level env variables. You can do that by creating an `bodiless.env.config` file in the root folder of a site. This file will take precedence over any other env configuration.
