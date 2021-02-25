import { merge } from 'lodash';
import { tableMangerFunc } from '../src/asBodilessTable';
import { TableBaseProps } from '../src/types';

const testTableData = (props:Partial<TableBaseProps>) => (
  merge(
    {},
    {
      rows: [],
      columns: [],
      headRows: [],
      footRows: [],
    },
    props,
  )
);
describe('asBodilessTable', () => {
  describe('tableMangerFunc', () => {
    describe('addColumn', () => {
      test('should add a new column after the one referenced', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', 'test', '1']);
          },
        }).addColumn(0, 'test');
      });
      test('should add a new column at end if index is larger then last index', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1', 'test']);
          },
        }).addColumn(10, 'test');
      });
    });
    describe('addRow', () => {
      test('should add a new row after the one referenced', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', 'test', '1']);
          },
        }).addRow(0, 'test');
      });
      test('should add a new row at end if index is larger then last index', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1', 'test']);
          },
        }).addRow(10, 'test');
      });
    });
    describe('addHeadRow', () => {
      test('should add a new head row after the one referenced', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', 'test', '1']);
          },
        }).addHeadRow(0, 'test');
      });
      test('should add a new head row at end if index is larger then last index', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1', 'test']);
          },
        }).addHeadRow(10, 'test');
      });
    });
    describe('addFootRow', () => {
      test('should add a new foot row after the one referenced', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', 'test', '1']);
          },
        }).addFootRow(0, 'test');
      });
      test('should add a new foot row at end if index is larger then last index', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1', 'test']);
          },
        }).addFootRow(10, 'test');
      });
    });
    describe('deleteColumn', () => {
      test('should delete the referenced column and move others up', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['1']);
          },
        }).deleteColumn(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1']);
          },
        }).deleteColumn(10);
      });
    });
    describe('deleteRow', () => {
      test('should delete the referenced row and move others up', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['1']);
          },
        }).deleteRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1']);
          },
        }).deleteRow(10);
      });
    });
    describe('deleteHeadRow', () => {
      test('should delete the referenced head row and move others up', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['1']);
          },
        }).deleteHeadRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1']);
          },
        }).deleteHeadRow(10);
      });
    });
    describe('deleteFootRow', () => {
      test('should delete the referenced foot row and move others up', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['1']);
          },
        }).deleteFootRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1']);
          },
        }).deleteFootRow(10);
      });
    });
    describe('moveColumn', () => {
      test('should move the column one index lower', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['1', '0']);
          },
        }).moveColumn(0);
      });
      test('if last column should not change anything', () => {
        tableMangerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1']);
          },
        }).moveColumn(1);
      });
    });
    describe('moveRow', () => {
      test('should move the row one index lower', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['1', '0']);
          },
        }).moveRow(0);
      });
      test('if last row should not change anything', () => {
        tableMangerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1']);
          },
        }).moveRow(1);
      });
    });
    describe('moveHeadRow', () => {
      test('should move the head row one index lower', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['1', '0']);
          },
        }).moveHeadRow(0);
      });
      test('if last head row should not change anything', () => {
        tableMangerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1']);
          },
        }).moveHeadRow(1);
      });
    });
    describe('moveFootRow', () => {
      test('should move the foot row one index lower', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['1', '0']);
          },
        }).moveFootRow(0);
      });
      test('if last foot row should not change anything', () => {
        tableMangerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1']);
          },
        }).moveFootRow(1);
      });
    });
  });
});
