[@bodiless/vital-card](../README.md) / VitalCard

# Interface: VitalCard

Tokens for the vital card

**`see`** [CardClean](../README.md#cardclean)

## Hierarchy

- `VitalCardBase`

- `VitalCardHero`

- `VitalCardCategory`

- `VitalCardTopic`

- `VitalCardProduct`

- `VitalCardCore`

  ↳ **`VitalCard`**

## Table of contents

### Properties

- [Base](VitalCard.md#base)
- [Basic](VitalCard.md#basic)
- [Category](VitalCard.md#category)
- [Default](VitalCard.md#default)
- [Hero](VitalCard.md#hero)
- [HeroBase](VitalCard.md#herobase)
- [Product](VitalCard.md#product)
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

### Base

• **Base**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the base card for the Vital DS.
- Editor/Content/Schema domains defines editors on Title/Eyebrow/Description/CTA
  and makes the entire Card clickable.
- Components domain hides the CTA and adds in vitalImage.Default for Image.
- Theme domain styles Wrappers for Eyebrow, Title, Description.
- Layout domain defines a basic full-width component in flex.
- Spacing domain: add spacing to Eyebrow

#### Customizing:

**`example`** Add a component
```js
import { vitalCard } from '@bodiless/vital-flowcontainer';

const Default = asFluidToken(vitalCardStatic.Default, {
  Components: {
    MyComponent: on(cardClean)(vitalCardStatic.Default, WithCustomBorder),
  }
});
```

**`example`** Shadowing the basic card to render H2 for title and image margins.
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

VitalCardBase.Base

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:223](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L223)

___

### Basic

• **Basic**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines a primary vertical card

#### Inherited from

VitalCardCore.Basic

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:125](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L125)

___

### Category

• **Category**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Category card for the Vital DS.
- Extends the Base card with vertical orientation & the fully clickable card.
- Components domain:
  - Removes Eyebrow, Description, Rating

<b>NOTE</b> Not Fully Implemented.

#### Inherited from

VitalCardCategory.Category

#### Defined in

[vital-card/src/components/Card/tokens/Category.ts:52](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Category.ts#L52)

___

### Default

• **Default**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the base card for the Vital DS.
- Editor/Content/Schema domains defines editors on Title/Eyebrow/Description/CTA
  and makes the entire Card clickable.
- Components domain hides the CTA and adds in vitalImage.Default for Image.
- Theme domain styles Wrappers for Eyebrow, Title, Description.
- Layout domain defines a basic full-width component in flex.
- Spacing domain: add spacing to Eyebrow

#### Customizing:

**`example`** Add a component
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

#### Inherited from

VitalCardCore.Default

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:121](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L121)

___

### Hero

• **Hero**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Hero extends the HeroBase token and combines it to have image on left
and content is vertically centered.

#### Inherited from

VitalCardHero.Hero

#### Defined in

[vital-card/src/components/Card/tokens/Hero.ts:126](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Hero.ts#L126)

___

### HeroBase

• **HeroBase**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

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

#### Customizing:

**`example`** Create a custom Hero card
```js
import { vitalCard } from '@bodiless/vital-card';

const MyCustomHero = asCardToken(
  HeroBase,
  WithHorizontalContentCentered,
  WithHorizontalRightOrientation,
  WithNoDescription,
);
```

**`example`** Shadowing the Hero card with different variations and margin on image.
```js
import { asCardToken, vitalCardBase } from '@bodiless/vital-card';

const Hero = asCardToken(
  vitalCardBase.HeroBase,
  vitalCardBase.WithHorizontalContentCentered,
  vitalCardBase.WithHorizontalLeftOrientation,
  vitalCardBase.WithPrimaryButton,
  {
    Theme: {
      ImageWrapper: 'mx-16',
    },
  },
);

export default {
  ...vitalCardBase,
  Hero,
};
```

#### Inherited from

VitalCardHero.HeroBase

#### Defined in

[vital-card/src/components/Card/tokens/Hero.ts:121](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Hero.ts#L121)

___

### Product

• **Product**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Product card for the Vital DS.
- Extends the Base card with vertical orientation.

<b>NOTE</b> Not Fully Implemented.

#### Inherited from

VitalCardProduct.Product

#### Defined in

[vital-card/src/components/Card/tokens/Product.ts:41](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Product.ts#L41)

___

### Topic

• **Topic**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Defines the Topic card for the Vital DS.
- Extends the Base card with vertical orientation.
- Components domain:
  - Removes Description, Rating

<b>NOTE</b> Not Fully Implemented.

#### Inherited from

VitalCardTopic.Topic

#### Defined in

[vital-card/src/components/Card/tokens/Topic.ts:49](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Topic.ts#L49)

___

### WithFlexGrowImage

• **WithFlexGrowImage**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds adds flex-grow to image, allowing the vertical cards
to maintain same size images.

#### Inherited from

VitalCardCore.WithFlexGrowImage

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:145](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L145)

___

### WithFlowContainerPreview

• **WithFlowContainerPreview**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which repaces the flow container description (RTE preview)
with the word 'Description'

#### Inherited from

VitalCardBase.WithFlowContainerPreview

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:266](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L266)

___

### WithHorizontalContentAtTop

• **WithHorizontalContentAtTop**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which positions the content at top of card.

<b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalContentAtTop

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:254](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L254)

___

### WithHorizontalContentCentered

• **WithHorizontalContentCentered**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which positions the content vertically centered in the card.

<b>NOTE</b>: WithHorizontalContentAtTop & WithHorizontalContentCentered are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalContentCentered

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:261](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L261)

___

### WithHorizontalLeftOrientation

• **WithHorizontalLeftOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token that extends WithHorizontalOrientationBase and
which defines Image on Left / Content on Right.

<b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalLeftOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:239](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L239)

___

### WithHorizontalOrientationBase

• **WithHorizontalOrientationBase**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which split cards in half with Image / Content on each side.

#### Inherited from

VitalCardBase.WithHorizontalOrientationBase

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:231](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L231)

___

### WithHorizontalRightOrientation

• **WithHorizontalRightOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token that extends WithHorizontalOrientationBase and
which defines Image on Right / Content on Left.

<b>NOTE</b>:  WithHorizontalLeftOrientation & WithHorizontalRightOrientation are
mutually exclusive and shouldn't be combined together.

#### Inherited from

VitalCardBase.WithHorizontalRightOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:247](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L247)

___

### WithNoDescription

• **WithNoDescription**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes the description from the card and adjusts title
by adding flex-grow to it because description will not exist (default field to control
height.) This will allow vertical cards with no description to continue to maintain
same height within a flow-container.

#### Inherited from

VitalCardCore.WithNoDescription

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:132](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L132)

___

### WithNoEyebrow

• **WithNoEyebrow**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes eyebrow from the card

#### Inherited from

VitalCardCore.WithNoEyebrow

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:140](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L140)

___

### WithNoTitle

• **WithNoTitle**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes title from the card

#### Inherited from

VitalCardCore.WithNoTitle

#### Defined in

[vital-card/src/components/Card/tokens/vitalCard.ts:136](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/vitalCard.ts#L136)

___

### WithPrimaryButton

• **WithPrimaryButton**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style primary button

#### Inherited from

VitalCardBase.WithPrimaryButton

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:274](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L274)

___

### WithPrimaryTextLink

• **WithPrimaryTextLink**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style primary text link

#### Inherited from

VitalCardBase.WithPrimaryTextLink

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:270](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L270)

___

### WithSecondaryButton

• **WithSecondaryButton**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which adds a visible CTA with style secondary button

#### Inherited from

VitalCardBase.WithSecondaryButton

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:278](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L278)

___

### WithVerticalOrientation

• **WithVerticalOrientation**: `TokenSpec`<[`CardComponents`](CardComponents.md), { `A11y`: {} ; `A11yContent`: {} ; `Analytics`: {} ; `Behavior`: {} ; `Components`: {} ; `Content`: {} ; `Core`: {} ; `Editors`: {} ; `Layout`: {} ; `SEO`: {} ; `Schema`: {} ; `Spacing`: {} ; `Theme`: {}  }\>

Composable token which removes unnecessary wrappers from the card

#### Inherited from

VitalCardBase.WithVerticalOrientation

#### Defined in

[vital-card/src/components/Card/tokens/Base.ts:227](https://github.com/johnsonandjohnson/Bodiless-JS/blob/93914419b/packages/vital-card/src/components/Card/tokens/Base.ts#L227)
