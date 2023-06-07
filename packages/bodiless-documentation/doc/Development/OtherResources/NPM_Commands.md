# NPM commands reference

NPM commands, that are defined in the root `package.json` file and their purpose.

| Command                | Purpose |
|------------------------|---------|
| `bootstrap`            | Install all dependencies and bootstrap packages in the current Lerna repo with [hoist option](https://github.com/lerna/lerna/blob/main/commands/bootstrap/README.md#--hoist-glob). Also builds all packages. |
| `build`                | Build production version of all packages and production static versions of the example sites |
| `build:packages`       | Build production version of all packages |
| `build:watch` .        | Build development version of all packages, watch for changes, and launch `gatsby develop` on the test site |
| `clean`                | Clear caches, .env files and build artifacts for all packages |
| `copyright`            | Adds copyright notice header to sll source files |
| `fix`                  | Runs an eslint scan of the entire project and fixes all auto-fixable problems |
| `fix:target`           | Runs an eslint scan of a particular file or directory and fixes all auto-fixable problems |
| `fresh`                | Clean everything, remove node_modules and then run `bootstrap` |
| `lint`                 | Runs an eslint scan of the entire project |
| `lint:target`          | Runs an eslint scan of a particular file or directory |
| `new`                  | Creates a new BodilessJS site in the specified directory |
| `publish:all`          | Creates new package versions and publishes all of them to NPM repo specified in $NPM_REGISTRY environment variable. | 
| `publish:from-package` | Does not create new package versions. Should be run by automation after running `lerna version` manually to publish updated packages to the NPM repo specified in $NPM_REGISTRY environment variable. }
| `scan`                 | Runs a ts-complexity scan of the entire project |
| `scan:targert`         | Runs a ts-complexity scan of a specific file |
| `serve`                | Serve a production version of the test site. Must first run `build`.
| `setup`                | Alias for `bootstrap`
| `start`                | Alias for `build:watch` |
| `test`                 | Runs all unit tests for the project |

