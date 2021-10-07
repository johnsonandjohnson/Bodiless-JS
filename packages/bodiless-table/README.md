# Table Component

- Purpose
  - A way for editors to add tabular data.
- Editable areas
  - Allow for table Rows and Columns to be added deleted and moved
- Styling
  - Can be implemented in the appropriate token.tsx file by adding necessary tailwind classes - check [asTableDefaultStyle](../../examples/test-site/src/components/Table/index.tsx)

## Usage

``` js
const ExampleTableExample = flow(
  withDesign({
    Header: addClasses('text-center'),
  }),
  asBodilessTable(),
  asDefaultTableStyle,
)(CleanTable);
```

`asBodilessTable()` is used to add the editablity to the table.

``` js
 <TableExample nodeKey="table-1" />
```

## Design Components

The table component follows the Bodiless Design Pattern and is easy to style. Here is an example demonstrating all possible design components:

```js
import { withDesign, addClasses } from '@bodiless/fclasses';

const asTableExampleStyle = withDesign({
  Wrapper: addClasses('p-3'),
  THead: addClasses('bg-gray-200'),
  TBody: addClasses('text-primary'),
  TFoot: addClasses('ml-2'),
  Row: addClasses('ml-2'), 
  Cell: addClasses('border border-solid border-gray-200'),
  }),
});
```

Because each Cell knows where it is in the table it is possible to use conditional styling. There are several helper function for this or someone can provide a custom
function with all Cell Props as well as table data.

```js
import { withDesign, addClasses, addClassesIf, and, not } from '@bodiless/fclasses';
import { useIsFirstColumn, useIsOddColumnn } from '@bodiless/organisms';

const asTableExampleStyle = withDesign({
  Cell:  flow(
      /**
       * Here we apply a dark column to every other row in the Body, left align 
       * text in the first column and right align in every other column.
       */
      addClassesIf(and(useIsInBody, useIsOddColumnn))('bg-gray-200'),
      addClassesIf(useIsFirstColumn)('text-left'),
      addClassesIf(not(useIsFirstColumn))('text-center'),
      /**
       * Here we use a custom function. to style the second to last column
       */
      addClassesIf((p) => p.columnIndex === (p.tableData.columns.length - 2))('bg-color-orange-700'),
    ),
  }),
});
