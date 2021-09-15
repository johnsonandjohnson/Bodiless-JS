# Chameleon

A "chameleon" is a component which renders differently depending on a state
saved as bodiless content. For example, you might use a chameleon to allow a
content editor to switch between different stylings for a component, or to
toggle a components visibility. The Chameleon API is the basis for several other
components in this package, including lists (with toggled sublists) and link
toggles.

The Chameleon API builds on [the Design API](..).  A component wrapped in
`asBodilessChamelion()` will accept a variable design (similar to the
[Flow Container](..)). It also provides a context menu button which allows
the user to choose among the designs which were provided.  Here is a 
simple example (using the [FClasses API](..) and TailwindCSS for styling):

```js
import { addClasses, withDesign, Div } from '@bodiless/fclasses';
import { asBodilessChameleon } from '@bodiless/components';

const BaseComponent = addClasses('border-8 py-5 text-center')(Div);

const basicChameleonDesign = {
  Red: addClasses('border-red-500 text-red-500'),
  Blue: addClasses('border-blue-500 text-blue-500'),
  Green: addClasses('border-green-500 text-green-500'),
};

const BasicChameleon = flow(
  asBodilessChameleon('basic-chameleon'),
  withDesign(basicChameleonDesign),
)(BaseComponent);

...

<BasicChameleon>
  <div>Chameleons!</div>
  <div>Available Now!</div>
</BasicChameleon>
```

First we create our base component (a styled 'div' element). Next, we define the
different states of the component as a design (a keyed list of higher-order
components). Finally, we compose our chameleon by wrapping the base component in
`asBodilessChameleon` and applying our design. The first parameter to
`asBodilessChameleon` is a node-key specifying where the current state of the
chameleon should be stored.

Now, when you click inside the div in edit mode, you'll see a form
which allows you to choose one of the available colors. Your choice
will be saved as content.

## Toggles

One common use-case for Chameleons is to implement *toggles*. A Toggle is really
just a Chameleon with only two possible states. Let's give a content editor the
ability to turn on and off the availability notice in the above component.

```js
import { addProps } from '@bodiless/fclasses';

const BaseAvailability = ({ isAvailable, ...rest }) => (
  <Div {...rest}>
    {isAvailable ? 'Available Now!' : 'Call for Availability'}
  </Div>
);

const toggleDesign = {
  Available: flow(
    addProps({ isAvailable: true }),
  ),
};

const AvailabilityToggle = flow(
  asBodilessChameleon('basic-toggle', { component: 'Available' }, () => ({ label: 'Avail' })),
  withDesign(toggleDesign),
)(BaseAvailability);
```

Here we first create a simple component which renders different text depending on
an `isAvailable` prop. Then we create a design with only a single state
(`Available`) which adds the prop. Finally, we wrap our component in
`asBodilessChameleon` and apply the design, exactly as before.

Observe that we have introduced two new optional parameters to
`asBodilessChameleon`. These follow the same pattern as any `asBodiless...` HOC:
- The second parameter defines the default state of the chameleon. It is an
  object with a single `component` key, whose value should be one of the keys in
  our design. In this case, we specify that the default state should be `Available`.
- The third parameter defines overrides to default values for the edit button
  and form. In this case, we want to give the editor a clue as to exactly what
  will be toggled, so we override the button label. Note that this parameter is
  actually a custom React hook. It will be invoked in the render context of the
  edit form, and receive the component's props as an argument.

> Note: Because this chameleon only has a single state, it provides a toggle
> button rather than a swap button. Clicking the toggle button immediately
> toggles the state, without bringing up a form to select a state as in the
> previous example.

### Default state

The toggle above actually has two states: the one specified in the design ("Available")
and the default state. Similarly the chameleon in the first example actually has four
states.  What if you want to apply some styling to the component in its default state?
For example, what if we wanted the "Call for availability" message to be red?

To support this, a design applied to a chameleon has a special
`_default` key which allows you to apply HOC's to the component when in its
default state:

```js
const RedAvailabilityToggle = withDesign({
  _default: addClasses('border-red-500 text-red-500'),
)(AvailabilityToggle);
```

