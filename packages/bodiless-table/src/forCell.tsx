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
  HOC,
  withDesign,
  ifTTT,
  IfThis,
} from '@bodiless/fclasses';
import {
  CellProps, Section, TableBaseProps,
} from './types';

const forCells = <A extends object> (func:IfThis<CellProps>) => (hoc:HOC) => withDesign({
  Cell: ifTTT(func)(hoc),
});
const forCell = (sectionIn:Section) => (rowIndexIn:number) => (columnIndexIn:number) => (
  forCells(({ section, rowIndex, columnIndex }: CellProps) => (
    section === sectionIn
    && rowIndex === rowIndexIn
    && columnIndex === columnIndexIn
  ))
);
const isEvenRow = (p:CellProps) => p.rowIndex % 2 === 1;
const isOddRow = (p:CellProps) => p.rowIndex % 2 === 0;
const isFirstRow = (p:CellProps) => p.rowIndex === 0;
const isLastRow = (p:CellProps & {tableData: TableBaseProps }) => (
  p.rowIndex === p.tableData.rows.length
);
const isEvenColumn = (p:CellProps) => p.columnIndex % 2 === 1;
const isOddColumn = (p:CellProps) => p.columnIndex % 2 === 0;
const isFirstColumn = (p:CellProps) => p.columnIndex === 0;
const isLastColumn = (p:CellProps & {tableData: TableBaseProps }) => (
  p.columnIndex === (p.tableData.columns.length - 1)
);
const isInBody = (p:CellProps) => p.section === Section.body;
const isInHead = (p:CellProps) => p.section === Section.head;
const isInFoot = (p:CellProps) => p.section === Section.foot;
export default forCells;
export {
  forCell,
  isEvenRow,
  isOddRow,
  isFirstColumn,
  isFirstRow,
  isLastColumn,
  isLastRow,
  isOddColumn,
  isInBody,
  isEvenColumn,
  isInHead,
  isInFoot,
};
