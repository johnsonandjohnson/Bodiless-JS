# Building Contentful Components

While building sites, there are often use cases where content is
re-used between pages, or you might want to share a component with
another site. 

A contentful component allows you to specify the default content of a component,
so when it is placed on a site, the data is pre-populated.

Once a contentful component is placed, the content can be edited by the
content editor as needed. In addition, if a content editor wants to revert to the
original content, they can do so at the individual
component level via a reset button in the context menu.

As a site builder, if you see a component that is often reused
through the site - say a card on each article - it can be helpful to build this
component as a contentful card and then a content editor can quickly choose this
component and skip entering the data for it.

## Developing a Contentful Component

BodilessJS provides an API that allows you to extend your component and make it
a contentful component.

* `withDefaultContent` will extend your component to allow default content to be
  passed as a parameter.

* `withResetButton` will add a context menu icon, Reset, to the component that
  allows the content editor to reset data back to the default content. If your
  components consists of a composition of individual components, A site builder
  has the choice of determing the reset behavior.  
  * It can be placed on the component itself, and then the reset will revert
all data back to the original.
  * Or it can be placed on each individual components, allowing the content editor
    to reset individual components.

### Defining a Contentful Component that consists of single component

The following is an example of defining a contentful image:

e.g.
```
type Data = {
  src: string;
  alt: string;
};

// Allows to set default content for image based component.
const asContentfulImage = (nodeContent: Partial<Data>) => (nodeKey: string) => flowRight(
  withDefaultContent({
    [nodeKey]: nodeContent,
  }),
  asEditableImage(nodeKey),
  withResetButton(),
);
```

#### Defining the data of the Contentful Component

Create a ts file to define the data for the component and within match the data
structure for the component. In this case it is for the image component. 

e.g.

The contents of `src/components/Contentful/Image/index1.ts`:
```
import Image from './contentful1.png';

export default {
  src: Image,
  alt: "contentful 1",
};
```

The contentful default image is stored within `src/components/Contentful/Image`
folder. If a content editor uploads an image in place of this image, it will be
stored in the normal static folder.

This contentful component can be used within a page, template or added to Flow Container to be available to content editor.

#### Using a hook to for dynamic default content

If you wish, you may specify default content as a function rather than an object. This
function may be a custom hook (it will be executed in the render context of a functional
component), and will receive the component's props as an argument.  This can be useful
if you want to supply the default content dynamically (eg from an API):

```ts
import { DefaultImageContext } from 'my-custom-way-of-getting-default-images';
const withDynamicDefaultImage = withDefaultContent(
  (props: HTMLProps<HTMLImageElement>) => {
    const { src: ctxtSrc, alt: ctxtAlt } = React.useContext(DefaultImageContext); // You can use hooks.
    const { src = ctxtSrc, alt = ctxtAlt } = props;
    return {
      myNodeKey: { src, alt }
    };
  }
);
```

### Defining a Contentful Component that consists of composition of multiple components

The following is an example of defining a card contentful component (which is a composition of set of components: link, rich text editor, image.)

The logic is the same except that `withResetButton`'s are added to each component.

* Option 1 with reset on each individual component:
  ```
  export const withCardResetButtons = withDesign({
    ImageLink: withResetButton({ nodeKey: 'cta$image' }),
    Title: withResetButton({ nodeKey: 'title' }),
    Body: withResetButton({ nodeKey: 'body' }),
    Link: withResetButton({ nodeKey: 'cta' }),
  });

  export const asContentfulCard = (content: object) => flow(
    withCardEditors,
    withCardResetButtons,
    withDefaultContent(content),
  );
  ```

* Option 2 with reset at card level (not individual). A reset button will still
appear for each individual component, but data is restored for entire component
and not per sub-component:
  ```
  
  export const asContentfulCard = (content: object) => flow(
    withCardEditors,
    withResetButton,
    withDefaultContent(content),
  );
  ```

### Defining the data of the Card Contentful Component

Create a new component in `src/components/Contentful/GivingBackToCommunity` and
within the folder create an `index.ts` that contains the definition. Besides
defining structure we can also combine it with style tokens to define the look
of the component.

```
import { flow } from 'lodash';
import { CardClean } from '@bodiless/card';
import { asContentfulCard } from '../../../Card';
import { asCardDefaultStyle, asCardHorizontal } from '../../../Card/token';

// Import data
import title from './title.json';
import body from './body.json';
import cta$image from './image';
import cta from './cta.json';
import cta$text from './cta$text.json';

// Define Data Structure
const cardContent = {
  cta$image,
  title,
  body,
  cta,
  cta$text,
};

// Define component as Contentful card with data as well as the design tokens.
const GivingBackToCommunity = flow(
  asContentfulCard(cardContent),
  asCardDefaultStyle,
  asCardHorizontal,
)(CardClean);

export default GivingBackToCommunity;
```

The contents of each of the `.json` is the data if this component was saved in
the traditional way through the edit interface. To create these
files, place the component on the page, fill in the default content and then
copy the `.json` files to this Contentful Component folder and import them in.

The contents for the `./image` are the same as our simple image contentful component in
the first example that includes data object and the src of the image.

### Adding Contentful Components to the Flow Container

Adding your contentful components to the Flow Container is done in the normal method for the Flow Container.  

We suggest that you remember to include the same facets used for the original component as part of this variation, so it can easily be found in the same categories as defined in the original component.

e.g. An example defining the contentful component from the previous example and
define in `withContentfulCards.tsx.`

```
import { flow } from 'lodash';
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { withType } from './Categories';
import { GivingBackToCommunity } from '../Contentful/Card';
import { withOrientationFacet, withStructureFacet } from './withCardVariations';

const contentfulCards = {
  GivingBackToCommunity: flow(
    replaceWith(GivingBackToCommunity),
    withType('Contentful')(),
    withType('Card')(),
    withOrientationFacet('Horizontal')(),
    withStructureFacet('With Title and Body')(),
    withStructureFacet('With CTA')(),
    withTitle('Giving Back To Community'),
    withDesc('Custom content for community campaign.'),
  ),
};

export default withDesign(contentfulCards);
```

and then simply import into the relevant Flowcontainer:

```
const FlowContainerDefault = flow(
  withRichTextVariations,
  withImageVariations,
  withCardVariations,
  withContentfulCards,
  withSingleAccordionVariations,
  asFlowContainerWithMargins,
)(FlowContainer);
```
