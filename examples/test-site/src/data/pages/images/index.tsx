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
import { withNode, withNodeKey } from '@bodiless/core';
import {
  A,
  H1,
  H2,
  H3,
  Div,
  Img,
  Section,
  addClasses,
  removeClasses,
} from '@bodiless/fclasses';
import Layout from '../../../components/Layout';
import {
  asEditableImageWithPlaceholder,
  asLinkableImage,
  FluidGatsbyImage,
  FluidNoBase64GatsbyImage,
  FluidTracedSVGGatsbyImage,
  FluidWithWebpGatsbyImage,
  FluidWithWebpNoBase64GatsbyImage,
  FluidWithWebpTracedSVGGatsbyImage,
  FixedGatsbyImage,
  FixedNoBase64GatsbyImage,
  FixedTracedSVGGatsbyImage,
  FixedWithWebpGatsbyImage,
  FixedWithWebpNoBase64GatsbyImage,
  FixedWithWebpTracedSVGGatsbyImage,
  asContentfulImage,
} from '../../../components/Image';
import {
  asHeader1,
  asHeader2,
  asHeader3,
} from '../../../components/Elements.token';
import { FlowContainerDefault } from '../../../components/FlowContainer';

import ImageAnimatedPngSrc from './animated.png';
import ImageGifSrc from './image.gif';
import ImageJpgSrc from './image.jpg';
import ImagePngSrc from './image.png';
import ImageSvgSrc from './image.svg';
import ImageResponsiveSvgSrc from './responsive_asvg.svg';

import ContentfulImage1 from '../../../components/Contentful/Image/image1';
import ContentfulImage2 from '../../../components/Contentful/Image/image2';

const ImageAnimatedPng = asEditableImageWithPlaceholder(ImageAnimatedPngSrc)('animatedPng')(Img);
const ImageGif = asEditableImageWithPlaceholder(ImageGifSrc)('gif')(Img);
const ImageJpg = asEditableImageWithPlaceholder(ImageJpgSrc)('jpg')(Img);
const ImagePng = asEditableImageWithPlaceholder(ImagePngSrc)('png')(Img);
const ImageSvg = asEditableImageWithPlaceholder(ImageSvgSrc)('svg')(Img);
const ImageResponsiveSvg = asEditableImageWithPlaceholder(ImageResponsiveSvgSrc)('responsiveSvg')(Img);

const LinkableImageAnimatedPng = asLinkableImage(ImageAnimatedPng)('animatedPngLink')(A);
const LinkableImageGif = asLinkableImage(ImageGif)('gifLink')(A);
const LinkableImageJpg = asLinkableImage(ImageJpg)('jpgLink')(A);
const LinkableImagePng = asLinkableImage(ImagePng)('pngLink')(A);
const LinkableImageSvg = asLinkableImage(ImageSvg)('svgLink')(A);
const LinkableImageResponsiveSvg = asLinkableImage(ImageResponsiveSvg)('responsiveSvgLink')(A);

// Define Contentful Image
const ImageContentful1 = asContentfulImage(ContentfulImage1)('ContentfulImage1')(Img);
const ImageContentful2 = asContentfulImage(ContentfulImage2)('ContentfulImage2')(Img);

const PageTitle = asHeader1(H1);
const PageSection = flowRight(
  addClasses('my-4'),
)(Section);
const EditableImagesSection = flowRight(
  withNodeKey('editableImages'),
  withNode,
)(PageSection);
const LinkableImagesSection = flowRight(
  withNodeKey('linkableImages'),
  withNode,
)(PageSection);
const ImageWrapper = flowRight(
  addClasses('inline-block p-2'),
)(Div);
const GatsbyImageWrapper = flowRight(
  removeClasses('inline-block'),
  addClasses('block'),
)(ImageWrapper);
const ImageSectionTitle = asHeader2(H2);
const ImageTitle = asHeader3(H3);

export default (props: any) => (
  <Page {...props}>
    <Layout>
      <PageTitle>Images Demo</PageTitle>
      <PageSection>
        <ImageSectionTitle>Gatsby Images</ImageSectionTitle>
        <GatsbyImageWrapper>
          <ImageTitle>Fluid</ImageTitle>
          <FluidGatsbyImage nodeKey="fluid" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fluid No Base64</ImageTitle>
          <FluidNoBase64GatsbyImage nodeKey="fluidNoBase64" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fluid Traced SVG</ImageTitle>
          <FluidTracedSVGGatsbyImage nodeKey="fluidTracedSVG" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fluid With Webp</ImageTitle>
          <FluidWithWebpGatsbyImage nodeKey="fluidWithWebp" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fluid With Webp No Base64</ImageTitle>
          <FluidWithWebpNoBase64GatsbyImage nodeKey="fluidWithWebpNoBase64" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fluid With Webp TracedSVG</ImageTitle>
          <FluidWithWebpTracedSVGGatsbyImage nodeKey="fluidWithWebpTracedSVG" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed</ImageTitle>
          <FixedGatsbyImage nodeKey="fixed" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed No Base64</ImageTitle>
          <FixedNoBase64GatsbyImage nodeKey="fixedNoBase64" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed Traced SVG</ImageTitle>
          <FixedTracedSVGGatsbyImage nodeKey="fixedTracedSVG" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed With Webp</ImageTitle>
          <FixedWithWebpGatsbyImage nodeKey="fixedWithWebp" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed With Webp No Base64</ImageTitle>
          <FixedWithWebpNoBase64GatsbyImage nodeKey="fixedWithWebpNoBase64" />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageTitle>Fixed With Webp Traced SVG</ImageTitle>
          <FixedWithWebpTracedSVGGatsbyImage nodeKey="fixedWithWebpTracedSVG" />
        </GatsbyImageWrapper>
      </PageSection>

      <EditableImagesSection>
        <ImageSectionTitle>Editable images</ImageSectionTitle>

        <ImageWrapper>
          <ImageTitle>JPG</ImageTitle>
          <ImageJpg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>PNG</ImageTitle>
          <ImagePng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>GIF</ImageTitle>
          <ImageGif />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>SVG</ImageTitle>
          <ImageSvg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Animated PNG</ImageTitle>
          <ImageAnimatedPng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Responsive SVG</ImageTitle>
          <ImageResponsiveSvg />
        </ImageWrapper>
      </EditableImagesSection>
      <LinkableImagesSection>
        <ImageSectionTitle>Linkable Editable images</ImageSectionTitle>

        <ImageWrapper>
          <ImageTitle>JPG</ImageTitle>
          <LinkableImageJpg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>PNG</ImageTitle>
          <LinkableImagePng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>GIF</ImageTitle>
          <LinkableImageGif />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>SVG</ImageTitle>
          <LinkableImageSvg />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Animated PNG</ImageTitle>
          <LinkableImageAnimatedPng />
        </ImageWrapper>

        <ImageWrapper>
          <ImageTitle>Responsive SVG</ImageTitle>
          <LinkableImageResponsiveSvg />
        </ImageWrapper>
      </LinkableImagesSection>
      <PageSection>
        <ImageSectionTitle>Contentful Image Components</ImageSectionTitle>
        <ImageWrapper>
          <ImageContentful1 />
        </ImageWrapper>

        <ImageWrapper>
          <ImageContentful2 />
        </ImageWrapper>
      </PageSection>
      <PageSection>
        <ImageSectionTitle>Images in a flow container</ImageSectionTitle>
        <FlowContainerDefault nodeKey="images" />
      </PageSection>
    </Layout>
  </Page>
);

export const query = graphql`
  query($slug: String!) {
    ...PageQuery
    ...SiteQuery
  }
`;
