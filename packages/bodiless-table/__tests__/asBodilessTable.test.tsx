import { merge } from 'lodash';
import { tableManagerFunc } from '../src/asBodilessTable';
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
  describe('tableManagerFunc', () => {
    describe('addColumn', () => {
      test('should add a new column after the one referenced', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', 'newColumn', '1']);
          },
        }).addColumn(0, 'newColumn');
      });
      test('should add a new column at end if index is larger then last index', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1', 'newColumn']);
          },
        }).addColumn(10, 'newColumn');
      });
    });
    describe('addRow', () => {
      test('should add a new row after the one referenced', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', 'newRow', '1']);
          },
        }).addRow(0, 'newRow');
      });
      test('should add a new row at end if index is larger then last index', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1', 'newRow']);
          },
        }).addRow(10, 'newRow');
      });
    });
    describe('addHeadRow', () => {
      test('should add a new head row after the one referenced', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', 'newHeadRow', '1']);
          },
        }).addHeadRow(0, 'newHeadRow');
      });
      test('should add a new head row at end if index is larger then last index', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1', 'newHeadRow']);
          },
        }).addHeadRow(10, 'newHeadRow');
      });
    });
    describe('addFootRow', () => {
      test('should add a new foot row after the one referenced', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', 'newFootRow', '1']);
          },
        }).addFootRow(0, 'newFootRow');
      });
      test('should add a new foot row at end if index is larger then last index', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1', 'newFootRow']);
          },
        }).addFootRow(10, 'newFootRow');
      });
    });
    describe('deleteColumn', () => {
      test('should delete the referenced column and move others up', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['1']);
          },
        }).deleteColumn(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1']);
          },
        }).deleteColumn(10);
      });
    });
    describe('deleteRow', () => {
      test('should delete the referenced row and move others up', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['1']);
          },
        }).deleteRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1']);
          },
        }).deleteRow(10);
      });
    });
    describe('deleteHeadRow', () => {
      test('should delete the referenced head row and move others up', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['1']);
          },
        }).deleteHeadRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1']);
          },
        }).deleteHeadRow(10);
      });
    });
    describe('deleteFootRow', () => {
      test('should delete the referenced foot row and move others up', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['1']);
          },
        }).deleteFootRow(0);
      });
      test('should do nothing if index is out of scope', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1']);
          },
        }).deleteFootRow(10);
      });
    });
    describe('moveColumn', () => {
      test('should move the column one index lower', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['1', '0']);
          },
        }).moveColumn(0);
      });
      test('if last column should not change anything', () => {
        tableManagerFunc({
          componentData: testTableData({ columns: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.columns).toEqual(['0', '1']);
          },
        }).moveColumn(1);
      });
    });
    describe('moveRow', () => {
      test('should move the row one index lower', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['1', '0']);
          },
        }).moveRow(0);
      });
      test('if last row should not change anything', () => {
        tableManagerFunc({
          componentData: testTableData({ rows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.rows).toEqual(['0', '1']);
          },
        }).moveRow(1);
      });
    });
    describe('moveHeadRow', () => {
      test('should move the head row one index lower', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['1', '0']);
          },
        }).moveHeadRow(0);
      });
      test('if last head row should not change anything', () => {
        tableManagerFunc({
          componentData: testTableData({ headRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.headRows).toEqual(['0', '1']);
          },
        }).moveHeadRow(1);
      });
    });
    describe('moveFootRow', () => {
      test('should move the foot row one index lower', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['1', '0']);
          },
        }).moveFootRow(0);
      });
      test('if last foot row should not change anything', () => {
        tableManagerFunc({
          componentData: testTableData({ footRows: ['0', '1'] }),
          setComponentData: (result:TableBaseProps) => {
            expect(result.footRows).toEqual(['0', '1']);
          },
        }).moveFootRow(1);
      });
    });
  });
});
