# Window Issues/Workarounds

## rimraf Is Not Available on Windows
* **Issue**: Errors with rimraf when the command `npm run setup` is executed.
* **Workaround**: Install rimraf globally on Windows with the following command:
  * `npm install rimraf -g`

## Permission issues on symlinks during doc builds
* **Issue**:  During execution of `npm run docs` command on Windows you may face issues with permissions to establish symlinks. 
* **Workaround**: To avoid this run Terminal as administrator. 
