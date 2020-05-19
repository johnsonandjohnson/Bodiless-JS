# Single Accordion

- Purpose
  - Applies the expand/collapse effect
- Properties
  - expanded (opt) - defines whether the accordion is expanded by default
- Editable areas
  - Title, Body
- Styling
  - Can be implemented in the appropriate token.tsx file by adding necessary tailwind classes - check [asSingleAccordionDefaultStyle](../../examples/test-site/src/components/SingleAccordion/token.tsx)

## Usage

```
const asSingleAccordion = flow(
  withNode,
  withDesign({
    Title: asEditorSimple('title', 'Accordion Title'),
    Body: asEditorBasic(
      'body',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
    ),
  }),
  asSingleAccordionDefaultStyle,
  asTestableAccordion,
);

const SingleAccordion = asSingleAccordion(SingleAccordionClean);
```

```
 <SingleAccordion expanded nodeKey="accordion-1" id="accordion-1" />
```
