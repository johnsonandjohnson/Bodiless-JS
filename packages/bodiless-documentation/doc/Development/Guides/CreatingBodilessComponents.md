# Creating Bodiless Components

In the previous guides, you have seen how to use built-in Bodiless components to
build out an editable site. But what if you have pre-built components (or even
pages) you'd like to make editable? BodilessJS provides a set of utilities which
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
  groupLabel?: string;
  group?: string;
  groupMerge?: 'merge'|'merge-up'
  global?: boolean;
  local?: boolean;
  renderForm: FormBodyRenderer<P, D>;
  formTitle?: string;
  activateEvent?: string,
  Wrapper?: CT<any>|string,
  defaultData?: D,
  peer?: boolean,
  root?: boolean,
};
```

| Property | Description |
| --- | --- |
| `icon` | The name of the [material icon](https://material.io/resources/icons/?style=baseline) to use for the edit button |
| `name` | A unique machine name for this option |
| `label` | A human readable label for the edit button |
| `global` | Specifies whether the button should appear on the global admin toolbar (default is false), but see `root` below. |
| `local` | Specifies whether the button should appear in the local context menu (default is true, but see `root` below) |
| `group` | Optional name of a menu option group to which this button should belong. If omitted, the button will define its own group. This can be used to add the button to a group defined by another menu option. |
| `groupLabel` | A human readable label for the group to which the edit button will belong (serves as a super-title). Ignored for global options or if `group` is specified. |
| `groupMerge` | Defines whether and how this button group should merge with adjacent buttons groups. Possible vaules are 'merge', 'merge-up' and 'none' (the default). Ignored for global options or if `group` is specified. |
| `renderForm` | A function which should render the form fields. See below. |
| `formTitle` | Optional text to display as the title of the edit form. |
| `peer` | Specifies that the options should be attached to the current context. |
| `root` | Specifies that the options should be attached to the root (global) context. If specified, the options will appear only on the global toolbar unless overridden by `global` or `local` above.  |
| `activateEvent` | The event which will trigger the "activation" of the components edit button. Usually "onClick".  "Activation" is usually the result of selecting the component in some way or giving it focus.  The component's button(s) will only appear in the menu when the component is activated. Ignored if `root` or `peer` is true. |
| `Wrapper` | A component which will wrap this component in edit mode. Useful if the component itself cannot generate the activateEvent. Ignored if `root` or `peer` is true. |
| `defaultData` | Optional default data to be used for this component |

### Defining the form

The key option above is `renderForm`. This is where you define the fields that
will be used to edit your component. BodilessJS uses the excellent
[Informed](https://joepuzzo.github.io/informed) library to build forms. Defining
your component form is as simple as returning informed inputs whose names match
the props of your component.

Let's see what a `renderForm` callback might look like for `ReactMarkdown`.
```
const renderForm = () => {
  const { ComponentFormTitle, ComponentFormTextArea } = useMenuOptionUI();
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

> Notice the use of the `useMenuOptionUI()` hook. The Bodiless-JS admin UI is designed
to be theme-able. Themers can provide their own styled versions of all UI
elements. Here we simply retrieve the styled elements we need. For example,
`ComponentFormTextArea` is nothing more than a styled version of the native
[TextArea](https://joepuzzo.github.io/informed/?path=/story/inputs--text-area)
input from Informed. `useMenuOptionUI()` will return such styled versions of all
native Informed inputs (pending [#336](https://github.com/johnsonandjohnson/Bodiless-JS/issues/336))

Now we're ready to complete our `asBodilessMarkdown` function:

```ts
const asBodilessMarkdown = asBodilessComponent<Props, Data>({
  name: 'edit-markdown',
  icon: 'edit',
  label: 'Edit',
  groupLabel: 'Markdown',
  formTitle: 'Edit Markdown',
  renderForm,
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

```ts
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

```ts
const renderForm = () => {
  const { ComponentFormTitle } = useMenuOptionUI();
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

```ts
import React from 'react';
import { asBodilessComponent, useMenuOptionUI } from '@bodiless/core';
import type { ReactMarkdownProps as Props } from 'react-markdown';

import MarkdownField from './InformedMarkdown';

type Data = Pick<Props, 'source'>;

const asBodilessMarkdown = asBodilessComponent<Props, Data>({
  name: 'edit-markdown',
  icon: 'edit',
  label: 'Edit',
  groupLabel: 'Markdown',
  formTitle: 'Edit Markdown',
  renderForm: () => {
    const { ComponentFormLabel } = useMenuOptionUI();
    return (
      <ComponentFormLabel>
        Content
        <MarkdownField field="source" />
      </ComponentFormLabel>
    );
  },
  Wrapper: 'div',
  defaultData: { source: 'Initial Value' },
});

const Markdown = asBodilessMarkdown('body')(ReactMarkdown);

export default Markdown;
```

## Extending 

An `asBodiless` HOC can be extended in various ways.

### Adding form fields

As an example, let's
imagine that we had a customized version of `ReactMarkdown` which would render 
last-modified data if passed as a prop, something like:

```ts
const withLastModified = (Component: ComponentType<Props>) => {
  const WithLastModified = ({ timestamp, lastModified, ...rest }: Props) => (
    <div>
      <Component {...rest} />
      <hr />
      Last modified
      {lastModified && ` by ${lastModified}`}
      {timestamp && ` on ${timestamp}`}
    </div>
  );
  return WithLastModified;
};
```
And suppose that we want to add a field to our form for the editor's name,
and update the timestamp when saved.  Note this is a bit of a contrived
example; in the real world we'd probably want to get the updated time from
a server rather than relying on the user's browser.

Bodiless provides an API which allows us to extend any form created by
`asBodilessComponent`.  First we define a render function just as we did
for the original form:

```ts
const renderForm = () => {
  const { ComponentFormText, ComponentFormLabel } = useMenuOptionUI();
  return (
    <ComponentFormLabel>
      Last modified by
      <ComponentFormText field="lastModified" />
    </ComponentFormLabel>
  );
};
```

Then, we define a data handler which will add the timestamp:

```ts
const submitValueHandler = (values: any) => ({
  ...values,
  timestamp: new Date().toString(),
});
```

Finally, we compose a series of core Bodiless HOC's (using Lodash `flowRight`) to
fully integrate our component and its custom form:

```ts
const withLastModifiedForm = (nodeKey: WithNodeKeyProps) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(),
  ifEditable(
    withEditFormSnippet({ renderForm, submitValueHandler }),
  ),
  ifReadOnly(
    withoutProps('setComponentData'),
  ),
  withData,
  withTimestamp,
);
```

Let's take this step by step:

```ts
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers({
    lastModified: 'Unknown',
    timestamp: 'Unknown',
  }),
```

These three HOC's provide integration to
[the BodilessJS data flow](../Architecture/Data). They
ensure that the component is given a place to store its data, and
define the "empty" value for that data. They add two props--`componentData`
and `setComponentData`--which are used by the HOC's further down the
chain.

```ts
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

```ts
  ifEditable(
    withEditFormSnippet({ renderForm, submitValueHandler }),
  ),
```

Here is where we add the actual form fields, along with our 

```ts
  withData,
```

This last HOC consumes the `componentData` prop and spreads it to the props
of the wrapped component. In our case, it transforms:

```ts
<CustomReactMarkdown componentData={{
  lastModified: 'wodenx',
  timestamp: 'Fri Jun 12 2020 07:04:37 GMT-0400',
}} />
```

to

```ts
<CustomReactMarkdown 
  lastModified="wodenx"
  timestamp="Fri Jun 12 2020 07:04:37 GMT-0400"
/>
```
### Using overrides

Any `asBodiless` function produced by `asBodilessComponent` takes a third parameter
usually named `useOverrides`.  This is a function (a custom React hook) which receives
the component's props and can returns overridden values for many of the options
passed to `asBodilessComponent`.  Let's use this to move our button to the global
toolbar and customize its label.

```ts
const useOverrides = () => ({
  root: true,
  group: 'page-group',
  label: 'Body',
});
```
Note the value of the `group` attribute.  This is the name of a group provided
by the built-in Bodiless admin UI, and we are adding our button to it.

We can compose this with our form extension to create our customized version
of `asBodilessMarkdown`:

```ts
const asCustomBodilessMarkdown = (nodeKey: WithNodeKeyProps) => flowRight(
  asBodilessMarkdown(nodeKey, undefined, useOverrides),
  withLastModifiedForm('last-modified'),
  withlastModified,
);
```

### Adding a custom button.

As a final example, let's add a button which pulls content from an external URL
populates our markdown field.

Just as in the previous example, we begin by creating a form for entering the URL.


```ts
const Form: FC<Omit<ContextMenuPropsType<Data>, 'children'>> = props => {
  const { ComponentFormLabel, ComponentFormText } = useMenuOptionUI();
  return (
    <ContextMenuForm {...props}>
      <ComponentFormLabel>
        URL
        <ComponentFormText field="url" />
      </ComponentFormLabel>
    </ContextMenuForm>
  );
};
```

This should look familiar by now.  Next, we define a menu button which will render
our form:

```ts
const useMenuOptions = () => {
  const { node } = useNode();
  const fetchSource = async (url: string) => {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error(r.statusText);
      const source = await r.text();
      node.setData({ source });
    } catch (e) {
      alert(`Error: ${e.message}`);
    }
  };
  const render = (formProps: ContextMenuFormProps) => (
    <Form
      {...formProps}
      submitValues={v => {
        fetchSource(v.url);
        formProps.closeForm(null);
      }}
    />
  );
  return [{
    icon: 'cloud_download',
    name: 'fetch-markdown',
    label: 'Fetch',
    group: 'page-group',
    formTitle: 'Fetch markdown from',
    handler: () => render,
  }];
};
```

This is a very over-simplified example, but basically:
- We define a `fetchContent` function which pulls the content from the specified
  url. Once the content is obtained, it is written to the current content node
  via `node.setData`.  A content node represents a storage location for a component's
  data.  In this case, we use the node that was created by `asBodilessMarkdown`, the
  same node that is used by our edit form.
- We define a `render` function which attaches our fetch function as a submit hanlder
  for our form.  Note that our render function will receive a `closeForm` 
  prop which we must use to dismiss the form when the user clicks "submit".
- Finally, we create and return an array of menu options. In our case, there is
  only one.  Many of the properties are the same as those we used when defining
  our edit button.  The main difference is that, instead of providing a `renderForm`
  callback, we provide a handler function which *returns* a render callback. This
  handler will be invoked when a user clicks the button.  It could, of course, do
  more than just display a form (for example - it could check the url for updates).

Finally,  we can add these menu options to the `asCustomBodilessMarkdown` HOC we
composed above:

```ts
const asCustomBodilessMarkdown = (nodeKey: WithNodeKeyProps) => flowRight(
  asBodilessMarkdown(nodeKey, undefined, useOverrides),
  ifEditable(
    withMenuOptions({ useMenuOptions, root: true }),
  );
  withLastModifiedForm('last-modified'),
  withlastModified,
);
```

Mote that we add the `root` flag here (not in the menu option itself) in order to
place this button on the global menu.

### Other use-cases

As you can see, this API is quite flexible. Some other use-cases it supports:
- Adding a menu button which performs some immediate action (eg fetching data
  from an external API)
- Manipulate component data before passing as props to the underlying component (inject
  a transformer before `withData`). Useful if the schema of the component's props
  doesn't match the desired form schema.
- Add a form which does something other than edit the component's data (for example
  to submit an issue about the component to an issue tracking system).
