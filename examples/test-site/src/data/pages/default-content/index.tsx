/**
 * Copyright © 2020 Johnson & Johnson
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
// ToDo: remove this page
import React from 'react';
import { graphql } from 'gatsby';
import { flow } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { withTitle, withDesc, withTerm, withFacet, HOC } from '@bodiless/layouts';
import { Tout, } from '@bodiless/organisms';
import { FlexboxGrid } from '@bodiless/layouts-ui';
import {
  varyDesign,
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { asFlexboxWithMargins } from '../../../components/Flexbox/token';
import { 
  asToutHorizontal,
  asToutVertical,
  asToutDefaultStyle,
} from '../../../components/Tout/token';
import Layout from '../../../components/Layout';
import { withType } from '../../../components/Flexbox/Categories';
import { WantToLearnMore, GivingBackToCommunity } from '../../../components/Contentful/Tout';

const contentfulToutsBaseVariation = {
  GivingBackToCommunity: flow(
    replaceWith(GivingBackToCommunity),
    asToutDefaultStyle,
    withTitle('Giving Back To Community'),
    withDesc('Giving Back To Community'),
    withType('Contentful')(),
    withType('Tout')(),
  ),
  WantToLearnMore: flow(
    replaceWith(WantToLearnMore),
    asToutDefaultStyle,
    withTitle('Giving Back To Community'),
    withDesc('Want to learn more?'),
    withType('Contentful')(),
    withType('Tout')(),
  ),
};

const withOrientationFacet = withFacet('Tout Orientation');

// Lets make Tout version that are Vertical and vary the fields that are used
const orientationVariations = varyDesign(
  {
    Vertical: withOrientationFacet('Vertical')(asToutVertical as HOC),
    Horizontal: withOrientationFacet('Horizontal')(asToutHorizontal as HOC),
  }
);

const withContentfulToutVariations = withDesign(varyDesign(
  contentfulToutsBaseVariation,
  orientationVariations,
)());

const withTouts = withDesign({
  Tout1: flow(replaceWith(Tout), asToutHorizontal, withTitle('Tout1'), withTerm('Type')('Tout')),
  Tout2: flow(replaceWith(Tout), asToutVertical, withTitle('Tout2'), withTerm('Type')('Tout')),
});

const FlexBox = flow(
  //withContentfulItems,
  withContentfulToutVariations,
  withTouts,
  asFlexboxWithMargins,
)(FlexboxGrid);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Componens with Default Content Demo</h1>
      <div className="ml-10">
        <p className="py-3">
          This page demonstrates how to use components with default content
        </p>
      </div>
      <div className="ml-10">
        <h2>Experiments with flexbox</h2>
        <FlexBox nodeKey="testFlexBox" />
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
