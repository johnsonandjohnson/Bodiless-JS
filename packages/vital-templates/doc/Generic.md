# Vital Generic Page Template

## Overview

The Generic Template is a barebones template that provides four sections to a page:

- **Top:** A full-width viewport section limited to a select group of components that work well for
  full-width, and its intention, from a design perspective, is that it will be the _hero_.
- **Breadcrumb:** A reserved slot for your site's breadcrumbs (if it's used on that page).
- **Content:** A constrained section where primary content lives.
- **Bottom:** A constrained section where items such as related content or advertisements could
  live.

## Content Editor Details

There is no interaction by the Content Editor with the template itself, but with the components
available that are provided in the sections.

## Site Builder Details

This generic template is set up in the Vital Design System to be the default template provided to
users.

What template are provided with tokens can updating the Page component such as this which will set
the `_default` page to use the `GenericTemplateClean` component and apply the default tokens to it.

```js
const Default = asFluidToken({
  ...cxPage.Default,
  Components: {
    _default: on(GenericTemplateClean)(cxGenericTemplate.Default),
  },
});
```

### Override

#### Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../CX_Elements/Shadow).

File to shadow:
[`cxGenericTemplate.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-templates/src/components/GenericTemplate/tokens/cxGenericTemplate.ts ':target=_blank')

## Architecture Details

Generic Templates provides top, breadcrumb, content, and bottom slots with wrappers. To see how these
elements are structured, please see:
[`GenericTemplateClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/cx-templates/src/components/GenericTemplate/GenericTemplateClean.tsx ':target=_blank').
