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
  ifReadOnly,
  TMenuOption,
  withContextActivator,
  withData,
  withMenuOptions,
  withNode,
  withNodeDataHandlers,
  withNodeKey,
  WithNodeProps,
} from '@bodiless/core';
import { withDesign, withoutProps, HOC } from '@bodiless/fclasses';
import { flow } from 'lodash';
import React, { ComponentType as CT, FunctionComponent as FC, useContext } from 'react';
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
      const currentColumn = componentData.rows[currentColumnIndex];
      componentData.rows.splice(currentColumnIndex, 1);
      componentData.rows.splice(currentColumnIndex + 1, 0, currentColumn);
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
  addIsDisabled?: boolean
  deleteIsDisabled?: boolean
  moveIsDisabled?: boolean
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
    icon: 'keyboard_arrow_right',
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
const useMenuOptions = (props:CellProps) => {
  const {
    addRow,
    deleteRow,
    moveRow,
    data,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addRow,
    deleteFunc: deleteRow,
    moveFunc: moveRow,
    group: 'row',
    groupLabel: 'Row',
    index: props.rowIndex,
    deleteIsDisabled: data.rows.length === 1,
    moveIsDisabled: data.rows.length === props.rowIndex + 1,
  });
};
const useMenuOptionsHead = (props:CellProps) => {
  const {
    addHeadRow,
    deleteHeadRow,
    moveHeadRow,
    data,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addHeadRow,
    deleteFunc: deleteHeadRow,
    moveFunc: moveHeadRow,
    group: 'head_row',
    groupLabel: 'Header Row',
    index: props.rowIndex,
    moveIsDisabled: data.headRows.length === props.rowIndex + 1,
  });
};
const useMenuOptionsColumns = (props:CellProps) => {
  const {
    addColumn,
    deleteColumn,
    moveColumn,
    data,
  } = useContext(TableManagerContext);
  return useMenuOptionsTable({
    addFunc: addColumn,
    deleteFunc: deleteColumn,
    moveFunc: moveColumn,
    group: 'column',
    groupLabel: 'Column',
    index: props.columnIndex,
    deleteIsDisabled: data.columns.length === 1,
    moveIsDisabled: data.columns.length === props.columnIndex + 1,
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
  ifReadOnly(
    withoutProps(['setComponentData']),
  ),
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
      withContextActivator('onClick'),
      withNode,
      withMenuOptions({ useMenuOptions: useMenuOptionsColumns, name: 'TableColumn' }),
      withNodeKey((p:CellProps) => p.column),
    ),
  }),
  forCells((p) => p.section === Section.body)(
    withMenuOptions({ useMenuOptions, name: 'TableRow' }) as HOC,
  ),
  forCells((p) => p.section === Section.head)(
    withMenuOptions({ useMenuOptions: useMenuOptionsHead, name: 'TableRowHead' }) as HOC,
  ),
);

export default asBodilessTable;
