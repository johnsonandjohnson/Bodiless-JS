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

import React, { ComponentType } from 'react';
// import { flow } from 'lodash';
import CleanTable from './Table';
import asBodilessTable from './asBodilessTable';
import forCells from './forCell';
// import { Section } from './types';

const withCols = <A extends Object> (...columns:string[]) => (
  (Component:ComponentType<A>) => (props:A) => (
    <Component columns={columns} {...props} />
  ));
const withRows = <A extends Object> (...rows:string[]) => (
  (Component:ComponentType<A>) => (props:A) => (
    <Component rows={rows} {...props} />
  ));
const withXRows = (x:number) => {
  const rows = (new Array(x)).fill('').map((t, i) => i.toString());
  return withRows(...rows);
};
const withHeadRows = <A extends Object> (...rows:string[]) => (
  (Component:ComponentType<A>) => (props:A) => (
    <Component headRows={rows} {...props} />
  ));
// type TableContentRow = string[];
// type TableContent = TableContentRow[];

// const withInnerText = <A extends object>(text:string) => (
//   (Component:ComponentType<A>) => (props:A) => (
//     <Component {...props}>{text}</Component>
//   )
// );
// type WithContentProps = {
//   body: TableContent,
//   head: TableContent,
// };
// const withContent = (props:WithContentProps) => {
//   const { body, head } = props;
//   const headHocs = head.map((row, rowIndex) => (
//     row.map((cell, columnIndex) => (
//       forCell(Section.head)(rowIndex)(columnIndex)(withInnerText(cell))
//     ))
//   ));
//   const bodyHocs = body.map((row, rowIndex) => (
//     row.map((cell, columnIndex) => (
//       forCell(Section.body)(rowIndex)(columnIndex)(withInnerText(cell))
//     ))
//   ));
//   const columns = head[0] || body[0] || [];
//   const tableHocs = [
//     withCols(...columns.map((t, i) => i.toString())),
//     withRows(...body.map((t, i) => i.toString())),
//     withHeadRows(...head.map((t, i) => i.toString())),
//   ];
//   return flow(...tableHocs, ...[...headHocs, ...bodyHocs]
//     .reduce((a, row) => [...a, ...row], []));
// };

export default asBodilessTable()(CleanTable);
export {
  withCols,
  withXRows,
  withHeadRows,
  asBodilessTable,
  forCells,
  CleanTable,
  // withContent,
};
