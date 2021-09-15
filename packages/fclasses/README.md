# FClasses Design API

## Introduction

The Bodiless FClasses Design API is designed to facilitate the implementation of
a *Design System* in a React application. Before diving into the technical
details below, it might make sense to read our
[high level overview of Design Systems in Bodiless](../../Design/DesignSystem) to
better understand the general patterns at work.

At a high level, this API expresses *Design Tokens* as React higher-order
components, and provides utilities which allow you to apply them to both simple
elements and compound components. In most cases, the design token HOC's leverage
"atomic" or "functional" CSS, defining units of design as collections of utility
classes.

A compound component using this API will expose a styling API (a `design` prop) which
describes the UI elements of which it is composed. Consumers then supply a
list of higher-order components which should be applied to each element to modify
its appearence or behavior. The framework allows nested wrapping of components
to selectively extend or override individual elements. It also provides a tool
for adding and removing classes to/from individual elements.

Use of this API allows composed components to expose a
styling API which remains consistent even when the internal markup of the
component changes. Consumers of those components can then sustainably extend and
re-extend their look and feel, with less danger of breakage when the underlying
component changes.

## Tokens

In Bodiless, you implement design tokens as React higher-order components (HOC).
Applying the HOC to a component is equivalent to styling that component with a
token:

```js
const ComponentWithStyles = withMyStyles(Component);
```

