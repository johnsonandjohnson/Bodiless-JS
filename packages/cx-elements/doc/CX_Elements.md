# CanvasX Elements

CanvasX Elements is composed of [element tokens](/Design/DesignSystem#element-tokens) to implement
an opinionated CanvasX design system.

It consists of the following types of component element tokens, and they are all in associated
tokens folders:

* Color
* Font Size
* Text Decoration
* Typography

## Content Editor Details

There is no interaction by the Content Editor with the CanvasX element tokens, only with tokens once
they've been composed into components.

## Site Builder Details

### Usage of CX Element Tokens As Is

The Site Builder has the ability to use any of the token CanvasX elements which are in the
`cx-elements` collection.

#### Usage

Import the required Element tokens from `@bodiless/cx-elements`.

If a singular token is being used, and is directly from a specific Element token:

```js
import { cxColor } from '@bodiless/cx-elements';

const Foo = {
  Header1: cxColor.TextPrimaryBodyCopy,
  //...
};
```

If combining multiple tokens, you can put them within `as()` or `flowHOC()`:

```js
import { cxColor, cxTextDecoration } from '@bodiless/cx-elements';

const Foo = {
  BoldBody: as(
    cxTextDecoration.Bold,
    cxColor.TextPrimaryBodyCopy,
  ),
  //...
};
```

### Using CX Element Tokens, but Customizing for Site-Specific Typography

The Site Builder may need to override a specific token, or a specific set of tokens, and the
following is a how-to guide to apply the [best methodology](./CX_SiteTypography) for doing so.

### Helper Utilities

The package also includes some helper tokens that are very useful in token composition:

* `asCxTokenSpec` : Creates a token definition utility for a clean component, and will allow tokens
  to be assigned to any of the slots within your clean component.

  * Usage:

    ```jsx
    const asLayoutToken = asCxTokenSpec<LayoutComponents>();
    ```

* `asMetaToken` : Creates a token which applies the given metadata.

  * Usage:

    ```jsx
    TBD
    ```

    * Explanation: TBD

* `asElementToken` : Creates an element level token where only the `_` design key is allowed.

  * Usage:

    ```jsx
    const Link = asElementToken({
      Core: {
        _: cxFontSize.Base,
      },
      Theme: {
        _: as(
          cxTextDecoration.Bold,
          cxTextDecoration.Underline,
          cxColor.TextPrimaryInteractive,
        ),
      },
      Meta: meta,
    });
    ```

    * The above example creates an element token that combines classes in the core and theme
      domains, as well as assigns the associated metadata for the token.

* `asFluidToken` : Creates a token for a component with a fluid design (one in which any design key
  is allowed).

  * Usage:

    ```jsx
    TBD
    ```

  * Explanation: TBD

* `asTokenGroup` : Creates a group of element tokens with shared meta.

  * Usage:

    ```jsx
    default asTokenGroup(meta)({
      Base: 'text-m-base lg:text-base',
      XXXL: 'text-m-3xl lg:text-3xl',
      XXL: 'text-m-2xl lg:text-2xl',
      XL: 'text-m-xl lg:text-xl',
      L: 'text-m-lg lg:text-lg',
      XS: 'text-m-xs lg:text-xs',
    });
    ```

    * The above example will apply the same meta to all element tokens.

### Shadowing CX Element Tokens

For more information on shadowing CX Element tokens, read [CX Shadow](./CX_Shadow.md).

## Architectural Details

When adding new Element tokens to the `cx-elements` package:

* Add to existing Element if it fits the associated component token, or create a new component token
  with applicable name.

If creating a new component token:

* Create a static version of the component.
* Add relevant metadata.
* Remember to export all.
