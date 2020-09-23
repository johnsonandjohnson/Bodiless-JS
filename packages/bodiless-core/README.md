# Edit Context and UI State

## Overview

Bodiless uses the [React Context API](https://reactjs.org/docs/context.html) to
provide a "page edit context"
(../packages/bodiless-core/src/PageEditContext/index.tsx) instance to all
components on the page. This is an interface which allows a component to
contribute contextual elements to the page edit UI (currently limited to toolbar
menu items). For example, an image component might contribute a menu item which
allows a user to upload an image.

The edit context also provides an interface to a global store which defines the
UI state, including:

- which edit context is "active" (ie, which component has the current focus),
  and what related menu options should be available.
- whether edit mode is active (ie, whether components should expose their edit
  interfaces)
- in future, anything else which might affect all components on the page (eg
  whether the current changes have been pushed, whether there are upstream
  changes to be pulled, etc).

## Flow

The following diagram illustrates the flow of data for page edit contexts:

![context](assets/context.jpeg)

1. The `PageEditor`(../packages/bodiless-core/src/components/PageEditor.tsx) (the
   top-level component of an editable page) defines a base edit context,
   contributing menu options which apply to the page as a whole (e.g. whether
   edit mode should be enabled). This is set as the default value of a React
   context type named "PageEditContext". Provider and Consumer components for
   this context are available as static properties of the PageEditContext class
   (`PageEditContext.Provider` and `PageEditContext.Consumer`).
2. Any item on the page which wishes to define a more specific context can do so
   using the `spawn()` method of the `PageEditContext` instance. This will
   create a new instance with the current instance as its parent. This can then
   be set as the new context value using `PageEditContext.Provider`. For
   convenience, a `ContextProvider`(../packages/bodiless-core/src/PageContextProvider.tsx)
   component is provided which creates a new context and injects it into its
   children (provided as a render prop).
3. A component which does not want to create a new context can either consume
   the current context (either via `PageEditContext.Consumer` or via the
   `useEditContext()` hook), or simply ignore it, if it doesn't care about the
   current context or UI state.
4. The `PageEditContext` instance exposes an `activate()` method which can be
   used by a component to declare that its context is active (usually when the
   user focuses there).  This sets the active context in the store. If the active
   context has parents, then these are also considered active, and the set of
   all active contexts is referred to as the <a id="context-trail"></a>
   _*context trail*_. For convenience a `useContextActivator()` hook is provided.
5. This, in turn triggers any observer component to re-render (for example to
   highlight the fact that it is active).
6. The "global context menu"(../packages/bodiless-core/src/components/PageEditor.tsx)
   is one such observer component, and re-renders itself with all menu options
   contributed by the newly activated context and all its parents. Thus, for
   example, when you activate the contet of an image within a grid, the menu
   options of the image (eg set source) are added to those of the grid (eg
   insert/delete items), which in turn are added to the page level items (eg
   toggle edit on/off).
7. Similarly, the
   "local context menu"(../packages/bodiless-core/src/components/LocalContextMenu.tsx)
   is another observer which renders a subset of context menu options as a tooltip
   near the component providing current innermost active context.

## Working with edit context

There are several ways in which a component can provide or consume the edit context.

### Providing a new context

To provide a new context value (usually to add menu options which should appear
when a component has focus), you may use the supplied `PageContextProvider`

```javascript
const getExampleMenuOptions = useGetter([{
  // An array of context menu option objects
}]);

const Example: React.FC = ({ children }) => (
  <PageContextProvider getMenuOptions={getExampleMenuOptions} name="Example">
    {children}
  </PageContextProvider}
```
Here we provide a menu options callback as a prop to the `ContextProvider`
component. This will be invoked when this context or any descendant is
activated. It should return any menu options this component wishes to provide
(see [Context Menu Options](#context-menu-options) below for more information).

> Note: It is important to memoize our `getMenuOptions()` callback so as to
> prevent unnecessary renders of subscribers to the edit context. Here, we do
> this with the bodilesscore `useGetter()` hook, which creates an invariant
> callback even if the menu options it returns change.

It is actually unusual to invoke the provider directly in this manner. Instead,
use the `withMenuOptions` hoc to attach options to your component. First you
define a custom hook which will create your `getMenuOptions()` callback. This
hook will be invoked when the component is rendered, and will receive its props
as an argument:

```
const useMenuOptions = (props) => {
  return [{
    // An array of context menu option objects
  }];
};
```

Then, pass that along with a unique name to `withMenuOptions` to create an HOC
which will add the options to your component.

```
const ComponentWithMyOptions = withMenuOptions({
  useMenuOptions,
  name: 'my-component'
})(AnyComponent);
...
<ComponentWithMyOptions propUsedInOption="foo" />
```
Note here that we don't need to memoize the list of menu options: memoization of
the callback is handled within `withMenuOptions`. However, certain callbacks
provided as properties of the menu option object may need to be memoized (see
[Context Menu Options](#context-menu-options) below for more information).

Note that the menu options you are defining here will only be available when
your component (or one of its children) declares itself as "active". To do so,
it will need to use a method on the current context.

### Consuming the context with hooks

To access the current page edit context, simply use the `useEditContext()`
and/or `useContextActivator()` hooks.

```javascript
import { observer } from 'mobx-react-lite';
const Example = observer(props => {
  const { isActive, isEdit } = useEditContext();
  const { onClick } = useContextActivator();
  return (
    <React.Fragment>
      <div>{isActive ? 'Active' : 'Not Active'}</div>
      {isEdit ?
        <button onClick={onClick} />
        : <span>Not editing!</span>
      }
    </React.Fragment>
  );
});
```

Note that `useContextActivator()` can be used to provide a handler for other
events besides `onClick`, and can invoke another hanlder passed in as a prop:

```
const TextareaActivator = ({ onFocus: onFocus$1, ...rest }) => {
  const { onFocus } = useContextActivator('onFocus', onFocus$1);
  return <textarea onFocus={onFocus} {...rest} />
}
```
In the above example, the `textarea` will activate the context on focus, and
will then invoke any 'onFocus' handler passed to it.

Note that we are using the `isActive` property of the context to render
differently if the current context is active, and using the `isEdit` property to
determine if we are in edit mode. Note also that we wrap our component in a
[mobx observer](https://mobx-react.js.org/observer-hoc) to ensure that it
updates properly if the active context or edit mode changes.

> Important! For functional components using hooks, we must use the version of
> `observer` from mobx-react-lite.

It is also possible to use the `withContextActivator` HOC to provide an activation
event to a pre-existing component:
```
const ComponentWithMenuOption = flowRight(
  withMenuOptions({ ... }), // See abo ve
  withContextActivator('onClick'),
)(AnyComponent)
```

Now, when you click on `AnyComponent` it will activate the provdied context, and
the associated menu options will be displayed.

Note - the above will only work if `AnyComponent` can accept an `onClick` prop.
If not, you will want to wrap it in an element which can, for example a `div`:
```
const ComponentWithMenuOption = flowRight(
  withMenuOptions({ ... }), // See above
  withContextActivator('onClick'),
  withActivatorWrapper('div'),
)(AnyComponent)
```

Finally, you will want to be sure that none of the above HOC's are applied when not in edit mode.
For this, `ifEditable` comes in handy:
```
const ComponentWithMenuOption = ifEditable(
  withMenuOptions({ ... }), // See above
  withContextActivator('onClick'),
  withActivatorWrapper('div'),
)(AnyComponent)
```
Note that the order of these HOC's is important.

## Context Menu Options

The Global Context Menu aggregates menu options provided by all contexts within
the [active context trail](#context-trail). It is a wrapper around the generic
`ContextMenu` (../packages/bodiless-core/src/components/ContextMenu.tsx)
component, which provides a mechanism for displaying a set of menu options
provided in an "options" prop. Each item is an object with the following
members:
- name: a unique machine name for this item.
- group: the machine name of the group to which this button belongs
- Component: An optional component to use to render this button.
- icon: the name of a [material design icon](https://material.io/tools/icons/?style=baseline)
  to display for this item.
- label: a human readable label to display beneath the icon.
- isActive; a boolean specifying the option or its flyout panel is currently
  "active". This is usually used for toggles.
- isDisabled; a boolean specifying whether the option is currently "disabled".
  If true, the menu button will be greyed out and bnot clickable.
- isHidden: a boolean specifying whether the option is currently hidden. If
  true, the menu button will not be displayed.
- handler: a callback to invoke when the menu button is clicked.

> Note all of the above properties except `handler`, `name`, `group` and
> `Component` can be provided either as a primitive value or as a function
> returning that value - eg `{ isActive: true }` or `{ isActive: () => true; }`
> The latter is useful if the value depends on some external state which is not
> used by the component providing the button, to allow the button to udpate
> without re-rendering the component. If you provide callbacks, it is important
> to memoize any such callbacks to avoid unnecessary renders of the button
> itself. The `handler` callback, however, need not be memoized.

 A simple context menu implementation with a single option might look like this:
 ```javascript
const [isUp, setIsUp] = React.useState(false);

const options = [
{
  name: 'say_yes',
  icon: isUp ? 'thumb_up' : 'thumb_down',
  label: 'Yes!',
  isActive: isUp,
  handler: () => {
    if (!isUp) {
      alert('Yes!');
    }
    setIsUp(isUp => !isUp);
  },
];

const MyContextMenu = props => (
  <ContextMenu options={options} />
);
```

#### Global and Local Context Menu

By default, Bodiless provides two `ContextMenu` instances to display menu options
provided by edit contexts. 

The `GlobalContextMenu` is a part of the `PageEditor` and is intended to provide
a single, top-level menu for the page.

The `LocalContextMenu` component may be used to add a tooltip version of the
context menu to any component, as

```
<ContextProvider getMenuOptions={myComponentMenuOptionGetter} name="My Component">
  <LocalContextMenu>
    <MyComponent>
    ...
    </MyComponent>
  </LocalContextMenu>
</ContextProvider>
```

This will provide a tooltip for `MyComponent` which displays a local version of the context menu.

When defining a menu option, there are two flags you can use to control whether
it should appear on the global context menu, the local context menu or both:

```javascript
const myMenuOption = {
  ...,
  global: true // Show on global context menu
  local: false // Hide on local context menu
}
```

#### Context menu forms

The handler function for a menu option can, optionally, return a render
function. If it does, when the menu item is selected, this will be invoked to
render the contents of a fly-out panel (usually a form). This allows menu
options to trigger display of a configuration form to collect additional user
input. For example, an image component might provide a menu option to configure
its content. This might then display a form for uploading the image, entering
alt-text, etc.

## Styling

This library includes components which render visible, interactive pieces of the edit UI. These include:

- ContextMenu
- PageEditor
- LocalContextMenu
- ContextWrapper

These components allow injection of UI elements via a `ui` prop. This prop is a
javascript object enumerating the UI elements which the component will use. For example,
the UI specification for a ContextMenu is:

```javascript
export type UI = {
  Icon?: ComponentType<HTMLProps<HTMLSpanElement>>;
  Toolbar?: ComponentType<HTMLProps<HTMLDivElement>>;
  ToolbarButton?: ComponentType<ButtonVariantProps>;
  FormWrapper?: ComponentType<HTMLProps<HTMLDivElement>>;
  ToolbarDivider?: ComponentType<HTMLProps<HTMLHRElement>>;
};
```

The `ui` prop fo `ContextMenu` accepts low-level UI elements which are composed
to render the menu. In contrast, that for `LocalContextMenu` and `PageEditor`
simply lists the menu component which should be used to render the currently
selected options:

```
type UI = {
  LocalContextMenu?: ComponentType<ContextMenuProps>;
};
```

This allows us to create customized versions of the context menu, as is done in
the canvas-x
stylable `ContextMenu` (../packages/bodiless-core-ui/src/GlobalContextMenu.tsx)
and
 `LocalContextMenu` (../packages/bodiless-core-ui/src/LocalContextMenu.tsx).

## Activate Context System

The activate Context system allow for one component to store an id of another
component that should activate its context on creation.

This is a three step process.

### Step 1 Ensure there is a Activate Context in place

One can wrap there components in a `<ActivateContextProvider>` component or one
can use the withActivateContext() HOC that will wrap a component in the Provider

### Step 2 set the Id

Then one needs to set the id of the component to be activated by pulling `setId` from `useActivateContext`.

``` tsx
const { setId } from useActivateContext();
setId(id);
```

### Step 3  Add useActivateOnEffect hook

Finally, the component needs to have the `useActivateOnEffect` hook so that it will activate if the id match the one stored

``` tsx
useActivateOnEffect(id);
```

