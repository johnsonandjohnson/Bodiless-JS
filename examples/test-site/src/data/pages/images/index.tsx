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

/* eslint-disable max-len */

import React from 'react';
import { graphql } from 'gatsby';
import flow from 'lodash/flow';
import {
  Page,
  GatsbyImagePresets,
  withGatsbyImagePreset,
} from '@bodiless/gatsby-theme-bodiless';
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
  asContentfulImage,
  asBaseEditableImagePlain as asBaseEditableImage,
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

const asFluidGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.Fluid)(asBaseEditableImage);
const asFluidNoBase64GatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FluidNoBase64)(asBaseEditableImage);
const asFluidTracedSVGGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FluidTracedSVG)(asBaseEditableImage);
const asFluidWithWebpGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebp)(asBaseEditableImage);
const asFluidWithWebpNoBase64GatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebpNoBase64)(asBaseEditableImage);
const asFluidWithWebpTracedSVGGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FluidWithWebpTracedSVG)(asBaseEditableImage);
const asFixedGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.Fixed)(asBaseEditableImage);
const asFixedNoBase64GatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FixedNoBase64)(asBaseEditableImage);
const asFixedTracedSVGGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FixedTracedSVG)(asBaseEditableImage);
const asFixedWithWebpGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FixedWithWebp)(asBaseEditableImage);
const asFixedWithWebpNoBase64GatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FixedWithWebpNoBase64)(asBaseEditableImage);
const asFixedWithWebpTracedSVGGatsbyImage = withGatsbyImagePreset(GatsbyImagePresets.FixedWithWebpTracedSVG)(asBaseEditableImage);

const FluidGatsbyImage = asFluidGatsbyImage()(Img);
const FluidNoBase64GatsbyImage = asFluidNoBase64GatsbyImage()(Img);
const FluidTracedSVGGatsbyImage = asFluidTracedSVGGatsbyImage()(Img);
const FluidWithWebpGatsbyImage = asFluidWithWebpGatsbyImage()(Img);
const FluidWithWebpNoBase64GatsbyImage = asFluidWithWebpNoBase64GatsbyImage()(Img);
const FluidWithWebpTracedSVGGatsbyImage = asFluidWithWebpTracedSVGGatsbyImage()(Img);
const FixedGatsbyImage = asFixedGatsbyImage()(Img);
const FixedNoBase64GatsbyImage = asFixedNoBase64GatsbyImage()(Img);
const FixedTracedSVGGatsbyImage = asFixedTracedSVGGatsbyImage()(Img);
const FixedWithWebpGatsbyImage = asFixedWithWebpGatsbyImage()(Img);
const FixedWithWebpNoBase64GatsbyImage = asFixedWithWebpNoBase64GatsbyImage()(Img);
const FixedWithWebpTracedSVGGatsbyImage = asFixedWithWebpTracedSVGGatsbyImage()(Img);

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
const PageSection = flow(
  addClasses('my-4 flex flex-wrap w-full'),
)(Section);
const EditableImagesSection = flow(
  withNode,
  withNodeKey('editableImages'),
)(PageSection);
const LinkableImagesSection = flow(
  withNode,
  withNodeKey('linkableImages'),
)(PageSection);
const ImageWrapper = flow(
  addClasses('inline-block p-2'),
)(Div);
const GatsbyImageWrapper = flow(
  removeClasses('inline-block'),
  addClasses('block w-1/2'),
)(ImageWrapper);
const FixedGatsbyImageWrapper = flow(
  removeClasses('w-1/2'),
  addClasses('w-full lg:w-1/2'),
)(GatsbyImageWrapper);
const ImageSectionTitle = flow(
  addClasses('w-full'),
  asHeader2,
)(H2);
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
      </PageSection>
      <PageSection>
        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed</ImageTitle>
          <FixedGatsbyImage nodeKey="fixed" />
        </FixedGatsbyImageWrapper>

        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed No Base64</ImageTitle>
          <FixedNoBase64GatsbyImage nodeKey="fixedNoBase64" />
        </FixedGatsbyImageWrapper>

        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed Traced SVG</ImageTitle>
          <FixedTracedSVGGatsbyImage nodeKey="fixedTracedSVG" />
        </FixedGatsbyImageWrapper>

        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed With Webp</ImageTitle>
          <FixedWithWebpGatsbyImage nodeKey="fixedWithWebp" />
        </FixedGatsbyImageWrapper>

        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed With Webp No Base64</ImageTitle>
          <FixedWithWebpNoBase64GatsbyImage nodeKey="fixedWithWebpNoBase64" />
        </FixedGatsbyImageWrapper>

        <FixedGatsbyImageWrapper>
          <ImageTitle>Fixed With Webp Traced SVG</ImageTitle>
          <FixedWithWebpTracedSVGGatsbyImage nodeKey="fixedWithWebpTracedSVG" />
        </FixedGatsbyImageWrapper>
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
        <GatsbyImageWrapper>
          <ImageContentful1 />
        </GatsbyImageWrapper>

        <GatsbyImageWrapper>
          <ImageContentful2 />
        </GatsbyImageWrapper>
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
    ...DefaultContentQuery
  }
`;
