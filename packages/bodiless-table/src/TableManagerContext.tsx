/**
 * Copyright © 2021 Johnson & Johnson
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
import { TableFuncs } from './types';

const TableManagerContext = React.createContext({
  data: {
    columns: [] as string[],
    rows: [] as string[],
    headRows: [] as string[],
    footRows: [] as string[],
  },
  addColumn: () => undefined,
  deleteColumn: () => undefined,
  moveColumn: () => undefined,
  addRow: () => undefined,
  deleteRow: () => undefined,
  moveRow: () => undefined,
  addHeadRow: () => undefined,
  deleteHeadRow: () => undefined,
  moveHeadRow: () => undefined,
  addFootRow: () => undefined,
  deleteFootRow: () => undefined,
  moveFootRow: () => undefined,
} as TableFuncs);
TableManagerContext.displayName = 'TableManagerContext';

const useTableManagerContext = () => useContext(TableManagerContext);
export default TableManagerContext;
export { useTableManagerContext };
