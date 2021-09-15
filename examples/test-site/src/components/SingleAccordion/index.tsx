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

import {
  asTestableAccordion,
  AccordionClean,
  withDisableExpandOnClick,
} from '@bodiless/accordion';
import { withNode } from '@bodiless/core';
import { withDesign, asToken } from '@bodiless/fclasses';
import {
  asSingleAccordionDefaultStyle,
  asAccordionTitleBordered,
  asAccordionBorderedOnFocus,
  asAccordionNonExpanding,
} from './token';
import { withEditorSimple, withEditorBasic } from '../Editors';

const asSingleAccordion = asToken(
  withNode,
  withDesign({
    Title: withDesign({
      Label: asToken(
        withEditorSimple('title', 'Accordion Title'),
        withDisableExpandOnClick,
      ),
    }),
    Body: withDesign({
      Content: withEditorBasic(
        'body',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet.',
      ),
    }),
  }),
  asSingleAccordionDefaultStyle,
  asTestableAccordion,
);

const asSingleAccordionTitleBordered = asToken(
  asSingleAccordion,
  asAccordionTitleBordered,
);

const asSingleAccordionBorderedOnFocus = asToken(
  asSingleAccordion,
  asAccordionBorderedOnFocus,
);

const asSingleAccordionNonExpanding = asToken(
  asSingleAccordion,
  asAccordionNonExpanding,
);

const SingleAccordion = asSingleAccordion(AccordionClean);
const SingleAccordionTitleBordered = asSingleAccordionTitleBordered(AccordionClean);
const SingleAccordionBorderedOnFocus = asSingleAccordionBorderedOnFocus(AccordionClean);
const SingleAccordionNonExpanding = asSingleAccordionNonExpanding(AccordionClean);

export {
  SingleAccordion,
  SingleAccordionTitleBordered,
  SingleAccordionBorderedOnFocus,
  SingleAccordionNonExpanding,
};
