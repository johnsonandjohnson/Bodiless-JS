# Image Component

  One can use this to place an image (usually an `img` tag) on the page, that uses
  the bodiless edit system and allow the src and alt text to be editable. The edit
  interface also supports image upload.

  ``` js
  import Image from '@bodiless/components';

  <Image nodeKey="imageit" />
  ```

  One can also use the HOC version of this which can then be apply to other components.  But 
  the underlining component must accept the same props as an `img` tag. Simply pass
  the node key to the asBodilessImage function and then use the returned HOC

  ``` js
  import { CustomImage } from 'my-library';
  import { asBodilessImage } from '@bodiless/components';

  const Image = asBodilessImage('linkit')(CustomImage);

  <Image />
  ```
