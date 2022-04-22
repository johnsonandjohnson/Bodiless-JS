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

import {
  asBodilessList, ListComponents, asStylableList, ListProps,
} from '@bodiless/components';

import {
  flowHoc,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { ComponentType } from 'react';
import { withoutHydration } from '@bodiless/hydration';

export type SubListComponents = {
  OuterWrapper: ComponentType<any>,
} & ListComponents;

const ListClean: ComponentType<ListProps> = flowHoc(
  asBodilessList(),
  asStylableList,
)('ul');

export default ListClean;
export const ListStatic: ComponentType<ListProps> = withoutHydration()(ListClean);
export const asListToken = asVitalTokenSpec<ListComponents>();
export const asSubListToken = asVitalTokenSpec<SubListComponents>();
