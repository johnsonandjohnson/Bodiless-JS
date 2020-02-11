# Bodiless-JS CLI

## Usage
<!-- usage -->
```sh-session
$ npm install -g @bodiless/cli
$ bodiless COMMAND
running command...
$ bodiless (-v|--version|version)
@bodiless/cli/0.0.39 darwin-x64 node-v10.16.0
$ bodiless --help [COMMAND]
USAGE
  $ bodiless COMMAND
...
```
<!-- usagestop -->

## Commands
<!-- commands -->
* [`bodiless help [COMMAND]`](#bodiless-help-command)
* [`bodiless pack REPO`](#bodiless-pack-repo)

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

## `bodiless pack REPO`

Pack and install dependencies from a local monorepo.

```
USAGE
  $ bodiless pack REPO

ARGUMENTS
  REPO  Path to the local monorepo, relative to the current directory

OPTIONS
  -f, --force            Install packages even if not current dependencies
  -h, --help             show CLI help

  -p, --package=package  Name of package to bundle. may be specified more than once. If omitted, will bundle all
                         matching dependencies

  --site=site            Path to the site into which you wish to install packages. Defaults to current directory

  --skip-install         Only pack, do not install.

EXAMPLE
  $ bl-dev pack /path/to/local/monorepo
```

_See code: [lib/commands/pack.js](https://github.com/johnsonandjohnson/bodiless-js/blob/v0.0.39/lib/commands/pack.js)_
<!-- commandsstop -->
