# Vital Logo Component

The Logo is a simple component with a wrapper around a linked image with the following features:

* The Logo is a Gatsby Image.
* The image loads with 'eager' to force it to load immediately.
* Its link is saved as a sidecar link.
* Default data is saved within the `site` node collection, so it's reused on every page.

## Content Editor Details

The Content Editor can change the image or link of the Logo via the usual process for [editing
images](/Components/Image/#select-and-configure-an-image).

?> **Note:** Changing the Logo on one page, changes the Logo on all pages.

## Site Builder Details

At the site or global regional/brand library level, you can use the Logo Component as is, or
extend/shadow the existing component.

### Customizing Logo

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-layout/Logo.ts`

## Architectural Details

To see how these elements are structured within the wrapper, please see:
[`LogoClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-layout/src/components/Logo/LogoClean.tsx).
