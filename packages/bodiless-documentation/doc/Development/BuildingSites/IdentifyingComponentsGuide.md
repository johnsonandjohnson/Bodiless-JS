# Guide in Identifying Components & Variations

A site builder can look through an existing site that is being rebuilt or the
site design assets and choose how to build it out as as components. A good guide
would be try keep components as smaller componets that can be reused or composed
together to create more complex componets

## Identifying Components

Let's use
[Examples/Test Site homepage](https://johnsonandjohnson.github.io/Bodiless-JS/#/About/GettingStarted?id=launch-the-test-site)
as an example. It consists of:

* Header
  * Logo (Clickable Image)
  * Menu
* Header Image
* Title
* Bullet Points
* Touts
* Footer with Copyright

We have discussed that Header, Menu, Logo, & Footer already come in the Bodiless Starter Kit.
So thus it leaves the actual page components that are coming from
[homepage](https://github.com/johnsonandjohnson/Bodiless-JS/blob/master/examples/test-site/src/data/pages/index.tsx)
and if you inspect the code, you can see it was implemented with

* Image component for Header Image
  * `<Image className="w-full" nodeKey="header_image" />`
* Editable component for Title
  * `<Editable nodeKey="title" placeholder="Page Title" />`
* List Component extended for Bullet Points
  * `<EditableBulletPoints nodeKey="bulletpoints" />`
* FlowContainer area where Touts (or actually any component) can be added.
  * `<FlowContainerDefault nodeKey={HOME_PAGE_PATH} />`

Thus we would have to build out or extend these components to create the page.

## Identifying Variations of Components

The components could come with variations.

Let's take the a header image on a page. You may see variations of this header
image such as:

* A title that overlays the image in center
* A title changes how it overlays (left, right, bottom aligments)
* A title & caption overlays the image in center
* A title & caption changes how it overlays (left, right, bottom aligments)
* and probably some other variations that make it banner.

One component could be built and apply different style variations to produce a
component that meets the requirements.
