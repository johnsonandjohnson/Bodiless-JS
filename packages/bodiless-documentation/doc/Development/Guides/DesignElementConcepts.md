# Design Element Concepts

In this guide, we will continue the gallery tutorial to apply some design
element concepts and implement some best practices. We will also introduce the
Bodiless Design API. You can
[read more about it here](../../Design/DesignSystem), but at a high level this
is a set of tools and patterns for applying a *Design System* to a React site.
It encourages defining the building blocks of the system (tokens, elements,
components) at the site level, and then applying them consistently across your
site--or even abstracting them to a reusable package, allowing you to apply the
same design system to multiple sites, extending it as needed.

## Prerequisites

* Complete the [Intro to Bodiless Concepts](./IntroToBodilessConcepts) tutorial.
  * Alternatively, if you already have a fair understanding of BodilessJS
    fundamentals and want to fast-forward to this tutorial, copy over the
    [gallery-final folder & contents](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/data/pages/gallery-final)
    and place in a [new site](../../About/GettingStarted?id=creating-a-new-site) at
    `src/data/pages/gallery`. Remember to rename the folder from `gallery-final`
    to `gallery`.
* Read through the high level introduction to the
  [Bodiless Design System](../../Design/DesignSystem). Even if you don't
  follow everything, it will give essential insight into the "why" of
  what you will do in this tutorial.
