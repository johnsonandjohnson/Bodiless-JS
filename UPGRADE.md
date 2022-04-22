# Package upgrade guide
This is a non-exhaustive list of packages that need to be upgraded on Bodiless as soon as possible.

## gatsby
- Locked at: ~3.13.0
- Reason: version 3.14 mistakenly introduced breaking changes from the `got` package. After the
update, gatsby started intercepting errors on proxied requests, responding with a generic 500 error
instead of the original one. This affected error messages sent from `bodiless-backend`.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1174
- See also: https://github.com/gatsbyjs/gatsby/issues/33333

## oidc-client-ts
- Locked at: 2.0.0-rc.2
- Reason: 2.0.0-rc.3 version introduced a few type errors into Bodiless. While these are fixable,
it's better to lock into a working version while there's no stable release available.
- Issue: https://github.com/johnsonandjohnson/Bodiless-JS/issues/1243


NOTES:
https://tailwindcss.com/docs/upgrade-guide

TAILWIND Upgrade:
* Upgrade packages  CHECK : tailwindcss & postcss
* Migrating to the JIT engine -- no mode.
* Configure content sources -- replace purge with content -- CHECK had to do in scripts as well.
* Also because of this "If you weren’t already using the purge option in your project, it’s crucial that you configure your template paths now or your compiled CSS will be empty." 

** every package that uses bl-classes other than bodiless-ui is being purged in edit.  NEED TO SOLVE

All these packages use bl-classes:
Bodiless-page
Bodiless-components
Bodiless-components-ui
Bodiless-core
Bodiless-core-ui
bodiless-layouts
Bodiless-layouts-ui
Bodiless-richtext
Bodiless-richtext-ui
Bodiless-ui. ** primary bodiless tailwind and only one not being purged
Gatsby-theme-bodiless

* Remove dark mode configuration -- no usage of darkMode
* Remove variant configuration -- CHECK had to remove in scripts as well
* Replace @variants with @layer -- no usage of @variants
* Automatic transforms and filters -- left usage as they said it was harmless..
* Color palette changes -- 
** replaced -green- with -emerald-
** replaced -yellow- with -amber-   -- no usage -- site & bodiless define their own yellow color
** repleaced -purple- with -violet-
** left -gray- as -gray....
* Class name changes -- 
** overflow-clip with text-clip
** overflow-ellipsis -- no usage
** flex-grow-* -- no usage
** flex-shrink-* -- no usage
** outline-black -- one usage replaced with "focus:outline-black focus:outline-2 focus:outline-dotted focus:outline-offset-2"
** outline-white -- no usage
** decoration-clone -- no usage
** decoration-slice -- no usage
* Separator cannot be a dash - no usage
* Prefix cannot be a function -- no usage
* File modifier order reversed -- no usage
* Fill and stroke use color palette -- no usage
* Negative values removed -- ??
* Base layer must be present -- check at site level
* Screens layer has been renamed -- no usage
