# Youtube Component

  One can use this to place a youtube video on the page, that uses
  the bodiless edit system and allow youtube video src to be editable.

  ``` js
  import Youtube from '@bodiless/components';

  <Youtube nodeKey="youtube" />
  ```

  One can also use the HOC version of this which can then be apply to other components. But
  the underlining component must accept the same props as an `iframe` tag. Simply pass
  the node key to the asBodilessImage function and then use the returned HOC

  ``` js
  import { CustomYoutube } from 'my-library';
  import { asBodilessYoutube } from '@bodiless/components';

  const Youtube = asBodilessYoutube('customYoutube')(CustomYoutube);

  <Youtube />
  ```
