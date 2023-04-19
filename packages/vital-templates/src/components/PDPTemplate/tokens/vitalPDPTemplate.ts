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

import { as, replaceWith } from '@bodiless/fclasses';
import { GA4DataLayerProductItemHelmet } from '@bodiless/ga4';
import { vitalImage } from '@bodiless/vital-image';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { withNodeKey } from '@bodiless/core';
import { asSchemaSource, WithProductSchema } from '@bodiless/schema-org';
import { vitalEditorPlain } from '@bodiless/vital-editors';
import { vitalTypography } from '@bodiless/vital-elements';
import omit from 'lodash/omit';
import { asPDPTemplateToken } from '../PDPTemplateClean';
import { vitalGenericTemplate } from '../../GenericTemplate';
import { TemplateNodeKeys } from '../../TemplatesNodeKeys';

const Default = asPDPTemplateToken(vitalGenericTemplate.Default, {
  Meta: {
    title: 'Product Detail Listing',
  },
  Components: {
    TopContent: replaceWith(() => null),
    GA4Helmet: replaceWith(GA4DataLayerProductItemHelmet),
    // https://github.com/johnsonandjohnson/Bodiless-JS/issues/1802
    // Gatsby images doesn't work to be source for asSchemaSource('product-image'),
    ProductImage: vitalImage.Plain,
    ProductDescription: vitalFlowContainer.Default,
    ProductTitle: vitalEditorPlain.Default,
    ProductEyebrow: vitalEditorPlain.Default,
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
    ProductTitleWrapper: omit(vitalTypography.H1, 'Spacing'),
    ProductEyebrowWrapper: omit(vitalTypography.Eyebrow, 'Spacing'),
  },
  Schema: {
    ProductImage: withNodeKey(TemplateNodeKeys.Image),
    ProductDescription: withNodeKey(TemplateNodeKeys.Description),
    ProductTitle: withNodeKey(TemplateNodeKeys.Title),
    ProductEyebrow: withNodeKey(TemplateNodeKeys.Eyebrow),
  },
  SEO: {
    ContentWrapper: WithProductSchema,
    ProductImage: asSchemaSource('product-image'),
    ProductTitleWrapper: asSchemaSource('product-name'),
    ProductDescriptionWrapper: asSchemaSource('product-description'),
  },
});

export default {
  Default,
};
