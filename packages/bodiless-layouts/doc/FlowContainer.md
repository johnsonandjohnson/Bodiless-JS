# FlowContainer Component

The Flow Container is a layout component that allows you to select from a set of components, 
place them on the page, and resize them. The Flow Container is  defined by page templates. 
These templates are created by a developer and define the spaces available to add content 
(components).

Flow Containers can be configured to utilize the _Content Library_, allowing Content Editors to save
components that they've created for reuse elsewhere on your site.

## Content Editor Details

When an empty Flow Container is on the page you will only see a box bounded by dotted line.

![](./assets/EmptyFlowcontainer.jpg)


### Add a new component

![](./assets/ComponentLibraryNew.jpg)


When you activate a Flow Container you will be able to add a new component to the Flow 
Container via the Component Library.

By clicking on the component selector button you can scroll through all of the available 
components. You can filter the components by:

* Using search facets to filter out components that do not match the selection 
(you can undo this by clicking the "select all" checkbox at the top).
* Using the search box field to search across all of the component titles.
* If the Content Library has been enabled in the current Flow Container, and there is existing
  content data available in the library, you can select the "Content Library" checkbox (under
  "Type") to filter for components saved in the Content Library.

You can hover over the information icon to see a description of the component.

When you have found the right component, simply click on it, and it will be
added at the end of the activated flowContainer.

### Removing a component

When any component in the flowContainer is active it will provide a delete button to the 
context menu. Clicking on this icon will remove the component.

### Resizing a component

When any component in the flowContainer is active it will appear with a blue
border. You can resize the component by clicking on the right edge of the
border. 
?> Note: this can be done at different breakpoints to adjust the size of
the component at that breakpoint and above. Therefore, if you want a component to 
be a specific size at a certain breakpoint you will have to resize the editor to 
that breakpoint and resize the component again. 

The sizes are finite and defined by the creator of that particular flowContainer.
Smaller breakpoints will offer fewer options for resizing.

### Reordering a component

When any component in the flowContainer is active it will appear with a blue
double line icon in the top left corner of the component. By clicking and
dragging this icon you can reorder components in the flowContainer.

### Replacing a Component

To replace a component, use the swap button from the toolbar. It will replace the component 
without losing data (as long as the data is applicable in the replacement component). 
You can also replace a component by deleting it and adding a new component in its place
via the add button on the toolbar. 

### Saving a component in the Content Library

If the instance of the current Flow Container has been configured to use it, then you will be able
to save components and their content to the Content Library.

Within the context menu of any component in the Flow Container, you will see a "Library" subsection
with an **Add** button.

![Context Menu with Library subsection](./assets/ContextMenuWithLibrary.jpg ':size=50%')

Click **Add** to save your component, along with its embedded content, to the Content Library. Now,
you will be able to reuse this component anywhere on your site by adding it to any instance of the
same Flow Container.

?> **Note:** Editing the Content Library component — from anywhere — will update the content in all
places the component is used.

---

## Site Builder Details

### Adding components to the FlowContainer

The FlowContainer uses the Design API to collect the components to make available 
for placement:

``` js
import { FlowContainer } from '@bodiless/layouts-ui";

design = {
    Card: flow(startWith(Card), asDefaultCard),
    CardVertical: flow(startWith(Card), asVerticalCard, asDefaultCard),
  }
const SiteFlowContainer = withDesign(design)(FlowContainer);
```

Use the `startWith` HOC to declare the base component and 
then use any other hoc that will add to this specific version.

> Note that we import the flow container from `@bodiless/layouts-ui`, not
> directly from `@bodiless/layouts`.  All Bodiless components which
> have a content-editor facing UI have a corresponding UI package
> which defines the look and feel of that UI.

### Metadata and Component Selector Filters

The facets and terms of the search filters which appear in the component selector
are defined by metadata attached to the components.  Each component aggregates
the metadata attached to all the tokens which have been applied to the
component:

