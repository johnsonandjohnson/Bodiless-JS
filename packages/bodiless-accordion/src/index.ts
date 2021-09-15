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

import AccordionClean from './components/Accordion';
import {
  useAccordionContext,
  isAccordionExpanded,
  isAccordionContracted,
} from './components/AccordionContext';
import { asAccordionTitle } from './components/AccordionTitle';
import { asAccordionBody } from './components/AccordionBody';
import asAccordionWrapper from './components/AccordionWrapper';
import asTestableAccordion from './components/asTestableAccordion';
import {
  withDisableExpandOnClick,
  asAccordionDefaultExpanded,
  asAccordionBorder,
  asAccordionFocus,
  asNonExpandingAccordion,
} from './components/Accordion.tokens';
import {
  asSingleAccordion,
  asTestableSingleAccordion,
} from './components/SingleAccordion';

export * from './components/types';

export {
  AccordionClean,
  useAccordionContext,
  isAccordionExpanded,
  isAccordionContracted,
  asAccordionTitle,
  asAccordionBody,
  asAccordionWrapper,
  asTestableAccordion,
  withDisableExpandOnClick,
  asAccordionDefaultExpanded,
  asAccordionBorder,
  asAccordionFocus,
  asNonExpandingAccordion,
  asSingleAccordion,
  asTestableSingleAccordion,
};
