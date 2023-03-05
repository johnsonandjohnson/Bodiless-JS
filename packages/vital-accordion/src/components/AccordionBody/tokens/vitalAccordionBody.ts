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

import { withPlaceholder } from '@bodiless/components';
import { withNodeKey } from '@bodiless/core';
import { as, flowIf, on } from '@bodiless/fclasses';
import { asSchemaSource } from '@bodiless/schema-org';
import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { useIsAccordionContracted, useIsAccordionExpanded } from '../../Accordion';
import { asAccordionBodyToken } from '../AccordionBodyClean';

const Default = asAccordionBodyToken({
  Core: {
    Wrapper: as(
      flowIf(useIsAccordionExpanded)(as('block')),
      flowIf(useIsAccordionContracted)(as('hidden')),
    ),
  },
  Editors: {
    Content: on(RichTextClean)(vitalRichText.Default),
  },
  Content: {
    Content: withPlaceholder('Accordion Content'),
  },
  Schema: {
    Content: withNodeKey('body'),
  },
  Spacing: {
    Wrapper: 'p-2',
  },
});

const WithFAQSchema = asAccordionBodyToken({
  SEO: {
    Content: asSchemaSource('faq-answer'),
  }
});

export default {
  Default,
  WithFAQSchema,
};
