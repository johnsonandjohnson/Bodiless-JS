# Embed Component

The Embed Component allows site builders to create responsive embeds 
based on the width of the parent by creating an intrinsic ratio that 
scales on any device.

## Site Builder Details

### Activation

1. Install tailwindcss-aspect-ratio package on site level.
1. Update site tailwind.config.js with:

```js
// tailwind.config.js
module.exports = {
  theme: {
    aspectRatio: { // defaults to {}
      'none': 0,
      'square': [1, 1], // or 1 / 1, or simply 1
      '16/9': [16, 9],  // or 16 / 9
      '4/3': [4, 3],    // or 4 / 3
      '21/9': [21, 9],  // or 21 / 9
    },
  },
  plugins: [
    // other plugins
    require('tailwindcss-aspect-ratio'),
  ],
};
```

## Usage

```js
import { Embed, asResponsive16By9Embed } from '@bodiless/organisms';
import { withDesign, replaceWith, addProps, Video } from '@bodiless/fclasses';

const Responsive16By9Embed = flowRight(
  asResponsive16By9Embed,
  withDesign({
    Item: flowRight(
      addProps({
        controls,
        src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.webm',
      }),
      replaceWith(Video),
    ),
  }),
)(Embed);

<Responsive16By9Embed nodeKey="video" />
```

For more examples, see [ResponsiveIframe](../../../Components/Iframe) and [ResponsiveYouTube](../../../Components/YouTube).

---

## Architectural Details

The Embed Component renders the following code:
```
<Wrapper>
 <AspectRatio />
  <Item />
</Wrapper>
 
```
