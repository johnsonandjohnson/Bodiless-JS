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

import { flow } from 'lodash';
import { withDesign, addClasses, addClassesIf } from '@bodiless/fclasses';
import { isAccordionExpanded, isAccordionContracted } from '@bodiless/organisms';
import {
  asHeader2,
  asBlockItem,
  asTextColorPrimary,
} from '../Elements.token';

const asSingleAccordionDefaultStyle = flow(
  withDesign({
    Wrapper: flow(asBlockItem, asTextColorPrimary),
    Title: withDesign({
      Wrapper: flow(
        addClassesIf(isAccordionExpanded)('bg-gray-400'),
        addClassesIf(isAccordionContracted)('bg-gray-200'),
        addClasses('p-3'),
        asHeader2,
      ),
    }),
    Body: withDesign({
      Wrapper: addClasses('p-3 border border-solid border-gray-200'),
    }),
  }),
);

export default asSingleAccordionDefaultStyle;
