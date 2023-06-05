# Vital Rich Text Editor Component

The Vital Rich Text Editor Component is based on the [BodilessJS Rich Text Editor
Component](/Components/Editors/RichText). While Bodiless Rich Text is a generic rich text editor
(RTE) component with tokens that can be combined however you choose, Vital Rich Text builds upon it,
providing a sensible default combination of its generic [Vital tokens](../VitalElements/), to help
meet typical site-use expectations.

By default, the only option available for the Vital Rich Text Editor is the _Full_ Rich Text Editor.

## Content Editor Details

Other than potentially seeing different buttons available, there is no change to the Editor
experience by the Vital Editor package, and, thus, you can refer to the [Bodiless Rich Text Editor :
Content Editor Details](/Components/Editors/RichText#content-editor-details).

## Site Builder Details

### Usage of the Vital Rich Text Editor

What's shown in the following example can be applied to any Slot.
There are other available Editor Tokens, see next section.

```js
import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { asVitalTokenSpec } from '@bodiless/vital-elements';

const WithRichTextEditor = asVitalTokenSpec({
  Editors: {
    Content: as(vitalRichText.Default)(RichTextClean);
  },
  Schema: {
    Content: withNode('content'),
  }
});
```

We recommend that the Editor Component and tokens be defined in the Editors Domain, and the node be
defined in the Schema Domain.

### Available Rich Text Editors

There are some Editor Tokens available in `vitalRichText`.

- Default
  - Available tools: Bold, Link, Superscript, and H1 to H5.
- Basic
  - Available tools: Bold, Link, and Superscript.
- BasicNoLink
  - Available tools: Bold and Superscript.

### Overriding Rich Text Editor

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadowing Tokens](/Development/Guides/Shadowing).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-editors/RichText.ts`

[Examples of how to shadow the Rich Text Editor](./RichTextCustomizing)

#### Via Overriding Specific Existing Styles Using Vital Rich Text Editor

See [Vital Site Typography](../../Guides/SiteTypography).

## Architectural Details

None needed. For architectural information, see [Bodiless Rich Text : Architectural
Details](/Components/Editors/RichText#architectural-details).
