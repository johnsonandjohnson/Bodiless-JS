# Vital Elements

Vital Elements is composed of [element tokens](/VitalDesignSystem/#element-tokens) to implement
an opinionated Vital Design System.

It consists of the following types of component element tokens, and they are all in associated
tokens folders:

* Color
* Font Size
* Text Decoration
* Typography

## Content Editor Details

There is no interaction by the Content Editor with the Vital element tokens, only with tokens once
they've been composed into components.

## Site Builder Details

### Usage of Vital Element Tokens As Is

The Site Builder has the ability to use any of the token Vital elements which are in the
`vital-elements` collection.

#### Usage

Import the required Element tokens from `@bodiless/vital-elements`.

If a singular token is being used, and is directly from a specific Element token:

```js
import { vitalColor } from '@bodiless/vital-elements';

const Foo = {
  Header1: vitalColor.TextPrimaryBodyCopy,
  //...
};
```

If combining multiple tokens, you can put them within `as()` or `flowHoc()`:

```js
import { vitalColor, vitalTextDecoration } from '@bodiless/vital-elements';

const Foo = {
  BoldBody: as(
    vitalTextDecoration.Bold,
    vitalColor.TextPrimaryBodyCopy,
  ),
  //...
};
```

### Using Vital Element Tokens, but Customizing for Site-Specific Typography

The Site Builder may need to override a specific token, or a specific set of tokens, and the
following is a how-to guide to apply the [best methodology](../../Guides/SiteTypography) for doing
so.

### Helper Utilities

The package also includes some helper tokens that are very useful in token composition:

* `asVitalTokenSpec` : Creates a token definition utility for a clean component, and will allow tokens
  to be assigned to any of the slots within your clean component.

  * Usage:

    ```jsx
    const asLayoutToken = asVitalTokenSpec<LayoutComponents>();
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
        _: vitalFontSize.Base,
      },
      Theme: {
        _: as(
          vitalTextDecoration.Bold,
          vitalTextDecoration.Underline,
          vitalColor.TextPrimaryInteractive,
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

### Shadowing Vital Element Tokens

For more information on shadowing Vital Element tokens, read [Shadowing
Tokens](/Development/Guides/Shadowing).

## Architectural Details

When adding new Element tokens to the `vital-elements` package:

* Add to existing Element if it fits the associated component token, or create a new component token
  with applicable name.

If creating a new component token:

* Create a static version of the component.
* Add relevant metadata.
* Remember to export all.
