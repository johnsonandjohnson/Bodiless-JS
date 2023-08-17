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
import { Span } from '@bodiless/fclasses';
import type { TokenDemoSpec } from '@bodiless/tokens';
// @todo: All V 2.0 tokens are exported as part of vitalTypography, once removed switch import.
// import vitalTypography from './tokens';
import vitalTypography from './tokens/vitalTypographyV2';
import vitalTypographyBase from './tokens/vitalTypography';

const vitalTypographySpec: TokenDemoSpec = {
  title: 'Elements/Typography',
  component: Span,
  tokens: vitalTypography,
  defaultTokens: ['WithDemoContent'],
  componentExportName: 'Span',
  tokensExportName: 'vitalTypography',
};

export { vitalTypographyBase, vitalTypographySpec };
export { default as vitalTypography } from './tokens';
export { TypographyMeta } from './meta';
// export { knapsackTypographySpec, knapsackVitalTypographySpec } from './Typography.knapsackSpec';
