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
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  varyDesign,
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';

import SingleAccordion from '../SingleAccordion';
import { withType } from './Categories';

const singleAccordionVariation = {
  SingleAccordionBasic: flow(
    replaceWith(SingleAccordion),
    withType('Accordion')(),
    withTitle('Single Accordion'),
    withDesc('Adds expand/contract affect to a single title/body item.\n'),
  ),
};

export default withDesign(varyDesign(
  singleAccordionVariation,
)());
