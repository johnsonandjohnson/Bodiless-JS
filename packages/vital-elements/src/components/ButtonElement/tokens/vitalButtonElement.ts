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

import { vitalTypography } from '../../Typography';
import { asTokenGroup } from '../../../util';
import generatedTokens, { meta } from '../../../generated/vitalButtonElement';

const manualTokensandOverrides = asTokenGroup(meta)({
  BorderPaddingButton: 'px-24px py-16px',
  BorderWidthButton: 'border-solid border-1px',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button focus:outline-none active:drop-shadow-none',
  BorderShadowButtonFocus: 'focus:shadow-button focus:outline-none active:shadow-none',
  TextButtonDefault: vitalTypography.BodyBold,
});

export default {
  ...generatedTokens,
  ...manualTokensandOverrides,
};
