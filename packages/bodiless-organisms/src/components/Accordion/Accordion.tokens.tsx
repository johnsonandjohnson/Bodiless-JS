/**
 * Copyright © 2020 Johnson & Johnson
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
import {
  addClasses,
  withoutProps,
  addProps,
  addClassesIf,
} from '@bodiless/fclasses';
import { ifEditable, withContextActivator } from '@bodiless/core';
import { isAccordionExpanded, isAccordionContracted } from './AccordionContext';

const withDisableExpandOnClick = flow(
  ifEditable(withContextActivator('onClick')),
);

const asAccordionIcon = flow(
  withoutProps(['isExpanded']),
  addClasses('material-icons cursor-pointer right-0'),
  addProps({ 'data-accordion-element': 'accordion-icon' }),
);

const asAccordionTitleWrapper = flow(
  addClasses('flex items-center justify-between relative'),
);

const asAccordionLabel = flow(
  addClasses('w-full'),
);

const asAccordionBodyWrapper = flow(
  withoutProps(['isExpanded']),
  addClassesIf(isAccordionExpanded)('block'),
  addClassesIf(isAccordionContracted)('hidden'),
);

const asAccordionBodyContent = flow(
  addClasses('truncate'),
);

export {
  asAccordionIcon,
  asAccordionTitleWrapper,
  asAccordionLabel,
  asAccordionBodyWrapper,
  asAccordionBodyContent,
  withDisableExpandOnClick,
};
