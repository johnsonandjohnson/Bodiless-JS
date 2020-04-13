# Design Element Basics

In this guide, we will continue the gallery tutorial to apply some designs and
implement some best practices. We will also introduce the Bodiless Design API.
You can [read more about it here](../Design/DesignSystem), but at a high level
this is a set of tools and patterns for applying a *Design System* to a React
site. It encourages defining the building blocks of the system (tokens,
elements, components) at the site level, and then applying them consistently
across your site--or even abstracting them to a reusable package, allowing you
to apply the same design system to multiple sites, extending it as needed.

## Prerequisites

* Complete the [Site Build Basics](./SiteBuildBasics).
  * Alternatively, if you already have a fair understanding of BodilessJS
    fundamentals and want to fast-forward to this tutorial, copy over the
    [gallery-final folder & contents](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/data/pages/gallery-final)
    and place in a [new site](./GettingStarted?id=creating-a-new-site) at
    `src/data/pages/gallery`. Remember to rename the folder from `gallery-final`
    to `gallery`.
* Read through the high level introduction to the
  [Bodiless Design System](../Design/DesignSystem). Even if you don't
  follow everything, it will give essential insight into the "why" of
  what you will do in this tutorial.

## 1. Convert the Gallery to use Site's Simple Editor

In this step we are going to refactor the gallery page to use a rich text editor
that is defined at site level, rather than a custom editor defined at page
level. In general, the types of editors available on a site should be
standardized to provide a consistent user experience. There is rarely a need for
custom editors on individual pages. The Bodiless Starter provides a [set of
three predefined
editors](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/starter/src/components/Editors/index.tsx).
These can (and should) be customized to suit the needs of your site, but here we
use one as-is.

1. Replace `import withSimpleEditor from './withSimpleEditor';` 
   with `import { asEditorBasic } from '../../../components/Editors';`
1. Replace `const Body = withSimpleEditor('body', 'Body')(Fragment);`
   with `const Body = asEditorBasic('body', 'Body')(Fragment);`
