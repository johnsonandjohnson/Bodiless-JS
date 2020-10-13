# YouTube Component

  The YouTube Component can be used to place a YouTube video on a page via the BodilessJS edit system.

  ``` js
  import { YouTube } from '@bodiless/components';

  <YouTube nodeKey="youtube" />
  ```

  You can also use the HOC version of this which can then be applied to other components. But
  the underlining component must accept the same props as an `iframe` tag. Simply pass
  the node key to the asBodilessYouTube function and then use the returned HOC

  ``` js
  import { CustomYouTube } from 'my-library';
  import { asBodilessYouTube } from '@bodiless/components';

  const YouTube = asBodilessYouTube('customYouTube')(CustomYouTube);

  <YouTube />
  ```

  You can configure YouTube player settings leveraging withYouTubePlayerSettings HOC. For example, to configure AutoPlay for the YouTube component:

  ``` js
  import { YouTube } from '@bodiless/components';

  const AutoPlayYouTube = withYouTubePlayerSettings({
    autoplay: true,
    mute: true,
  })(YouTube);

  <AutoPlayYouTube nodeKey="youtube" />
  ```

## Props

| name           | default   | description                                                                         |
|----------------|-----------|-------------------------------------------------------------------------------------|
| nodeKey        | undefined | Identifies where the component data will be stored.                                 |
| playerSettings | undefined | YouTube embed player settings. Check YouTubePlayerSettings type from 'Youtube.tsx'. |

In addition, you can pass `HTMLIFrameElement` props (id, src, width, etc.). Check `HTMLIFrameElement` type for more details.
