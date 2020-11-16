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
    Title: withDesign({
      Label: withEditorSimple('title', 'Accordion Title'),
    }),
    Body: withDesign({
      Content: withEditorBasic(
        'body',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      ),
    }),
  }),
);

const SingleAccordion = asSingleAccordion(AccordionClean);
```

```
 <SingleAccordion expanded nodeKey="accordion-1" id="accordion-1" />
```

## Design Components
The accordion component follows the Bodiless Design Pattern and is easy to style. Here is an example demonstrating all possible design components:

```js
import { withDesign, addClasses } from '@bodiless/fclasses';

const asAccordionExampleStyle = withDesign({
  Wrapper: addClasses('p-3'),
  Title: withDesign({
    Wrapper: addClasses('bg-gray-200'),
    Label: addClasses('text-primary'),
    Icon: addClasses('ml-2'),
  }),
  Body: withDesign({
    Wrapper: addClasses('border border-solid border-gray-200'),
    Content: addClasses('text-center'),
  }),
});
```

Since accordion is a dynamic component with two possible states (expanded, contracted), it is possible to use conditional fClasses to style accordion based on its state:

```js
import { withDesign, addClasses, addClassesIf } from '@bodiless/fclasses';
import { isAccordionExpanded, isAccordionContracted } from '@bodiless/organisms';

const asAccordionExampleStyle = withDesign({
  Title: withDesign({
    /**
     * Here we apply a darker background color for the expanded accordion title
     * and a lighter background color for the contracted accordions.
     */
    Wrapper: flow(
      addClassesIf(isAccordionExpanded)('bg-gray-400'),
      addClassesIf(isAccordionContracted)('bg-gray-200'),
    ),
    /**
     * Here we make accordion label bold on the expanded accordions.
     */
    Label: flow(
      addClassesIf(isAccordionExpanded)('font-bold'),
    ),
  }),
});
```

## Accordion Context
You can use accordion context to retrieve and manipulate the accordion state: `useAccordionContext` hook is provided by `@bodiless/organisms`:
```js
import { useAccordionContext } from './AccordionContext';

const AccordionExampleTitle = () => {
  const { isExpanded, setExpanded } = useAccordionContext();
  const toggleExpanded = () => setExpanded(!isExpanded);

  return (
    <div onClick={toggleExpanded}>
      <span>{ isExpanded ? 'Expanded' : 'Contracted' }</span>
    </div>
  );
};
```
