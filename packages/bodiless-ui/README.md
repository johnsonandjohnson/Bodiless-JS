# `@bodiless/ui`

This package contains shared UI elements for the default Bodiless edit
interface. UI elements which are used by more than one Bodiless package should
be defined here.

## Exposing an "injectible" UI.

In general, any Bodiless component which exposes an edit interface or other
administrative UX should allow injection of the UI elements it needs by
accepting a `ui` prop.  The value for this prop should be a keyed set of
components.  The structure of this object should be defined by a `UI`
interface. For example, consider a component which renders a message:

```
type FullUI = {
  Wrapper: ComponentType<HTMLProps<HTMLDivElement>> | string,
  Text: ComponentType<HTMLProps<HTMLSpanElement>> | string,
  DismissButton: ComponentType<HTMLProps<HTMLButtonElement>> | string,
  Icon: ComponentType<HTMLProps<HTMLSpanElement>> | string.
};

export type UI = Partial<FullUI>;

export type Props = {
  message: string,
  icon: string,
  ui?: UI,
};

const defaultUI: FullUI = {
  Wrapper: 'div',
  Text: 'span',
  DismissButton: 'button',
  Icon: 'i',
};

const getUI = (ui: UI) => ({ ...defaultUI, ...ui });

export const MessageBox = ({ message, icon, ui }) => {
  const { Wrapper, Text, DismissButton, Icon } = getUI(ui);
  return (
    <Wrapper>
      <Icon>{icon}</Icon>
      <Text>{message}</Text>
      <DismissButton />
    </Wrapper>
  );
};
```

## Implementing the UI

A library can now implement the UI by wrapping the "clean" version of the component
with a version which provides styled UI elements (the following example uses the `fclasses`
library to style using tailwind classes):

```
import { stylable, addClasses } from '@bodiless/fclasses';
import { MessageBox as CleanMessageBox, Props } from 'messagebox';

const Div = stylable<HTMLProps<HTMLDivElement>>('div');
const Span = stylable<HTMLProps<HTMLSpanElement>>('span');

const ui: UI = {
  Wrapper: addClasses('bg-black text-white')(Div);
  Icon: addClasses('block material-icon text-xl')(Span);
};

export const MessageBox: FC<Props> = props = <CleanMessageBox {...props} ui={ui} />;
```

Note - here we only provide overrides for two out of the four elements.  The
others will fall back to their defaults.

## Default UI

Each package in the bodiless ecosystem should have a corresponding `-ui`
package which exports a default implementation of the UI for any admin
or editorial interfaces it supplies.  Wherever possible, this package
should make use of shared elements from this basic `bodiless-ui` package.

## Components

### &lt;Spinner /&gt;

Adds the spinner, which centers itself based on its container's dimensions.

You can also override the width and height if you want a bigger or smaller spinner by adding more style rules to the exposed `.bodiless-spinner` class [here](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/bodiless-ui/src/Spinner.css). 

*Properties*

|Name|Type|Default|Description|
|-----|-----|-----|-----|
|color |String | |The css class name, used to control a color of the spinner. |

*Usage:*

```tsx
import { Spinner } from '@bodiless/ui';
import React, { Component } from 'react';

export default class Example extends Component {
  render() {
  return (
      <div>
        <Spinner color="bl-bg-gray" />
      </div>
    );
  }
}
``` 
## Bodiless classes

Bodiless uses tailwind for the styling of bodiless editor. A site built with this tool also uses
tailwind for site styling. This leads to two tailwind configs in use.  Bodiless tailwind config
resides in `packages/bodiless-ui/bodiless.tailwind.config.js`. We have prefaced it with the prefix `bl-`
to isolate styling needed for the Bodiless editor. The site’s `tailwind.config.js` resides at site
level (i.e. `examples/test-site or examples/starter`) and this is also built.  Therefore we introduce
two css files within the edit mode: prefixed (`bs-`) for bodiless editor and non-prefixed for the
site. The static mode would only serve the non-prefixed (at this point in time it is a future
enhancement to remove the bodiless editor from static build).

The recommended guideline is to prefix any bodiless editor styling with `bl-` and any site level
styling without the prefix to continue this separation.

## Technical Details

The default `tailwind.config` uses `rem` based grid styling system for paddings, margins, etc. While
`rem`s may be good for `font-size` it brings some level of inconsistency when it used for margins,
paddings, widths, etc. since it is based on the body font-size. In this PR we configured our
`bodiless.tailwind.config` to use `px` instead of `rem`. It has a basic `5px` grid system ( all
margins, paddings, widths, etc. are measured with increments of 5 ) and can be extended as we need.

Spacing class names are prefixed with `grid-{number}` prefix where ``{number}`` represents a
multiples of 5s. For example ``.bl-m-grid-2`` would be `margin: 10px`.

This grid system is broken down into multiple logical pieces to minimize the 'css' file size since
not all of the tailwind elements might need all of the values from the grid system. These parts
include:

* `defaultGrid` - For general use throughout the app.
* `xlGrid` - Extra Large values that are
handy when we work with max-width, max-height etc.
* `negativeGrid` - Usefull when we need negative
margins or with top, bottom, left, right styles.
* `percentGrid` - For the places where we need %
values. (`bl-w-full` --> ``width: 100%``).

### Use Case

We may not want to use all of the values from this grid system in certain `tailwind`
elements to save some file `kb`. For example, we may not need the `defaultGrid` and `negativeGrid`
values for `maxWidth` since these are small so we only include `xlGrid` and/or `percentGrid` for
`maxWidth`:

````
maxWidth: {
  ...xlGrid, ...percentGrid,
}, 
```` 

#### Class Name Examples

* ``.bl-p-grid-1`` --> ``padding: 5px;`` (`defaultGrid` values) 
* ``.bl-mt-xl-grid-0`` --> ``margin-top: 100px;`` (`xlGrid` values) 
* ``.bl--top-grid-4`` --> ``top: -20px;`` (`negativeGrid` values) 
* ``.bl-w-full`` --> ``width: 100%;`` (`percentGrid` values )
