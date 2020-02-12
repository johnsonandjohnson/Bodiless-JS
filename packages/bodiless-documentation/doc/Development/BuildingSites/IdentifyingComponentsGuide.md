# Guide in Identifying Components & Variations

Let's use [Examples/Test Site homepage](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted?id=launch-the-test-site)  as an example.  It consists of:

* Header
    * Logo
    * Menu
* Header Image
* Title
* Bullet Points
* Touts
* Footer with Copyright

The Header & Footer Global are components coming from [/src/components/Layout](https://github.com/johnsonandjohnson/Bodiless-JS/tree/master/examples/test-site/src/components/Layout)
* Inspection of the [Header.tsx](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Layout/header.tsx) file show that it consists of few components
    * Linkable Image for Logo
    * Menu 
    * Mobile Menu 
* Inspection of the [Footer.tsx](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Layout/footer.tsx) is only a Footer with paragraph copy. 

The page components are coming from [homepage](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx) and if you inspect the code, uou can see it was implemented with 
* Image component for Header Image 
    * ` <Image className="w-full" nodeKey="header_image" />`
* Editable component for Title 
    * ` <Editable nodeKey="title" placeholder="Page Title" /> `
* List Component extended for Bullet Points
    * ` <EditableBulletPoints nodeKey="bulletpoints" />`
* FlexboxDefault area where Touts (or actually any component) can be added.
    * ` <FlexBoxDefault nodeKey={HOME_PAGE_PATH} />`

Besides identifying components on the page or website, a component can have variations. Let's use the Tout page (visit http://localhost:8005/touts/ after you have launched the test site as example of variations.  On this page [and the code reference ](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/touts/index.jsx), you can see variations of the touts.  
 * Horitontal tout with Image, Title, Body, Call to Action
 * Horitontal tout with Image, Body, Call to Action
 * Tout with Image & Overlay of Call to Action
 * Tout with Title Overlay & Overlay of Call to Action
 * Vertical Tout with Image, Body, Call to Action
 * Vertical Tout with Image, Title, Body, Call to Action
 * Vertical Tout with Image, Body, Call to Action
 * Tout with Title Overlay
 * Tout with Title Overlay & Call to Action
    
All these are the same Tout component but have variations of either styling or what fields are present. 
* For the variations for styling, a mix of token styles were applied to generate these these variations.  The token styles are define in [`src/components/Tout/token.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/components/Tout/token.tsx) you can see we have applied different classes or tokens to generate these variations. 
* A component may have for items that you need and you want to make a simpler version of that component and this can be done by removing a component within. For example:
    ```
     withDesign({
       Title: remove,
     });
    ```

So with this concept that sometimes a component might just be a slightly different version of the same component (styled different or less sub-components), as you review your assets or existing site and generate a list of components the sites uses, variations of the components and if used globally. 

So for example, looking at simple brand site could be something like the following:
* Linkable Image  (Logo)
* Menu
    * Header
    * Footer
    * BurgerMenu
* Header Image with Title overlay
* Hero Tout (Title & Body overlay image)
* Hero Tout with CTA (Title & Body & CTA overlay image)
* Product Tout with Reviews
* Product Tout (Styled different that drives to products)
* Article Tout (Styled different that drives to articles)
* Product Image
* Accordions
* BulletLists
    * With Dots
    * With Images
