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
  MobileProductCarouselWrapper: ComponentOrTag<any>,
  MobileProductCarousel: ComponentOrTag<any>,
  ProductCarouselWrapper: ComponentOrTag<any>,
  ProductCarousel: ComponentOrTag<any>,
  ProductDetailWrapper: ComponentOrTag<any>,
  ProductDescriptionWrapper: ComponentOrTag<any>,
  ProductDescription: ComponentOrTag<any>,
  ProductTitleWrapper: ComponentOrTag<any>,
  ProductTitle: ComponentOrTag<any>,
  ProductRatingsWrapper: ComponentOrTag<any>,
  ProductRatings: ComponentOrTag<any>,
  ProductWTBButtonWrapper: ComponentOrTag<any>,
  ProductWTBButton: ComponentOrTag<any>,
  ProductEyebrowWrapper: ComponentOrTag<any>,
  ProductEyebrow: ComponentOrTag<any>,
  ProductMoreInfo: ComponentOrTag<any>,
  BottomWrapper: ComponentOrTag<any>,
  JumpLinksWrapper: ComponentOrTag<any>,
  JumpLinks: ComponentOrTag<any>,
  MoreToKnowSection: ComponentOrTag<any>,
  FAQSection: ComponentOrTag<any>,
  BottomContent: ComponentOrTag<any>,
};

export type BasePDPTemplateProps = DesignableComponentsProps<PDPTemplateComponents>;

export type ContentfulFile = {
  url: string,
  fileName: string,
  contentType: string,
  details: {
    size: number,
    image: {
      width: number,
      height: number
    }
  },
};

export type ContentfulDocument = {
  data: Record<string, any>,
  content: ContentfulTextNode[] | ContentfulDocument[],
  nodeType: string,
};

// @todo: Add more specific types
export interface ContentfulTextNode {
  data: Record<string, any>,
  marks: any[],
  value: string,
  nodeType: 'text',
}

export type ContentfulHyperlinkNode = {
  data: {
    uri: string,
  },
  content: ContentfulTextNode[],
  nodeType: 'hyperlink',
};

export type ContentfulImage = {
  title: string,
  description: string,
  file: ContentfulFile,
  url: string,
};

export type CotentfulProductIngredient = {
  title: string,
  inactive_active: 'Active' | 'Inactive',
};

export type ContentfulFAQ = {
  question: any,
  answer: ContentfulDocument,
};

/**
 * Type of a Contentful Product that is used to render on the PDP Template.
 */
export interface ContentfulProduct {
  contentful_id: string,
  revision_id: number,
  name: string,
  images: ContentfulImage[],
  summary: ContentfulTextNode[],
  directions: ContentfulTextNode[][],
  warnings: ContentfulTextNode[][],
  additional_info: ContentfulTextNode[][],
  ingredients: CotentfulProductIngredient[],
  faq: ContentfulFAQ[],
}
