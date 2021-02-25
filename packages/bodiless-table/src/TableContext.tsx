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

import React, { useContext } from 'react';
import { Section, TableBaseProps } from './types';

const TableContext = React.createContext({
  columns: [] as string[],
  rows: [] as string[],
  headRows: [] as string[],
  footRows: [] as string[],
} as TableBaseProps);

type TableRowContextValue = {
  index: number,
  name: string,
};
type TableColumnContextValue = {
  index: number,
  name: string,
};
const TableSectionContext = React.createContext(Section.body as Section);
const TableRowContext = React.createContext({
  index: 0,
  name: '',
} as TableRowContextValue);
const TableColumnContext = React.createContext({
  index: 0,
  name: '',
} as TableColumnContextValue);

const useTableSectionContext = () => useContext(TableSectionContext);
const useTableRowContext = () => useContext(TableRowContext);
const useTableColumnContext = () => useContext(TableColumnContext);
const useTableContext = () => useContext(TableContext);
export default TableContext;
export {
  TableSectionContext,
  TableRowContext,
  TableColumnContext,
  useTableSectionContext,
  useTableRowContext,
  useTableColumnContext,
  useTableContext,
};