```js
const asBlueCard = asToken({
  withDesign({ Wrapper: withBlueBorder }),
  asToken.meta.term('Color')('Blue'),
});
const asRedCard = asToken({
  withDesign({ Wrapper: withRedBorder }),
  asToken.meta.term('Color')('Red'),
});
const ColoredCardsFC = withDesign({
  BlueCard: asToken(startWith(Card), asDefaultCard, asBlueCard),
  RedCard: asToken(startWith(Card), asDefaultCard, asRedCard),
})(FlowContainer);
```
The above will cause the component selector to display a "Color" filter
with checkboxes for "Red" and "Blue".

#### Mandatory Categories
To reduce visual noise, the component selector will only display filters for
categories in which all the currently filtered components have at least one
term. For example:

```js
const ColoredCardsFC = withDesign({
  PlainCard: asToken(startWith(Card), asDefaultCard),
  BlueCard: asToken(startWith(Card), asDefaultCard, asBlueCard),
  RedCard: asToken(startWith(Card), asDefaultCard, asRedCard),
})(FlowContainer);
```

will not display the Color filter by default unless the `PlainCard`
is filtered out (for example by a text search).

To force a category to appear, you can specify it using the `mandatoryCategories`
prop to the flow container:
```js
const FCWithMandatoryColorFilter = addProps({ mandatoryCategories: ['Color'] })(FlowContainer);
```

#### Blacklisted Categories
Depending on the kind of metadata you attach to tokens, it may be desirable
to exclude certain categories from appearing.  This can be done via the
`blacklistCategories` prop:
```js
const asBlueCard = asToken({
  withDesign({ Wrapper: withBlueBorder }),
  asToken.meta.term('Color')('Blue'),
  asToken.meta.term('Design System')('JnJ'),
});
const FCWithBlacklistedCategory = asToken(
  withDesign({
    BlueCard: asToken(startWith(Card), asDefaultCard, asBlueCard),
  }),
  addProps({ blacklistCategories: ['Design System'] }),
)(FlowContainer);
```
Only the "Color" filter will be displayed (not the "Design System" filter).

#### Other metadata
In addition to categories, components can have `title` and a `description`
properties. These are used to provide more information about the component
to the editor, and for searching.
```js
const ColoredCardsFC = withDesign({
  PlainCard: asToken(startWith(Card), asDefaultCard, { title: 'Card with no color' }),
  BlueCard: asToken(startWith(Card), asDefaultCard, asBlueCard, { title: 'Blue Card' }),
  RedCard: asToken(startWith(Card), asDefaultCard, asRedCard, { title: 'Red Card; }),
})(FlowContainer);
```

Often an explicit title is not necessary, and `@bodiless/layouts` provides
a helper token which causes all the components in the flow container
to receive a default title based on their metadata:
```js
const ColoredCardsFCWithDefaultTitles = asToken({
  withDesign({
    PlainCard: asToken(startWith(Card), asDefaultCard),
    BlueCard: asToken(startWith(Card), asDefaultCard, asBlueCard),
    RedCard: asToken(startWith(Card), asDefaultCard, asRedCard),
  }),
  withAllTitlesFromTerms({ blacklistCategories: ['Design System'] }),
})(FlowContainer);
```
The default title will only be applied if the component does not have
an explicit title.

### Using `varyDesign`

