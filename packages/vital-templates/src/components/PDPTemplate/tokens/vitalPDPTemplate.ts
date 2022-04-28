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

/*
import { withPrependChild } from '@bodiless/core';
import { vitalHelmet, HelmetClean, asHelmetToken} from '@bodiless/vital-layout';
import { on } from '@bodiless/fclasses';
import { as, replaceWith, flowHoc } from '@bodiless/fclasses';
import { DefaultPageGA4DataLayerHelmet, GA4DataLayerProductItemHelmet } from '@bodiless/ga4';
*/
import { replaceWith } from '@bodiless/fclasses';
import { GA4DataLayerProductItemHelmet } from '@bodiless/ga4';
import { asPDPTemplateToken } from '../PDPTemplateClean';
import { vitalGenericTemplate } from '../../GenericTemplate';

const Default = asPDPTemplateToken({
  ...vitalGenericTemplate.Default,
  Components: {
    ...vitalGenericTemplate.Default.Components,
    GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
  },
});

export default {
  Default,
};
