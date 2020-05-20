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

One can enhance Image picker UI elements. A list of UI elements that can be enhanced can be found in TImagePickerUI type exported by Image. In order to enhance a UI element, the enhancement should be injected as ui prop to the Image element. Lets consider, we want to customize master wrapper element

``` js
import { Image } from '@bodiless/components';

const UploadArea = () => <div>Some custom text that guide users how to upload image</div>;
const ui = { UploadArea };

<Image ui={ui} />
```

In order to find a complete example how to build a custom UI for Image picker, check @bodiless/components-ui.