* Acquire a basic understanding of utility first CSS (aka "Atomic" or "Functional" CSS)
  and the [Tailwind](https://tailwindcss.com/) library.  There are many excellent
  articles on the web on this topic.  While you can use the Bodiless design system
  with other css-in-js paradigms, this is the one we recommend.

## 1. Make the editor and typography reusable

In this step we are going to move the editor and typography tokens definitions
from page level to site level.  In general, the types of editors available on a site should be
standardized to provide a consistent user experience. There is rarely a need for
custom editors on individual pages.  Similarly, a sites typography should also be
consistent.

### Move typography tokens.

If it does not exist already, create a `/src/components/Elements` directory
at the root of your project.  In this, create a `tokens.ts` file, and ddd
the following lines there:

```ts
import {
  addClasses,
  asToken,
} from '@bodiless/fclasses';
import type {
  TokenDef
} from '@bodiless/fclasses';
import type {
  WithNodeKeyProps,
} from '@bodiless/core';
import {
  asBodilessLink,
} from '@bodiless/components';

export const asElementToken = (...attributes: string[]) => (...defs: TokenDef<any>[]) => asToken(
  ...defs,
  {
    categories: {
      Component: ['Element'],
      Attribute: attributes,
    },
  },
);

export const asBold = asElementToken('Font Weight')();
export const asItalic = asElementToken('Font Style')();
export const asUnderline = asElementToken('Text Decoration')(
  addClasses('underline')
);
export const withLinkStyles = asElementToken('Text Decoration', 'Text Color')(
  addClasses('text-blue-700 underline'),
);
export const withLinkEditor = (nodeKeys?: WithNodeKeyProps) => asElementToken('Link Editor')(
  asBodilessLink(nodeKeys),
);
```

Remove the corresponding typography tokens (`asBold`, etc) from
`/src/data/pages/gallery/withSimpleEditor.tsx`, and replace them with
those we have just created:

> NOTE: If you're not familiar with the idea of design tokens and how
> they are implemented in Bodiless, please read the [introduction to
> the Bodiless Design System](../../../Design/DesignSystem).

The first thing to note in the code above is the use of `asToken`. This is a
composition utility provided by the Bodiless
[FClasses](../../Architecture/FClasses) package. It is similar to the `flow`
utility from Lodash: it accepts a list of higher order components and returns a
new higher order component which composes them. However, `asToken` adds some
additional functionality. In this example, we use it to specify
*metadata* which should attached to the resulting token.

This metadata is useful for several reasons:
- It encourages us to think of tokens in a structured way.
- It provides a basis for browsing and editing tokens using the Bodiless token
  browser (experimental).
- It allows *fitering* of tokens (we'll get to this in a later tutorial).

To attach metadata to a token, you simply provide an object as one of the
arguments to `asToken`.  This should have a `categories` key, which is itself
consists of any number of facets, each of which is an array of terms.

It's up to you how you want to classify your tokens -- Bodiless
allows arbitrary "categories".  Here we specify 3 categories for each token:
- `Component`: The name of the component to which the token can be applied. We use
  `Element` to indicate that these tokens apply to any HTML element.
- 'Attribute': The attribute(s) which this token specifies. The general convention
  here is that two tokens which specify the same attribute should not be applied
  at the same time.

Note that we have created "empty" tokens for `asBold` and `asItalic`. As we'll see,
creating these empty tokens will facilitate making site-wide changes to styling.

Note also that in addition to styling tokens, we have created a "behavioral"
token `withLinkEditor`. This is an example of how Bodiless extends the notion of
design tokens beyond the purely visual sphere. *Any bit of reusable styling or
behavior which can be applied to a component is considered a "Token" in
Bodiless* Here, `withLinkEditor` is just a pass-through to
[`asBodilessLink`](../../../Components/Link) -- but we could customize it here
(eg to provide a different href normalizer). Also, defining it at site level
allows us to attach metadata to it.

Actually, `withLinkEditor` is not itself a token; it is a *token generator*. That is,
it is a function which accepts some parameters and *returns* a token.  In this
case, it accepts a node key, and returns a token which makes a link editable, and
stores its data at the specified location.  This pattern is very common in
Bodiless.

Note that here, since we are placing the editable link in a rich text editor,
we don't need to specify the node key.  The rich text editor itself will
manage the storage locations assigned to its children.

### Move the text editor token.

Now let's move another "behavioral" token to the site level. 
- Move `withSimpleEditor` from `/src/data/pages/gallery` to `/src/components/Element`.
- Remove the typography tokens (`asBold`, etc). and instead import them from `./tokens`.
- Replace `asLink` with a composition of the link styles and the link editor:

  ```ts
  import {
    asBold, asItalic, asUnderline, withLinkStyles, withLinkEditor
  } from './tokens';

  const simpleDesign = {
    Bold: asBold,
    Italic: asItalic,
    Underline: asUnderline,
    Link: asToken(withLinkStyles, withLinkEditor()),
  };
  ```

- Finally, add some metadata to our new `withSimpleEditor` token by wrapping it
  in `asElementToken`:

  ```ts
  const withSimpleEditor = (nodeKey?: string, placeholder?: string) => asElementToken('Text Editor')(
    addClasses('overflow-hidden'),
    withChild(
      flow(
        withDesign(simpleDesign),
        withPlaceholder(placeholder),
        withNodeKey(nodeKey),
      )(RichText),
      'Editor',
    ),
  );
  ```

Now let's use these site-level tokens on our gallery page:
1. Create an `index.ts` file in `/src/components/Element` with the following contents:
   ```ts
   import withSimpleEditor from './withSimpleEditor';
   export * from './tokens';
   export { withSimpleEditor }
   ```
1. In `/src/data/pages/gallery`, replace  
   `import withSimpleEditor from './withSimpleEditor';` with  
   `import { withSimpleEditor } from '../../../components/Element';`
1. Repeat above steps in `CaptionedImage.tsx`
1. Delete the file `withSimpleEditor.tsx`
1. Run your site and visit the gallery page (http://localhost:8000/gallery) and
   it should run exactly as it did before.

## 2. Make the Gallery reusable.

If you have components which may appear on more than one page in your site, its
best practice to place them in `src/components` so they can be reused by any
page/template. While you could theoretically import them from another page,
keeping reusable components organized in one place makes a site much easier to
maintain.

1. Create a folder called `Gallery` in `src/components`
1. Move the `Gallery.tsx` & `CaptionedImage.tsx` files to the
   `/src/components/Gallery` folder
1. Rename `Gallery.tsx` -> `index.tsx` 
1. Change the import on the page to import `Gallery` & `GalleryTile` from
   `../../../components/Gallery`
1. Run your site and visit the gallery page (http://localhost:8000/gallery) and
   it should run exactly as it did before.

## 3. Create a re-useable Primary Header for the site

In the `index.tsx` on the two pages you created in the previous tutorial,
you can see we duplicate the same `PrimaryHeader` component.
quite match: the one on the gallery page is bold. Let's bring them both into the
design system using a shared set of tokens. This way if we change the style of
the primary header, it will apply throughout the site instead of having to be
fixed on each page.

1. In `src/components/Elements/token.ts` let's define some new primary header tokens:

    ```ts
    export const withPrimaryHeaderStyles = asElementToken('Header')(
      addClasses('text-3xl'),
      asBold,
    );

    export const withPrimaryHeaderEditor = asElementToken('Text Editor')(
      asEditable('title', 'Page Title'),
    );

    export const asPrimaryHeader = asToken(
      withPrimaryHeaderEditor,
      withPrimaryHeaderStyles,
    );
    ```
  
    The first of these defines the styles that should be applied to an `h1` when
    used as a page title, and is a standard design token. The second defines
    the kind of editor which should be used for page titles, and is another example
    of what we call "behavioral" tokens -- tokens which express behavior or
    functionality rather than visual design.  We export these separately to
    facilitate placing *non-editable* page titles on pages where that may
    be appropriate. For convenience, we also export an `asPrimaryHeader` token
    which composes them.
  
1. Remember to add imports needed & export these new tokens.

1. Import these tokens into the `index.tsx` on both pages, and replace the
   current `PrimaryHeader` definitions and references:
   ```ts
   const PrimaryHeader = asPrimaryHeader(H1);
   ```

1. Run your site and visit the homepage & gallery page
   (http://localhost:8000/gallery) and it should run exactly as it did before,
   except the gallery title is not bold.

1. In `src/componets/Element/token.ts` add a tailwind class to `asBold`. 
    ```ts
    const asBold = asElementToken('Font Weight')(
      addClasses('font-bold'),
    );
    ```
1. Visit the homepage & gallery page (http://localhost:8000/gallery) and both
   `h1` titles should be bold.

HOC's like `asBold()` apply a design token (expressed as a collection of utility
classes) to a single HTML element. Every token in your design system should have
a corresponding HOC. This will:
* allow them to be reused throughout the site.
* ensure consistency.
* make them easy to extend or modify.
* allow them to be published as a package to be shared among sites with similar designs.

> Note on naming conventions: In general, we being HOC's with `as...` or
> `with...`, but it's sometimes hard to know when to use each. One rule of thumb
> we've found helpful is to use `with...` when your token is adding something
> (`withLinkStyles`, `withLinkEditors `), and `as...` when it is defining a
> complete, composed variation of a component (`asLink`) -- though we sometimes
> also use `as...` for primitive tokens which toggle state (`asBold`, `asItalic`).

### Changing or customizing an element token

Let's imagine that the design system for your site was updated, to decrease the
Font Weight for "bold" text. If the `asBold()` token HOC is used consistently
across your site, then implementing this change is as easy as replacing:

```ts
  const asBold = asElementToken('Font Weight')(
    addClasses('font-bold'),
  );
```
with
```ts
  const asBold = asElementToken('Font Weight')(
    addClasses('font-semibold'),
  );
```

Similarly - let's say you are extending or customizing a design system from
another site and want to make the same change. If the tokens of that design
system are exported from a package, then in your own `Elements.token.tsx` you
can simply:

```ts
  import { asBold as asBoldBase } from 'some-design-system';
  export asBold = asElementToken('Font Weight')(
    asBoldBase,
    addClasses('font-semibold'),
    removeClasses('font-bold')
  );
```

Of course, this is a bit of a contrived example, since the token only adds a
single class, but imagine that the base design system dictated that all bolded
text had a particular color, e.g.:

```ts
  const asBold = asElementToken('Font Weight', 'Text Color')(
    addClasses('font-bold text-blue'),
  );
```

you could then extend it to change the font weight but retain the color
as defined in the parent design system.

> NOTE: Using `removeClasses` as described above is no longer recommended.
> Instead, we recommend assigning consistent metadata and using token filtering
> to replace selected tokens.
> [Read More](../Architecture/FClasses#metadata-and-filters).

### The FClasses API

The `addClasses()` and `removeClasses()` functions used in the examples above
are part of the Bodiless "FClasses" (Functional Classes) API. You can
[read more about this here](../Architecture/FClasses). Briefly, it's
a pair of simple utility HOC's which allow you to manipulate the `className` prop
of a React element. When you make an element "stylable" by the FClasses API, you
can wrap it with these HOC's to add and remove classes. In so doing, you are
applying tokens to create a styled version of the component. You can then wrap
it again, and again, to extend or customize its style (as we did above) - for
example, to create a local variant of a design system.

## 4. Refactor `CaptionedImage` to use the Bodiless Design API

The `CaptionedImage` is a small component that combines an image and caption
text inside a wrapper. Let's go ahead and incorporate it into our Design System
to make it more flexible and reusable.

1. Within `CaptionedImage.tsx`, the first step is to define all the individual
   sub-components of our `CaptionedImage` and ensure that they are *stylable*
   via the [FClasses API](../Architecture/FClasses#). 

   * First, we define the expected type of each individual component. Here we
     require that each be stylable via FClasses (i.e., accept `StylableProps`).
     ```ts
     export type CaptionedImageComponents = {
       Wrapper: ComponentType<StylableProps>,
       Image: ComponentType<StylableProps>,
       Body: ComponentType<StylableProps>,
     };
     ```
    
   * Then we define what to render by default for each component; we use the
     stylable versions of basic HTML elements exported by
     [`@bodiless/fclasses`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/fclasses/src/StyledHTML.tsx).
     ```ts
     const captionedImageComponents:CaptionedImageComponents = {
       Wrapper: Section,
       Image: Img,
       Body: Div,
     };
     ```

1. Now that we have our sub-components, let's define how they go together to
   make a captioned image. This is really the base template for our component.
   Combining the defaults defined above with this layout, we will render an
   `img` & `div` wrapped in a `section`.
    ```ts
    type CaptionedImageBaseProps = DesignableComponentsProps<CaptionedImageComponents> & { };
    const CaptionedImageBase: FC<CaptionedImageBaseProps> = ({ components, ...rest }) => {
      const {
        Wrapper,
        Image,
        Body,
      } = components;

      return (
        <Wrapper {...rest}>
          <Image />
          <Body />
        </Wrapper>
      );
    };
    ```
    
    Note: that the actual sub-components here are *injected*; that is, they
    are passed into the component via a `components` prop. We defined
    the defaults for these components above (`captionedImageComponents`), but
    we will actually render whatever we are passed.

    > For convenience, we pass the rest of the props through to our `Wrapper`
    > component. This will allow our component to behave as expected when it
    > receives normal html element props (like `className` or `id`).
    
1. The usual pattern, however, is not to pass these components directly.
   Instead, let's wrap our component with `designable` to allow consumers to
   provide styling through *higher order components* (HOC's) which will be
   applied to the defaults. (Note, we are also using `withNode` to give our
   component a place to store its data. This is unrelated to the design, and you
   should already be familiar with this pattern from the previous tutorial.
   ```ts
   const CaptionedImageClean = flow(
     designable(captionedImageComponents, 'CaptionedImage'),
     withNode,
   )(CaptionedImageBase);
   ```
   > Note the second argument to `designable`.  It is a human-readable label
   > which can appear in the markup to help you identify what design keys are
   > producing a specific element.
    
1. Next, let's pass in some HOC's via `withDesign` to make our component editable.
   ```ts
   export const asCaptionedImageToken = (...attributes: string[]) => (...defs: TokenDef<any>[]) => asToken(
     ...defs,
     {
       categories: {
         Component: ['CaptionedImage'],
         Attribute: attributes,
       },
     },
   );

   const withCaptionedImageTitleEditor = asElementToken('Text Editor')(
     withSimpleEditor('body', 'Caption'),
   );

   const withCaptionedImageImageEditor = asElementToken('Image Editor')(
     asBodilessImage('image'),
   );

   const withCaptionedImageEditors = asCaptionedImageToken('Editor')(
     withDesign({
       Image: withCaptionedImageImageEditor,
       Body: withCaptionedImageTitleEditor,
     }) as HOC,
   );
   ```

   You will notice that this token (`withCaptionedImageEditors()`) is a very
   similar to the "behavior token" we used earlier to make a text field
   editable (`withSimpleEditor()`). Only here, the token applies to a *compound*
   component, not to a single element. This is accomplished through `withDesign()`.
  
   `withDesign()` takes a a "Design": object whose keys are the names of the
   sub-components which belong to our `CaptionedImage`, and whose values are
   tokens (higher-order components) which should be applied to each. It returns
   a token which can be applied to our `CaptionedImage` to style (or otherwise
   alter) its sub-components.

   Note: in the above example we create *element* level tokens
   (`withCaptionedImageTitleEditor`, `withCaptionedImageImageEditor`) which we
   then use in `withDesign`. This is to facilitate later *re-composition* of the
   compound component (see below).

1. Now let's add styling tokens:
   ```ts
   const withFullWidth = asElementToken('Width')(
     addClasses('w-full'),
   );
  
   const withCaptionedImageImageStyles = asElementToken('Styles')(
     withFullWidth,
   );
  
   const withCaptionedImageStyles = asCaptionedImageToken('Styles')(
     withDesign({
       Image: withCaptionedImageImageStyles,
     }) as HOC,
   );
   ```
   These are very similar to the tokens we created for the primary header.

   Note that `withFullWidth` is probably reusable and belongs in `src/components/Element`.  
   Note also that `withCaptionedImageStyles` is not strictly necessary (it simply
   repeats `withFullWidth`), but creating it now will make it easier should
   we wish to apply other image styles in the future.

1. Finally, lets combine these together and export. 

    ```ts
    const asCaptionedImage = asToken(
      withCaptionedImageEditors,
      withCaptionedImageStyles,
    );
    
    const CaptionedImage = asCaptionedImage(CaptionedImageClean);
    
    export default CaptionedImage;
    export {
      withCaptionedImageImageEditor,
      withCaptionedImageTitleEditor,
      withCaptionedImageImageStyles,
      withCaptionedImageEditors,
      withCaptionedImageStyles,
      asCaptionedImage,
      CaptionedImageClean,
    };
    ```
    It's worth looking at exactly what we're exporting:
  
    * `CaptionedImageClean` is the most basic version of our component. It will
      serve as the base to which design tokens can be applied, and can be used in
      contexts where we don't want to allow the content to be edited.
    * Element level tokens for each design element.
    * `withCaptionedImageEditors` is a *component level* token which makes our
      clean component editable, and can be applied wherever we do want to allow
      the content to be edited.
    * `withCaptionedImageStyles` is a *component level* token which adds
      default styles.
    * `asCaptionedImage` and `CaptionedImage` combine the above and are exported
      for convenience, since we expect that in most cases we'll want the
      component to be editable.

1. As a final step in this file, we make sure the imports are correct. This is
   pretty self explanatory. If you forget one you will be warned and it won't
   work!
    ```ts
    import React, { FC, ComponentType } from 'react';
    import { asBodilessImage } from '@bodiless/components-ui';
    import { withNode } from '@bodiless/core';
    import {
      Img, Section, Div, addClasses, designable, asToken, withDesign, HOC
    } from '@bodiless/fclasses';
    import type {
      StylableProps, DesignableComponentsProps, TokenDef
    } from '@bodiless/fclasses';
    import { flow } from 'lodash';
    import { withSimpleEditor, asElementToken } from '../Element';
    ```


## 5. Combine `CaptionedImage` & `PrimaryHeader` 

Let's take the components we have just created and combine them. Imagine that
our design calls for a page header block with image and a header text.

1. Create a directory at `src/components/PageHeader`, and add an `index.ts` with the
   following:
   ```ts
   import { CaptionedImage } from '../Gallery/CaptionedImage';
   import { withPrimaryHeaderStyles } from '../Element';

   export const asPageHeader = asToken(
     withDesign({
       Body: asToken(
         startWith(H1),
         withPrimaryHeaderStyles,
       ),
     }),
   );
   const PageHeader = asPageHeader(CaptionedImage);
   ```

    You can see we "modified the design" of the original captioned image, first
    replacing the base element with an `H1` tag, and then applying 
    the styles we previously defined for primary headers.

    > Note on `startWith` and `replaceWith`.  Bodiless offers these two helper
    > functions to swap out a component. Both take a replacement component as
    > an argument, and return an HOC which renders the replacement component
    > instead of the original, but there is one critical difference.  `startWith`
    > replaces the base component (usually a tag), but leaves any tokens which
    > had previously been applied intact. `replaceWith` on the other hand,
    > replaces the original along with any tokens. For example:
    > ```js
    > const ExampleBase = ({ components: C, ...rest }) => <C.Tag {...rest} />;
    > const ExampleClean = designable({ Tag: Span })(ExampleBase);
    > const Example = withDesign({
    >   Tag: addClasses('text-blue'),
    > })(Example); // <span className="text-blue" />
    > const StartWith = withDesign({
    >   Tag: startWith(Div),
    > })(Example) // <div className="text-blue" />
    > const ReplaceWith = withDesign({
    >   Tag: replaceWith(Div),
    > })(Example) // <div />
    > ```
    > here we use `startWith` because we want to preserve the editor tokens
    > which were applied to this element by `asCaptionedImage`.
    >
    > **Important Note**: `startWith` can only be used in the context of
    > `withDesign`. 

    Note that so far we have only applied *styling* to the image caption, we
    have not changed its *behavior*: It is still editable using the rich text
    editor that was originally defined in `withCaptionedImageEditors`, not the
    plain text editor that we want to use for our page titles.

    To swap out the editors we have three options:

    1. Replace.
       ```ts
       const PageHeader = asToken(
         withDesign({
           Body: replaceWith(PrimaryHeader),
         }),
       )(CaptionedImage);
       ```

       Note the use of the `replaceWith` HOC here. This will remove any tokens
       previously applied to the design key.  It's a good option if you know
       (as here) exactly how and where your component will be used.

    2. Recompose.

       But what if we want to create a reusable token, `asPageHeader`, which can be
       composed with other tokens to make a captioned image into a special page
       header? Then, using `replaceWith` could have unpredictable results, for
       example:

       ```ts
       const withBlueBody = withDesign({
         Body: addClasses('text-blue'),
       });
       const BluePageHeader = asToken(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```
       Here, the `asPageHeader` token will silently replace the body, removing the
       blue text style applied by `withBlueBody`;

       In such cases, it is much better practice to create a token which
       *recomposes* the original and is designed to apply to the clean version.

       ```ts
       const asPageHeader = asToken({
         withDesign({
           Body: asPrimaryHeader,
           Image: asToken(
             withCaptionedImageImageEditor,
             withCaptionedImageImageStyles,
           ),
         }),
       });
       ...
       const BluePageHeader = asToken(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```

       This has the advantage of clearly specifying from the ground up how the
       page topper should look and behave, but it's a bit verbose and requires
       you to recompose the image editor as well as the text editor.

    3. Reset

       If you have defined consistent token metadata, a third option is to reset
       the editor applied by the original token and add your own:
  
       ```ts
       import { withTokenFilter } from '@bodiless/fclasses';

       const asPageHeader = withDesign({
         Body: asToken(
           withTokenFilter((t: Token) => !t.categories.Attribute.includes('Editor')),
           asPrimaryHeader,
         ),
       });
       ...
       const PageHeader = asToken(
         asPageHeader,
       )(CaptionedImage);
  
       const CustomPageHeader = asToken(
         withBlueBody,
         asPageHeader,
       )(CaptionedImage);
       ```

       Here, `withTokenFilter` will selectively reset any tokens which match the
       filter function, in this case allowing us to remove any previously defined
       editor and supply a new one.

       Try all three of these alternatives in your `PageHeader/index.ts`.
    
1. Next, on the gallery page, remove the `PrimaryHeader` and the linkable image:
   ```jsx
   <Link><Image /></Link>
   <PrimaryHeader />
   ```
   and replace with 
   ```tsx
     <PageHeader />
   ```
   
   Reload the homepage and make sure it renders as expected. We could take
   this a step farther and move our `HeaderImage` to `src/components` and reuse
   it across all the pages. It could also have linkable header image, apply the title
   over the image, etc. We will leave this as exercise for you to do on your own.

While this a simple component we are wrapping in the design, proceeding in this
manner as the components grow in either functionality or complexity gives us a
few benefits:

* Design is separated from the internal markup of the component.
* Simplified Styling: this simplifies styling of components and eliminates the normal
css cascade that builds and grows over time.
* Isolation: it keeps the styling isolated to the specific item minimizing the risk
of affecting other non-related items.
* Reusability as is or with extending.

These benefits apply during the initial build and future changes benefit as well.
For example, if there is a request to change a rendered H1 to H2 for SEO purposes,
this can easily be achieved.

## 6. Continue with wrapping the `Gallery` with Design API

1. The current files in Gallery folder contain the templates defining how your
   component functions. Let's create a `token.tsx` and move the design styles to
   a separate file.

    ```ts
    import {
      withDesign,
      addClasses,
      asToken,
    } from '@bodiless/fclasses';
  
    export const withGalleryDesign = (...attributes: string[]) => (design: Design<GalleryComponents>) => asToken(
      withDesign(design),
      categories: {
        Component: ['Gallery'],
        Attribute: attributes,
      },
    );

    export const withGalleryMargin = withGalleryDesign('Margin')({
      Wrapper: addClasses('my-2'),
    });
  
    export const withGalleryTypography = withGalleryDesign('Font Size')({
      Header: addClasses('text-2xl'),
    });

    export const withImageTileStyles = withGalleryDesign('Margin', 'Border')({
      Wrapper: addClasses('mx-2 border-8'),
      Image: addClasses('w-full'),
    });

    export const withBlueBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-blue-400'),
    });

    export const withRedBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-red-400'),
    });

    export const withGreenBorder = withGalleryDesign('Color', 'Border Color')({
      Wrapper: addClasses('border-green-400'),
    });

    ```
    
    These HOC's themselves can be considered "Component Tokens" which describe
    design elements which can be applied to the components as a whole. In other
    words, "Component Tokens" are no different than normal Element tokens except
    they apply to multiple sub-components. In `withImageTileStyles`, you can see
    we added margin, border to the wrapper and made sure the image shows
    full-width. All tokens here were taken from the existing `Gallery/index.tsx`
    file.

1. Let's update the `Gallery/index.tsx` and use the component tokens in place
of the current styling. In addition, let's wrap the Gallery Component in the
Design API as well, using the same method we just did.

    ```ts
    import React, { FC } from 'react';
    import {
      H2,
      Section,
      Div,
      stylable,
      designable,
      withDesign,
      varyDesign,
      replaceWith,
    } from '@bodiless/fclasses';
    import { withNode } from '@bodiless/core';
    import { withTitle, withFacet } from '@bodiless/layouts';
    import { FlowContainer } from '@bodiless/layouts-ui';
    import { withSimpleEditor } from './Element';
    import CaptionedImage from './CaptionedImage';
    import {
      withImageTileStyles,
      withGreenBorder,
      withBlueBorder,
      withRedBorder,
      withGalleryMargin,
      withGalleryTypography,
    } from './token';

    const galleryDesign = varyDesign(
      {
        ImageTile: flow(
          replaceWith(CaptionedImage),
          withImageTileStyles,
          stylable,
          withTitle('ImageTitle'),
        ),
      },
      {
        Red: withFacet('Color')('Red')(withRedBorder as HOC),
        Green: withFacet('Color')('Green')(withGreenBorder as HOC),
        Blue: withFacet('Color')('Blue')(withBlueBorder as HOC),
      },
    )();
  
    const GalleryBody: FC = () => (
      <FlowContainer nodeKey="body" design={galleryDesign} />
    );

    export type GalleryComponents = {
      Wrapper: ComponentType<StylableProps>,
      Header: ComponentType<StylableProps>,
      Body: ComponentType<StylableProps>,
    };

    const galleryComponents:GalleryComponents = {
      Wrapper: Section,
      Header: H2,
      Body: GalleryBody,
    };

    type Props = DesignableComponentsProps<GalleryComponents> & { };

    const GalleryBase: FC<Props> = ({ components }) => {
      const {
        Wrapper,
        Header,
        Body,
      } = components;

      return (
        <Wrapper>
          <Header />
          <Body />
        </Wrapper>
      );
    };

    const GalleryClean = flow(
      designable(galleryStart),
      withNode,
    )(GalleryBase);
  
    const withGalleryEditors = withDesign({
      Header: withSimpleEditor('header', 'Gallery Header),
    });

    const asGallery = flow(
      withGalleryMargins,
      withGalleryTypography,
      withGalleryEditors,
    );

    const GalleryDefault = asGallery(GalleryClean);
    export default Gallery;
    export {
      Gallery,
      GalleryClean,
      asGallery,
      withGalleryEditors,
    };
    export * from './token';
    ```

All of this should look familiar now and shouldn't need more explanation.

The `Gallery` naming & functionality remained the same so there is no need to
update the gallery page.

For more information, read about [FClasses](../Architecture/FClasses).
