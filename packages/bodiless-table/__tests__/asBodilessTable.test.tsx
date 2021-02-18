import testCellProp from './testCellProp';
import { tableMangerFunc } from '../src/asBodilessTable';
import { TableBaseProps } from '../src/types';

describe('asBodilessTable', () => {
  describe('tableMangerFunc', () => {
    describe('addColumn', () => {
      test('should add a new column after the one referenced', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.columns[1]).toEqual('test');
          expect(result.columns[2]).toEqual(start.columns[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .addColumn(0, 'test');
      });
      test('should add a new column at end if index is larger then last index', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          expect(result.columns[3]).toEqual('test');
        };
        tableMangerFunc({ componentData, setComponentData })
          .addColumn(10, 'test');
      });
    });
    describe('addRow', () => {
      test('should add a new row after the one referenced', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.rows[1]).toEqual('test');
          expect(result.rows[2]).toEqual(start.rows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .addRow(0, 'test');
      });
      test('should add a new row at end if index is larger then last index', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          expect(result.rows[3]).toEqual('test');
        };
        tableMangerFunc({ componentData, setComponentData })
          .addRow(10, 'test');
      });
    });
    describe('addHeadRow', () => {
      test('should add a new head row after the one referenced', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.headRows[1]).toEqual('test');
          expect(result.headRows[2]).toEqual(start.headRows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .addHeadRow(0, 'test');
      });
      test('should add a new head row at end if index is larger then last index', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          expect(result.headRows[1]).toEqual('test');
        };
        tableMangerFunc({ componentData, setComponentData })
          .addHeadRow(10, 'test');
      });
    });
    describe('addFootRow', () => {
      test('should add a new foot row after the one referenced', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.footRows[1]).toEqual('test');
          expect(result.footRows[2]).toEqual(start.footRows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .addFootRow(0, 'test');
      });
      test('should add a new Foot row at end if index is larger then last index', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          expect(result.footRows[1]).toEqual('test');
        };
        tableMangerFunc({ componentData, setComponentData })
          .addFootRow(10, 'test');
      });
    });
    describe('deleteColumn', () => {
      test('should delete the referenced column and move others up', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.columns[1]).toEqual(start.columns[2]);
          expect(result.columns.length + 1).toEqual(start.columns.length);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteColumn(1);
      });
      test('should do nothing if index is out of scope', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.columns).toEqual(start.columns);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteColumn(10);
      });
    });
    describe('deleteRow', () => {
      test('should delete the referenced row and move others up', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.rows[1]).toEqual(start.rows[2]);
          expect(result.rows.length + 1).toEqual(start.rows.length);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteRow(1);
      });
      test('should do nothing if index is out of scope', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.rows).toEqual(start.rows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteRow(10);
      });
    });
    describe('deleteHeadRow', () => {
      test('should delete the referenced head row and move others up', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.headRows[0]).toEqual(start.headRows[1]);
          expect(result.headRows.length + 1).toEqual(start.headRows.length);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteHeadRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.headRows).toEqual(start.headRows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteHeadRow(10);
      });
    });
    describe('deleteFootRow', () => {
      test('should delete the referenced foot row and move others up', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.footRows[0]).toEqual(start.footRows[1]);
          expect(result.footRows.length + 1).toEqual(start.footRows.length);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteFootRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.footRows).toEqual(start.footRows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .deleteFootRow(10);
      });
    });
    describe('moveColumn', () => {
      test('should move the column one index lower', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.columns[1]).toEqual(start.columns[0]);
          expect(result.columns[0]).toEqual(start.columns[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveColumn(0);
      });
      test('if last column should not change anything', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.columns).toEqual(start.columns);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveColumn(2);
      });
    });
    describe('moveRow', () => {
      test('should move the row one index lower', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.rows[1]).toEqual(start.rows[0]);
          expect(result.rows[0]).toEqual(start.rows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveRow(0);
      });
      test('if last row should not change anything', () => {
        const componentData = testCellProp({}).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({}).tableData;
          expect(result.rows).toEqual(start.rows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveRow(2);
      });
    });
    describe('moveHeadRow', () => {
      test('should move the head row one index lower', () => {
        const componentData = testCellProp({ tableData: { headRows: ['0', '1'] } }).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({ tableData: { headRows: ['0', '1'] } }).tableData;
          expect(result.headRows[1]).toEqual(start.headRows[0]);
          expect(result.headRows[0]).toEqual(start.headRows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveHeadRow(0);
      });
      test('if last head row should not change anything', () => {
        const componentData = testCellProp({ tableData: { headRows: ['0', '1'] } }).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({ tableData: { headRows: ['0', '1'] } }).tableData;
          expect(result.headRows).toEqual(start.headRows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveHeadRow(1);
      });
    });
    describe('moveFootRow', () => {
      test('should move the foot row one index lower', () => {
        const componentData = testCellProp({ tableData: { footRows: ['0', '1'] } }).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({ tableData: { footRows: ['0', '1'] } }).tableData;
          expect(result.footRows[1]).toEqual(start.footRows[0]);
          expect(result.footRows[0]).toEqual(start.footRows[1]);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveFootRow(0);
      });
      test('if last foot row should not change anything', () => {
        const componentData = testCellProp({ tableData: { footRows: ['0', '1'] } }).tableData;
        const setComponentData = (result:TableBaseProps) => {
          const start = testCellProp({ tableData: { footRows: ['0', '1'] } }).tableData;
          expect(result.footRows).toEqual(start.footRows);
        };
        tableMangerFunc({ componentData, setComponentData })
          .moveFootRow(1);
      });
    });
  });
});