1. Repeat above steps in `CaptionedImage.tsx`
1. Delete the file `withSimpleEditor.tsx`
1. Run your site and visit the gallery page (http://localhost:8000/gallery) and
   it should run exactly as it did before, with slightly different choices for
   the Rich Text Editor in the body of the gallery page.

Note: that our rich text editor is exported as a *higher order component*
(`asEditorBasic`) rather than as a regular component. We will see this
 pattern below in applying *design tokens*. And in fact, our editor HOC
is very like a design token. It expresses a standardized bit of functionality
which can be applied uniformly across the site--only in this case, instead
of representing visual design, it represents behavior. We could think of
`asEditorBasic()` as a sort of "behavior token".

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

Within `data/pages/gallery/index.jsx` (gallery page) & `data/pages/index.jsx`
(homepage) you can see we use similar `PrimaryHeader` components, but they don't
quite match: the one on the gallery page is bold. Let's bring them both into the
design system using a shared set of tokens. This way if we change the style of
the primary header, it will apply throughout the site instead of having to be
fixed on each page.

1. In `src/components/Elements.token.ts` let's define some new primary header tokens:
    ```
    const asPrimaryHeader = flow(
      startWith(H1),
      asHeader1,
      asBold,
    );
    const asEditablePrimaryHeader = asEditable('title', 'Page Title');
    ````
    The first of these defines the styles that should be applied to an `h1` when
    used as a page title, and is a standard design token. The second defines
    the kind of editor which should be used for page titles, and is an example
    of what we call "behavioral" tokens -- tokens which express behavior or
    functionality rather than visual design.  We export these separately to
    facilitate placing *non-editable* page titles on pages where that may
    be appropriate.
  
1. Remember to add imports needed & export these new tokens.

1. Import these tokens on both gallery page `index.jsx` & homepage `index.jsx`
   and replace the current `PrimaryHeader` definitions and references:
   ```
   cosnt PrimaryHeader = flow(
     asPrimaryHeader,
     asEditablePrimaryHeader,
   )();
   ```

1. Run your site and visit the homepage & gallery page
   (http://localhost:8000/gallery) and it should run exactly as it did before,
   except the gallery title is not bold.

1. In `src/componets/Elements.token.ts` add a tailwind to class to `asBold`. 
    ```
    const asBold = addClasses('font-bold');
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

> **TIP**: By convention all Element Token HOC's start with `as`.

### Changing or customizing an element token

Let's imagine that the design system for your site was updated, to decrease the
font-weight for "bold" text. If the `asBold()` token HOC is used consistently
across your site, then implementing this change is as easy as replacing:

    const asBold = addClasses('font-bold');

with

    const asBold = addClasses('font-semibold');


Similarly - let's say you are extending or customizing a design system from
another site and want to make the same change. If the tokens of that design
system are exported from a package, then in your own `Elements.token.tsx` you
can simply:

    import { asBold as asBoldBase } from 'some-design-system';
    export asBold = flow(
      asBoldBase,
      addClasses('font-semibold'),
      removeClasses('font-bold')
    );

### The FClasses API

The `addClasses()` and `removeClasses()` functions used in the examples above
are part of the Bodiless "FClasses" (Functional Classes) API. You can
[read more about this here](../Development/Architecture/FClasses). Briefly, it's
a pair of simple utilty HOC's which allow you to manipulate the `className` prop
of a React element. When you make an element "stylable" by the FClasses API, you
can wrap it with these HOC's to add and remove classes. In so doing, you are
applying tokens to create a styled version of the component. You can then wrap
it again, and again, to extend or customize its style (as we did above) - for
exmample, to create a local variant of a design system.

## 4. Refactor `CaptionedImage` to use the Bodiless Design API

The `CaptionedImage` is a small component that combines an image and caption
text inside a wrapper. Let's go ahead and incorporate it into our Design System
to make it more flexible and reusable.

1. Within `CaptionedImage.tsx`, the first step is to define all the individual
   sub-components of our `CaptionedImage` and ensure that they are *stylable*
   via the [FClasses API](../Development/Architecture/FClasses). 

   * First, we define the expected type of each individual component. Here we
     require that each be stylable via FClasses (i.e., accept `StylableProps`).

        ```
        export type CaptionedImageComponents = {
          Wrapper: ComponentType<StylableProps>,
          Image: ComponentType<StylableProps>,
          Body: ComponentType<StylableProps>,
        };
        ```
    
   * Then we define what to render by default for each component; we use the
     stylable versions of basic HTML elements exported by
     [`@bodiless/fclasses`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/packages/fclasses/src/StyledHTML.tsx).
        ```
        const captionedImageStart:CaptionedImageComponents = {
          Wrapper: Section,
          Image: Img,
          Body: Div,
        };

        type Props = DesignableComponentsProps<CaptionedImageComponents> & { };
        ```

1. Now that we have our sub-components, let's define how they go together to
   make a captioned image. This is really the base template for our component.
   Combining the defaults defined above with this layout, we will render an
   `img` & `div` wrapped in a `section`.
    ```
    const CaptionedImageBase: FC<Props> = ({ components }) => {
      const {
        Wrapper,
        Image,
        Body,
      } = components;

      return (
        <Wrapper>
          <Image />
          <Body />
        </Wrapper>
      );
    };
    ```
    
    Note: that the actual sub-components here are *injected*; that is, they
    are passed into the component via a `components` prop. We defined
    the defaults for these components above (`captionedImageStart`), but
    we will actually render whatever we are passed.
    
1. The usual pattern, however, is not to pass these components directly.
   Instead, let's wrap our component with `designable` to allow consumers to
   provide styling through *higher order components* (HOC's) which will be
   applied to the defaults. (Note, we are also using `withNode` to give our
   component a place to store its data. This is unrelated to the design, and you
   should already be familiar with this pattern from the previous tutorial.
 
    ```
    const CaptionedImageClean = flow(
      designable(captionedImageStart),
      withNode,
    )(CaptionedImageBase);
    ```
    
   Next, lets pass in some HOC's via `withDesign` to make our component editable.
   
    ```
    const asEditableCaptionedImage = flow(
      withDesign({
        Image: asBodilessImage('image'),
        Body: asEditorBasic(
          'body',
          'Caption',
        ),
      }),
    );
    ```

    You will notice that this HOC (`asEditableCaptionedImage()`) is a very
    similar to the "behavior token" we used earlier to make a text field
    editable (`asEditorBasic()`). Only here, the token applies to a *compound*
    component, not to a single element. This is accomplished through `withDesign()`.
    
    `withDesign()` takes a a "Design": object whose keys are the names of the
    sub-components which belong to our `CaptionedImage`, and whose values are
    higher-order components which should be applied to each. It returns an HOC
    which can be applied to our `CaptionedImage` to style (or otherwise alter)
    it's subcomponents.

    Note, that the HOC's (`asBodilessImage` and `asEditorBasic`) are defined at
    the site level. For now, they are just pass-through's to the core Bodiless
    utilities - but in many cases you will want to customize them further at
    site level (for example, to provide a different image selector, or a rich
    text editor which uses site-specific components to render formatted text).
    Using the site-level tokens here ensures that such changes to the editorial
    interface are applied consistently across the site.

1. Lastly, lets combine these together and export. 
    ```
    const CaptionedImage = asCaptionedImage(CaptionedImageClean);
    export default CaptionedImage;
    export {
      CaptionedImage,
      CaptionedImageClean,
      asEditableCaptionedImage,
    };
    ```
  It's worth looking at exactly what we're exporting:

  * `CaptionedImageClean` is the most basic version of our component. It will
    serve as the base to which design tokens can be applied, and can be used in
    contexts where we don't want to allow the content to be edited.
  * `asEditableCaptionedImage` is a *component level* token which makes our
    clean component editable, and can be applied wherever we do want to allow
    the content to be edited.
  * `CaptionedImage` combines the above and is exported for convenience, since
    we expect that in most cases we'll want the component to be editable.

  Note, that we have not, as yet, applied any styling or design tokens.

1. As a final step in this file, we make sure the imports are correct. This is
   pretty self explanatory. If you forget one you will be warned and it won't
   work!
    ```
    import React, { FC } from 'react';
    import { asBodilessImage } from '@bodiless/components';
    import { withNode } from '@bodiless/core';
    import {
      withDesign,
      designable,
      DesignableComponentsProps,
      Div,
      Section,
      Img,
      StylableProps,
    } from '@bodiless/fclasses';
    import { flow } from 'lodash';
    import { asEditorBasic } from '../Editors';
    ```


## 5. Combine `CaptionedImage` & `PrimaryHeader` on the homepage.

Let's take the components we have just created and combine them. Imagine
that our design calls for a page header block on the homepage with image and
a header text.

1. On the homepage, import the `CaptionedImage` component and define this new variation:

    ```
    import { CaptionedImage } from '../../components/Gallery-Design/CaptionedImage';
    
    const PageHeader = flow(
      withDesign({
        Body: replaceWith(PrimaryHeader),
      }),
    )(CaptionedImage);
    ```

    You can see we "modified the design" of the original captioned image, replacing
    the body (previously defined as a `div` wrapped in `asBasicEditor`) with our
    `PrimaryHeader.

    Note the use of the `replaceWith` HOC here.  Remember that the object
    passed to `withDesign` is always a set of higher-order components.  In most
    cases you will just want to use these to apply styling to the default elements
    defined in the component's design.  For example, we might have written:
    ```
    const PageHeader = flow(
       withDesign({
        Body: asHeaderPrimary,
      }),
    )(CaptionedImage);
    ```
    Here, however, the default element is a `div`, while we want a `h1`, so we have to replace it.
    
    On the homepage remove the combination of HeaderImage & PrimaryHeader

    ```
      <div className="flex my-3 w-full">
        <HeaderImage />
      </div>
      <PrimaryHeader />
    ```
    
    and replace with 
    
    ```
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
* Reuseability as is or with extending.

These benefits apply during the initial build and future changes benefit as well.
For example, if there is a request to change a rendered H1 to H2 for SEO purposes,
this can easily be achieved.

## 6. Continue with wrapping the `Gallery` with Design API

1. The current files in Gallery folder contain the templates defining how
your component functions. Let's create a `token.tsx` and move the
design styles to a separate file.

    ```
    import {
      withDesign,
      addClasses,
    } from '@bodiless/fclasses';

    const asGalleryDefaultStyle = withDesign({
      Wrapper: addClasses('my-2'),
      Header: addClasses('text-2xl'),
    });

    const asImageTile = withDesign({
      Wrapper: addClasses('mx-2 border-8'),
      Image: addClasses('w-full'),
    });

    const asBlueBorder = withDesign({
      Wrapper: addClasses('border-blue-400'),
    });

    const asRedBorder = withDesign({
      Wrapper: addClasses('border-red-400'),
    });
    const asGreenBorder = withDesign({
      Wrapper: addClasses('border-green-400'),
    });

    export {
      asImageTile,
      asBlueBorder,
      asRedBorder,
      asGreenBorder,
      asGalleryDefaultStyle,
    }
    ```
    
    These HOC's themselves can be considered "Component Tokens" which describe
    design elements which can be applied to the components as a whole. In other
    words, "Component Tokens" are no different than normal Element tokens except
    they apply to multiple sub-components. In `asImageTile`, you can see we added
    margin, border to the wrapper and made sure the image shows full-width. All tokens
    here were taken from the existing `Gallery/index.tsx` file.
    
    **TIP**: By convention all Component Tokens start with `as`.

1. Let's update the `Gallery/index.tsx` and use the component tokens in place
of the current styling. In addition, let's wrap the Gallery Component in the
Design API as well, using the same method we just did.

    ```
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
    import { flow } from 'lodash';
    import { withTitle, withFacet } from '@bodiless/layouts';
    import { FlowContainer } from '@bodiless/layouts-ui';
    import { asEditorBasic } from '../Editors';
    import CaptionedImage from './CaptionedImage';
    import {
      asImageTile,
      asGreenBorder,
      asBlueBorder,
      asRedBorder,
      asGalleryDefaultStyle,
    } from './token';

    const galleryDesign = varyDesign(
      {
        ImageTile: flow(
          replaceWith(CaptionedImage),
          asImageTile,
          stylable,
          withTitle('ImageTitle'),
        ),
      },
      {
        Red: withFacet('Color')('Red')(asRedBorder as HOC),
        Green: withFacet('Color')('Green')(asGreenBorder as HOC),
        Blue: withFacet('Color')('Blue')(asBlueBorder as HOC),
      },
    )();

    export type GalleryComponents = {
      Wrapper: ComponentType<StylableProps>,
      Header: ComponentType<StylableProps>,
      Body: ComponentType<StylableProps>,
    };

    const galleryStart:GalleryComponents = {
      Wrapper: Section,
      Header: H2,
      Body: Div,
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

    const GalleryBody: FC = () => (
      <FlowContainer nodeKey="body" design={galleryDesign} />
    );

    const GalleryClean = flow(
      designable(galleryStart),
      withNode,
    )(GalleryBase);

    const asGallery = flow(
      asGalleryDefaultStyle,
      withDesign({
        Header:  asEditorBasic(
          'gallery_header',
          'Gallery Header',
        ),
        Body: replaceWith(GalleryBody),
      }),
    );

    const Gallery = asGallery(GalleryClean);
    export default Gallery;
    export {
      Gallery,
      GalleryClean,
      asGallery,
    };
    ```

All of this should look familiar now and shouldn't need more explanation.

The `Gallery` naming & functionality remained the same so there is no need to
update the gallery page.

For more information, read about [FClasses](Development/Architecture/FClasses).
