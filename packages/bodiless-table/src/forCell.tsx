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

import {
  useTableContext,
  useTableColumnContext,
  useTableRowContext,
  useTableSectionContext,
} from './TableContext';
import {
  Section,
} from './types';

const useIsEvenRow = () => useTableRowContext().index % 2 === 1;
const useIsOddRow = () => useTableRowContext().index % 2 === 0;
const useIsFirstRow = () => useTableRowContext().index === 0;
const useIsLastRow = () => (
  useTableRowContext().index === (useTableContext().rows.length - 1)
);
const useIsEvenColumn = () => useTableColumnContext().index % 2 === 1;
const useIsOddColumnn = () => useTableColumnContext().index % 2 === 0;
const useIsFirstColumn = () => useTableColumnContext().index === 0;
const useIsLastColumn = () => (
  useTableColumnContext().index === (useTableContext().columns.length - 1)
);
const useIsInBody = () => useTableSectionContext() === Section.body;
const useIsInHead = () => useTableSectionContext() === Section.head;
const useIsInFoot = () => useTableSectionContext() === Section.foot;
export {
  useIsEvenRow,
  useIsOddRow,
  useIsFirstColumn,
  useIsFirstRow,
  useIsLastColumn,
  useIsLastRow,
  useIsOddColumnn,
  useIsInBody,
  useIsEvenColumn,
  useIsInHead,
  useIsInFoot,
};
