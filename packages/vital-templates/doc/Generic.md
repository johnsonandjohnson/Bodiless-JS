# Vital Generic Page Template

## Overview

The Generic Template is a barebones template component that provides four sections to a page:

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

The Generic Template is set up in the Vital Design System to be the default template provided to
users.

For how to use this Generic Template component, please see: [Vital Templates : Site Builder
Details](../VitalTemplates/#site-builder-details).

What template is provided to the user is set by tokens with the Page Component. For example, within
the Page Component, we set the `_default` page to use the `GenericTemplateClean` component, and
apply the default Generic Template tokens to it. This will give the Content Editor the Generic
Template as the default template, and any new pages will default to Generic Template.

```js
const Default = asFluidToken({
  ...vitalPage.Default,
  Components: {
    _default: on(GenericTemplateClean)(vitalGenericTemplate.Default),
  },
});
```

### Override

#### Via Shadowing (*Preferred Method)

Provide the Shadowing function as defined in [Shadow](../VitalElements/Shadow).

File to shadow:
[`vitalGenericTemplate.ts`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-templates/src/components/GenericTemplate/tokens/vitalGenericTemplate.ts ':target=_blank')

## Architectural Details

Generic Templates provides top, breadcrumb, content, and bottom slots with wrappers. To see how these
elements are structured, please see:
[`GenericTemplateClean.tsx`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-templates/src/components/GenericTemplate/GenericTemplateClean.tsx ':target=_blank').
