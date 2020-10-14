# Image Component

The Image Component in BodliessJS allows you to easily add images to your site.
Images can be either landscape or portrait mode depending on your layout needs
and can be either linkable or not. 

## Content Editor Details

To add an Image to your site:

1. Highlight a [Flow Container](../../../Components/FlowContainer). 

2. Click on the +Add icon in the toolbar, or if you are swapping components
click the Swap icon.
![](./assets/ImageComponentLibraryAll.jpg)

3. In the Component Library select which type of image you would like to
display. For example:
    * Square
    * Landscape
    * Square Linkable
    * Landscape Linkable

4. Once you have selected the appropriate image type you can add the image and
image alt text using the context menu.
![](./assets/ContextMenuImage.jpg)

5. Once you are done selecting your image and have entered the alt text click
the checkmark or hit enter.

6. You can resize the image by clicking and dragging on the the right hand side
of the Flow Container.

Images can also be added to touts. For more information on adding images to
touts see the [tout documentation](../../../Components/Touts).

## Site Builder Details


## Architectural Details

One can use this to place an image (usually an `img` tag) on the page, that uses
the BodilessJS edit system and allow the src and alt text to be editable. The edit
interface also supports image upload.

  ``` 
  js import Image from '@bodiless/components';

  <Image nodeKey="imageit" /> 
  ```

One can also use the HOC version of this which can then be apply to other
components.  But the underlining component must accept the same props as an
`img` tag. Simply pass the node key to the asBodilessImage function and then use
the returned HOC

  ```
  js import { CustomImage } from 'my-library'; import { asBodilessImage }
  from '@bodiless/components';

  const Image = asBodilessImage('linkit')(CustomImage);

  <Image />
  ```

One can enhance Image picker UI elements. A list of UI elements that can be
enhanced can be found in TImagePickerUI type exported by Image. In order to
enhance a UI element, the enhancement should be injected as ui prop to the Image
element. Lets consider, we want to customize master wrapper element

```
js import { Image } from '@bodiless/components';

const UploadArea = () => <div>Some custom text that guide users how to upload
image</div>; const ui = { UploadArea };

<Image ui={ui} />
```

In order to find a complete example how to build a custom UI for Image picker,
check @bodiless/components-ui.
