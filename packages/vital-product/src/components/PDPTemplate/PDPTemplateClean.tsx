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

import React from 'react';
import {
  designable,
  Div,
  Img,
  Fragment,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { EditorPlainClean } from '@bodiless/vital-editors';
import { LayoutClean } from '@bodiless/vital-layout';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { BreadcrumbsClean } from '@bodiless/vital-navigation';
import { ButtonClean } from '@bodiless/vital-buttons';
import { SectionClean } from '@bodiless/vital-section';

import { JumpLinksClean } from '../JumpLinks';
import { PDPTemplateComponents, BasePDPTemplateProps } from './types';

const pdpTemplateComponents: PDPTemplateComponents = {
  PageWrapper: LayoutClean,
  GA4Helmet: Fragment,
  BreadcrumbWrapper: Div,
  Breadcrumb: BreadcrumbsClean,
  TopWrapper: Fragment,
  TopContent: Fragment,
  ContentWrapper: Div,
  ProductImageWrapper: Div,
  ProductImage: Img,
  ProductDetailWrapper: Div,
  ProductDescriptionWrapper: Div,
  ProductDescription: FlowContainerClean,
  ProductTitleWrapper: Div,
  ProductTitle: EditorPlainClean,
  ProductRatingsWrapper: Fragment,
  ProductRatings: Fragment,
  ProductWTBButtonWrapper: Fragment,
  ProductWTBButton: ButtonClean,
  ProductEyebrowWrapper: Div,
  ProductEyebrow: EditorPlainClean,
  ProductMoreInfo: Fragment,
  BottomWrapper: Div,
  JumpLinksWrapper: Div,
  JumpLinks: JumpLinksClean,
  MoreToKnowSection: SectionClean,
  FAQSection: SectionClean,
  BottomContent: FlowContainerClean,
};

const PDPTemplateBase = (props: BasePDPTemplateProps) => {
  const { components: C, ...rest } = props;
  return (
    <C.PageWrapper {...rest}>
      <C.GA4Helmet />
      <C.BreadcrumbWrapper>
        <C.Breadcrumb />
      </C.BreadcrumbWrapper>
      <C.TopWrapper>
        <C.TopContent />
      </C.TopWrapper>
      <C.ContentWrapper>
        <C.ProductImageWrapper>
          <C.ProductImage />
          <C.ProductMoreInfo />
        </C.ProductImageWrapper>
        <C.ProductDetailWrapper>
          <C.ProductEyebrowWrapper>
            <C.ProductEyebrow />
          </C.ProductEyebrowWrapper>
          <C.ProductTitleWrapper>
            <C.ProductTitle />
          </C.ProductTitleWrapper>
          <C.ProductRatingsWrapper>
            <C.ProductRatings />
          </C.ProductRatingsWrapper>
          <C.ProductWTBButtonWrapper>
            <C.ProductWTBButton />
          </C.ProductWTBButtonWrapper>
          <C.ProductDescriptionWrapper>
            <C.ProductDescription />
          </C.ProductDescriptionWrapper>
        </C.ProductDetailWrapper>
      </C.ContentWrapper>
      <C.BottomWrapper>
        <C.JumpLinksWrapper>
          <C.JumpLinks />
        </C.JumpLinksWrapper>
        <C.MoreToKnowSection />
        <C.FAQSection />
        <C.BottomContent />
      </C.BottomWrapper>
    </C.PageWrapper>
  );
};

const PDPTemplateClean = designable(pdpTemplateComponents, 'PDP Template')(PDPTemplateBase);

const asPDPTemplateToken = asVitalTokenSpec<PDPTemplateComponents>();

export { asPDPTemplateToken };

export default PDPTemplateClean;
