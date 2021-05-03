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
  flowIf,
  withDesign,
  HOC,
  asToken,
} from '@bodiless/fclasses';
import { flatten } from 'lodash';
import React from 'react';
import {
  useTableColumnContext,
  useTableRowContext,
  useTableSectionContext,
} from './TableContext';
import { Section } from './types';

const withInnerText = (text: string): HOC => Component => {
  const WithInnerText = (props: any) => (
    <Component {...props}>{text}</Component>
  );
  return WithInnerText;
};

const withCols = (...columns:string[]): HOC => Component => {
  const WithCols = (props: any) => (
    <Component columns={columns} {...props} />
  );
  return WithCols;
};

const withRows = (...rows:string[]): HOC => Component => {
  const WithRows = (props: any) => (
    <Component rows={rows} {...props} />
  );
  return WithRows;
};

const withHeadRows = (...rows:string[]): HOC => Component => {
  const WithHeadRows = (props: any) => (
    <Component headRows={rows} {...props} />
  );
  return WithHeadRows;
};

type TableContentRow = string[];
type TableContent = TableContentRow[];
type WithContentProps = {
  body: TableContent,
  head: TableContent,
};
const forCell = (section:Section, rowIndex:number, columnIndex:number) => () => (
  useTableSectionContext() === section
  && useTableRowContext().index === rowIndex
  && useTableColumnContext().index === columnIndex
);
const withContent = (props:WithContentProps) => {
  const { body, head } = props;
  const headHocs = head.map((row, rowIndex) => (
    row.map((cell, columnIndex) => (
      flowIf(forCell(Section.head, rowIndex, columnIndex))(withInnerText(cell))
    ))
  ));
  const bodyHocs = body.map((row, rowIndex) => (
    row.map((cell, columnIndex) => (
      flowIf(forCell(Section.body, rowIndex, columnIndex))(withInnerText(cell))
    ))
  ));
  const columns = head[0] || body[0] || [];
  const tableHocs = [
    withCols(...columns.map((t, i) => i.toString())),
    withRows(...body.map((t, i) => i.toString())),
    withHeadRows(...head.map((t, i) => i.toString())),
  ];
  return asToken(...tableHocs, withDesign({
    Cell: asToken(...flatten([...headHocs, ...bodyHocs])),
  }));
};

export default withContent;
