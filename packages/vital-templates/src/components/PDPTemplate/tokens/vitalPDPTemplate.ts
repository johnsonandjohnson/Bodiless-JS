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

import { as, on, replaceWith } from '@bodiless/fclasses';
import { GA4DataLayerProductItemHelmet } from '@bodiless/ga4';
import { vitalImage } from '@bodiless/vital-image';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { withNodeKey } from '@bodiless/core';
import { asSchemaSource, WithProductSchema } from '@bodiless/schema-org';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalTypography } from '@bodiless/vital-elements';
import { asPDPTemplateToken } from '../PDPTemplateClean';
import { vitalGenericTemplate } from '../../GenericTemplate';
import { PDPNodeKeys } from './constants';

const Default = asPDPTemplateToken(vitalGenericTemplate.Default, {
  Components: {
    TopContent: replaceWith(() => null),
    GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
    ProductImage: vitalImage.Default,
    ProductDescription: as(vitalFlowContainer.Default),
    ProductTitle: on(EditorPlainClean)(vitalEditorPlain.Default),
    ProductEyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Layout: {
    ContentWrapper: 'flex flex-wrap',
    ProductImageWrapper: 'w-full lg:w-1/2',
    ProductDetailWrapper: as(
      'w-full lg:w-1/2 lg:grow', // fill all right column
      'lg:flex lg:flex-col lg:content-center lg:justify-center', // vertically center
    ),
  },
  Spacing: {
    ContentWrapper: 'mb-4',
    ProductImageWrapper: 'lg:pr-2',
    ProductDetailWrapper: 'lg:pl-2 pt-4 lg:pt-0',
  },
  Theme: {
    ProductTitleWrapper: vitalTypography.H1NoSpacing,
    ProductEyebrowWrapper: vitalTypography.EyebrowNoSpacing,
  },
  Schema: {
    ProductImage: withNodeKey(PDPNodeKeys.Image),
    ProductDescription: withNodeKey(PDPNodeKeys.Description),
    ProductTitle: withNodeKey(PDPNodeKeys.Title),
    ProductEyebrow: withNodeKey(PDPNodeKeys.Eyebrow),
  },
  SEO: {
    ProductImage: asSchemaSource('product-image'),
    ProductTitle: asSchemaSource('product-name'),
    ProductDescription: asSchemaSource('product-description'),
    PageWrapper: WithProductSchema,
  },
});

export default {
  Default,
};