## Advanced Use cases

### Toggling Visibility

In the above examples, all states of the Chameleon are visible, so there is
always an element on the screen which an editor can click to display the menu
option.  But what if we want to toggle an element's visibility?  In this case
there would be nothing to click when the element was toggled off. To solve
this problem, we make use of a lower level Chameleon API to attach the menu
button to an enclosing component:

```jsx
import { removeClasses } from '@bodiless/fclasses';
import { applyChameleon, withChameleonButton, withChameleonContext } from '@bodiless/organisms';

const toggleVisibilityDesign = {
  Available: removeClasses('invisible'),
};

const VisibilityToggle = flow(
  addClasses('invisible'),
  applyChameleon,
  withDesign(toggleVisibilityDesign),
)(BaseAvailability);

const VisibilityTogglerapper = flow(
  withChameleonButton(() => ({ label: 'Avail' })),
  withChameleonContext('decomposed-toggle', { component: 'Available' }),
  withDesign(toggleVisibilityDesign),
)(BaseComponent);

...

<VisibilityTogglerapper>
  <div>Chameleons!</div>
  <VisibilityToggle isAvailable />
</VisibilityTogglerapper>
```

Here we've decomposed `asBodilessChameleon` into three constituent parts:
- `withChameleonContext` establishes a connection to the Bodiless data system
  and makes the current state of the chameleon available to its children. It takes
  the `nodeKey` and `defaultData` as arguments.
- `withChamelionButton` provides the context menu button which provides the
  Chameleon UX.  It takes the `useOverrides` hook as an argument.
- `applyChameleon` uses the chameleon state established by
  `withChameleonContext` to apply the appropriate HOC's from a design to the
  underlying components.

First, We create a wrapper component (`VisibilityToggleWrapper`) which
establishes the context and provides the menu button. Then we create an inner
component (`VisibilityToggle`) which uses the data to toggle the visibility.

> Note that we've had to apply the design to both components. This is because
> the component providing the button needs to know the possible states so it can
> properly render the form, while the component providing the actual toggle
> needs to know the complete design so it can apply it.

### Toggling Stateful Components

Another use-case in which we may want to decompose the top-level chameleon API
is when wrapping a stateful component.  Imagine that our availability information
was behind a basic accordion:

```js
import { useState } from 'react';

const BaseAvailabilityAccordion = ({ isAvailable, ...rest }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Div {...rest}>
      <div>
        <button type="button" onClick={() => setExpanded(e => !e)}>
          {expanded ? <>&#9660;</> : <>&#9658;</>}
          Availability
        </button>
      </div>
      <div className={expanded ? '' : 'hidden'}>
        {isAvailable ? 'In Stock!' : 'Call'}
      </div>
    </Div>
  );
};
```

The API of `BaseAvailabilityAccordion` is the same as that of `BaseAvailability`, so
we should be able to create a toggle exactly as we did above:
```
const AvailabilityAccordionToggle = flow(
  asBodilessChameleon('accordion-toggle', { component: 'Available' }, () => ({ label: 'Avail' })),
  withDesign(toggleDesign),
)(BaseAvailabilityAccordion);
```

But note what happens when you expand the accordion and then toggle the
availability state: the accordion collapses (not great UX). This is because,
under the hood, the Chameleon replacing the wrapped component with the version
which has the correct design applied. React then re-creates the whole child
component tree, causing our accordion to lose state. In most cases this is not a
problem -- Chameleons usually wrap smallish components, and their state changes
infrequently (and never for end users). But here the result is poor content
editor UX.

One way to solve the problem would be to lift the state of the accordion outside
the Chameleon (or use an external state management library). But here, a simpler
way is to use the Chameleon API to manage the state of the chameleon, but apply
that state ourselves, in a way that does not cause the child-tree to be
recreated:

```js
import { useChameleonContext } from '@bodiless/components';

const withChameleonAvailability = Component => props => (
  <Component {...props} isAvailable={useChameleonContext().isOn} />
);

const AvailabilityAccordionToggle = flow(
  withChameleonAvailability,
  withChameleonButton(() => ({ label: 'Avail' })),
  withChameleonContext('accordion-toggle'),
  withDesign(toggleDesign),
)(BaseAvailabilityAccordion);
```