This pattern should be familiar to those who have worked with CSS-in-JS
libraries like [Styled Components](https://styled-components.com/) or
[Emotion](https://emotion.sh/docs/introduction).

Any HOC can be used as a token, and tokens can be composed using normal
functional programming paradigms (eg Lodash flow):
```js
const withComposedToken = flow(
  withToken1,
  withToken2,
);
```

However, Bodiless provides a token composition utility which adds some
additional functionality:

- The ability to attach metadata to a token.
- The ability to selectively remove tokens from a composition based on
  their metadata (or other criteria).
- Better type inference of the resulting component.

This is intended to promote design-system thinking when defining
tokens, by encouraging us to think about the structure and organization
of tokens as we implement them.  It also facilitates implementation of
tools which allow browsing the design system (eg StorybooK), and eases
the process of extending or customizing composed tokens without fully
recomposing them.

In general, you can use `asToken` to compose tokens the same way you
would use Lodash flow, eg:

```js
const withComposedToken = asToken(
  withToken1,
  withToken2,
);
```

However, there are a few key differences:

- Metadata (static properties) attached to a component are prppagated through
  the chain of HOC's.
- If you are using Typescript, the type of the parameters is constrained to be an
  HOC (or an object specifying metadata, see below).
- There is an optional overload to accept a "TokenMeta" object which consists of
  metadata which should be attached to the token.
- We intruduce a special kind of Token known as a "Filter". See more
  below.

### Metadata and Filters

Token metadata are properties which can be attached to tokens to help
organize them and understand their structure. When a token is applied,
its metadata will also be attached to the component to which it is applied.
If a composed token is applied, metadata from all constituents will be
aggregated and attached to the target component. See below for some examples.

In addition to a normal HOC, a Token can also be a "filter". A filter is a token
which, when composed with other tokens, *removes* any which match certain
criteria. Filters are usually defined to test the metadata attached to other
tokens. So, for exmple, you can compose a token which removes all 'Color' tokens
and adds a new one.

> Note that while metadata from all constituent tokens are aggregated and attached
> to the component to which a composed token is applied, the composed token
> itself does not have the metadata of its constituents; if it did, it would be
> much harder to filter. Think of the metadata attached to a Token as that portion
> of the final metadata which it will contribute.
>
> It's easy enough to get the aggregated metadata, eg:
> ```
> const finalMeta = pick(myToken(Fragment), 'categories', 'title', ...);
> ```

### Examples

Given

```js
const asBold = asToken(
  addClasses('font-bold'),
  { categories: { Style: ['Bold'] } },
);

const asTextBlue = asToken(
  addClasses('text-blue-500'),
  { categories: { TextColor: ['Blue'] } },
);

const asTextRed = asToken(
  addClasses('text-red-500'),
  { categories: { TextColor: ['Red'] } },
);
// Same as:
// const asTextRed = asToken(addClasses('text-red-500'));
// asTextRed.meta = { categories: { TextColor: ['Red'] } };

const asBgYellow = asToken(
  addClasses('bg-yellow-500'),
  { categories: { BgColor: ['Yellow'] } },
)

const asHeader1 = asToken(
  asTextBlue,
  asBold,
  asBgYellow,
  { categories: { Header: ['H1'] } },
);

const Header1 = asHeader1(H1);  // `H1` is a version of 'h1' stylable with fclasses, see below.
```

Then

```js

<Header1 /> === <h1 className="text-blue bg-yellow-500 font-bold" />

// The component itself includes aggregated metadata from all composed tokens...
Header1.categories === {
  TextColor: ['Blue'],
  BgColor: ['Yellow'],
  TextStyle: ['Bold'],
  Header: ['H1'],
};

// ... but the token itself does not.
asHeader1.meta === {
  categories: {
    Header: ['H1'],
  }
}
```

And given

```js
const asRedHeader1 = asToken(
  asHeader1,
  asHeader1.meta, // We are creating a variant of asHeader1, so propagate its meta.
  // The following creates a "filter" token. Note this must be applied after asHeader1
  withTokenFilter(t => !t.meta.categories.includes('TextColor')),
  // Replace the color with red.  Note this must be applied after the filter.
  asTextRed,
);

const RedHeader1 = asRedHeader1(H1);
```

then

```jsx
<RedHeader1 /> === <h1 className="font-bold text-red-500 bg-yellow-500" />

// Our new token has the metadata of `asHeader1` only because we propagated it explicitly.
asRedHeader1.meta === {
  categories: {
    Header: ['H1'],
  },
};

RedHeader1.categories === {
  TextColor: ['Red'],
  BgColor: ['Yellow'],
  TextStyle: ['Bold'],
  Header: ['H1'],
};
```

> **Order is important**
>
> As you can see from the examples above, the order in
> which you compose tokens can be significant, especially when applying filters.
> `asToken` composes tokens in left-to-right order (Lodash `flow` as opposed to
> `flowRight`).

## Styling Elements with FClasses

### Functional CSS

This library was developed to support a styling paradigm known as "atomic" or
"functional" CSS.  There are many excellent web resources describing the goals
and methodology of this pattern, but in its most basic form, it uses simple,
single-purpose utility classes in lieu of complex CSS selectors. Thus, for example,
instead of

```html
<div class="my-wrapper">Foo</div>
```

```css
.my-wrapper {
  background-color: blue;
  color: white;
}
```

the functional css paradigm favors

```html
<div class="bg-blue text-white">Foo</div>
```

```css
.bg-blue {
  background-color: blue;
}
.text-white {
  color: white;
}
```

Usually, a framework is used to generate the utility classes programmatically.
[Tachyons](https://tachyons.io/) and [Tailwind](https://tailwindcss.com/) are
two such frameworks. All the examples below use classes generated by Tailwind.



## FClasses

The `FClasses` API in this library provides higher-order components which can be
used to add and remove classes from an element. They allow a single element
styled using functional utilty classes to be fully or partially restyled --
prserving some of its styles while adding or removing others. For example:

```javascript
const Div = stylable<HTMLProps<HTMLDivElement>>('div');
const Callout = addClasses('bg-blue text-white p-2 border border-yellow')(Div);
const SpecialGreenCallout = flow(
  addClasses('bg-green'),
  removeClasses('bg-blue'),
)(Callout);
```

The higher order components are reusable, so for example:

```
const withRedCalloutBorder = flow(
  addClasses('border-red'),
  removeClasses('border-yellow),
);
const RedBorderedCallout = withRedCalloutBorder(Callout);
const ChristmasCallout = withRedCalloutBorder(SpecialGreenCallout);
```

and they can be composed using standard functional programming techniques:

```javascript
const ChristmasCallout = flowRight(
  withRedCalloutBorder,
  asSpecialGreenCallout,
  asCallout,
)('div');
```

### Some important things to remember about FClasses.

#### Always use `stylable()`

In order to use `addClasses()` or `removeClasses()`, the target component must
first be made stylable. That is:
```javascript
const BlueDiv = addClasses('bg-blue')('div');
```
will not work (and will raise a type error if using Typescript).  Instead, you must write:
```javascript
const Div = stylable<HTMLProps<HTMLDivElement>>('div');
const BlueDiv = addClasses('bg-blue')(Div);
```
or, if you prefer:
```
const BlueDiv = flowRight(
  addClasses('bg-blue'),
  stylable,
)('div');
```

#### Explicitly type `stylable()` when applied to intrinsic elements.

When using typescript in the above examples, we must explicitly
specify the type of our stylable `Div` because it cannot be inferred from the
intrinsic element `'div'`.

#### Don't add classes directly.

`removeClasses()` can only remove classes which were originally added by
`addClasses()`. Thus, for example:
```javascript
const BlueDiv = ({ className, ...rest }) => <div className={`${classname} bg-blue`} {...rest} />;
const GreenDiv = removeClasses('bg-blue').addClasses('bg-green')(BlueDiv);
```
will *not* work, because the `bg-blue` class is hidden inside `BlueDiv` and not
accessible to the `removeClasses()` HOC. Instead, use:
```
const BlueDiv = addClasses('bg-blue')(Stylable('div'));
const GreenDiv = removeClasses('bg-blue').addClasses('bg-green')(BlueDiv);
```

#### Use `removeClasses()` with no arguments to remove all classes
```
const Button: FC<HTMLProps<HTMLButtonElement>> = props => <button onClick={specialClickHandler} type="button" {...props} />;
const StylableButton = stylable(Button);
const OceanButton = withClasses('text-green bg-blue italic')(StylableButton);
const DesertButton = withoutClasses().withClasses('text-yellow bg-red bold')(OceanButton);
```
This is useful when you don't have access to the original, unstyled variant of the component.


## The Design API

The Design API provides a mechanism for applying higher order components (including those
provided by the FClasses API) to individual elements within a compound component.

### Exposing the Design API

Consider the following component:
```javascript
const Card: FC<{}> = () => {
  return (
    <div className="wrapper">
      <h2 className="title">This is the title</h2>
      <div className="body">This is the body</h2>
      <a href="http://foo.com" className="cta">This is the CTA</a>
    </div>
  );
)
```

With the Design API, rather than providing classes which a consumer can style
using CSS, we provide a way for consumers to replace or modify the individual
components of which the Card is composed:

```ts
export type CardComponents = {
  Wrapper: ComponentType<StylableProps>,
  ImageWrapper: ComponentType<StylableProps>,
  ImageLink: ComponentType<StylableProps>,
  Image: ComponentType<StylableProps>,
  ContentWrapper: ComponentType<StylableProps>,
  Title: ComponentType<StylableProps>,
  Body: ComponentType<StylableProps>,
  Link: ComponentType<StylableProps>,
};

type Props = DesignableComponentsProps<CardComponents> & { };

const CardBase: FC<Props> = ({ components }) => {
  const {
    Wrapper,
    ImageWrapper,
    Image,
    ImageLink,
    ContentWrapper,
    Title,
    Body,
    Link,
  } = components;

  return (
    <Wrapper>
      <ImageWrapper>
        <ImageLink>
          <Image />
        </ImageLink>
      </ImageWrapper>
      <ContentWrapper>
        <Title />
        <Body />
        <Link />
      </ContentWrapper>
    </Wrapper>
  );
};
```

Here we have defined a type of the components that we need, a starting point for
those components and then we have create a componant that accepts those
compoents. Next we will combine the Start point as well as the CardBase to make
a designable card that can take a Design prop.

``` js
const cardComponents: CardComponents = {
  Wrapper: Div,
  ImageWrapper: Div,
  ImageLink: A,
  Image: Img,
  ContentWrapper: Div,
  Title: H2,
  Body: Div,
  Link: A,
};
const CardDesignable = designable(cardComponents, 'Card')(CardBase);
```

### Design Key Annotations

Note the second parameter to `designable` above; it is a label which will be used
to identify the component and its design keys is in the markup.  This can make
it easier to locate the specific design element to which styles should be
applied, for example:

```
<div bl-design-key="Card:Wrapper">
  <div bl-design-key="Card:ImageWrapper">
  ...
```

Generation of these attributes is disabled by default.  To enable it, wrap the section
of code for which you want the attributes generated in the `withShowDesignKeys` HOC:

```js
const CardWithDesignKeys = withShowDesignKeys()(CardDesignable);
```

or, to turn it on for a whole page, but only when not in production mode,

```js
const PageWithDesignKeys = withDesignKeys(process.env.NODE_ENV !== 'production')(Fragment);
<PageWithDesignKeys>
  ...
</PageWithDesignKeys>
```

## Consuming the Design API

A consumer can now style our Card by employing the `withDesign()` API method to
pass a `Design` object as a prop value. This is simply a set of higher-order
components which will be applied to each element. For example:

```js
const asBasicCard = withDesign({
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
});

const BasicCard = asBasicCard(Card);
```

In ths example, we could simply have provided our design directly as a prop:

```js
const BasicCard: FC = () => <Card design={{
  Wrapper: addClasses('font-sans'),
  Title: addClasses('text-sm text-green'),
  Body: addClasses('my-10'),
  Cta: addClasses('block w-full bg-blue text-yellow py-1'),
}} />
```

However, by using `withDesign()` instead, our component itself will expose its own
design prop, allowing other consumers to further extend it:

```javascript
const asPinkCard = withDesign({
  Cta: addClasses('bg-pink').removeClasses('bg-blue'),
});
const PinkCard = asPinkCard(BasicCard);
```

In these examples, we are *extending* the default components. If we wanted
instead to *replace* one, we could write our HOC to ignore its argument
(or use the provided shortcut HOC `replaceWith()`):

```ts
const StylableH2 = stylable<JSX.IntrinsicElements['h2']>('h2');
const StandardH2 = addClasses('text-xl text-blue')(StylableH2);

const StandardCard = withDesign({
  Title: replaceWith(StandardH2), // same as () => StandardH2
})(BasicCard);
```

We can also use the `startWith()` HOC, instead of replacing the whole component,
it will only replace the base component but still use any hoc that might have
wrapped it.

As with FClasses, HOC's created via `withDesign()` are themselves reusable, so
we can write:

``` js
const asStandardCard = withDesign({
  Title: replaceWith(StandardH2), // same as () => StandardH2
});
const StandardCard = asStandardCard(Card);
const StandardPinkCard = asStandardCard(PinkCard);
const StandardRedCard = asStandardCard(RedCard);
```

And, also as with FClasses, the HOC's can be composed:

``` js
const StandardPinkAndGreenCard = flowRight(
  withGreenCtaText,
  asStandardCard,
  asPinkCard,
)(BasicCard);
```

## Conditional Tokens

It is sometimes useful to apply classes conditionally, based on props passed to
a component and/or some enclosing state. The FClasses design API includes
some helper methods which make this easier.

### Conditional styling based on passed props

Imagine we have a button which has different variants depending on whether it is
active and/or whether it is the first in a list of buttons. We can use the
`addClassesIf()`, `removeClassesIf()`, `withoutProps()` and `hasProp()` helpers
to accomplish this:

``` js
type VariantProps = {
  isActive?: boolean,
  isFirst?: boolean,
  isEnabled?: boolean,
};

const Div = stylable<HTMLProps<HTMLDivElement>>('div');
const isActive = (props: any) => hasProp('isActive')(props);
const isFirst = (props: any) => hasProp('isFirst')(props);

const ContextMenuButton = asToken(
  withoutProps<VariantProps>(['isActive', 'isFirst'),
  addClasses('cursor-pointer pl-2 text-gray'),
  addClassesIf(isActive)('text-white'),
  removeClassesIf(isActive)('text-gray'),
  removeClassesIf(isFirst)('pl-2'),
)(Div);
```
> Note: Our innermost HOC is `withoutProps()`. This guarantees that the props used to
> control styling won't be passed to the `div` element. We must explicitly type
> the generic `withoutProps()`. This ensures that the type of the resulting
> component will include these props.

### Conditional styling based on context

Imagine we have a button which consume some state from a react context. We can
use `addClassesIf` and `removeClassesIf` helpers to add classes to the button
conditionally:

```js
const ToggleContext = React.createContext({
  state: false,
  toggleState: () => undefined,
});

const useIsToggled = () => React.useContext(ToggleContext).state;
const useToggle = () => React.useContext(ToggleContext).toggleState;

const ToggleContextProvider: FC = ({ children }) => {
  const [state, setState] = React.useState(false);
  const value = {
    state,
    toggleState: React.useCallback(() => setState(s => !s), []),
  };
  return (
    <ToggleContext.Provider value={value}>
      {children}
    </ToggleContext.Provider>
  );
};

const Toggle = ({ children, ...rest }) => <Button {...rest} onClick={useToggle()}>{children || 'Click Me'}</Button>;

const StyledToggle = addClassesIf(useIsToggled)('bg-green-200')(Toggle);
```
Here we pass a custom hook (`useIsToggled`) to `addClassesIf`. This hook consumes
the toggle state from the context, and applies the classes only if toggled on.

### Modifying props conditionally

You can use the similar `addPropsIf` hoc to add props as well as styles to a
component conditioonally:

```js
const StyledToggle = asToken(
  addClassesIf(useIsToggled)('bg-green-200'),
  addPropsIf(useIsToggled)({ children: 'On' }),
  addPropsIf(() => !useIsToggled())({ children: 'Off' }),
);
```
  
### Flow Toggles

A more general version of the above pattern is provided by th `flowIf` utility.
This takes a condition hoo (like `addClassesIf`) and returns a version of
`asToken` which applies only if the condition evaluates to true. The above
example could be rewritten using a flow toggle as:
```js
const StyledToggle = asToken(
  flowIf(useIsToggled)(
    addClasses('bg-green-200'),
    addProps({ children: 'On' }),
  ),
  flowIf(() => !useIsToggled)(
    addProps({ children: 'Off' }),
  ),
)(Toggle);
```
This is more powerful than `addClassesIf` since you can pass any collection of
tokens to the function returned by `flowIf`. For example, we could use it
to replace the component entirely:
```js
const ReplacedToggle = flowIf(useIsToggled)(
  replaceWith(SomeOtherComponent),
)(Toggle);
```
Note howeer that unlike `addClassesIf` and `addPropsIf`, 
this will cause the enhanced component to be recreated (and
thus lose state) whenever the condition changes. For example, imagine
our base Toggle kept a counter:

```js
const Toggle = ({ children, ...rest }) => {
  const [count, setCount] = React.useState(1);
  const toggle = useToggle();
  const onClick = React.useCallback(() => {
    setCount(c => c + 1);
    toggle();
  }, [toggle]);
  return <Button {...rest} onClick={onClick}>Count is {count}</Button>;
}
```
Now compare
```js
const StyledToggle = flowIf(useIsToggled)(addClasses('bg-green-200'))(Toggle);
```
with
```js
const StyledToggle = addClassesIf(useIsToggled)('bg-green-200')(Toggle);
```
The first will lose the counter state every time the button is clicked, while
the second will properly retain it.

#### Reusable flow toggles.

For convenience, Bodiless packages often export a reusable flow toggle which
encapsulates its condition. One example is the `ifEditable` flow toggle
exported by `@bodiless/core`, which allows you to apply tokens only when
in edit mode.

## Design Variants

One of the most powerful features of the Design API is the ability to create
multiple variants of a component by composing different tokens onto it. These
variants can then be fed to component selectors like the
[Flow Container](../../Components/FlowContainer) or
[Chameleon](../../Components/Chameleon)) to provide a content editor with a
range of options.

Such component selectors themselves accept a "fluid" or 'flexibe" design; that
is, a design which can accept any number of arbitrary keys, rather than one with
a fixed set of keys corresponding to fixed "slots" in the designable component.
Each key in this flexible design represents one variant.

You can use th `varyDesigns` helper to simplify the process of creating a large
number of variants. `varyDesigns` accepts any number of designs, and produces a
new design created by composing the keys of each design with each key of the
other designs (essentially a matrix multiplication). It's easiest to explain
with an example:

```js
import { varyDesigns } from '@bodiless/fclasses';
const base = {
  Box: asToken(startWith(Div), asBox),
};

const borders = {
  Rounded: asRounded,
  Square: asSquare,
};

const bgColors = {
  Orange: asOrange,
  Blue: asBlue,
  Teal: asTeal,
};

const variations = varyDesigns(
  base,
  borders,
  bgColors,
);
```
Here we first define a base design, which contains the tokens to be shared among
all variants. Then we create a separate design for each dimension of variation.
Finally, we combine them to produce our set of variations, which in this case
will be:
```js
{
  BoxRoundedOrange: asToken(startWith(Box), asBox, asRounded, asOrange),
  BoxRoundedBlue: asToken(startWith(Box), asBox, asRounded, asBlue),
  BoxRoundedRed: asToken(startWith(Box), asBox, asRounded, asRed),
  BoxSquareOrange: asToken(startWith(Box), asBox, asRounded, asOrange),
  BoxSquareBlue: asToken(startWith(Box), asBox, asRounded, asBlue),
  BoxSquareRed: asToken(startWith(Box), asBox, asRounded, asRed),
}
```

In some cases, you may want to restrict the options.  For example, if we
introduce border color into the mix, we may not want to allow certain
combinations of backgrounds and borders. This can be done by creating
an intermediate design with the exact variations we want:
```js
import pick from 'lodash/pick';

const borderColors = {
  Blue: withBlueBorder,
  Teal: withTealBorder,
};

const colors = {
  ...varyDesigns(
    pick(bgColors, 'Orange'),
    borderColors,
  ),
  ...varyDesigns(
    pick(bgColors, 'Blue'),
    pick(borderColors, 'Teal'),
  ),
  ...varyDesigns(
    pick(bgColors, 'Teal'),
    pick(borderColors, 'Blue'),
  ),
};
```
This will produce
```js
{
  OrangeBlue: asToken(asOrange, withBlueBorder),
  OrangeTeal: asToken(asOrange, withTealBorder),
  BlueTeal: asToken(asBlue, withTealBorder),
  TealBlue: asToken(asTeal, withBlueBorder),
}
```
which can then be composed with our border styles to produce the final
set of variations:
```js
const variations = varyDesigns<any>(
  base,
  borders,
  colors,
);
```
which produces
```js
{
  BoxRoundedOrangeBlue: asToken(startWith(Box), asBox, asRounded, asOrange, withBlueBackground),
  BoxRoundedOrangeTeal: asToken(startWith(Box), asBox, asRounded, asOrange, withTealBackground),
  BoxRoundedBlueTeal: asToken(startWith(Box), asBox, asRounded, asBlue, withTealBackground),
  BoxRoundedTealBlue: asToken(startWith(Box), asBox, asRounded, asTeal, withBlueBackground),
  BoxSquareOrangeBlue: asToken(startWith(Box), asBox, asSquare, asOrange, withBlueBackground),
  BoxSquareOrangeTeal: asToken(startWith(Box), asBox, asSquare , asOrange, withTealBackground),
  BoxSquareBlueTeal: asToken(startWith(Box), asBox,  asSquare, asBlue, withTealBackground),
  BoxSquareTealBlue: asToken(startWith(Box), asBox, asSquare, asTeal, withBlueBackground),
}
```
Note in all the above examples, the design keys produced by `varyDesign` are
constructed simply by concatenating the keys of all the keys which are composed
in each.

Note also that all the tokens composed above could *themselves* be designs which
apply to on the base component which is being varied. For example, if
instead of
```js
const base = asToken(startWith(Div), asBox);
```
we had
```js
const base = asToken(startWith(SomeDesignableComponentWithAWrapper), ...);
```
Then our individual style tokens might look like this:
```js
const asOrange = withDesign({
  Wrapper: addClasses('bg-orange'),
});
```
