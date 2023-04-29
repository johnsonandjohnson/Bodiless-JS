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
import { withNodeKey } from '@bodiless/data';
import { as, on } from '@bodiless/fclasses';
import { asSchemaSource } from '@bodiless/schema-org';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalColor, vitalFontSize, vitalTextDecoration } from '@bodiless/vital-elements';
import { asAccordionTitleToken, withAccordionTitleHandler } from '../AccordionTitleClean';

const Base = asAccordionTitleToken({
  Components: {
    Label: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Label: withPlaceholder('Accordion Title'),
  },
  Schema: {
    Label: withNodeKey('title'),
  },
  Behavior: {
    Wrapper: withAccordionTitleHandler,
  },
});

const Default = asAccordionTitleToken(Base, {
  Theme: {
    Wrapper: as(
      vitalFontSize.XL,
      vitalTextDecoration.Medium,
      vitalColor.TextPrimaryHeaderCopy,
      'focus:outline',
    ),
  },
  Layout: {
    Wrapper: 'flex justify-between items-center',
  },
  Spacing: {
    Wrapper: 'p-2',
  }
});

const WithFAQSchema = asAccordionTitleToken({
  SEO: {
    Wrapper: asSchemaSource('faq-question'),
  }
});

export default {
  Base,
  Default,
  WithFAQSchema,
};
