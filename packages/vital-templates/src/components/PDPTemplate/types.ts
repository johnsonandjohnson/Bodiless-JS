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

import { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';

export type PDPTemplateComponents = {
  PageWrapper: ComponentOrTag<any>,
  GA4Helmet: ComponentOrTag<any>,
  BreadcrumbWrapper: ComponentOrTag<any>,
  Breadcrumb: ComponentOrTag<any>,
  TopWrapper: ComponentOrTag<any>,
  TopContent: ComponentOrTag<any>,
  ContentWrapper: ComponentOrTag<any>,
  ProductImageWrapper: ComponentOrTag<any>,
  ProductImage: ComponentOrTag<any>,
  ProductDetailWrapper: ComponentOrTag<any>,
  ProductDescriptionWrapper: ComponentOrTag<any>,
  ProductDescription: ComponentOrTag<any>,
  ProductTitleWrapper: ComponentOrTag<any>,
  ProductTitle: ComponentOrTag<any>,
  ProductEyebrowWrapper: ComponentOrTag<any>,
  ProductEyebrow: ComponentOrTag<any>,
  ProductMoreInfo: ComponentOrTag<any>,
  BottomWrapper: ComponentOrTag<any>,
  BottomContent: ComponentOrTag<any>,
};

export type BasePDPTemplateProps = DesignableComponentsProps<PDPTemplateComponents>;
