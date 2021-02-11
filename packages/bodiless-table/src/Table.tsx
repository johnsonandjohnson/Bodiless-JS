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

import React, { FunctionComponent } from 'react';
import {
  designable,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
  withoutProps,
} from '@bodiless/fclasses';
import {
  CellProps,
  Section,
  TableProps,
  TableSectionProps,
  TableComponents,
} from './types';

const DefaultRow = withoutProps('row', 'section', 'rowIndex')(Tr);
const withoutCellProps = withoutProps(['row', 'column', 'section', 'rowIndex', 'columnIndex']);
const HeadCell = withoutCellProps(Th);
const BodyCell = withoutCellProps(Td);
const DefaultCell = (props:CellProps) => {
  const { section } = props;
  const Cell = section === Section.head ? HeadCell : BodyCell;
  return <Cell {...props} />;
};
const tablComponentsStart:TableComponents = {
  Wrapper: Table,
  TBody: Tbody,
  THead: Thead,
  TFoot: Tfoot,
  Row: DefaultRow,
  Cell: DefaultCell,
};
const TableSection = (props:TableSectionProps) => {
  const {
    Wrapper,
    Row,
    Cell,
    rows,
    section,
    columns,
    tableData,
  } = props;
  return (
    <Wrapper>
      {(rows || []).map((row, rowIndex) => (
        <Row key={row} {...{ row, rowIndex, section }}>
          {(columns || []).map((column, columnIndex) => (
            <Cell
              // We want to refresh this component when any of this change
              // eslint-disable-next-line react/no-array-index-key
              key={`${rowIndex}${columnIndex}${row}${column}`}
              {...{
                columnIndex,
                column,
                row,
                rowIndex,
                section,
                tableData,
              }}
            />
          ))}
        </Row>
      ))}
    </Wrapper>
  );
};

const TableBase:FunctionComponent<TableProps> = (props) => {
  const {
    columns,
    footRows,
    headRows,
    rows,
    components,
    ...rest
  } = props;
  const {
    Wrapper,
    TBody,
    THead,
    TFoot,
    Row,
    Cell,
  } = components;
  const tableData = {
    columns,
    rows,
    headRows,
    footRows,
  };
  return (
    <Wrapper {...rest}>
      <TableSection
        {...{
          Wrapper: THead,
          Row,
          Cell,
          section: Section.head,
          rows: headRows,
          columns,
          tableData,
        }}
      />
      <TableSection
        {...{
          Wrapper: TBody,
          Row,
          Cell,
          section: Section.body,
          rows,
          columns,
          tableData,
        }}
      />
      <TableSection
        {...{
          Wrapper: TFoot,
          Row,
          Cell,
          section: Section.foot,
          rows: footRows,
          columns,
          tableData,
        }}
      />
    </Wrapper>
  );
};
const CleanTable = designable(tablComponentsStart, 'Table')(TableBase);

export default CleanTable;
