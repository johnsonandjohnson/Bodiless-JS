# BodilessJS CLI

## Usage

```shell-session
$ npx @bodiless/cli

$ bodiless COMMAND
running command...

$ bodiless (-v|--version|version)
@bodiless/cli/0.0.52 darwin-x64 node-v16.9.1

$ bodiless --help [COMMAND]
USAGE
  $ bodiless COMMAND
...
```

## Commands

* [`bodiless help [COMMAND]`](#bodiless-help-command)
* [`bodiless new`](#bodiless-new)
* [`bodiless new-vds`](#bodiless-new-vds)
* [`bodiless pack`](#bodiless-pack)

### `bodiless help [COMMAND]`

Display help for BodilessJS CLI.

```
USAGE
  $ bodiless help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.3/src/commands/help.ts ':target=_blank')_

### `bodiless new`

Create a new Bodiless site.

```
USAGE
  $ bodiless new

OPTIONS
  -A, --automation                   Run in automation mode. Disable all
                                     interaction.

  -d, --dest=dest                    Path to the directory where the new site
                                     will be created.

  -h, --help                         Show CLI help.

  -i, --interactive                  Run in interactive mode. Prompt for all
                                     required parameters, even if passed as
                                     flags.

  -n, --name=name                    Name of the new site.

  -r, --revision=revision            [default: latest] Revision of source
                                     monorepo on which new site will be based.

  -s, --site-template=site-template  Name of the starter site to copy.

  -u, --url=url                      [default: https://github.com/johnsonandjohn
                                     son/bodiless-js] URL of remote git
                                     repository to clone.

  -v, --verbose                      Print extra debugging output.

  --clone-local                      Use local repository as source (url flag is
                                     ignored).

  --namespace=namespace              [default: *** NONE] NPM Namespace for
                                     starter package.

  --no-setup                         Skip npm setup.

  --packages-dir=packages-dir        [default: packages] Directory in source
                                     monorepo containing packages.

  --setup=setup                      [default: setup] Name of setup script.

  --sites-dir=sites-dir              [default: sites] Directory in source
                                     monorepo containing sites.
```

_See code: [lib/commands/new.js](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-cli/src/commands/new.ts ':target=_blank')_

### `bodiless new-vds`

Create a new Bodiless/VitalDS site.

```
USAGE
  $ bodiless new-vds

OPTIONS
  -A, --automation                   Run in automation mode. Disable all
                                     interaction.

  -d, --dest=dest                    Path to the directory where the new site
                                     will be created.

  -h, --help                         Show CLI help.

  -i, --interactive                  Run in interactive mode. Prompt for all
                                     required parameters, even if passed as
                                     flags.

  -n, --name=name                    Name of the new site.

  -r, --revision=revision            [default: latest] Revision of source
                                     monorepo on which new site will be based.

  -s, --site-template=site-template  [default: __vital__] Name of the starter
                                     site to copy.

  -u, --url=url                      [default: https://github.com/johnsonandjohn
                                     son/bodiless-js] URL of remote git
                                     repository to clone.

  -v, --verbose                      Print extra debugging output.

  --clone-local                      Use local repository as source (url flag is
                                     ignored).

  --namespace=namespace              [default: *** NONE] NPM Namespace for
                                     starter package.

  --no-setup                         Skip npm setup.

  --package-template

  --packages-dir=packages-dir        [default: packages] Directory in source
                                     monorepo containing packages.

  --setup=setup                      [default: setup] Name of setup script.

  --sites-dir=sites-dir              [default: sites] Directory in source
                                     monorepo containing sites.
```

_See code: [lib/commands/new-vds.js](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-cli/src/commands/new-vds.ts ':target=_blank')_

### `bodiless pack`

Pack and install dependencies from a local monorepo.

```
USAGE
  $ bodiless pack

OPTIONS
  -f, --force            Install packages even if they are not existing
                         dependencies of the site.

  -h, --help             Show CLI help.

  -p, --package=package  Name of package to bundle. May be specified more than
                         once. If omitted, will bundle all matching
                         dependencies.

  -r, --repo=repo        [default: .] Path to the local lerna monorepo, relative
                         to the current directory. Must contain the package
                         source in a `packages` directory.

  -s, --site=site        [default: .] Path to the site into which you wish to
                         install packages, relative to the current directory.

  --dry-run              Do not pack or install. Just show list of matching
                         packages.

  --skip-install         Only pack, do not install.

EXAMPLES
  $ bodiless pack -r /path/to/local/monorepo
  $ bodiless pack -s /path/to/site
```

_See code: [lib/commands/pack.js](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/bodiless-cli/src/commands/pack.ts ':target=_blank')_
