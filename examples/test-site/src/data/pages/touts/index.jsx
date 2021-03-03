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
import { graphql } from 'gatsby';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import { flow } from 'lodash';
import { asBodilessImage } from '@bodiless/components-ui';
import { Img, withDesign, replaceWith } from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import Tout, { asTestableTout } from '../../../components/Tout';
import {
  asToutVertical,
  asToutHorizontal,
  asToutNoBody,
  asToutNoTitle,
  asToutDefaultStyle,
  asToutOverlayTitle,
  asToutOverlayCta,
  asToutNoCta,
  asToutNoBodyNoTitle,
  asToutWithPaddings,
} from '../../../components/Tout/token';

/**
 * hoc to disable gatsby image for a tout
 */
const withDisabledGatsbyImage = flow(
  withDesign({
    Image: replaceWith(asBodilessImage('image')(Img)),
  }),
);

/**
 * disable gatsby image for this tout so that to not break existing cypress tests for tout
 * we can enable it back once the cypress test is refactored
 * @todo refactor tout cypress test and enable gatsby image
 */
const ToutHorizontal = flow(
  withDisabledGatsbyImage,
  // added because of we are doing replaceWith for Image
  // asTestableTout can be removed once gatsby image is enabled
  asTestableTout,
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutHorizontal,
)(Tout);
const ToutHorizontalNoTitle = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutHorizontal,
  asToutNoTitle,
)(Tout);
const ToutVertical = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
)(Tout);
const ToutVerticalNoTitle = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutNoTitle,
)(Tout);
const ToutVerticalNoTitleNoBody = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutNoBodyNoTitle,
)(Tout);
const ToutNoTitleNoBodyOverlayCta = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutNoBodyNoTitle,
  asToutOverlayCta,
)(Tout);
const ToutOverlayTitleNoBodyNoCta = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutOverlayTitle,
  asToutNoBody,
  asToutNoCta,
)(Tout);

const ToutOverlaytTitleNoBodyOverlayCta = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutOverlayTitle,
  asToutNoBody,
  asToutOverlayCta,
)(Tout);
const ToutOverlaytTitleNoBody = flow(
  asToutWithPaddings,
  asToutDefaultStyle,
  asToutVertical,
  asToutOverlayTitle,
  asToutNoBody,
)(Tout);

export default props => (
  <Page {...props}>
    <Layout>
      <h1 className="text-3xl font-bold">touts</h1>
      <div className="flex flex-wrap my-3">
        <div className="w-full">
          <ToutHorizontal nodeKey="horizontal" id="tout-horizontal" />
        </div>
        <div className="w-full">
          <ToutHorizontalNoTitle nodeKey="horizontalNoTitle" id="tout-horizontal-no-title" />
        </div>
        <div className="w-full">
          <ToutNoTitleNoBodyOverlayCta nodeKey="noTitleNoBodyOverlayCta" id="tout-no-title-no-body-overlay-cta" />
        </div>
        <div className="w-full">
          <ToutOverlayTitleNoBodyNoCta nodeKey="overlayTitlenBodyNoCta" id="tout-overlay-title-no-body-no-cta" />
        </div>
        <div className="w-full">
          <ToutOverlaytTitleNoBodyOverlayCta nodeKey="overlayTitleNoBodyOverlayCta" id="tout-overlay-title-no-body-overlay-cta" />
        </div>
        <div className="w-full lg:w-1/3">
          <ToutVerticalNoTitle nodeKey="verticalNoTitle" id="tout-vertical-no-title" />
        </div>
        <div className="w-full lg:w-1/3">
          <ToutVertical nodeKey="vertical" id="tout-vertical" />
        </div>
        <div className="w-full lg:w-1/3">
          <ToutVerticalNoTitleNoBody nodeKey="verticalNoTitleNoBody" id="tout-vertical-no-title-no-body" />
        </div>
        <div className="w-full lg:w-1/3">
          <ToutOverlayTitleNoBodyNoCta nodeKey="overlayTitleNoBodyNoCta2" id="tout-overlay-title-no-body-no-cta-2" />
        </div>
        <div className="w-full lg:w-1/3">
          <ToutOverlaytTitleNoBody nodeKey="overlayTitleNoBody" id="tout-overlay-title-no-body" />
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
