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
import {
  withDesign,
  withoutProps,
  HOC,
  flowIf,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import React, { ComponentType as CT } from 'react';
import { v1 } from 'uuid';
import {
  TableBaseProps,
  TableFuncs,
  Section,
  AddFunc,
  DeleteFunc,
  MoveFunc,
} from './types';
import TableManagerContext, { useTableManagerContext } from './TableManagerContext';
import { useTableColumnContext, useTableContext, useTableRowContext } from './TableContext';
import { useIsInBody, useIsInFoot, useIsInHead } from './forCell';

type WithTableManagerProps = {
  componentData:TableBaseProps,
  setComponentData: (p:TableBaseProps) => void,
};
enum TableActionFields {
  rows = 'rows',
  headRows = 'headRows',
  footRows = 'footRows',
  columns = 'columns',
}
type TableActionProps = WithTableManagerProps & {
  moveField: TableActionFields,
};
const moveX = (props:TableActionProps) => (currentIndex:number) => {
  const {
    componentData,
    setComponentData,
    moveField,
  } = props;
  const current = componentData[moveField][currentIndex];
  componentData[moveField].splice(currentIndex, 1);
  componentData[moveField].splice(currentIndex + 1, 0, current);
  setComponentData(componentData);
};
type TableFunc = (p:WithTableManagerProps) => TableFuncs;
const tableMangerFunc:TableFunc = ({ componentData, setComponentData }) => ({
  addColumn: (currentColumnIndex, newColumn) => {
    componentData.columns.splice(currentColumnIndex + 1, 0, newColumn);
    setComponentData(componentData);
  },
  deleteColumn: (currentColumnIndex) => {
    componentData.columns.splice(currentColumnIndex, 1);
    setComponentData(componentData);
  },
  moveColumn: moveX({
    componentData,
    setComponentData,
    moveField: TableActionFields.columns,
  }),
  addRow: (currentRowIndex, newRow) => {
    componentData.rows.splice(currentRowIndex + 1, 0, newRow);
    setComponentData(componentData);
  },
  deleteRow: (currentRowIndex) => {
    componentData.rows.splice(currentRowIndex, 1);
    setComponentData(componentData);
  },
  moveRow: moveX({
    componentData,
    setComponentData,
    moveField: TableActionFields.rows,
  }),
  addHeadRow: (currentRowIndex, newRow) => {
    componentData.headRows.splice(currentRowIndex + 1, 0, newRow);
    setComponentData(componentData);
  },
  deleteHeadRow: (currentRowIndex) => {
    componentData.headRows.splice(currentRowIndex, 1);
    setComponentData(componentData);
  },
  moveHeadRow: moveX({
    componentData,
    setComponentData,
    moveField: TableActionFields.headRows,
  }),
  addFootRow: (currentRowIndex, newRow) => {
    componentData.footRows.splice(currentRowIndex + 1, 0, newRow);
    setComponentData(componentData);
  },
  deleteFootRow: (currentRowIndex) => {
    componentData.footRows.splice(currentRowIndex, 1);
    setComponentData(componentData);
  },
  moveFootRow: moveX({
    componentData,
    setComponentData,
    moveField: TableActionFields.footRows,
  }),
  data: componentData,
});
const withTableManager = <P extends WithTableManagerProps> (Component:CT<P>) => (props:P) => {
  const { componentData, setComponentData } = props;
  const tableFunc:TableFuncs = tableMangerFunc({ componentData, setComponentData });
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
const useMenuOptionsBody = () => useMenuOptionsTable({
  addFunc: useTableManagerContext().addRow,
  deleteFunc: useTableManagerContext().deleteRow,
  moveFunc: useTableManagerContext().moveRow,
  group: 'row',
  groupLabel: 'Row',
  index: useTableRowContext().index,
  deleteIsDisabled: useTableContext().rows.length === 1,
  moveIsDisabled: useTableContext().rows.length === useTableRowContext().index + 1,
});
const useMenuOptionsHead = () => useMenuOptionsTable({
  addFunc: useTableManagerContext().addHeadRow,
  deleteFunc: useTableManagerContext().deleteHeadRow,
  moveFunc: useTableManagerContext().moveHeadRow,
  group: 'head_row',
  groupLabel: 'Header Row',
  index: useTableRowContext().index,
  moveIsDisabled: useTableContext().headRows.length === useTableRowContext().index + 1,
});

const useMenuOptionsFoot = () => useMenuOptionsTable({
  addFunc: useTableManagerContext().addFootRow,
  deleteFunc: useTableManagerContext().deleteFootRow,
  moveFunc: useTableManagerContext().moveFootRow,
  group: 'head_row',
  groupLabel: 'Footer Row',
  index: useTableRowContext().index,
  moveIsDisabled: useTableContext().footRows.length === useTableRowContext().index + 1,
});
const useMenuOptionsColumns = () => useMenuOptionsTable({
  addFunc: useTableManagerContext().addColumn,
  deleteFunc: useTableManagerContext().deleteColumn,
  moveFunc: useTableManagerContext().moveColumn,
  group: 'column',
  groupLabel: 'Column',
  index: useTableColumnContext().index,
  deleteIsDisabled: useTableContext().columns.length === 1,
  moveIsDisabled: useTableContext().columns.length === useTableColumnContext().index + 1,
  moveIcon: 'keyboard_arrow_right',
});
const useMenuOptionsTableOverview = () => {
  const { addHeadRow, addFootRow } = useTableManagerContext();
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
      isHidden: useTableContext().headRows.length > 0,
      handler: () => addHeadRow(0, v1()),
    },
    {
      name: 'add_footer',
      icon: 'add',
      group: 'table',
      local: true,
      global: false,
      label: 'Footer',
      isHidden: useTableContext().footRows.length > 0,
      handler: () => addFootRow(0, v1()),
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
      withNodeKey(() => useTableRowContext().name),
    ),
    Cell: flow(
      withLocalContextMenu,
      withContextActivator('onClick'),
      withMenuOptions({ useMenuOptions: useMenuOptionsColumns, name: 'TableColumn' }),
      flowIf(useIsInBody)(
        withMenuOptions({ useMenuOptions: useMenuOptionsBody, name: 'TableRow' }) as HOC,
      ),
      flowIf(useIsInHead)(
        withMenuOptions({ useMenuOptions: useMenuOptionsHead, name: 'TableRowHead' }) as HOC,
      ),
      flowIf(useIsInFoot)(
        withMenuOptions({ useMenuOptions: useMenuOptionsFoot, name: 'TableRowFoot' }) as HOC,
      ),
      withNode,
      withNodeKey(() => useTableColumnContext().name),
    ),
  }),
);

export default asBodilessTable;
export {
  tableMangerFunc,
};
