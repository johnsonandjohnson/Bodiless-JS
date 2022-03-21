# CanvasX Site Typography Setup/Override

The site typography consists of updating fonts, colors, font sizes, and basic tokens (e.g., `h1`).

## Step 1: Setup Fonts

The CX Starter utilizes the [DM Sans](https://fonts.google.com/specimen/DM+Sans) font from the
Google API. If your designs require a different font, please refer to the [fonts documentation
guide](/Development/Guides/BuildingSites/Typography/Fonts).

## Step 2: Font Size & Line Heights

The CanvasX Design System has defined the following [font
sizes](https://xd.adobe.com/view/fd6e4dde-2ecf-480a-aaaf-f5043cb04bf0-a83d/screen/d0c37949-f384-4a14-ad34-011d39ef62ba/specs/),
and they have been converted into the REM point system using base 16.

To facilitate converting a custom font size into REM units, please refer to this [XLS
Template](./assets/PXtoREMTemplate.xlsx).

### Option 1: Shadow `cxFontSize` (*Preferred Solution)

Provide the Shadowing function as defined in [Shadow](./CX_Shadow).

File to shadow:
[`cxFontSize`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-elements/src/components/Element/FontSize/tokens/cxFontSize.ts)

### Option 2: Override in `site.tailwind.config.js` File

Within your package/site's `site.tailwind.config.js`, you can replace the Tailwind elements with
your own font sizes, line height, and (optionally) spacing.

```js
module.exports = {
  theme: {
    fontSize: {
      xs: ['0.75rem', '1.125rem'],
      sm: ['0.875rem', '1.25rem'],
      base: ['1rem', '1.375rem'],
      lg: ['1.75rem', '1.875rem'],
      xl: ['1.625rem', '2rem'],
      '2xl': ['2rem', '2.25rem'],
      '3xl': ['2.563rem', '2.813rem'],
      'm-xs': ['0.688rem', '0.938rem'],
      'm-sm': ['0.75rem', '1rem'],
      'm-base': ['0.875rem', '1.125rem'],
      'm-lg': ['1.125rem', '1.375rem'],
      'm-xl': ['1.438rem', '1.625rem'],
      'm-2xl': ['1.813rem', '2.125rem'],
      'm-3xl': ['2.25rem', '2.5rem'],
    },
  },
};
```

## Step 3: Define Colors for Site

The CanvasX Design System defines the following
[colors](https://xd.adobe.com/view/fd6e4dde-2ecf-480a-aaaf-f5043cb04bf0-a83d/screen/96d7b2f3-6afb-45fb-b808-075a24af2434/specs/).

### Option 1: Shadow `cxColor` (*Preferred Solution)

Provide the Shadowing function as defined in [Shadow](./CX_Shadow).

File to shadow:
[`cxColor`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-elements/src/components/Element/Color/tokens/cxColor.ts)

### Option 2: Override in `site.tailwind.config.js` File

```js
module.exports = {
  theme: {
    colors: {
      'cx-primary': {
        brand: '#CA081B',
        'card-bg': '#ffffff',
        'page-bg': '#F4F4F4',
        interactive: '#000099',
        'interactive-active': '#000341',
        divider: '#D8D8D8',
        'body-copy': '#63666A',
        'header-copy': '#212121',
      },
      'cx-secondary': {
        eyebrow: '#CC0099',
        'footer-bg': '#2B2B33',
      },
    },
  },
};
```

## Step 4: Override Other CX Tokens

The CanvasX Design System provides header, body, eyebrow, link, and other specific text decoration
tokens, which have their designs linked above. These tokens can be shadowed, which is the
recommended way of changing, adding, or redefining tokens at a package/site level.

### Option 1: Shadowing (*Preferred Solution)

Provide the Shadowing function as defined in [Shadow](./CX_Shadow).

Files to shadow:

- [`cxTypography`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-elements/src/components/Element/Typography/tokens/cxTypography.ts)
- [`cXTextDecoration`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-elements/src/components/Element/TextDecoration/tokens/cxTextDecoration.ts)

### Option 2: Define Custom Tokens at Package Level

The Site Builder can define their own custom tokens at package level.

## Step 5: Apply Typography at Site Level

Follow the instructions at [Applying Classes to Your Entire
Site](/Development/Guides/BuildingSites/Typography/Typography#applying-classes-to-your-entire-site).
