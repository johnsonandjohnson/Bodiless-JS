# CanvasX Plain Text Editor Component

The CanvasX Plain Text Editor consists of defining the placeholder, and setting it up to allow
auto-superscripting, if necessary.

## Content Editor Details

The plain editor has no options, and the user can click on the text and edit as necessary.

### Auto-Superscripting is Enabled on Plain Text Editor

An auto-superscript feature may be applied to a Plain Text Editor, which will automatically
superscript a configured set of special characters.

If enabled, the auto-superscript feature will trigger and superscript applicable text:

- Once focus is removed from the component being edited;
- If the string entered by the Content Editor has any special characters configured to be
  superscript.

## Site Builder Details

What's shown in the following example can be applied to any Slot.

### Usage

```js
  Editors: {
    Content: as(cxEditorPlain.Default)(EditorPlainClean)
  },
  Schema: {
    Content: withNode('content'),
  }
```

We recommend that the Editor Component and tokens be defined in the Editors Domain, and the node be
defined in the Schema Domain.

### Auto-Superscripting

By default, the editor provides the `WithAutoSuperscript` token, which can be applied to your plain
text editor, allowing special characters to be superscripted.

The first parameter is the list of characters that will be wrapped with a `<sup>` tag. The token
defaults to "®™" (the _registered trademark_ and _trademark_ symbols). The second parameter allows
you to apply a class to the `<sup>` tag. The token defaults to the `align-baseline` class.

#### Usage

The following composes a default plain editor with a custom superscript token:

```js
const WithCustomAutoSuperscript = asElementToken({
  Behavior: {
    _: withAutoSuperscript('©®™℠', 'align-super'),
  },
});

const EditorWithCustomAutoSuperscript = as(
  cxEditorPlain.Default,
  WithCustomAutoSuperscript,
  withNodeKey('plain-with-super'),
)(EditorPlainClean);
```

?> **Tip:** Some fonts have the trademark characters already raised to the correct position and do
not need `<sup>` tags, while other fonts will need you to apply `<sup>` tags and raise the
characters by styling. Please check your font and determine if you need `AutoSuperscript` on your
plain text editor. Note the Content Editor doesn't have the ability to apply superscript when using
the plain text editor, so it's important to apply this token if your font doesn't look
superscripted.

## Architectural Details

There are no architecture details necessary for this component.
