# Vital Table Component

The Vital Table Component is based on the [BodilessJS Table Component](/Components/Table). The Vital
Table applies a Vital Design System to the table, to help meet typical site-use design, as well as
offer different design variations.

## Content Editor Details

Other than potentially seeing different style variations available, there is no change to the Table
experience by the Vital Table package, and, thus, you can refer to the [Bodiless Table : Content
Editor Details](/Components/Table#content-editor-details).

## Site Builder Details

### Usage of the Vital Table

What's shown in the following example can be applied to any Slot.

```js
import { vitalTable, TableClean, asTableToken } from '@bodiless/vital-table';

  // ...within your component
  Components: {
    TableContent: on(TableClean)(
      vitalTable.Default,
      vitalTable.WithLightHeaderFooter,
    ),
  },

```

The `vitalTable.Default` component provides the base table styling, and `WithLightHeaderFooter`
gives a light gray header and footer.

### Overriding Table

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](./VitalElements/Shadow).

File to shadow: `packages/{my-package}/src/shadow/@bodiless/vital-table/Table.ts`

```js
import { vitalTableBase } from '@bodiless/vital-table/lib/base';
import { asFluidToken } from '@bodiless/vital-elements';
import { addProps } from '@bodiless/fclasses';

const Default = asFluidToken({
  ...vitalTableBase.Default,
  Components: {
    ...vitalTableBase.Default.Components,
    Wrapper: addProps({ 'data-shadowed-by': '__vital__:Table' }),
  },
  /* The following is an example that overrides full width and uses
   * fixed widths for columns. The width of the first row will set the
   * column widths for the whole table.  Data of cells will be centered.
   */
  Theme: {
    Table: 'table-fixed',
    Cell: 'text-center',
  },

});

export default {
  ...vitalTableBase,
  Default,
};
```
