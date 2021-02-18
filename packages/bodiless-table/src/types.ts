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

import { DesignableComponentsProps, StylableProps } from '@bodiless/fclasses';
import { ComponentType, HTMLProps } from 'react';

enum Section {
  head = 'head',
  body = 'body',
  foot = 'foot',
}

type RowProps = StylableProps & {
  row:string,
  section: Section,
  rowIndex: number,
  tableData: TableBaseProps,
};
type CellProps = StylableProps & RowProps & {
  column:string,
  columnIndex:number
};

type TableComponents = {
  Wrapper: ComponentType<StylableProps>,
  TBody: ComponentType<StylableProps>,
  THead: ComponentType<StylableProps>,
  TFoot: ComponentType<StylableProps>,
  Row: ComponentType<RowProps>,
  Cell: ComponentType<CellProps>,
};

type TableBaseProps = {
  columns: string[],
  headRows: string[],
  footRows: string[],
  rows: string[],
};
type TableProps = TableBaseProps
& DesignableComponentsProps<TableComponents> & HTMLProps<HTMLElement>;

type TableSectionProps = {
  Wrapper: ComponentType<StylableProps>,
  Row: ComponentType<RowProps>,
  Cell: ComponentType<CellProps>,
  section: Section,
  columns: string[],
  rows: string[],
  tableData: TableBaseProps,
};
type AddFunc = (current:number, newItem:string) => void;
type MoveFunc = (current:number) => void;
type DeleteFunc = (current:number) => void;
type TableFuncs = {
  addColumn:AddFunc,
  deleteColumn:DeleteFunc,
  moveColumn:MoveFunc,
  addRow:AddFunc,
  deleteRow:DeleteFunc,
  moveRow:MoveFunc,
  addHeadRow:AddFunc,
  deleteHeadRow:DeleteFunc,
  moveHeadRow:MoveFunc,
  addFootRow:AddFunc,
  deleteFootRow:DeleteFunc,
  moveFootRow:MoveFunc,
  data: TableBaseProps,
};
export {
  Section,
  RowProps,
  CellProps,
  TableProps,
  TableSectionProps,
  TableComponents,
  TableBaseProps,
  TableFuncs,
  AddFunc,
  DeleteFunc,
  MoveFunc,
};
