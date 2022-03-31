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

import { asTokenGroup } from '../../../../util';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Color'],
  },
};

export default asTokenGroup(meta)({
  BgPrimaryBrand: 'bg-cx-primary-brand',
  TextPrimaryBrand: 'text-cx-primary-brand',
  BgPrimaryCard: 'bg-cx-primary-card-bg',
  BgPrimaryPage: 'bg-cx-primary-page-bg',
  BgPrimaryInteractive: 'bg-cx-primary-interactive',
  TextPrimaryInteractive: 'text-cx-primary-interactive hover:opacity-70 active:text-cx-primary-interactive-active',
  WithTextPrimaryInteractiveDisabled: 'text-opacity-60',
  BgPrimaryDivider: 'bg-cx-primary-divider',
  TextPrimaryDivider: 'text-cx-primary-divider',
  TextPrimaryBodyCopy: 'text-cx-primary-body-copy',
  TextPrimaryHeaderCopy: 'text-cx-primary-header-copy',
  BgSecondaryFooter: 'bg-cx-secondary-footer-bg',
  TextSecondaryEyebrow: 'text-cx-secondary-eyebrow',
});
