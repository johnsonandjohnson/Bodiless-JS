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

import identity from 'lodash/identity';
import { asFluidToken } from '@bodiless/vital-elements';
import { on, varyDesigns, flowHoc } from '@bodiless/fclasses';
import { AccordionClean, vitalAccordion, asAccordionToken } from '../../Accordion';

const BaseVariation = {
  Accordion: on(AccordionClean)(vitalAccordion.Default, vitalAccordion.WithFlowContainerPreview),
};

const AccordionVariations = {
  _: identity,
  FAQSchema: vitalAccordion.WithFAQ,
};

const BehaviorVariations = {
  Collapsed: asAccordionToken({
    Meta: flowHoc.meta.term('Behavior')('Collapsed on Open'),
  }),
  Expanded: vitalAccordion.WithInitiallyExpanded,
};

/**
 * Token which adds Accordion variations to a flow container.
 */
const WithAccordionVariations = asFluidToken({
  Components: {
    ...varyDesigns(
      BaseVariation,
      AccordionVariations,
      BehaviorVariations,
    ),
  }
});

export default { WithAccordionVariations };
