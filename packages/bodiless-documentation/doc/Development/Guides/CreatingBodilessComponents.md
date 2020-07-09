# Creating Bodiless Components

In the previous guides, you have seen how to use built-in Bodiless components to
build out an editable site. But what if you have pre-built components (or even
pages) you'd like to make editable? Bodiless-JS provides a set of utilities which
make it easy to wire up any component with an edit form. To demonstrate, we'll
create an editable version of the popular
[`ReactMarkdown` component](https://github.com/rexxars/react-markdown).

Imagine you have the following page:

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const PageBody = ({ title, markdownContent }) => (
  <main>
    <h1>{title}</h1>
    <ReactMarkdown source={markdownContent} />
  </main>
);
```

As you've seen, it's dead simple to make the title editable:

```
import { asEditable } from '@bodiless/components'

const H1 = asEditable('title')('h1');

const EditablePageBody = ({ title, markdownContent }) => (
  <main>
    <H1>{title}</H1>
    <ReactMarkdown source={markdownContent} />
  </main>
);
```

But what about the markdown field? Here we'd like to provide a form which allows the markdown
source to be edited. We'll do this by creating our own `asEditableMarkdown` HOC
which we can then apply to the `ReactMarkdown` component to make it editable. The easiest way to do
so is to use the `asBodilessComponent` utility.

```js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Editable } from '@bodiless/components';
import { asBodilessComponent } from '@bodiless/core';

const asBodilessMarkdown = asBodilessComponent(options); // "options" will be described below.

const Markdown = asBodilessMarkdown('body')(ReactMarkdown);

const H1 = asEditable('title')('h1');

const EditablePageBody = ({ title, markdownContent }) => (
  <main>
    <H1>{title}</H1>
    <Markdown source={markdownContent} />
  </main>
);
```

This will supply our Markdown field with an edit button (which can appear either in a local
context menu toolbar, or in the main left-hand menu toolbar).  When clicked, that button
will bring up a form which can edit the content of the "source" prop.

## `asBodiless...` Options

All the magic is in the `options` provided to `asBodilessComponent`, so let's look at them:

```
type Options<P, D> = {
  icon: string;
  name: string;
  label?: string;
  global?: boolean;
  local?: boolean;
  renderForm: FormBodyRenderer<P, D>;
  useGetMenuOptions?: UseGetMenuOptions<P>;
  activateEvent?: string,
  Wrapper?: CT<any>|string,
  defaultData?: D,
};
```

| Property | Description |
| --- | --- |
| icon | The name of the [material icon](https://material.io/resources/icons/?style=baseline) to use for the edit button |
| name | A unique machine name for this option |
| label | A human readable label for the edit button |
| global | If true, specifies that the button should appear on the global menu (the lefthand sidebar) |
| local | If true, specifies that the button should appear in the local context menu |
| renderForm | A render function which should the form fields. See below. |
| useGetMenuOptions | A hook which will be called to provide additional menu
buttons. |
| activateEvent | The event which will trigger the "activation" of the components edit button. Usually "onClick".  "Activation" is usually the result of selecting the component in some way or giving it focus.  The component's button(s) will only appear in the menu when the component is activated. |
| Wrapper | A component which will wrap this component in edit mode. Useful if the component itself cannot generate the activateEvent |
| defaultData | Optional default data to be used for this component |

### Defining the form

The key option above is `renderForm`. This is where you define the fields that
will be used to edit your component. Bodiless-JS uses the excellent
[Informed](https://joepuzzo.github.io/informed) library to build forms. Defining
your component form is as simple as returning informed inputs whose names match
the props of your component.

Let's see what a `renderForm` callback might look like for `ReactMarkdown`.
```
const renderForm = () => {
  const { ComponentFormTitle, ComponentFormTextArea } = useFormUI();
  return (
    <>
      <ComponentFormTitle>Edit Page Body</ComponentFormTitle>
      <ComponentFormTextArea field="source" />
    </>
  );
};
```
We provide a form title and a single field named after the `source` prop of
`ReactMarkdown`.

> Notice the use of the `useFormUI()` hook. The Bodiless-JS admin UI is designed
to be theme-able. Themers can provide their own styled versions of all UI
elements. Here we simply retrieve the styled elements we need. For example,
`ComponentFormTextArea` is nothing more than a styled version of the native
[TextArea](https://joepuzzo.github.io/informed/?path=/story/inputs--text-area)
input from Informed. `useFormUI()` will return such styled versions of all
native Informed inputs (pending [#336](https://github.com/johnsonandjohnson/Bodiless-JS/issues/336))

Now we're ready to complete our `asBodilessMarkdown` function:

```
const asBodilessMarkdown = asBodilessComponent<Props, Data>({
  icon: 'edit',
  name: 'edit',
  renderForm,
  global: false,
  local: true,
  Wrapper: 'div',
  defaultData: { source: 'Initial Value' },
});
```

Note the use of the `Wrapper` property.  We want our component to display its edit
button when clicked, but `ReactMarkdown` does not accept an `onClick` prop, so we
wrap it with something which does.  This wrapper will only be rendered when in edit
mode.

## Custom Inputs

The above will provide a basic `textarea` for editing the markdown content, which
is not ideal. We'd much rather have a full-featured markdown editor with
preview. Fortunately, Informed makes it easy to create a custom input which will
drop right into our form. Here, we create one based on the open-source
[`react-mde`](https://github.com/andrerpena/react-mde) package, using `ReactMarkdown`
itself to generate the preview.

```
import React, { useState } from 'react';
import { asField } from 'informed';
import ReactMde from 'react-mde';
import ReactMarkdown from 'react-markdown';
import 'react-mde/lib/styles/css/react-mde-all.css';