If you have a component with many variations which you want to make
available in a flow container, it can be tiresome to list them all in
a design, eg:
```js
const FCWithManyCardVariations = withDesign({
  BlueRoundedHorizontalCard = asToken(startWith(Card), asDefaultCard, asBlueCard, asRoundedCard, asHorizontalCard),
  BlueRoundedVerticalCard = asToken(startWith(Card), asDefaultCard, asBlueCard, asRoundedCard, asVerticalCard),
  BlueSquareHorizontalCard = asToken(startWith(Card), asDefaultCard, asBlueCard, asHorizontalCard),
  BlueSquareVerticalCard = asToken(startWith(Card), asDefaultCard, asBlueCard, asVerticalCard),
  ...
})(FlowContainer);
```
To simplify this process, you can use the
[`varyDesign`](../../Development/Architecture/FClasses#design-variants)
function exported from `@bodiless/fclasses`.

### Constraining Component Widths

The Flow Container controls the width of components by setting different classes
on their wrapper component. The Flow Container uses a set of tailwind width
classes by default. These set the available widths to 1/4, 1/3, 1/2, 2/3, 3/4
and full for all viewport sizes except "small", and to full only for small
viewports.

If you are using tailwind, the easiest way to define a new set of width
constraints is using the `withTailwindWidthConstraints` helper. You pass it your
fully resolved tailwind configuration, and it returns a function which accepts a
list of tailwind width classes and returns a token which constrains flow
container items to those widths:
```js
import resolveConfig from 'tailwindcss/resolveconfig';
import tailwindConfig from './path/to/your/tailwind.config';

const withWidthConstraints = flow(
  resolveConfig,
  withTailwindWidthConstraints,
)(tailwindConfig);

const ConstrainedFlowContainer = withWidthConstraints('lg:w-1/2 lg:w-full')(FlowContainer);
```
Note that we specify our constraints with a responsive prefix. The flow container will
apply these constraints only at the specified viewport size. Tailwind is "mobile first",
so to change the constraints at the smallest viewports, we would use no prefix:

```js
withWidthConstraints('w-1/2 w-full lg:w-1/3 lg:w-1/4 lg:w-1/2 lg:w-2/3 lg:w-3/4 lg:w-full');
```

#### Advanced usage
The `snapData` prop allows the user to provide a function that can set any set of classes.
This function should take an object with a className property (which is a string of the
current classes) and a width property. It then returns an object with a className property
(an updated version of the className) and a width property (the width to which it should snap). 
Both width properties are expressed in percentages (e.g. 50%, 75%).

#### Helper functions for snapData

There are two helper functions for `snapData`.

* **`withTailwindClasses`**: takes a tailwind configuration and the classes in that 
configuration you would like to use. It returns a snapData function using the data from 
the tailwind config.

   ``` js
   import tailwindConfig from '../tailwind.config';

   const snapData = withtailwindClasses(tailwindConfig)('w-full, md:w-full, md:w-1/2, lg:w-full, lg:w-1/2, lg:w-1/3, lg:w-1/4');
   ```
     ---

* **`getSnapFrom`**: can be used with `withTuple` to create a snapData as well. 
Each `withTuple` takes a mediaQuery at which it is active, a width to which it 
corresponds and a class to used.

  ``` js
  const defaultSnapData = getSnapFrom(
    withTuple('(min-width: 0px)')(100)('w-full'),
    withTuple('(min-width: 576px)')(50)('sm:w-1/2'),
    withTuple('(min-width: 576px)')(100)('sm:w-full'),
    withTuple('(min-width: 992px)')(25)('lg:w-1/4'),
    withTuple('(min-width: 992px)')(33.33)('lg:w-1/3'),
    withTuple('(min-width: 992px)')(50)('lg:w-1/2'),
    withTuple('(min-width: 992px)')(66.66)('lg:w-2/3'),
    withTuple('(min-width: 992px)')(75)('lg:w-3/4'),
    withTuple('(min-width: 992px)')(100)('lg:w-full'),
  );
  ```

---

#### Default Width

One can set the default width classes via the `getDefaultWidth` prop. The prop
is a function that will be passed the snapData function. It is expected to
return a string of the starting classes

example:

```js
const FlowContainerWithDefaultWidth = addProps({
  getDefaultWidth: () => 'w-full lg:w-1/4',
})(FlowContainer);
```

### Limit Number of Components

**`maxComponents`** will limit the number of components that can be added to the
Flow Container. If the number of components equals the value of maxComponents
then the add button will not be visible. If a component is removed and the
number of components is less than the max value then the add button will
reappear.

**`minComponents`** will limit the number of components that can be removed from
th Flow Container. If the number of components is less than or equal to the
value of minComponents then the delete button will not be visible.

### Component Selector Preview
The component selector displays a preview of each component to help the
content editor understand what she is selecting.  By default, this is
simply a scaled version of the original component. In some cases, it may
be desirable to render a custom preview (for example, the actual rich text
component is just an empty box, so instead we render its format bar as
a preview).

To facilitate custom previews, the flow container provides a React context
informing each component whether it is being rendered in the component
selector or on the actual page.  A component can use this to change the
way it renders in each context.  For example:
```js
import { ifComponentSelector } from '@bodiless/layouts';

const withCustomPreview = ifComponentSelector(
  addProps({ children: 'this is a preview' }),
  addClasses('text-center italic'),
);

const variations = varyDesigns<any>(
  base,
  borders,
  colors,
  { '': withCustomPreview },
);
```
Here, `ifComponentSelector` consumes the context provided by the flow container
and provides a
[flow toggle](../../Development/Architecture/FClasses#flow-toggles) which
applies a set of tokens only if the component is being rendered as a preview
inside the component selector.

Note how we applied `withCustomPreview` to all variations by adding a
design with a single key to the list of designs provided to `varyDesigns`.
Because there is only one key which is being applied to all variations, we
can use an empty string.

### Component Selector Scale
The component selector displays component previews in a grid with one, two
or four items per row.  By default the initial scale is one item per row,
but this can be controlled via the `scale` prop.  For example:

```ts
import { ComponentSelectorScale } from '@bodiless/layouts`;
import { FlowContainer } from '@bodiless/layouts-ui`;
<FlowContainer scale={ComponentSelectorScale.Quarter}>
```

The above will set the initial scale to 4 items per row.

### Using the Component Selector outside the Flow Container

The Bodiless component selector can be rendered independently of
the flow container. You can use it anywhere you want to give the user
a choice of components.  One use-case might be to provide a styleguide
page which allows a user to browse all components available in a
design system:

```js
import { ComponentSelector } from '@bodiless/layouts-ui';
// Use the same design you would use to populate the flow container.
import { flowContainerDesign } from 'my-flow-container';

const StyleGuideBase = props => {
  const { components, ...rest } = props;
  return (
    <ComponentSelector
      {...rest}
      components={Object.values(components)}
    />
  );
};
const StyleGuide = asToken(
  designable({}, 'StyleGuide'),
  withDesign(flowContainerDesign),
  onSelect={() => null}
)(StyleGuideBase);
```

A few things to note when using the component selector independently:

- the `components` prop accepted by the component selector is different from
  that created by `designable`. In order to use the same design as that
  accepted by the flow container, we convert this object to an array
  in the `StyleGuideBase` component above.
- You must provide an `onSelect` prop which will be invoked when the
  user clicks on one of the components.  Above, we do nothing, but you
  could easily modify this, for example, to redirect the user to a
  page containing documentation for the selected component.
- You must provide a `ui` prop to define the elements used in the
  component selector UI.  You can use the default `ui` by importing
  the component selector from `@bodiless/layouts-ui`.  You can also
  customize this UI to meet your needs:
  ```ts
  import { ComponentSelector } from '@bodiless/layouts';
  import { componentSelectorUi } from '@bodiless/layouts-ui';

  const ui = {
    ...componentSelectorUi,
    MasterWrapper: removeClasses('bl-text-white')(componentSelectorUi.MasterWrapper),
  };
  ...
  <ComponentSelector ui={ui} />
  ```
- By default, the component selector will display all components in their
  [preview mode](#component-selector-preview) if available.  If you want
  instead to display the components normally, as they would appear on a page,
  you can override the default behavior via the `mode` prop:
  ```ts
  import { ComponentDisplayMode } from '@bodiless/layouts';
  ...
  <ComponentSelector mode={ComponentDisplayMode.EditFlowContainer} />;
  ```
- The default component selector UI overlays all components with a button
  (clicking this button invokes the `onSelect` prop). As a result, the
  components are not editable.  One way to defeat this behavior, is to
  modify the default UI `ComponentSelectButton` element:
  ```ts
  import { componentSelectorUi } from '@bodiless/layouts-ui';

  const ui = {
    ...componentSelectorUi,
    ComponentSelectButton: () => null,
  };
  ```
- By default, the component selector does not provide an independent content
  node to each item.  If you want to make the components editable, you may
  want to do so yourself, again by modifying the default UI:
  ```ts
  import { componentSelectorUi } from '@bodiless/layouts-ui';

  const withNodeKeyFromItemId: HOC = Component => {
    const WithNodeKeyFromItemId: FC<any> = props => (
      <Component {...props} nodeKey={props['data-item-id']} />
    );
    return WithNodeKeyFromItemId;
  };

  const ui = {
    ...componentSelectorUi,
    ItemBox: asToken(
      withNode,
      withNodeKeyFromDisplayName,
    )(componentSelectorUi.ItemBox),
  };
  ```
  In the example above, we leverage the `data-item-id` prop which is passed
  to the `ItemBox` component.  This is the unique key identifying the component.

### Enable Content Library

You can configure a Flow Container to use the Content Library, providing Content Editors with a
"Library" section within the context menu of components added to that Flow Container.

When the Content Editor adds a component to the Content Library:

* The component's data is copied to the Content Library, along with the component key which
  identifies the component in the Flow Container;
* The component is replaced with a "library" version of the component containing the current
  content;
* The component is then available to be added to any instance of the same Flow Container on any page
  of the site;
* The metadata of the "library version" of the component is the same as that of the original
  component (except for the "Name" and "Description" provided by the Content Editor upon adding it
  to the Content Library);
* Editing the Content Library component — from anywhere — will update the content in all places the
  component is used.

#### How to enable the Content Library feature on a Flow Container

The `@bodiless/layouts` package exports a `withLibraryComponents` HOC that adds the Content Library
feature to a wrapped Flow Container.

For example, to create a Flow Container with the Content Library enabled:

```tsx
...
import { FlowContainer } from '@bodiless/layouts-ui';
import { withLibraryComponents } from '@bodiless/layouts';

// Add variant component designs, includes RTE, Image, Card etc, for component selector filtering.
import withDefaultVariations from './withDefaultVariations';
...

// Create a Flow Container with Content Library enabled.
const FlowContainerWithContentLibrary = asToken(
  // Apply Content Library HOC before other design variants.
  withLibraryComponents(),
  asDefaultFlowContainer,
)(FlowContainer);
```

Then use this Flow Container on the site page:

```tsx
const MY_PAGE_PATH = 'myPage';

<FlowContainerWithContentLibrary
  id={MY_PAGE_PATH}
  nodeKey={MY_PAGE_PATH}
/>
```

The `withContentLibrary` function also takes one optional path parameter, which is typed as
`LibraryNodePath`, so the Site Builder can specify a customized Content Library storage path; if
not provided, the path will default to `['Site', 'default-library']`.

?> **Note:** When defining a FlowContainer with the Content Library, `withLibraryComponents` should
be applied before any other "withDesign" HOCs, as the Content Library needs to know all the designs
being added.

To support a nested Flow Container with the Content Library feature, a variant HOC can be created
like the following:

```tsx
...

export const withLibraryFlowContainerVariations = withDesign({
  FlowContainer: asToken(
    replaceWith(
      asToken(
        withLibraryComponents(),
        asDefaultFlowContainer,
        withNodeKey('innerLibraryFC'),
      )(FlowContainer),
    ),
    ifComponentSelector(
      replaceWith(FlowContainerPreview),
    ),
    withType('Flow Container with Library')(),
    withTitle('Flow Container with Library'),
    withDesc('Adds a flow container with library'),
  ),
});
```

Then apply it to a Flow Container component like we created previously:

```tsx
...

const FlowContainerDefaultWithContentLibrary = asToken(
  withLibraryComponents(),
  asDefaultFlowContainer,
  withLibraryFlowContainerVariations,
)(FlowContainer);
```
