# YouTube Component

  One can use this to compose and place a YouTube video on the page, that uses
  the bodiless edit system.

  ``` js
  import { YouTube } from '@bodiless/components';

  <YouTube nodeKey="youtube" />
  ```

  One can also use the HOC version of this which can then be apply to other components. But
  the underlining component must accept the same props as an `iframe` tag. Simply pass
  the node key to the asBodilessYouTube function and then use the returned HOC

  ``` js
  import { CustomYouTube } from 'my-library';
  import { asBodilessYouTube } from '@bodiless/components';

  const YouTube = asBodilessYouTube('customYouTube')(CustomYouTube);

  <YouTube />
  ```

  One can configure YouTube player settings leveraging withYouTubePlayerSettings HOC. For example, lets configure AutoPlay for our YouTube component.

  ``` js
  import { YouTube } from '@bodiless/components';

  const AutoPlayYouTube = withYouTubePlayerSettings({
    autoplay: true,
    mute: true,
  })(YouTube);

  <AutoPlayYouTube nodeKey="youtube" />
  ```
