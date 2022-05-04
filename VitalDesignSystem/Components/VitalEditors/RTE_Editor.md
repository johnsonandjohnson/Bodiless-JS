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

### Overriding Rich Text Editor

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow:
[`vitalRichText`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-editors/src/components/RichText/tokens/vitalRichText.ts)

#### Via Overriding Specific Existing Styles Using Vital Rich Text Editor

See [Vital Site Typography](../VitalElements/SiteTypography).

### Extending Default Vital Rich Text Editor

At site or global regional/brand library level, a site can compose a set of new tokens to meet the
design requirements, and provide additional Rich Text functionality (typically, via buttons).

01. Create a `src/components/Editors/RichText.tokens.ts` where you can create/use your site/brand
    specific tokens for each. (`import` and `export` as needed.)

    ```js
    import { asBlock, withButton, } from '@bodiless/richtext';
    import { asVitalTokenSpec } from '@bodiless/vital-elements';

    const withQuoteBlockMeta = flowHoc(
      asBlock,
      withButton('format_quote'),
    );

    const BrandRichText = asVitalTokenSpec()({
      ...vitalRichText.Default,
      Core: {
        ...vitalRichText.Default.Core,
        Quote: withQuoteBlockMeta,
      },
      Components: {
        ...vitalRichText.Default.Components,
        Quote: 'italic',
      },
    });
    ```

    - `withQuoteBlockMeta` creates a token that will be a designable Span and adds a new quote
      button to the editor.
    - `BrandRichText` starts with the existing `vitalRichText` functionality, and, in both
      Core/Components, it spreads existing functionality across these two domains and the new tokens
      are added.
    - For an example of a simple token that adds functionality to Slate, expand the disclosure
      below:

      <details>
        <summary>Click here for example...</summary>

        ```js
        import { asBlock, withButton, } from '@bodiless/richtext';
        import { asTokenSpec, Blockquote, replaceWith, flowHoc } from '@bodiless/fclasses';

        const withQuoteBlockMeta = flowHoc(
          asBlock,
          withButton('format_quote'),
        );

        //...

        const EditorWithBlockQuote = asTokenSpec()({
          ...vitalDefault,
          Core: {
            ...vitalDefault.Core,
            // `asBlockQuote` is an example token you would import from your site's
            // `/src/components/Elements.token.ts` file.
            // E.g., `const asBlockQuote = addClasses('block mx-4');`
            BlockQuote: flowHoc(replaceWith(Blockquote), asBlockQuote, withQuoteBlockMeta),
          }
        });
        ```

      </details>

01. Create a `src/components/Editors/index.tsx`  where you can export all tokens and schemas from
    Editors.

    ```js
    export BrandRichText from './RichText.tokens';
    ```

## Architectural Details

None needed. For architectural information, see [Bodiless Rich Text : Architectural
Details](/Components/Editors/RichText#architectural-details).
