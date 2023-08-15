# Repository Structure

This document describes the conventional repository structure for a Vital site. While you can
certainly use Vital (and Bodiless) without adhering to these conventions, much of the associated
tooling and third-party integrations rely on this structure, and may not work.

All Vital site repositories are structured as *monorepos*, permitting you to develop multiple sites
and/or packages in the same repository. By convention, sites should be placed in
`/sites/{site-name}`, packages in `/packages/{package-name}`.

## Sites

Each Vital site should be structured as an NPM package within th `/sites` directory. Sites should
not contain any component code (see "Site Library Packages" below). 

Some things to remember about the site's `package.json`
- By convention, the site name should be namespaced as `@sites` (`"name": "@sites/{sitename}"`).
- The site should always be private (`"private": true`).

Most site presentational data will live in `sites/{site-name}/src/data`. Page level data lives in
`sites/{site-name}/src/data/pages`, and a page will be created for every subdirectory. SIte-level
data (header, footer, etc) lives in `sites/{site-name}/src/data/site`.

## Site Library Packages

Every Vital site should have an associated library package which contains all code for the site,
while the site itself contains only content and configuration. This facilitates separation of
concerns and potential publication and sharing of components.

?> The site `package.json` should always list the site library as a dependency.

Component code in the site library should live in `./src/components` directory, with one
sub-directory for each component.  The structure of a component subdirectory is described
in the [Component Template documentation](./ComponentTemplate.md).

All tailwind configuration needed for the site should be provided in the site libary's
`tailwind.config.js` at the site library root.

## Other Packages

You can have any number of other packages in th `/packages` directory. This facilitates developing
shared libraries along with a test site.
