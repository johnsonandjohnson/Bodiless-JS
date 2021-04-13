# Breadcrumbs

### Exported HOCs

 - `withBreadcrumbStore` - HOC that adds breadcrumb store and renders breadcrumbs.
 - `asBreadcrumbs` - HOC that adds breadcrumb props retrieved from breadcrumb store.
 - `AsBreadcrumb` - Creates an HOC which specifies that a wrapped component is a breadcrumb. The HOC will read link and title from the specified nodekeys and will push link and title to the breadcrumb store. Once the wrapped component is unmounted, the corresponding link and title are deleted from the breadcrumb store.
 - `withEditableFinalTrail` - Enables rendering of the final trail for a Breadcrumb component with a provided Editors. Uses `withDefaultMenuTitleEditors` by default.
 - `withEditableStartingTrail` - Enables rendering of the starting trail for a Breadcrumb component with a provided Editors. Uses `withDefaultMenuTitleEditors` by default, pre-configured with a link to the home page.
 - `withBreadcrumbItemToken` - Applies supplied tokenDefs to the `StartingTrail`, `FinalTrail`, and `Title` all breadcrumb items.
 - `useBreadcrumbContext` - A Hook to get the current Breadcrumb Item context values.
 - `useBreadcrumbStore` - React hook to get Bredcrumbs store.
 - `useIsActiveTrail` - Hook which can be used to determine if a breadcrumb item is part of the current active breadcrumb trail.
 - `withBreadcrumbStartingTrail` - HOC that enables rendering of starting trail for a breadcrumb based component.
 - `withoutBreadcrumbStartingTrail` - HOC that disables rendering of starting trail for a breadcrumb based component.
 - `withBreadcrumbFinalTrail` - HOC that enables rendering of final trail for a breadcrumb based component.
 - `withoutBreadcrumbFinalTrail` - HOC that disables rendering of final trail for a breadcrumb based component.

### Breadcrumbs Structure
We can leverage `BreadcrumbsClean` component to build Breadcrumbs. Here is an example:
```js
import { asReadOnly } from '@bodiless/core';
import {
  BreadcrumbsClean,
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import { asToken } from '@bodiless/fclasses';

import { $withBreadcrumbStyles } from './MenuBreadcrumbs.token';

const $withBreadcrumbEditors = asToken(
  // First we specify what Editors we will use for the breadcrumb Items.
  // We use `withMenuTitleEditors` since Menu Titles and Breadcrumb Titles
  // have the same structure. `withMenuTitleEditors` comes with pre-configured
  // Editors and we don't need to specify first argument. We also add `asReadOnly`
  // so that breadcrumb middle trails are not editable.
  withMenuTitleEditors(undefined, asReadOnly),
  // We also keep a default Menu editors for the StartingTrail here,
  // but provide a 'site' nodeCollection so that it is the same on every page.
  withEditableStartingTrail(undefined, { nodeCollection: 'site' }),
  // Default Editors for the FinalTrail as well. 
  withEditableFinalTrail(),
);

const Breadcrumbs = asToken(
  // `asBreadcrumbs` allows to retreive Breadcrumb Items from the store and
  // pass it as an `item` prop to the `BreadcrumbsClean` component.
  asBreadcrumbs,
  // Add Breadcrumbs editors.
  $withBreadcrumbEditors,
  // Add Breadcrumbs styles.
  $withBreadcrumbStyles,
)(BreadcrumbsClean);

export default Breadcrumbs;
```

#### Breadcrumbs Context Provider and Store
For breadcrumbs to work right, we need a place where Breadcrumb Items will be stored. There is a `withBreadcrumbStore` HOC exported from the `@bodiless/navigation` that may be used to add a `BreadcrumbStore` to the component. Usually it is registered on the top-level container so that the rest of the components on the page have an access to it.

```js
import { Fragment } from '@bodiless/fclasses';
import { withBreadcrumbStore } from '@bodiless/navigation';

const BreadcrumbsProvider = withBreadcrumbStore(Fragment);

const BaseLayout = ({ children, components }) => {
  // ...
  return (
    <BreadcrumbsProvider>
      <SiteHeader />
      <Container>
        {children}
      </Container>
      <SiteFooter />
    </BreadcrumbsProvider>
  );
};
```

#### Adding custom breadcrumbs separator
It is possible to add a custom separator for the Breadcrumb Items:
```js
// First let's create a helper that will add supplied separator as a child.
const withSeparator = (separator: string) => addProps({
  children: separator,
});

// Then we create a custom separator. We can leverage `Separator` design key.
// We can then use this `withArrowSeparator` token with the `BreadcrumbsClean` component.
const withArrowSeparator = withDesign({
  Separator: withSeparator('>'),
});
```

### Breadcrumbs Styling
We can leverage `fClasses` to style Breadcrumbs components. Here is the list of all design keys:
```js
const $withBreadcrumbStyles = withDesign({
  StartingTrail: addClasses(...),
  FinalTrail: addClasses(...),
  Title: addClasses(...),
  Separator: addClasses(...),
  Wrapper: addClasses(...),
  Item: addClasses(...),
});
```
Note that by default `Title`, `StartingTrail`, and `FinalTrail` are the same components as `MenuTitle` and each has `Link` and `Title` components:
```js
const $withBreadcrumbStyles = withDesign({
  Title: withDesign({
    Link: addClasses(...),
    Title: addClasses(...),
  }),
});
```
The `Link` sub component is also by default configured as `LinkToggle`. It means it can be further broken down into components:
```js
const $withBreadcrumbStyles = withDesign({
  Title: withDesign({
    Link: withDesign({
      Link: addClasses(...), // Classes for the Link when it's toggled on
      _default: addClasses(...), // Classes for the Link when it's toggled off
      }),
    Title: addClasses(...),
  }),
});
```

### Complete Breadcrumbs Example
```js
import { asReadOnly } from '@bodiless/core';
import {
  BreadcrumbsClean,
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import { asToken } from '@bodiless/fclasses';

import { $withBreadcrumbStyles } from './MenuBreadcrumbs.token';

const $withBreadcrumbEditors = asToken(
  withMenuTitleEditors(undefined, asReadOnly),
  withEditableStartingTrail(undefined, { nodeCollection: 'site' }),
  withEditableFinalTrail(),
);

// Only apply asLink to the Link component and not the _default one. ( LinkToggle )
const withLinkToggleStyles = withDesign({
  Link: withDesign({
    Link: asLink,
  }),
});

const withArrowSeparator = withDesign({
  Separator: addProps({ children: '>' }),
});

const $withBreadcrumbStyles = asToken(
  withDesign({
    Separator: addClasses('mx-1'),
    Wrapper: addClasses('inline-flex'),
    Title: withLinkToggleStyles,
  }),
  withArrowSeparator,
);

const Breadcrumbs = asToken(
  asBreadcrumbs,
  $withBreadcrumbEditors,
  $withBreadcrumbStyles,
)(BreadcrumbsClean);

export default Breadcrumbs;
```
