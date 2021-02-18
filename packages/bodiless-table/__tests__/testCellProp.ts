import { merge } from 'lodash';
import {
  CellPropsPartial,
  CellProps,
  Section,
} from '../src/types';

const testCellProp = (props: CellPropsPartial) => (
  merge(
    {},
    {
      rowIndex: 0,
      columnIndex: 0,
      row: '1',
      column: '1',
      section: Section.body,
      tableData: {
        rows: ['0', '1', '2'],
        columns: ['0', '1', '2'],
        headRows: ['0'],
        footRows: ['0'],
      },
    },
    props,
  ) as CellProps
);
export default testCellProp;