// Use `ReactMarkdown` to render the preview.
const renderHTML = (text: string) => <ReactMarkdown>{text}</ReactMarkdown>;
const generatePreview = (text: string) => Promise.resolve(renderHTML(text));

// Use informed `asField` to wire this to informed.
const MarkdownField = asField(({ fieldState, fieldApi, ...rest }) => {
  const [selectedTab, setSelectedTab] = useState('write');
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const textValue = !value && value !== 0 ? '' : value;
  return (
    <ReactMde
      {...rest}
      value={textValue}
      onChange={setValue}
      selectedTab={selectedTab}
      onTabChange={setSelectedTab}
      generateMarkdownPreview={generatePreview}
    />
  );
});

export default MarkdownField;
```

Notice that the above code is completely independent of BodilessJS. This input
control could be used in *any* form build with Informed. The informed
documentation provides
[more information and examples of creating custom inputs](https://joepuzzo.github.io/informed/?path=/story/custominputs--creating-custom-inputs).

Now, we can rewrite our `renderForm` to use the above input.

```
const renderForm = () => {
  const { ComponentFormTitle } = useFormUI();
  return (
    <>
      <ComponentFormTitle>Edit Page Body</ComponentFormTitle>
      classes={{ reactMde: 'bl-text-black' }}
      <MarkdownField field="source" classes={{ reactMde: 'bl-text-black' }} />
    </>
  );
};
```

Putting it all together, our final, editable `PageBody` would look like this:

```
import React } from 'react';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { asBodilessComponent, useFormUI } from '@bodiless/core';
import { asEditable } from '@bodiless/components';
import ReactMarkdown from 'react-markdown';

// Our Informed custom input in a separate file.
import MarkdownField from './InformedMarkdown';

const asBodilessMarkdown = asBodilessComponent({
  icon: 'edit',
  name: 'edit',
  renderForm: () => {
    const { ComponentFormTitle } = useFormUI();
    return (
      <>
        <ComponentFormTitle>Markdown</ComponentFormTitle>
        <MarkdownField field="source" />
      </>
    );
  },
  global: false,
  local: true,
  Wrapper: 'div',
  defaultData: { source: 'Initial Value' },
});

const Markdown = asBodilessMarkdown('body')(ReactMarkdown);
const H1 = asEditable('title')<HTMLProps<HTMLHeadingElement>>('h1');

const PageBody = ({ title, markdownContent }) => (
  <main>
    <H1>{title}</H1>
    <Markdown source={markdownContent} />
  </main>
);

export default PageBody;
```

## Under the Hood

Let's unpack the magic a bit by diving one layer deeper. `asBodilessComponent`
is really just a composition of lower-level HOC's which together add edit
functionality to your component. For many cases it's all you need, but sometimes
you may want to do something which requires you to use the lower-level API
yourself.

As an example, let's imagine that we had a customized version of `ReactMarkdown`
which would render a last-modified date if passed as a prop, something like:
```
const CustomReactMarkdown = ({ timestamp, ...rest}) => (
  <div>
    <ReactMarkdown {...rest} />
    {timestamp &&
    <div>
      Last modified:
      {timestamp}
    </div>
    }
);
```
And suppose we'd like to make this editable and automatically update the
timestamp when the contents are saved?

Using `asBodilessComponent`, we don't have access to the submit handler for
our form; it's generated automatically and simply saves the form values
to the Bodiless data store (from which they are serialized to JSON). It
won't allow us to manipulate the data before they are saved (in this case to add
a timestamp).

Note: this is a bit of a contrived example. In a real-world scenario

### Creating a customized edit form.

The main bit of functionality we want to customize is the edit form. BodilessJS
provides a `ContextMenuForm` component which we can use for this purpose. First,
we build our custom form submit handler, which will then be passed as a prop to
the `ContextMenuForm`

```
const useCustomEditFormProps = componentProps => {
  // Get the default submit handler for an edit form.
  const { submitValues, ...rest } = useEditFormProps(props);
  // 
  const customSubmitValues = useCallback(
    values => {
      const newValues = { ...values, timestamp: new Date().toString() };
      submitValues(newValues);
    },
    [submitValues],
  );
  return {
    submitValues: customSubmitValues,
    ...rest,
  };
};
```
Here we are using the BodilessJS `useEditFormProps` hook to obtain the default submit
handler for a component edit form, and replacing it with our own. `useEditFormProps`
takes the component's own props as a parameter and returns a default `submitValues` and
`initialValues` props which handle loading and saving the component's data.

Next, we define a function which will render our customized form:
 ```
