# Rich Text Editor Component

The Rich Text Editor allows you to easily add text content to your site. By
default there are three options for the Rich Text Editor: Simple, Basic, and
Full. The Rich Text Editor is also a sub component of many higher order components. 
You can add text to a page on your site via the editor component or you
can add a component or components that contain text, which make use of the
editor (e.g. Card, Accordion, etc).

## Content Editor Details

| Simple | Basic | Full | 
| -------|-------|------| 
|![](./assets/SimpleRichTextNew.jpg) | ![](./assets/BasicRichTextNew.jpg) | ![](./assets/FullRichTextNew.jpg) | 
|The Simple Rich Text Editor offers the following formatting options: Superscript | Basic Rich Text Editor offers the following formatting options: bold, italic, underline, link, left alignment, right alignment, center alignment, justification alignment, superscript | The Full Rich Text Editor offers the following formatting options: bold, italic, underline, link, left alignment, right alignment, center alignment, justification alignment, superscript, header |

?> Please note that the above configurations are examples of the default options.
The site requirements and site builder will determine which rich text editor
options are available, where they are available to the editor, and which options
are available for each variation.

## Site Builder Details

> Note this document describes the low-level API of Bodiless's rich text editing support. 
> A new high level API is under active development.

Bodiless RichText provides a Rich Text Component that allows content uses to edit and manipulate text.
This package also includes a set of tools for elegant scaffolding and extending Slate editor.
> Before using this module it is essential to understand how Slate editor works:
**[Read Slate Walkthroughs and Guides sections](https://docs.slatejs.org/).**

## Architectural Details

### Contents

1. **Exports**
   - [Slate Editor Component](#slateeditor)
   - [Content Component](#slatecontent)
   - [SlateContext Component](#slateeditorcontext)
   - [Hover Menu Component](#hovermenu)
   - [RichText Items](#rich-text-items)

2. **Plugin Factories**
   - [Mark Factory](#mark-factory)
   - [Inline Factory](#inline-factory)
   - [Block Factory](#block-factory)

3. **APIs**
    - [Node Component API](#node-component-api)
    - [Node Form API](#node-form-api)

4. **Guides**
   - [How to create mark plugin](#creating-mark-plugin)
   - [How to create inline plugin. ](#creating-inline-plugin)
   - [TBD] Creating a block plugin

### Exports

<a name="slateeditor"></a>
#### Slate Editor Component - `<SlateEditor />`
`<SlateEditor>` - Main Content controller component that provides react context with
editor related data and callbacks to nested components.

**Basic usage:**

```js
import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withReact, Slate } from 'slate-react';
import { SlateEditor, Content } from '@bodiless/richtext/lib/core';

const defaultValue = [{
  type: 'paragraph',
  children: [
    { text: '' },
  ],
}];

const MyEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(defaultValue)
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <SlateEditor>
        <Content />
      </SlateEditor>
    </Slate>
  );
};
```

**Properties:**

|Name| Description   |
|---|---|
|`initialValue`|Initial value of the editor that will be used on editor mount.|
|`plugins`   | An array of slate editor plugins to be applied to the editor instance on initialization by `<Content>`.|
|`value`   |A Value object representing the current value of the editor. Prop `value` takes priority over `initialValue` prop and internal `value` state. |
|`onChange`   |A change handler that will be called with the `change` that applied the change. This hook allows you to add persistence logic to your editor.
|`children`| Components listed as children will have access to the Content Context. `<SlateEditor>` requires `<Content>` to be an immediate children.

<a name="slatecontent"></a>
### Content Component - `<Content />` 
`<Content>` - Wrapper around [`<Editable />`](https://docs.slatejs.org/libraries/slate-react#editable) which is the main editorial area.
`<Content>` supplies values from props and SlateEditor Context to [`<Editable />`](https://docs.slatejs.org/libraries/slate-react#editable).

**Basic usage:**

```js
import React, { useMemo, useState } from 'react';
import { createEditor } from 'slate';
import { withReact, Slate } from 'slate-react';
import { Content } from '@bodiless/richtext/lib/core';

const defaultValue = [{
  type: 'paragraph',
  children: [
    { text: '' },
  ],
}];

const MyEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(defaultValue)
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <Content
        className='editor' 
        style={{ opacity: '0.5'}}
        spellCheck
        placeholder='Type here...' 
      />
    </Slate>
  );
};
```

**Properties:**

See `EditableProps` type from `slate-react/dist/editable.d.ts`.

<a name="slateeditorcontext"></a>
### SlateContext Component
`SlateContext` - an object with editor related data to be used in nested components.

**Basic usage:**

```js
import React, { useMemo, useState, useContext } from 'react';
import { createEditor } from 'slate';
import { withReact, Slate } from 'slate-react';
import { SlateEditor, Content, SlateEditorContext } from '@bodiless/richtext/lib/core';

const defaultValue = [{
  type: 'paragraph',
  children: [
    { text: '' },
  ],
}];

const Toolbar = () => {
  const { value } = useContext(SlateEditorContext);
  // some logic to render data based on context value
  return <div>{JSON.stringify(value, null, 2)}</div>
} 

const MyEditor = () => {
  const editor = useMemo(() => withReact(createEditor()), [])
  const [value, setValue] = useState(defaultValue)
  return (
    <Slate
      editor={editor}
      value={value}
      onChange={newValue => setValue(newValue)}
    >
      <SlateEditor value={value}>
        <Toolbar />
        <Content />
      </SlateEditor>
    </Slate>
  );
};

```

**Properties:**

|Name   | Description   |
|---|---|
|`initialValue`|Initial value of the editor that will be used on editor mount.|
|`plugins`   | An array of slate editor plugins to be applied to the editor instance on initialization by `<Content>`.|
|`value`   |A Value object representing the current value of the editor. Prop `value` takes priority over `initialValue` prop and internal `value` state. |
|`onChange`   |A change handler that will be called with the `change` that applied the change. This hook allows you to add persistence logic to your editor.


<a name="hovermenu"></a>
### Hover Menu Component - `<HoverMenu />`
`<HoverMenu />` - a hover menu that appears on any selection within editor. 
`<HoverMenu />` passes values of `SlateContext` to all its children as props.

**Basic usage:**
```js
import React from "react";
import { SlateEditor, Content, HoverMenu } from "@bodiless/richtext/lib/core";

const Content = (props) => {
  return (
    <SlateEditor {...props} plugins={plugins} >

      <HoverMenu>
        <BoldButton />
        <ItalicButton />
      </HoverMenu>

      <Content />
    </SlateEditor>
  );
};

export default Content;
```

<a name="rich-text-items"></a>

#### RichText Component

The RichText Component is built on the [SlateJS](https://docs.slatejs.org/) framework. It takes design object 
(see @bodiless/Design System) that contain HOC to build out the component that are 
available in the RichText Editor. Those are then presented to the user using both a 
contextual hover menu as well as the standard menu. These items can be used by using 
a set of HOC's. 

`startWith(Component)` lets us know which component should be part of the item

`asMark`, `asInline` and `asBlock` are used to say how the slate editor should use the component.

- `marks` are used for basic character-level formatting (eg bold, italic, underline, text=color, etc).
- `inlines` may also be used for character formatting, but should generally be reserved for cases 
where the component requires additional configuration besides the text (for example, a link, 
which may require `href`, `target` or other attributes).
- `blocks` should be used for block-level formatting (eg headers, lists, etc).

`withKey('mod+k')` can be used to add a shortcut key to the component.

`withButton("icon")` can be used to add a button that will set the text to a component. 
If the item is asBlock then it will be added to the global menu if not then it will be added 
to the local hover menu.

There are a set of keys that have defaults that are often used they are the following:

- SuperScript
- Bold
- Italic
- Underline
- Link
- AlignLeft
- AlignRight
- AlignCenter
- AlignJustify
- H1
- H2
- H3

With these one only need to include the key.

Each of this helper return a function that we pass in as items. We can use flow to 
combine them as such:

```js
const design = {
  Bold: asBold,
  Link: asLink,
  Strikethrough: flow(
    startWith(Span),
    withButton('format_strikethrough'),
    withKey('mod+s'),
    asMark,
  ),
};
const EditorFullFeatured = <P extends object> (props:P) => (
  <RichText design={items2} initialValue={demoValue} {...props} />
);
```

### Plugin Factories

In order to minify boilerplate creating a slate plugin `@bodiless/richtext` provides factories.
There are 3 types of plugins that can be created:
- **Mark plugin** - renders provided component wrapping a piece of text. Doesn't have any 
data and component is togglable.
- **Inline plugin** - acts as a mark, but has data and a way to control it. You can 
provide a Form component that implements [Form API](#using-form-api) along with the component, 
and plugin with handle the data updates and rendering of both Component and Form.
- **Block plugin** - TBD

<a name="mark-factory"></a>
#### Mark Plugin Factory
Mark plugin factory reduces boilerplate required to create a plugin to render custom marks in 
Slate editor. Also, you can generate a button that is going to trigger the mark on and off.

**Exports:**
- createMarkButton(markType: string, materialIcon: string): React.ComponentType
    - **_markType_**: string - a unique string to identify mark component. 
    Should match _markType_ value of the corresponding mark plugin.
    - **_materialIcon_**: string - a string that is converted into a [Material Icon](https://material.io/tools/icons/?style=baseline) glyph

<a name="inline-factory"></a>
### Inline Plugin Factory
Inline plugin factory reduces boilerplate required to create a plugin to render
custom inline nodes in Slate editor. You can generate a button for an inline
node like for marks. Also, in addition, you can provide a custom form for each
inline node to manage its data.

**Exports:**
- createInlineButton(inlineType: string, materialIcon: string): React.ComponentType
    - **_inlineType_**: string - a unique string to identify inline node component. 
    Should match _inlineType_ value of the corresponding inline plugin.
    - **_materialIcon_**: string - a string that is converted into a [Material Icon](https://material.io/tools/icons/?style=baseline) glyph


<a name="block-factory"></a>
### Block Plugin Factory
Block plugin factory reduces boilerplate required to create a plugin to render custom 
block nodes in Slate editor. You can generate a button for block node like for marks. 

**Exports:**
- createBlockButton(inlineType: string, materialIcon: string): React.ComponentType
    - **_inlineType_**: string - a unique string to identify inline node component. 
    Should match _inlineType_ value of the corresponding block plugin.
    - **_materialIcon_**: string - a string that is converted into a [Material Icon](https://material.io/tools/icons/?style=baseline) glyph

### Guides 

<a name="creating-mark-plugin"></a>
#### Creating mark plugin
Mark is a simple wrapper for a specific piece of text in the editor. Marks are the 
simplest entities of Slate Content and can be only triggered on and off and stack
with other marks.
 
**Mark Plugin Factory usage:**
```js
import React from 'react';
import { createMarkButton } from '@bodiless/richtext/lib/plugin-factory';

const MARK_TYPE = 'custom_mark';
const CustomMarkButton = createMarkButton(MARK_TYPE, 'format_underline');

export {
  CustomMarkButton,
};
```

<a name="creating-inline-plugin"></a>
#### Creating Inline Plugin

**Inline Plugin Factory usage:**
```js
import React from 'react';
import { createInlineButton } from '@bodiless/richtext/lib/plugin-factory';

const INLINE_TYPE = 'custom_inline';
const CustomInlineButton = createInlineButton(INLINE_TYPE, 'link');

export {
  CustomInlineButton,
};
