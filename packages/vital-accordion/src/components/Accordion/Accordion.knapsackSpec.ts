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
import type { VitalDesignSpec } from '@bodiless/vital-elements';

import AccordionClean, { AccordionComponentsStart } from './AccordionClean';
import vitalAccordion from './tokens';
import { AccordionComponents } from './types';

// @TODO: Move to "@bodiless/vital-elements", and rename it to something like `toVitalSlotsSpec`
export const toKnapsackSlots = (obj: Record<string, any>, baseComponentName: string = '', allowedPatternIds: string[] = []) => Object.entries(obj).reduce(
  (obj, [k]) => Object.assign(obj, {
    [k]: {
      title: `${baseComponentName}${k.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1')}`,
      description: `${baseComponentName}${k.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1')} Component.`,
      /**
       * @TODO: How do we use different `PatternIds` for different Components?
       */
      allowedPatternIds,
    }
  }), {}
);

export const knapsackAccordionSpec: VitalDesignSpec<AccordionComponents> = {
  tokens: vitalAccordion,
  tokensExportName: 'vitalAccordion',
  component: AccordionClean,
  componentExportName: 'AccordionClean',
  slots: toKnapsackSlots(
    AccordionComponentsStart,
    'Accordion',
    /**
     * @TODO: Is there a way to have these refer to the component name, or something in the spec
     * (the compnentExportName?) and then have KS find the allowed patterns by
     * finding any patterns which refer to those components?
     */
    ['font-size', 'text-decoration', 'typography', 'color']
  ),
};
