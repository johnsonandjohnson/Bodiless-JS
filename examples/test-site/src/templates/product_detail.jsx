/**
 * Copyright © 2019 Johnson & Johnson
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
import Helmet from 'react-helmet';
import { flow, flowRight } from 'lodash';
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { BVRatingsSummary, BVReviews } from '@bodiless/bv';
import { withNode } from '@bodiless/core';
import {
  addProps,
  withDesign,
  replaceWith,
  removeClasses,
} from '@bodiless/fclasses';
import {
  SingleAccordionClean,
  asTestableAccordion,
} from '@bodiless/organisms';
import { withEvent, asBodilessHelmet } from '@bodiless/components';
import Layout from '../components/Layout';
import {
  ProductTitle,
  ProductImage,
  SectionMargin,
  SectionNegXMargin,
  ProductDetailImageWrapper,
  ProductDetailAccWrapper,
} from '../components/Product';
import { FlowContainerDefault } from '../components/FlowContainer';
import SocialShare from '../components/SocialShare';
import { withEditorBasic } from '../components/Editors';
import asSingleAccordionDefaultStyle from '../components/SingleAccordion/token';

// Do not allow editors to set accordion titles.
const NonEditableTitle = ({ producttitle, ...rest }) => (
  <h2 {...rest}>
    {producttitle}
  </h2>
);

const asTestableProductAccordion = label => flow(
  asTestableAccordion,
  withDesign({
    Wrapper: addProps({ 'aria-label': label }),
  }),
);

const asProductAccordion = title => flow(
  withNode,
  asSingleAccordionDefaultStyle,
  withDesign({
    Wrapper: removeClasses('p-1'),
    Title: replaceWith(props => <NonEditableTitle {...props} producttitle={title} />),
    Body: withEditorBasic(
      'body',
      'Enter Product Information',
    ),
  }),
  asTestableProductAccordion(title),
);

const ProductOverAcc = asProductAccordion('Overview')(SingleAccordionClean);
const ProductDirsAcc = asProductAccordion('Directions')(SingleAccordionClean);
const ProductHowAcc = asProductAccordion('How To Use')(SingleAccordionClean);
const ProductNutAcc = asProductAccordion('Nutrition')(SingleAccordionClean);
const ProductActIngAcc = asProductAccordion('Active Ingredients')(SingleAccordionClean);
const ProductInactIngAcc = asProductAccordion('Inactive Ingredients')(SingleAccordionClean);
const ProductStorAcc = asProductAccordion('Storage')(SingleAccordionClean);
const ProductWarnAcc = asProductAccordion('Warnings')(SingleAccordionClean);

const asTestableRatingsSummary = addProps({ 'data-product-element': 'ratings-summary' });
const ProductRatingsSummary = asTestableRatingsSummary(BVRatingsSummary);

const asTestableProductReviews = addProps({ 'data-product-element': 'reviews' });
const ProductReviews = asTestableProductReviews(BVReviews);

const asTestableFlowContainer = withDesign({
  Wrapper: addProps({ 'data-product-element': 'flow-container' }),
});
const ProductFlowContainer = asTestableFlowContainer(FlowContainerDefault);

const ExampleGTMHelmetEvent = flowRight(
  asBodilessHelmet('datalayer'),
  // On product pages, we may add product related datalayer info:
  withEvent('digitalData', { event: 'Product Viewed' }, 'product-viewed'),
)(Helmet);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <ExampleGTMHelmetEvent />
      <SectionMargin>
        <div className="flex flex-wrap md:items-end md:flex-row-reverse">
          <div className="w-full md:flex-1 md:flex-grow-0 md:flex-shrink-0 text-right">
            <SocialShare />
          </div>
          <div className="w-full md:flex-1">
            <ProductTitle />
          </div>
        </div>
      </SectionMargin>
      <SectionMargin>
        <ProductRatingsSummary />
      </SectionMargin>
      <SectionMargin>
        <div className="flex flex-wrap">
          <ProductDetailImageWrapper>
            <ProductImage />
          </ProductDetailImageWrapper>
          <ProductDetailAccWrapper>
            <ProductOverAcc expanded nodeKey="accordion-1" />
            <ProductDirsAcc nodeKey="accordion-2" />
            <ProductHowAcc nodeKey="accordion-3" />
            <ProductNutAcc nodeKey="accordion-4" />
            <ProductActIngAcc nodeKey="accordion-5" />
            <ProductInactIngAcc nodeKey="accordion-6" />
            <ProductStorAcc nodeKey="accordion-7" />
            <ProductWarnAcc nodeKey="accordion-8" />
          </ProductDetailAccWrapper>
        </div>
      </SectionMargin>
      <SectionMargin>
        <ProductReviews />
      </SectionMargin>
      <SectionNegXMargin>
        <ProductFlowContainer
          nodeKey="product_touts"
          maxComponents={3}
        />
      </SectionNegXMargin>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
