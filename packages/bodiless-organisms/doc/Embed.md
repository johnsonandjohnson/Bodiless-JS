# Embed

- Purpose
  - Create responsive embeds based on the width of the parent by creating an intrinsic ratio that scales on any device.

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

For more examples, check ResponsiveIframe and ResponsiveYouTube.
