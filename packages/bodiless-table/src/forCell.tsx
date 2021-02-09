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

import { HOC, withDesign } from '@bodiless/fclasses';
import React, { ComponentType } from 'react';
import {
  CellProps, Section, TableBaseProps,
} from './types';
import TableManagerContext from './TableManagerContext';

type IfCellIsProps = CellProps & {
  data: TableBaseProps,
};
type IfCellIs = (props:IfCellIsProps) => boolean;
type CellTransFormProps = {
  passed: CellProps,
  hoc: HOC,
  Component: ComponentType<CellProps>,
  func:IfCellIs,
};
class CellTransform extends React.Component<CellTransFormProps> {
  static contextType = TableManagerContext;

  fixedProps: CellProps;

  Component: ComponentType<CellProps>;

  constructor(props:CellTransFormProps) {
    super(props);
    const { hoc, func, Component, passed, ...rest } = props;
    const data = this.context;
    this.fixedProps = { ...passed, ...rest };
    this.Component = func({ ...passed, data }) ? hoc(Component) : Component;
  }

  render() {
    const Component = this.Component as ComponentType<CellProps>;
    return <Component {...this.fixedProps} />;
  }
}
const ifCellIs = (func:IfCellIs) => (hoc:HOC) => (
  (Component:ComponentType<CellProps>) => (props:CellProps) => (
    <CellTransform
      hoc={hoc}
      func={func}
      passed={props}
      Component={Component}
    />
  ));
const forCells = (func:IfCellIs) => (hoc:HOC) => withDesign({
  Cell: ifCellIs(func)(hoc),
});
const forCell = (sectionIn:Section) => (rowIndexIn:number) => (columnIndexIn:number) => (
  forCells(({ section, rowIndex, columnIndex }) => (
    section === sectionIn
    && rowIndex === rowIndexIn
    && columnIndex === columnIndexIn
  ))
);
export default forCells;
export {
  ifCellIs,
  forCell,
};
