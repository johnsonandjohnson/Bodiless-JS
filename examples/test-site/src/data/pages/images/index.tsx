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

import React from 'react';
import { graphql } from 'gatsby';
import { flowRight } from 'lodash';
import { Page } from '@bodiless/gatsby-theme-bodiless';
import {
  H1,
  H2,
  H3,
  Div,
  addClasses,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import { asContentfulImage } from '../../../components/Image';
import {
  asHeader1,
  asHeader2,
  asHeader3,
  asYMargin,
  asEditableLink,
} from '../../../components/Elements.token';

import ImageAnimatedPngSrc from './animated.png';
import ImageGifSrc from './image.gif';
import ImageJpgSrc from './image.jpg';
import ImagePngSrc from './image.png';
import ImageSvgSrc from './image.svg';
import ImageWebpSrc from './image.webp';
import ImageResponsiveSvgSrc from './responsive_asvg.svg';

const ImageAnimatedPng = asContentfulImage('animatedPng', { src: ImageAnimatedPngSrc });
const ImageGif = asContentfulImage('gif', { src: ImageGifSrc });
const ImageJpg = asContentfulImage('jpg', { src: ImageJpgSrc });
const ImagePng = asContentfulImage('png', { src: ImagePngSrc });
const ImageSvg = asContentfulImage('svg', { src: ImageSvgSrc });
const ImageWebp = asContentfulImage('webp', { src: ImageWebpSrc });
const ImageResponsiveSvg = asContentfulImage('responsiveSvg', { src: ImageResponsiveSvgSrc });

const LinkableImageAnimatedPng = asEditableLink('animatedPngLink')(ImageAnimatedPng);
const LinkableImageGif = asEditableLink('gifLink')(ImageGif);
const LinkableImageJpg = asEditableLink('jpgLink')(ImageJpg);
const LinkableImagePng = asEditableLink('pngLink')(ImagePng);
const LinkableImageSvg = asEditableLink('svgLink')(ImageSvg);
const LinkableImageWebp = asEditableLink('webpLink')(ImageWebp);
const LinkableImageResponsiveSvg = asEditableLink('responsiveSvgLink')(ImageResponsiveSvg);

const PageTitle = asHeader1(H1);

const ImageWrapper = flowRight(
  addClasses('inline-block'),
)(Div);
const ImageSectionTitle = flowRight(
  asHeader2,
  asYMargin,
)(H2);
const ImageTitle = asHeader3(H3);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageTitle>Images Demo</PageTitle>
      <div>
        <ImageSectionTitle>Editable images</ImageSectionTitle>
        <ImageWrapper>
          <ImageTitle>Animated PNG</ImageTitle>
          <ImageAnimatedPng />
        </ImageWrapper>
      
        <ImageWrapper>
          <ImageTitle>GIF</ImageTitle>
          <ImageGif />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>JPG</ImageTitle>
          <ImageJpg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>PNG</ImageTitle>
          <ImagePng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>SVG</ImageTitle>
          <ImageSvg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>WEBP</ImageTitle>
          <ImageWebp />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Responsive SVG</ImageTitle>
          <ImageResponsiveSvg />
        </ImageWrapper>
      </div>
      <div>
        <ImageSectionTitle>Linkable Editable images</ImageSectionTitle>
        <ImageWrapper>
          <ImageTitle>Animated PNG</ImageTitle>
          <LinkableImageAnimatedPng />
        </ImageWrapper>
      
        <ImageWrapper>
          <ImageTitle>GIF</ImageTitle>
          <LinkableImageGif />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>JPG</ImageTitle>
          <LinkableImageJpg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>PNG</ImageTitle>
          <LinkableImagePng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>SVG</ImageTitle>
          <LinkableImageSvg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>WEBP</ImageTitle>
          <LinkableImageWebp />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Responsive SVG</ImageTitle>
          <LinkableImageResponsiveSvg />
        </ImageWrapper>
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
