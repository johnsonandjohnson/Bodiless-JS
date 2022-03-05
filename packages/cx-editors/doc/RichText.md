# CanvasX Rich Text Editor Component

The CanvasX Rich Text Editor extend the [Bodiless Rich Text](../../bodiless/Components/RichText) and provides default
editors to be used on site.  By default there are three options for the Rich Text Editor: Simple, Basic, and
Full.

## Content Editor Details

There is no change to editor experience by CanvasX Editor package and thus can refer to [Bodiless Rich Text: Content Editor](../../bodiless/Components/RichText?id=content-editor-details)

## Site Builder Details

At site or global regional/brand library, they can compose the tokens with your site specific tokens and editors.

1. Create a `src/components/Editors/Editor.token.ts`  where you can assign your site/brand specific tokens to each.  (Import & Export as needed)

    ```
    const withQuoteBlockMeta = flow(
      asBlock,
      withButton('format_quote'),
    );

    const withSimpleDesign = withDesign({
      SuperScript: asSuperScript,
    });

    const withBasicDesign = withDesign({
      Bold: asBold,
      Italic: asItalic,
      Underline: asUnderline,
      Link: asLink,
      SuperScript: asSuperScript,
      AlignLeft: asAlignLeft,
      AlignRight: asAlignRight,
      AlignJustify: asAlignJustify,
      AlignCenter: asAlignCenter,
    });

    const withFullFeaturedDesign = withDesign({
      Bold: asBold,
      Italic: asItalic,
      Underline: asUnderline,
      StrikeThrough: flow(replaceWith(Strike), asStrikeThrough, withStrikeThroughMeta),
      Link: asLink,
      SuperScript: asSuperScript,
      AlignLeft: asAlignLeft,
      AlignRight: asAlignRight,
      AlignJustify: asAlignJustify,
      AlignCenter: asAlignCenter,
      H1: asHeader1,
      H2: asHeader2,
      H3: asHeader3,
      BlockQuote: flow(replaceWith(Blockquote), asBlockQuote, withQuoteBlockMeta),
    });

    export {
      withSimpleDesign,
      withBasicDesign,
      withFullFeaturedDesign,
    };
    ```
1. Create a `src/components/Editors/Editor.ts`  where you can compose your site/brand specific tokens to each editor:  (Import & Export as needed)

    ```
    const EditorSimple = flow(
      withSimpleDesign,
    )(EditorBasicClean);

    const EditorBasic = flow(
      withBasicDesign,
    )(CanvasxEditorBasic);

    const EditorFull = flow(
      withFullFeaturedDesign,
    )(EditorFull);

    const withEditorSimple = withEditor(EditorSimple);
    const withEditorBasic = withEditor(EditorBasic);
    const withEditorFull = withEditor(EditorFull);
    ```
1. Create a `src/components/Editors/index.tsx`  where you can export all tokens and schemas from Editors.

    ```
    export * from './Editors';
    export * from './Editors.token';
    ```

### API

Please see [Rich Text API](../../Development/API/@canvasx/editors/globals)

## Architectural Details

None needed. For more information see [Bodiless Rich Text: Architectural](../../bodiless/Components/RichText?id=architectural-details)
