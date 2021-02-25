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
  withDesign,
  addClasses,
  addClassesIf,
  and,
  not,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import {
  asBodilessTable,
  CleanTable,
  useIsInBody,
  useIsFirstColumn,
  useIsEvenColumn,
} from '@bodiless/table';
import { withEditorFullFeatured } from '../Editors';

const asEditableTable = flow(
  asBodilessTable(),
  withDesign({
    Cell: withEditorFullFeatured('cell', ''),
  }),
);
const asDefaultTableStyle = flow(
  withDesign({
    Cell: flow(
      addClasses('min-w-1 py-1 px-5'),
      addClassesIf(and(useIsEvenColumn, useIsInBody))('bg-gray-100'),
    ),
    THead: flow(addClasses('bg-orange-700 text-white')),
    Wrapper: addClasses('border border-collapse rounded border-gray-200 w-full'),
  }),
);
const StandardTable = flow(
  asEditableTable,
  asDefaultTableStyle,
)(CleanTable);
const asTableFirstLeft = withDesign({
  Cell: flow(
    addClassesIf(useIsFirstColumn)('text-left'),
    addClassesIf(and(useIsInBody, useIsFirstColumn))('bg-orange-600 text-white'),
    addClassesIf(not(useIsFirstColumn))('text-center'),
  ),
});
const asTableCenterText = withDesign({
  Cell: addClassesIf(useIsInBody)('text-center'),
});
const asTableFirstExtraWidth = withDesign({
  Cell: flow(
    addClassesIf(useIsFirstColumn)('w-1/2'),
  ),
});
export {
  StandardTable,
  asTableFirstLeft,
  asTableFirstExtraWidth,
  asTableCenterText,
};