const useRenderCustomEditForm = componentProps => {
  const editFormProps = useCustomEditFormProps(props);
  return useCallback(
    (contextMenuFormProps) => {
      const { ComponentFormLabel, ComponentFormTitle } = useFormUI();
      return (
        <ContextMenuForm {...contextMenuFormProps} {...editFormProps}>
          <ComponentFormTitle>Markdown</ComponentFormTitle>
          <ComponentFormLabel>Content</ComponentFormLabel>
          <MarkdownField field="source" />
        </ContextMenuForm>
      );
    },
    [editFormProps],
  );
};
```

Here we take our custom edit form props (including our submit handler) and pass
them to `ContextMenuForm`. Note that in the previous example using
`asBodilessComponent()` our render function returned only the actual form
controls needed by our component.  Here we must render the whole form.
Note also that this render function receives a `contextMenuFormProps`
parameter, which must be passed through to the `ContextMenuForm` component
along with our custom edit form props.

Now we are ready to wire our form to the BodilessJS menu system.  To do this,
we create a `useGetMenuOptions` hook which will be passed as an argument
to the `withMenuOptions` HOC:
```
const useGetMenuOptions = componentProps => {
  const renderForm = useRenderForm(componentProps);
  return useCallback(
    () => [{
      icon: 'edit',
      name: 'edit',
      label: 'Edit',
      global: false,
      local: true,
      handler: () => renderForm,
    }],
    [renderForm],
  );
};
```
This hook will receive the component's own props as an argument, and should
return a *menu options getter* -- a function which itself returns an array of
*menu options*. Each menu option is an object describing a button which should
appear on either the sidebar "global menu", or the floating "local context
menu". Many of these properties are the same as those we used in
`asBodilessComponent`. The main differences are:
- The `Wrapper` and `defaultData` props are missing.  We'll handle these later.
- The `renderForm` prop is missing. Instead we have a `handler` prop, which is a
  callback to execute when the button is clicked. This callback can optionally
  return a render function. If so (as in our case), that render function will be
  used to display a panel (usually a form). Note that the handler need not
  return anything (useful when you want to create a button which takes an
  immediate action without requiring user input).

### Composing our bodiless component.

Finally, we compose a series of core Bodiless HOC's (using Lodash `flowRight`) to
fully integrate our component and its custom form:
```
const asCustomBodilessMarkdown> = (nodeKey, defaultData) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData || {
    source: 'Initial Value',
  }),
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
  ifEditable(
    withMenuOptions({ useGetMenuOptions }),
    withContextActivator('onClick'),
    withActivatorWrapper('onClick', 'div'),
    withLocalContextMenu,
  ),
  withData,
);
```
Let's take this step by step:
```
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData || {
    source: 'Initial Value',
  }),
```
These three HOC's provide integration to
[the BodilessJS data flow](../Development/Architecture/Data.md). They
ensure that the component is given a place to store its data, and
define the "empty" value for that data. They add two props--`componentData`
and `setComponentData`--which are used by the HOC's further down the
chain.
```
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
```
Bodiless components may behave differently when a site is editable than when it is
built statically.  To facilitate different compositions for different modes,
BodilessJS provides `ifEditable` and `ifReadOnly` meta-HOC's, which can be
used to control what enhancements are added in each mode.  Since a component
on a static site never alters its content, we here strip the `setComponentData`
prop.
```
  ifEditable(
    withMenuOptions({ useGetMenuOptions }),
    withContextActivator('onClick'),
    withActivatorWrapper('onClick', 'div'),
    withLocalContextMenu,
  ),
```
Here is where we add the actual edit functionality.  We first add our menu
button (which includes our custom form).  We then provide a mechanism to activate
our component's menu button: we wrap it in a `div` with an `onClick` handler
which signals the menu system that our component is "selected" and that its
menu button(s) should be displayed.  Finally, we attach to our component
an instance of the local context menu, so that the floating toolbar will
appear next to it when clicked.  All of these enhancements are wrapped in
`ifEditable` to prevent them from being added when the component is rendered
statically.

```
  withData,
```
This last HOC consumes the `componentData` prop and spreads it to the props
of the wrapped component. In our case, it transforms:
```
<CustomReactMarkdown componentData={{
  source: 'Foo',
  timestamp: 'Fri Jun 12 2020 07:04:37 GMT-0400',
}} />
```
to
```
<CustomReactMarkdown 
  source="Foo"
  timestamp="Fri Jun 12 2020 07:04:37 GMT-0400"
/>
```

### Other use-cases

As you can see, this API is quite flexible. Some other use-cases it supports:
- Adding a menu button which performs some immediate action (eg fetching data
  from an external API)
- Manipulate component data before passing as props to the underlying component (inject
  a transformer before `withData`). Useful if the schema of the component's props
  doesn't match the desired form schema.
- Add a form which does something other than edit the component's data (for example
  to submit an issue about the component to an issue tracking system).
