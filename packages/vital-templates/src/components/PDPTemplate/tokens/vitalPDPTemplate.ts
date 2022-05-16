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

import { replaceWith } from '@bodiless/fclasses';
import { GA4DataLayerProductItemHelmet } from '@bodiless/ga4';
import { vitalImage } from '@bodiless/vital-image';
import { asPDPTemplateToken } from '../PDPTemplateClean';
import { vitalGenericTemplate } from '../../GenericTemplate';

const Default = asPDPTemplateToken(vitalGenericTemplate.Default, {
  Components: {
    TopContent: replaceWith(() => null),
    GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
    ProductImage: vitalImage.Default,
  },
  Layout: {
    ContentWrapper: 'flex',
    ProductImageWrapper: 'w-full lg:w-1/2',
    ProductInfoWrapper: 'w-full lg:w-1/2',
  },
  Spacing: {
    ContentWrapper: 'space-x-4 mb-4',
  },
});

export default {
  Default,
};
