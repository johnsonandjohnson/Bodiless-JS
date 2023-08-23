[@bodiless/vital-card](../README.md) / VitalCard

# Interface: VitalCard

Tokens for the vital card

**`See`**

[[CardClean]]

## Hierarchy

- `VitalCardBase`

- `VitalCardHero`

- `VitalCardCategory`

- `VitalCardTopic`

- `VitalCardCore`

- `TokenCollection`<[`CardComponents`](CardComponents.md), {}\>

  ↳ **`VitalCard`**

## Table of contents

### Properties

- [Basic](VitalCard.md#basic)
- [Category](VitalCard.md#category)
- [Default](VitalCard.md#default)
- [Hero](VitalCard.md#hero)
- [Topic](VitalCard.md#topic)
- [WithFlexGrowImage](VitalCard.md#withflexgrowimage)
- [WithFlowContainerPreview](VitalCard.md#withflowcontainerpreview)
- [WithHorizontalContentAtTop](VitalCard.md#withhorizontalcontentattop)
- [WithHorizontalContentCentered](VitalCard.md#withhorizontalcontentcentered)
- [WithHorizontalLeftOrientation](VitalCard.md#withhorizontalleftorientation)
- [WithHorizontalOrientationBase](VitalCard.md#withhorizontalorientationbase)
- [WithHorizontalRightOrientation](VitalCard.md#withhorizontalrightorientation)
- [WithNoDescription](VitalCard.md#withnodescription)
- [WithNoEyebrow](VitalCard.md#withnoeyebrow)
- [WithNoTitle](VitalCard.md#withnotitle)
- [WithPrimaryButton](VitalCard.md#withprimarybutton)
- [WithPrimaryTextLink](VitalCard.md#withprimarytextlink)
- [WithSecondaryButton](VitalCard.md#withsecondarybutton)
- [WithVerticalOrientation](VitalCard.md#withverticalorientation)

## Properties

### Basic

• **Basic**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines a primary vertical card

#### Inherited from

VitalCardCore.Basic

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:156](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L156)

___

### Category

• **Category**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Category card for the Vital DS.
- Extends the Base card with vertical orientation & the fully clickable card.
- Components domain:
  - Removes Eyebrow, Description, Rating

<b>NOTE</b> Not Fully Implemented.

#### Inherited from

VitalCardCategory.Category

#### Defined in

[vital-card/src/components/Card/tokens/Category.ts:46](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Category.ts#L46)

___

### Default

• **Default**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Default card for the Vital DS.
- Editor/Content/Schema domains defines editors on Title/Eyebrow/Description/CTA
  and makes the entire Card clickable.
- Components domain hides the CTA and adds in vitalImage.Default for Image.
- Theme domain styles Wrappers for Eyebrow, Title, Description.
- Layout domain defines a basic full-width component in flex.
- Spacing domain: add spacing to Eyebrow

#### Customizing:

**`Example`**

Add a component
```js
import { vitalCard } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalCardStatic.Default, {
  Components: {
    MyComponent: on(cardClean)(
      vitalCardStatic.Default,
      WithMyCustomBorder,
      WithNoDescription
    ),
  }
});
```

**`Example`**

Add a component
```js
import { vitalCard } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalCardStatic.Default, {
  Components: {
    MyComponent: on(cardClean)(vitalCardStatic.Default, WithCustomBorder),
  }
});
```

**`Example`**

Shadowing the basic card to render H2 for title and image margins.
```js
import { H2, replaceWith } from '@bodiless/fclasses';
import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

const Basic = asCardToken(vitalCardBase.Basic, {
  Components: {
    TitleWrapper: replaceWith(H2),
  },
  Theme: {
    ImageWrapper: 'md:mx-16',
  },
});

export default {
  ...vitalCardBase,
  Basic,
};
```

#### Inherited from

VitalCardCore.Default

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:152](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L152)

___

### Hero

• **Hero**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Hero card for the Vital DS.  Intended use is first card on a page.
- Extends the Base card.
- Remove the Wrapper removes setting link for the the fully clickable card.
- Components domain:
  - Replaces Wrapper 'A' -> 'Div' to remove fully clickable feature
  - Enables CTA Wrapper to make the CTA visible.
  - Removes Eyebrow
  - Title is replaced with H1.
  - Description is replaced with H4.
- Layout domain defines Hero with Horizontal Base
- Spacing domain: add custom spacing to the hero card
- Theme: eliminates the Typography spacing to allow Spacing domain to take fully control.
- Compose: Adds `WithHorizontalLeftOrientation` and `WithHorizontalContentCentered`

#### Customizing:

**`Example`**

Create a custom Hero card with image on right and no description.
```js
import { vitalCard } from '@bodiless/vital-card/lib/base';

const MyCustomHero = asCardToken({
  ...vitalCard.Hero,
  Compose: {
.   ...omit(vitalCard.Hero.Compose, 'WithHorizontalLeftOrientation'),
    WithNoDescription: vitalCard.WithNoDescription,
  },
}
```

**`Example`**

Shadowing the Hero card with image on right, content top
         and custom margin.
```js
import { extendDomain } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { vitalCardBase } from '@bodiless/vital-card/lib/base';
import omit from 'lodash/omit';

const Hero = asCardToken({
  ...vitalCardBase.Hero,
  // Extend the theme to add margin
  Theme: extendDomain(vitalCardBase.Hero.Theme, {
    ImageWrapper: 'mx-16',
  }),
  Compose: {
.   // Remove the default composition to get right image, content top.
    ...omit(vitalCardBase.Hero.Compose, 'WithLeftImageContentCentered'),
    // Add a button.
    WithPrimaryButton: vitalCardBase.WithPrimaryButton,
  },
});

export default {
  ...vitalCardBase,
  Hero,
};
```

#### Inherited from

VitalCardHero.Hero

#### Defined in

[vital-card/src/components/Card/tokens/Hero.ts:122](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Hero.ts#L122)

___

### Topic

• **Topic**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Topic card for the Vital DS.
- Extends the Base card with vertical orientation.
- Components domain:
  - Removes Description, Rating

<b>NOTE</b> Not Fully Implemented.

#### Inherited from

VitalCardTopic.Topic

#### Defined in

[vital-card/src/components/Card/tokens/Topic.ts:46](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Topic.ts#L46)

___

### WithFlexGrowImage

• **WithFlexGrowImage**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds adds flex-grow to image, allowing the vertical cards
to maintain same size images.

#### Inherited from

VitalCardCore.WithFlexGrowImage

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:176](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L176)

___

### WithFlowContainerPreview

• **WithFlowContainerPreview**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which repaces the flow container description (RTE preview)
with the word 'Description'

#### Inherited from

VitalCardBase.WithFlowContainerPreview

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:222](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L222)

___

### WithHorizontalContentAtTop

• **WithHorizontalContentAtTop**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which positions the content at top of card.

<b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalContentAtTop

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:210](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L210)

___

### WithHorizontalContentCentered

• **WithHorizontalContentCentered**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which positions the content vertically centered in the card.

<b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalContentCentered

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:217](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L217)

___

### WithHorizontalLeftOrientation

• **WithHorizontalLeftOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token that extends WithHorizontalOrientationBase and
which defines Image on Left / Content on Right.

<b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalLeftOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:195](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L195)

___

### WithHorizontalOrientationBase

• **WithHorizontalOrientationBase**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which split cards in half with Image / Content on each side.

#### Inherited from

VitalCardBase.WithHorizontalOrientationBase

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:187](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L187)

___

### WithHorizontalRightOrientation

• **WithHorizontalRightOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token that extends WithHorizontalOrientationBase and
which defines Image on Right / Content on Left.

<b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalRightOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:203](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L203)

___

### WithNoDescription

• **WithNoDescription**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes the description from the card and adjusts title
by adding flex-grow to it because description will not exist (default field to control
height.) This will allow vertical cards with no description to continue to maintain
same height within a flow-container.

#### Inherited from

VitalCardCore.WithNoDescription

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:163](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L163)

___

### WithNoEyebrow

• **WithNoEyebrow**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes eyebrow from the card

#### Inherited from

VitalCardCore.WithNoEyebrow

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:171](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L171)

___

### WithNoTitle

• **WithNoTitle**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes title from the card

#### Inherited from

VitalCardCore.WithNoTitle

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:167](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L167)

___

### WithPrimaryButton

• **WithPrimaryButton**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style primary button

#### Inherited from

VitalCardBase.WithPrimaryButton

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:230](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L230)

___

### WithPrimaryTextLink

• **WithPrimaryTextLink**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style primary text link

#### Inherited from

VitalCardBase.WithPrimaryTextLink

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:226](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L226)

___

### WithSecondaryButton

• **WithSecondaryButton**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style secondary button

#### Inherited from

VitalCardBase.WithSecondaryButton

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:234](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L234)

___

### WithVerticalOrientation

• **WithVerticalOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes unnecessary wrappers from the card

#### Inherited from

VitalCardBase.WithVerticalOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:183](https://github.com/johnsonandjohnson/Bodiless-JS/blob/199151d80/packages/vital-card/src/components/Card/tokens/Base.ts#L183)
