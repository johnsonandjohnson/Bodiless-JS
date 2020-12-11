# Monorepo Setup

This project is broken into parts in a monorepo.  Each separate package is located in the `packages` folder.  We are using lerna to manage these repo.

## Shared items
We have some actions that we take globally this include linting formatting and testing.  They can be executed by use of npm at the top level.

* `npm run lint` runs the global linting on all packages
* `npm run format` runs th format script on all packages
* `npm run test` runs the test script on all packages

This means that we do not have locally defined testing config

Dev Dependencies: 
- Currently there is a global `package.json` that includes all of the dev dependancies.  
- If one adds new dev dependancies one should do it there.

## Across project scripts
If one wants to run a script that is set up in multiple packages they can use the 

```
npx lerna SCRIPTNAME
```
command it will use lerna to execute SCRIPTNAME in all packages that have it.

## Hoisting
When we build with npm bootstrap we are using lerna's `--hoist` flag, this means that any shared dependencies will be installed at the root node_modules folder instead of in individual folders. It also means that we will have a global package-lock.json file.

## Packages
```
                                       +--------------+
                                       |              <----+-----------+-----------------+---------------------------+
                                       |     bl+ui    |    |           |                 |                           |
                                       |              |    |           |    +--------+   |                           |
                                       +------+-------+    |           |    |        |   |                           |
                                              ^            |           +--->+ FClass |   |                           |
                                              |            |                |        |   |                           |
                                       +------+-------+    |                +--------+   |                           |
                                       |              |    |                             |                           |
                                       |   BL+Core    <---------------+-----------------------------+                |
                                       |              |    |          |                  |          |                |
                                       +-+------+-----+    |          |                  |          |                |
                                         ^      ^          |          |                  |          |                |
                                         |      |          |          |                  |          |                |
                                         |  +---+----------++         |                  |          |                |
                                         |  |               |         |                  |          |                |
                                         |  |  bl+core+ui   +<--------+                  |          |                |
                                         |  |               |         |                  |          |                |
                                         |  +---+-----------+         |                  |          |                |
                                         |      ^                     |                  |          |                |
                                         |      |                     |                  |          |                |
                                         |      |                     |                  |          |                |
                                       +-+------+---------+   +-------+-------+          |  +-------+---------+      |
                                       |                  |   |               |          |  |                 |      |
                                       |   BL+components  |   |  BL+richtext  |          |  |   bl+layouts    |      |
                                       |                  |   |               |          |  |                 |      |
                                       +--------+---------+   +-------^-----+-+          |  +---+-------+-----+      |
                                                ^                     ^     ^            |      ^       ^            |
                                                |                     |     |            |      |       |            |
                  +----------------+            |                     |   +-+------------+-+    |   +---+------------++
                  |                +            |                     |   |                |    |   |                 |
+------------+    | Gatsby+theme+bl    +--------+---------+           |   | bl+richtext+ui |    |   |  bl+layouts+ui  |
|            |    |                +   |                  |           |   |                |    |   |                 |
| bl+backend |    +------+---------+   |Bodiless+Components|           |   +--------+-------+    |   +--------+--------+
|            |           ^             |                  |           |            ^            |            ^
+-----+------+           |             +--------+---------+           |            |            |            |
      ^                  |                      ^                     |            |            |            |
      |                  |                      |                     |            |            |            |
      |                  |                      |                     |            |            |            |
      |                  |                      |                     |            |            |            |
      |                  |              +-------+------+              |            |            |            |
      |                  |              |              |              |            |            |            |
      +------------------+--------------+         site +--------------+------------+------------+------------+
                                        |              |
                                        +--------------+

```
created with http://asciiflow.com/
## Current Packages

* [fclasses](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/fclasses): Provides functionality to inject functional class into react components
* [bodiless-core](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-core): 
* [bodiless-backend](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-backend): Contains the backend server for saving data and doing git operations
* [bodiless-richtext](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-richtext): Provides a Rich Text component that can consume other components and make them available to the content editor.
* [bodiless-components](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-components): Provide a collection of components that can be used in the bodiless system
* [gatsby-theme-bodiless](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/gatsby-theme-bodiless): Provides a gatsby theme for starting a bodiless site.
* [bodiless-migration-tool](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/packages/bodiless-migration-tool): Allows to convert an existing site (independent of its technology) into a static flattened html site.
