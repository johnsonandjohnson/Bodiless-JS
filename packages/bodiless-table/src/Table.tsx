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

import React, { ComponentType, FunctionComponent, HTMLProps } from 'react';
import {
  designable,
  StylableProps,
  Table,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from '@bodiless/fclasses';
import {
  Section,
  TableProps,
  TableSectionProps,
  TableComponents,
} from './types';
import TableContext, {
  TableColumnContext,
  TableRowContext,
  TableSectionContext,
  useTableSectionContext,
} from './TableContext';

const DefaultCell = (props:HTMLProps<StylableProps>) => {
  const section = useTableSectionContext();
  const Cell = section === Section.head
    ? Th as ComponentType<StylableProps>
    : Td as ComponentType<StylableProps>;
  return <Cell {...props} />;
};
const tablComponentsStart:TableComponents = {
  Wrapper: Table,
  TBody: Tbody,
  THead: Thead,
  TFoot: Tfoot,
  Row: Tr,
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
  } = props;
  return (
    <TableSectionContext.Provider value={section}>
      <Wrapper>
        {(rows || []).map((row, rowIndex) => (
          <TableRowContext.Provider value={{ name: row, index: rowIndex }}>
            <Row
              key={row}
            >
              {(columns || []).map((column, columnIndex) => (
                <TableColumnContext.Provider value={{ name: column, index: columnIndex }}>
                  <Cell
                    // We want to refresh this component when any of this change
                    // eslint-disable-next-line react/no-array-index-key
                    key={`${rowIndex}${columnIndex}${row}${column}`}

                  />
                </TableColumnContext.Provider>

              ))}
            </Row>
          </TableRowContext.Provider>
        ))}
      </Wrapper>
    </TableSectionContext.Provider>
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
  return (
    <TableContext.Provider value={{
      columns,
      rows,
      headRows,
      footRows,
    }}
    >
      <Wrapper {...rest}>
        <TableSection
          {...{
            Wrapper: THead,
            Row,
            Cell,
            section: Section.head,
            rows: headRows,
            columns,
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
          }}
        />
      </Wrapper>
    </TableContext.Provider>
  );
};
const CleanTable = designable(tablComponentsStart, 'Table')(TableBase);

export default CleanTable;
