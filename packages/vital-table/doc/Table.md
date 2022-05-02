# Vital Table Component

The Vital Table Component is based on the [BodilessJS Table
Component](/Components/Table). The Vital Rich Table provides a design system for the table with a set, to help
meet typical site-use design.  It also provides a set of variations to the flow container that is available to the content editor.
## Content Editor Details

Other than potentially seeing different style variations available, there is no change to the Table
experience by the Vital Table package, and, thus, you can refer to the [Bodiless Table :
Content Editor Details](/Components/Table#content-editor-details).
## Site Builder Details

### Usage of the Vital Table

What's shown in the following example can be applied to any Slot.

```js
import { vitalTable, TableClean, asTableToken } from '@bodiless/vital-table';

...within your component

  Components: {
    TableContent: on(TableClean)(vitalTable.Default, vitalTable.WithLightHeaderFooter),
  },

```

The vitalTable.Default component provides the base table styling and WithLightHeaderFooter gives a light gray header & footer.

### Overriding Table

#### Via Shadowing (*Preferred Method)

Define a Shadowing token collection as defined in [Shadow](../vital-table/Shadow).

File to shadow:
[`vitalTable`](https://github.com/johnsonandjohnson/Bodiless-JS/blob/main/packages/vital-table/src/components/vital-table/tokens/vitalTable.ts)

```js
const Default = asFluidToken({
  // ...vitalTable.Default,
  Components: {
    // ...vitalTable.Default.Components,
    Wrapper: addProps({ 'data-shadowed-by': '__vitalstarter_:Table' }),
  },
  /* The following is example that overrides full width and uses
   * fixed widths for columns. The width of the first row will set the
   * column widths for the whole table.  Data of cells will be centered.
   */
  Theme: {
    Table: 'table-fixed',
    Cell: 'text-center',
  },
});

export default {
  ...vitalTable,
  Default,
};
```
