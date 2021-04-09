/**
 * Copyright © 2021 Johnson & Johnson
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
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { flow } from 'lodash';
import { asBodilessImage } from '@bodiless/components-ui';
import { Img, withDesign, replaceWith } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import Card, { asTestableCard } from '../../../components/Card';
import {
  asCardVertical,
  asCardHorizontal,
  asCardNoBody,
  asCardNoTitle,
  asCardDefaultStyle,
  asCardOverlayTitle,
  asCardOverlayCta,
  asCardNoCta,
  asCardNoBodyNoTitle,
  asCardWithPaddings,
} from '../../../components/Card/token';

/**
 * hoc to disable gatsby image for a card
 */
const withDisabledGatsbyImage = flow(
  withDesign({
    Image: replaceWith(asBodilessImage('image')(Img)),
  }),
);

const CardHorizontal = flow(
  withDisabledGatsbyImage,
  // added because of we are doing replaceWith for Image
  // asTestableCard can be removed once gatsby image is enabled
  asTestableCard,
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardHorizontal,
)(Card);
const CardHorizontalNoTitle = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardHorizontal,
  asCardNoTitle,
)(Card);
const CardVertical = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
)(Card);
const CardVerticalNoTitle = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardNoTitle,
)(Card);
const CardVerticalNoTitleNoBody = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardNoBodyNoTitle,
)(Card);
const CardNoTitleNoBodyOverlayCta = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardNoBodyNoTitle,
  asCardOverlayCta,
)(Card);
const CardOverlayTitleNoBodyNoCta = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardOverlayTitle,
  asCardNoBody,
  asCardNoCta,
)(Card);

const CardOverlayTitleNoBodyOverlayCta = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardOverlayTitle,
  asCardNoBody,
  asCardOverlayCta,
)(Card);
const CardOverlayTitleNoBody = flow(
  asCardWithPaddings,
  asCardDefaultStyle,
  asCardVertical,
  asCardOverlayTitle,
  asCardNoBody,
)(Card);

export default props => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">Cards</h1>
      <div className="flex flex-wrap my-3">
        <div className="w-full">
          <CardHorizontal nodeKey="horizontal" id="card-horizontal" />
        </div>
        <div className="w-full">
          <CardHorizontalNoTitle nodeKey="horizontalNoTitle" id="card-horizontal-no-title" />
        </div>
        <div className="w-full">
          <CardNoTitleNoBodyOverlayCta nodeKey="noTitleNoBodyOverlayCta" id="card-no-title-no-body-overlay-cta" />
        </div>
        <div className="w-full">
          <CardOverlayTitleNoBodyNoCta nodeKey="overlayTitlenBodyNoCta" id="card-overlay-title-no-body-no-cta" />
        </div>
        <div className="w-full">
          <CardOverlayTitleNoBodyOverlayCta nodeKey="overlayTitleNoBodyOverlayCta" id="card-overlay-title-no-body-overlay-cta" />
        </div>
        <div className="w-full lg:w-1/3">
          <CardVerticalNoTitle nodeKey="verticalNoTitle" id="card-vertical-no-title" />
        </div>
        <div className="w-full lg:w-1/3">
          <CardVertical nodeKey="vertical" id="card-vertical" />
        </div>
        <div className="w-full lg:w-1/3">
          <CardVerticalNoTitleNoBody nodeKey="verticalNoTitleNoBody" id="card-vertical-no-title-no-body" />
        </div>
        <div className="w-full lg:w-1/3">
          <CardOverlayTitleNoBodyNoCta nodeKey="overlayTitleNoBodyNoCta2" id="card-overlay-title-no-body-no-cta-2" />
        </div>
        <div className="w-full lg:w-1/3">
          <CardOverlayTitleNoBody nodeKey="overlayTitleNoBody" id="card-overlay-title-no-body" />
        </div>
      </div>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
    ...DefaultContentQuery
  }
`;
