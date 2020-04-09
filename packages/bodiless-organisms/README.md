# `@bodiless/organisms`

Basic components to build out sites.

### Single accordion

- Purpose
  - Applies the expand/collapse effect
- Properties
  - expanded (opt) - defines whether the accordion is expanded by default
- Editable areas
  - Title, Body
- Styling
  - Can be implemented in the appropriate token.tsx file by adding necessary tailwind classes - check [asSingleAccordionDefaultStyle](../../examples/test-site/src/components/SingleAccordion/token.tsx)

## Components List

- `Tout` - Default Tout
- `HTout` - Horizontal Tout
- `ImgTout` - Tout with Image
- `Carousel` - Carousel with Image
- [Main Menu](/Organisms/MainMenu.md)

## Usage

```js
import { BCarousel, BAutoCarousel } from '@bodiless/organisms';
// Display a non-rotating carousel
<BCarousel />
// Display a rotating carousel
<BAutoCarousel />
```

```js
import { Tout, ImgTout, HTout } from '@bodiless/organisms';

<Tout nodeKey="tout1" />
<ImgTout nodeKey="tout6" />
<HTout nodeKey="tout4" />
```

