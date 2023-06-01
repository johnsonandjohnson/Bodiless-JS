/**
 * Copyright © 2023 Johnson & Johnson
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

import ButtonClean, { buttonComponentsStart } from './ButtonClean';
import type { ButtonComponent } from './ButtonClean';
import vitalButtons from './tokens';

// @TODO: Move to a shared Knapsack package where `VitalDesignSpec` will be.
// Currently `@bodiless/knapsack-renderer` can't be used since it's build target is CommonJs
export const toKnapsackSlots = (obj: Record<string, any>, baseComponentName: string = '', allowedPatternIds: string[] = []) => Object.entries(obj).reduce(
  (obj, [k]) => Object.assign(obj, {
    [k]: {
      title: `${baseComponentName}${k.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1')}`,
      description: `${baseComponentName}${k.replace(/([A-Z][a-z])/g, ' $1').replace(/(\d)/g, ' $1')} Component.`,
      allowedPatternIds,
    }
  }), {}
);

export const knapsackButtonSpec: VitalDesignSpec<ButtonComponent> = {
  tokens: vitalButtons,
  tokensExportName: 'vitalButtons',
  component: ButtonClean,
  componentExportName: 'ButtonClean',
  slots: toKnapsackSlots(
    buttonComponentsStart,
    'Button',
    ['font-size', 'text-decoration', 'typography', 'color']
  ),
};
