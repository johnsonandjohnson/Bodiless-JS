/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { FC } from 'react';
import { withoutHydrationInline } from '@bodiless/hydration';
import {
  Fragment, designable,
} from '@bodiless/fclasses';
import {
  CleanTable,
} from '@bodiless/table';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { TableComponents, TableBaseProps } from './types';

const tableComponents: TableComponents = {
  Wrapper: Fragment,
  Table: CleanTable,
};

const TableBase: FC<TableBaseProps> = ({ components: C, children, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Table />
  </C.Wrapper>
);

const asTableToken = asVitalTokenSpec<TableComponents>();

const TableClean = designable(tableComponents, 'Table')(TableBase);
const TableStatic = withoutHydrationInline()(TableClean);

export default TableClean;
export { asTableToken, TableStatic };
