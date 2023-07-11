# Vital Search Component

Vital Search is based on the [BodilessJS Search](../../../Components/Search/) component.
It adds features and styles specific to VitalDS sites.

?> **Note:** Vital Search re-exports everything Bodiless Search does. This means that, if you're
using Vital Search, you can simply import anything from Bodiless Search using `import { something }
from '@bodiless/vital-search'` instead. This way, you don't have to depend on both
`@bodiless/search` and `@bodiless/vital-search`.

## Activating search on your Vital site.

The default Vital starter does not ship with search enabled. If you'd like to activate,
make the following changes.

1. In `packages/{yoursite}/src/shadow/@bodiless/vital-templates/Page.ts`
   - Add the following imports:
     ```
     import { vitalSearchGenericTemplate, withSearchMenuProvider, withSearchResult } from '@bodiless/vital-search';
     ```
   - Add the following to the  `Default` token:
     ```
     ...
     Components: {
       ...vitalPage.Default.Components,
       Search: on(GenericTemplateClean)(vitalSearchGenericTemplate.Search),
       ... // Any other additional templates you are using.
     },
     Compose: {
       ...vitalPage.Default.Compose,
       WithSearchContext: as(withSearchMenuProvider, withSearchResult),
       ... // Any other additional tokens you are composing
     }
     ```
1. In `packages/{yoursite}/src/shadow/@bodiless/vital-layout/Header.ts`:
   - Add the following import:
     ``` 
     import { vitalSearchHeader } from '@bodiless/vital-search';
     ```
   - Extend the  `Default` token:
     ```
     const Default = asHeaderToken(
       vitalHeaderBase.Base,
       vitalSearchHeader.WithSearch,
       ... // Any other extensions you are using
     ```
1. In `packages/{yoursite}/package.json`
   - Add `@bodiless/vital-search` as a dependency.
   - add the following scripts
     ```
     "build": "npm-run-all build:env-vars build:lib build_search",
     "build:search": "create-vital-search-index",
     ```
