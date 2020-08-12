# Bodiless-JS CLI

## Usage
```sh-session
$ npm install -g @bodiless/cli
$ bodiless COMMAND
running command...
$ bodiless (-v|--version|version)
@bodiless/cli/0.0.52 darwin-x64 node-v12.9.1
$ bodiless --help [COMMAND]
USAGE
  $ bodiless COMMAND
...
```

## Commands
* [`bodiless help [COMMAND]`](#bodiless-help-command)
* [`bodiless pack`](#bodiless-pack)

## `bodiless help [COMMAND]`

display help for bodiless

```
USAGE
  $ bodiless help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts)_

## `bodiless pack`

Pack and install dependencies from a local monorepo.

```
USAGE
  $ bodiless pack

OPTIONS
  -f, --force            Install packages even if they are not existing dependencies of the site
  -h, --help             show CLI help

  -p, --package=package  Name of package to bundle. May be specified more than once. If omitted, will bundle all
                         matching dependencies.

  -r, --repo=repo        [default: .] Path to the local lerna monorepo, relative to the current directory. Must contain
                         the package source in a `packages` directory.

  -s, --site=site        [default: .] Path to the site into which you wish to install packages, relative to the current
                         directory.

  --dry-run              Do not pack or install. Just show list of matching packages.

  --skip-install         Only pack, do not install.

EXAMPLES
  $ bodiless pack -r /path/to/local/monorepo
  $ bodiless pack -s /path/to/site
```

_See code: [lib/commands/pack.js](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-cli/src)_
