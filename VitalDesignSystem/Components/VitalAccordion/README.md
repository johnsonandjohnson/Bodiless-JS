# Vital Accordion

The Vital Accordion package provides a simple, extendable and accessible accordion component that
can be used to organize non-essential information in a page.

?> **Note:** The Vital Accordion package is standalone and **does not** extend the Bodiless
Accordion package — which is deprecated. This means that you only need to install this package to
use accordions.

## Content Editor Details

Accordions are simple components with an editable title and description. Clicking on the title
toggles the accordion, displaying or hiding its description.

## Site Builder Details

The Vital Accordion package exports three components:

- `Accordion`
- `AccordionTitle`
- `AccordionBody`

For simple accordions, developers only need to use the `Accordion` component and its tokens, like in
the example below. For further customization — title and body components, and tokens are available.

### Usage

```ts
import { as, on } from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';

// Using as a React component
const SimpleAccordion = as(vitalAccordion.Default)(AccordionClean);

// Using in a token
const Foo = asFooToken({
  Components: {
    ExampleContent: on(AccordionClean)(vitalAccordion.Default),
  }
});
```

### Tokens

The Vital Accordion package comes with a few useful tokens.

### Base

Exported by: `Accordion`, `AccordionTitle`, `AccordionBody`

This token implements the accordion's basic functionality, like toggling its body when clicking in
the title and using Vital Editors for content editing. Use this token as a base if you don't want
VitalDS styling.

### Default

Exported by: `Accordion`, `AccordionTitle`, `AccordionBody`

This token extends the Base token, adding VitalDS styles. Apply this token to an AccordionClean
component for a quick start or use it as a base if you only need to update a few styles.

#### WithInitiallyExpanded

Exported by: `Accordion`

Accordions are collapsed on initialization by default, which means that its body is initially hidden
when loading a page. By applying this token, the accordion will start expanded, so the user won't
need to click on its title to see its content.

```ts
import { as } from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';

const ExpandedAccordion = as(
  vitalAccordion.Default,
  vitalAccordion.WithInitiallyExpanded,
)(AccordionClean);
```

#### WithFAQSchema

Exported by: `Accordion`, `AccordionTitle`, `AccordionBody`

By applying this token, the accordion title and body will be respectively used as a Question and
Answer to a [Schema.org FAQPage](https://schema.org/FAQPage ':target=_blank') instance. A page can
contain any number of FAQ accordions.

See the [`@bodiless/schema-org` docs](/Components/Schema/) for more information.

```ts
import { as } from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion } from '@bodiless/vital-accordion';

const FAQAccordion = as(
  vitalAccordion.Default,
  vitalAccordion.WithFAQSchema,
)(AccordionClean);
```
