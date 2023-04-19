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

import { withNode, withNodeKey } from '@bodiless/data';
import {
  addProps, as, flowHoc, replaceWith
} from '@bodiless/fclasses';
import { withFAQSchema } from '@bodiless/schema-org';
import { vitalColor } from '@bodiless/vital-elements';
import { ifComponentSelector } from '@bodiless/layouts';
import { vitalAccordionBody } from '../../AccordionBody';
import { vitalAccordionTitle } from '../../AccordionTitle';
import { asAccordionToken, AccordionBodyPreview } from '../AccordionClean';

const Base = asAccordionToken({
  Components: {
    Title: vitalAccordionTitle.Base,
    Body: vitalAccordionBody.Base,
  },
  Schema: {
    _: as(
      withNode,
      withNodeKey('accordion'),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Accordion'),
});

const Default = asAccordionToken(Base, {
  Components: {
    Title: vitalAccordionTitle.Default,
    Body: vitalAccordionBody.Default,
  },
  Theme: {
    Wrapper: vitalColor.BgPrimaryCard,
  },
});

const WithInitiallyExpanded = asAccordionToken({
  Behavior: {
    _: addProps({ expanded: true })
  },
  Meta: flowHoc.meta.term('Behavior')('Expanded on Open'),
});

const WithFAQSchema = asAccordionToken({
  SEO: {
    Wrapper: withFAQSchema,
    Title: vitalAccordionTitle.WithFAQSchema,
    Body: vitalAccordionBody.WithFAQSchema,
  },
  Meta: flowHoc.meta.term('Schema')('With FAQ Schema'),
});

const WithFlowContainerPreview = asAccordionToken({
  Flow: ifComponentSelector,
  Core: {
    Body: replaceWith(AccordionBodyPreview),
  },
});

export default {
  Base,
  Default,
  WithInitiallyExpanded,
  WithFAQSchema,
  WithFlowContainerPreview,
};
