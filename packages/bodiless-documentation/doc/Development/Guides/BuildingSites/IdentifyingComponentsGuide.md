# Guide in Identifying Components & Variations

While it's always best practice to begin the site-build with a design system
and accompanying styleguide provided by a designer, this is not always possible.
Maybe you want to rebuild an existing site, or maybe your creative partners
don't work that way. In such cases, a site builder can look through an existing
site that is being rebuilt or the site design assets and choose how to build it
out as components. Note: try to keep components as small as
possible so that they can be reused or composed together to create more complex
components.

## Identifying Components

Let's use
[Examples/Test Site homepage](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted?id=launch-the-test-site)
as an example. It consists of:

* Header and within the header is a 
  * Logo (Clickable Image)
  * Menu
* Header Landscape Image
* Title
* Bullet Points
* Cards
* Footer with Copyright

The Header, Menu, Logo, & Footer components are global components.
So thus it leaves the actual page components that are coming from
[homepage](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx)
and if you inspect the code, you can see it was implemented with

* Image component for Header Image
  * `<Image className="w-full" nodeKey="header_image" />`
* Editable component for Title
  * `<Editable nodeKey="title" placeholder="Page Title" />`
* List Component extended for Bullet Points
  * `<EditableBulletPoints nodeKey="bulletpoints" />`
* FlowContainer area where Cards (or actually any component) can be added.
  * `<FlowContainerDefault nodeKey={HOME_PAGE_PATH} />`

Thus we would have to build out or extend these components to create the page.

## Variations of Components

The components could come with variations.

Let's take the a header image on a page. You may see variations of this header
image such as:

* A title that overlays the image in center
* A title changes how it overlays (left, right, bottom alignments)
* A title & caption are both present.
* and probably some other variations...

One component could be built and apply different style variations to produce a
component that meets this requirement. In the above example, you could build a
page banner component that is composed of Image, Rich Text Editor Simple for the
title, Rich Text Editor Full for the caption. Then create style variations to
control the design of title, captions and placement of the title & captions. In
addition, you could create a variation that removes the caption and it will
render with only image & title.  

## Reviewing a Site

So as you review site assets (or existing site), generate a list of individual
components that are used throughout each page. As you review, track the
different variations that are seen (which are often the same type of content and
displayed visually slightly differently.) This is also a good time to find the
commonality of types of pages used within so you can record what templates have
to be built.
