/**
 * Copyright © 2019 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
  TMenuOption,
  withContextActivator,
  withData,
  withLocalContextMenu,
  withMenuOptions,
  withNode,
  withNodeDataHandlers,
  withNodeKey,
  WithNodeProps,
} from '@bodiless/core';
import { withDesign, withoutProps, HOC } from '@bodiless/fclasses';
import { flow } from 'lodash';
import React, { ComponentType as CT, useContext } from 'react';
import { v1 } from 'uuid';
import forCells from './forCell';
import {
  CellProps,
  TableBaseProps,
  TableFuncs,
  Section,
  AddFunc,
  DeleteFunc,
  MoveFunc,
  RowProps,
} from './types';
import TableManagerContext from './TableManagerContext';

type WithTableManagerProps = {
  componentData:TableBaseProps,
  setComponentData: (p:TableBaseProps) => void,
};
const withTableManager = <P extends WithTableManagerProps> (Component:CT<P>) => (props:P) => {
  const { componentData, setComponentData } = props;
  const tableFunc:TableFuncs = {
    addColumn: (currentColumnIndex, newColumn) => {
      componentData.columns.splice(currentColumnIndex + 1, 0, newColumn);
      setComponentData(componentData);
    },
    deleteColumn: (currentColumnIndex) => {
      componentData.columns.splice(currentColumnIndex, 1);
      setComponentData(componentData);
    },
    moveColumn: (currentColumnIndex) => {
      const currentColumn = componentData.columns[currentColumnIndex];
      componentData.columns.splice(currentColumnIndex, 1);
      componentData.columns.splice(currentColumnIndex + 1, 0, currentColumn);
      setComponentData(componentData);
    },
    addRow: (currentRowIndex, newRow) => {
      componentData.rows.splice(currentRowIndex + 1, 0, newRow);
      setComponentData(componentData);
    },
    deleteRow: (currentRowIndex) => {
      componentData.rows.splice(currentRowIndex, 1);
      setComponentData(componentData);
    },
    moveRow: (currentRowIndex) => {
      const currentRow = componentData.rows[currentRowIndex];
      componentData.rows.splice(currentRowIndex, 1);
      componentData.rows.splice(currentRowIndex + 1, 0, currentRow);
      setComponentData(componentData);
    },
    addHeadRow: (currentRowIndex, newRow) => {
      componentData.headRows.splice(currentRowIndex + 1, 0, newRow);
      setComponentData(componentData);
    },
    deleteHeadRow: (currentRowIndex) => {
      componentData.headRows.splice(currentRowIndex, 1);
      setComponentData(componentData);
    },
    moveHeadRow: (currentRowIndex) => {
      const currentRow = componentData.rows[currentRowIndex];
      componentData.headRows.splice(currentRowIndex, 1);
      componentData.headRows.splice(currentRowIndex + 1, 0, currentRow);
      setComponentData(componentData);
    },
    data: componentData,

  };
  return (
    <TableManagerContext.Provider value={tableFunc}>
      <Component {...props} />
    </TableManagerContext.Provider>
  );
};
type UseMenuOptionsTableProps = {
  addFunc:AddFunc,
  deleteFunc:DeleteFunc,
  moveFunc:MoveFunc,
  group:string,
  groupLabel:string,
  index:number,
  addIsDisabled?: boolean,
  deleteIsDisabled?: boolean,
  moveIsDisabled?: boolean,
  moveIcon?: string,
};
type UseMenuOptionsTable = (p:UseMenuOptionsTableProps) => TMenuOption[];
const useMenuOptionsTable:UseMenuOptionsTable = ({
  addFunc,
  deleteFunc,
  moveFunc,
  group,
  groupLabel,
  index,
  addIsDisabled,
  deleteIsDisabled,
  moveIsDisabled,
  moveIcon,
}) => [
  {
    name: group,
    label: groupLabel,
    groupMerge: 'none',
    local: true,
    global: false,
    Component: 'group',
  },
  {
    name: `add_${group}`,
    icon: 'add',
    group,
    local: true,
    global: false,
    label: 'Add',
    isDisabled: addIsDisabled || false,
    handler: () => {
      addFunc(index, v1());
    },
  // An array of context menu option objects
  },
  {
    name: `delete_${group}`,
    icon: 'delete',
    group,
    groupMerge: 'merge',
    label: 'Delete',
    isDisabled: deleteIsDisabled || false,
    local: true,
    global: false,
    handler: () => {
      deleteFunc(index);
    },
  },
  {
    name: `move_${group}`,
    icon: moveIcon || 'keyboard_arrow_down',
    group,
    groupMerge: 'merge',
    label: 'Move',
    isDisabled: moveIsDisabled || false,
    local: true,
    global: false,
    handler: () => {
      moveFunc(index);
    },
  },
];
type WithTableData = {
  tableData: TableBaseProps,
};
const withTableData = <A extends object> (Component:CT<A>) => (props:A) => {
  const { data } = useContext(TableManagerContext);
  return <Component tableData={data} {...props} />;
};
const withoutTableData = withoutProps('tableData');
const useMenuOptions = (props:CellProps & WithTableData) => {
  const {
    addRow,
    deleteRow,
    moveRow,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addRow,
    deleteFunc: deleteRow,
    moveFunc: moveRow,
    group: 'row',
    groupLabel: 'Row',
    index: props.rowIndex,
    deleteIsDisabled: props.tableData.rows.length === 1,
    moveIsDisabled: props.tableData.rows.length === props.rowIndex + 1,
  });
};
const useMenuOptionsHead = (props:CellProps & WithTableData) => {
  const {
    addHeadRow,
    deleteHeadRow,
    moveHeadRow,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addHeadRow,
    deleteFunc: deleteHeadRow,
    moveFunc: moveHeadRow,
    group: 'head_row',
    groupLabel: 'Header Row',
    index: props.rowIndex,
    moveIsDisabled: props.tableData.headRows.length === props.rowIndex + 1,
  });
};
const useMenuOptionsColumns = (props:CellProps & WithTableData) => {
  const {
    addColumn,
    deleteColumn,
    moveColumn,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addColumn,
    deleteFunc: deleteColumn,
    moveFunc: moveColumn,
    group: 'column',
    groupLabel: 'Column',
    index: props.columnIndex,
    deleteIsDisabled: props.tableData.columns.length === 1,
    moveIsDisabled: props.tableData.columns.length === props.columnIndex + 1,
    moveIcon: 'keyboard_arrow_right',
  });
};
const useMenuOptionsTableOverview = () => {
  const {
    addHeadRow,
    data,
  } = useContext(TableManagerContext);
  return [
    {
      name: 'table',
      label: 'Table',
      groupMerge: 'none',
      local: true,
      global: false,
      Component: 'group',
    },
    {
      name: 'add_header',
      icon: 'add',
      group: 'table',
      local: true,
      global: false,
      label: 'Header',
      isHidden: data.headRows.length > 0,
      handler: () => {
        addHeadRow(0, v1());
      },
    },

  ] as TMenuOption[];
};
type NodeKey = string|Partial<WithNodeProps>;
const asBodilessTable = (nodeKey?: NodeKey, defaultData?:TableBaseProps) => flow(
  withData,
  withoutProps(['setComponentData']),
  withTableManager,
  withNodeDataHandlers(defaultData || {
    columns: ['1', '2', '3'],
    rows: ['1', '2', '3'],
    footRows: [],
    headRows: ['0'],
  } as TableBaseProps),
  withNode,
  withNodeKey(nodeKey),
  withDesign({
    Wrapper: withMenuOptions({ useMenuOptions: useMenuOptionsTableOverview, name: 'Table' }),
    TBody: flow(withNode, withNodeKey(Section.body)),
    THead: flow(withNode, withNodeKey(Section.head)),
    TFoot: flow(withNode, withNodeKey(Section.foot)),
    Row: flow(
      withNode,
      withNodeKey((p:RowProps) => p.row),
    ),
    Cell: flow(
      withoutTableData,
      withLocalContextMenu,
      withContextActivator('onClick'),
      withMenuOptions({ useMenuOptions: useMenuOptionsColumns, name: 'TableColumn' }),
      withNode,
      withNodeKey((p:CellProps) => p.column),
    ),
  }),
  forCells((p:CellProps) => p.section === Section.body)(
    withMenuOptions({ useMenuOptions, name: 'TableRow' }) as HOC,
  ),
  forCells((p:CellProps) => p.section === Section.head)(
    withMenuOptions({ useMenuOptions: useMenuOptionsHead, name: 'TableRowHead' }) as HOC,
  ),
  withDesign({
    Cell: withTableData,
  }),
);

export default asBodilessTable;
