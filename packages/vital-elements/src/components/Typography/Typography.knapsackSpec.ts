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

import { KnapsackDemoTextClean } from '../KnapsackDemoElement';
import vitalTypography from './tokens';
import vitalTypographyV2 from './tokens/vitalTypographyV2';

import type { VitalDesignSpec } from '../../util';

export const knapsackTypographySpec: VitalDesignSpec = {
  tokens: vitalTypography as any,
  tokensExportName: 'vitalTypography',
  component: KnapsackDemoTextClean,
  componentExportName: 'ElementClean',
  slots: {},
};

export const knapsackVitalTypographySpec: VitalDesignSpec = {
  tokens: vitalTypographyV2 as any,
  tokensExportName: 'vitalTypographyV2',
  component: KnapsackDemoTextClean,
  componentExportName: 'ElementClean',
  slots: {},
};