In `withChameleonAvailability` we invoke the `useChameleonContext()` hook to
get current state of the Chameleon, and use that information to set the prop
directly. This is essentially a custom version of `applyChamelion` which
avoids re-creating the child tree.

### Component Form Toggle

Sometimes it is desirable to combine toggle functionality with configuration of
the toggled component. This technique is used by [the Bodiless Link Toggle](..):
when you toggle on a link, the link edit form is brought up automatically so that
you can supply the URL immediately, and you can remove the link directly from the
link edit form.

In the following example, we enhance the existing toggle to replace the
"Available Now!" message with an "Add to cart" button (of course the actual cart
integration is omitted).

First, we create our custom "Add-to-cart" component which uses a productId, and
wire that to the Bodiless edit system:

```js
import { useCallback } from 'react';
import { useMenuOptionUI, useEditContext } from '@bodiless/core';

const AddToCartBase = observer(({ productId, ...rest }) => {
  const { isEdit } = useEditContext();
  const onClick = useCallback(() => {
    // @TODO: Wire this to your cart provider...
    alert(`${productId} added to cart`);
  }, [productId]);
  return (
    <div {...rest}>
      <button type="button" onClick={isEdit ? onClick : undefined}>Add to cart</button>
    </div>
  );
});

const addToCartButtonOptions = {
  icon: 'shopping_cart',
  name: 'enable-add-to-cart',
  label: () => (useChameleonContext().isOn ? 'Config' : 'Enable'),
  global: false,
  local: true,
  renderForm: ({ componentProps }) => {
    const {
      ComponentFormTitle, ComponentFormLabel, ComponentFormText, ComponentFormUnwrapButton,
    } = useMenuOptionUI();
    const { unwrap } = componentProps;
    return (
      <>
        <ComponentFormTitle>Add-to-Cart Configuration</ComponentFormTitle>
        <ComponentFormLabel>
          Product ID
          <ComponentFormText field="productId" />
        </ComponentFormLabel>
        {unwrap && (
          <ComponentFormUnwrapButton onClick={unwrap}>
            Disable Add-to-Cart
          </ComponentFormUnwrapButton>
        )}
      </>
    );
  },
};

const asAddToCart = asBodilessComponent(addToCartButtonOptions);
```

We won't go into too many details here--for a deeper dive, see
[Creating Bodiless Components](..)--but let's remark on a few Chameleon-specific
details:

- We use the chameleon context to decide what the label on the button
should be ('Enable' or 'Config').  This helps to give a visible indication
of whether the functionality is enabled.
- In our `renderForm()` method, we use the `unwrap` prop to control visibility
  of a "Disable Add To Cart" button on the configuration form.

Now we are ready to add our toggle, which will allow the editor
to switch between "Call for Availability" and our new "Add-to-cart"
button:

```js
import { replaceWith } from '@bodiless/fclasses';

const toggleCartDesign = {
  Available: replaceWith(AddToCartBase),
};

const AddToCartToggle = flow(
  withoutProps('productId'),
  applyChameleon,
  withoutProps('unwrap'),
  asAddToCart('product-id'),
  withChameleonComponentFormControls,
  withChameleonContext('add-to-cart'),
  withDesign(toggleCartDesign),
)(Div);
```

Here, our design uses the `replaceWIth` HOC from Bodiless Core to swap out
the original component (a plain div) for our custom add-to-cart button.
A few things to note:

- We need to remove the 'productId' prop (provided by `asAddToCart`) because
  this prop doesn't make sense for the underlying component. We do this *inside*
  `applyChameleon` so that it won't be stripped when the toggle state is on.
- We use `withChameleoonCompnentFormControls` to provide an `unwrap` and
  `onSubmit` prop to our context menu form. These allow the form to return the
  chameleon state off and on respectively.
- We need to remove the 'unwrap' prop which after it is consumed by our context
  menu form. The `onSubmit` prop is removed for us by `asBodilessComponent`.
- We establish the Chameleon context and add our design as before.








