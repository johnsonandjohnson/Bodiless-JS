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
import { Page as BasePage } from '@bodiless/gatsby-theme-bodiless';
import { H1, H2, addClasses } from '@bodiless/fclasses';
import {
  withNavigationButtons,
  withCarouselDots,
  withAutoPlayInterval,
  withAutoPlayButton,
} from '@bodiless/carousel';
import Layout from '../../../components/Layout';
import {
  withNavButtonsStyles,
  withDotStyles,
  Carousel,
  CAROUSEL_NODE_KEY,
  ChameleonCarousel,
  withAutoPlayButtonStyles,
  withAutoPlay,
  asAccessibleCarousel,
} from '../../../components/Carousel';
import { asLtrPage } from '../../../components/Page';

const Page = asLtrPage(BasePage);

const Title = addClasses('text-3xl font-bold')(H1);
const SubTitle = addClasses('text-2xl font-bold')(H2);

const OnlyNavButtonsCarousel = flow(
  withNavigationButtons,
  withNavButtonsStyles,
  asAccessibleCarousel,
)(Carousel);

const OnlyDotsButtonsCarousel = flow(
  withCarouselDots(CAROUSEL_NODE_KEY),
  withDotStyles,
  asAccessibleCarousel,
)(Carousel);

const AutoPlayDefaultIntervalCarousel = flow(
  withAutoPlay,
  withAutoPlayInterval(),
  withAutoPlayButton,
  withAutoPlayButtonStyles,
  asAccessibleCarousel,
)(Carousel);

const NavAndDotsCarousel = flow(
  withCarouselDots(CAROUSEL_NODE_KEY),
  withDotStyles,
  withNavigationButtons,
  withNavButtonsStyles,
  asAccessibleCarousel,
)(Carousel);

const NavAndAutoplayCarousel = flow(
  withNavigationButtons,
  withNavButtonsStyles,
  withAutoPlayInterval(6000),
  withAutoPlayButton,
  withAutoPlayButtonStyles,
  asAccessibleCarousel,
)(Carousel);

const DotsAndAutoplayCarousel = flow(
  withCarouselDots(CAROUSEL_NODE_KEY),
  withDotStyles,
  withAutoPlay,
  withAutoPlayInterval(5000),
  withAutoPlayButton,
  withAutoPlayButtonStyles,
  asAccessibleCarousel,
)(Carousel);

const NavAndDotsAndAutoplayCarousel = flow(
  withCarouselDots(CAROUSEL_NODE_KEY),
  withDotStyles,
  withNavigationButtons,
  withNavButtonsStyles,
  withAutoPlay,
  withAutoPlayInterval(7000),
  withAutoPlayButton,
  withAutoPlayButtonStyles,
  asAccessibleCarousel,
)(Carousel);

const AutoPlayCustomIntervalCarousel = flow(
  withAutoPlay,
  withAutoPlayInterval(10000),
  withAutoPlayButton,
  withAutoPlayButtonStyles,
  asAccessibleCarousel,
)(Carousel);

const CarouselExamples = () => (
  <>
    <Title>Carousel Test Page</Title>
    <SubTitle>Only Nav buttons</SubTitle>
    <OnlyNavButtonsCarousel nodeKey="navButtons" />
    <SubTitle>Only Dots buttons</SubTitle>
    <OnlyDotsButtonsCarousel nodeKey="dotsButtons" />
    <SubTitle>Only Autoplay with default interval</SubTitle>
    <AutoPlayDefaultIntervalCarousel nodeKey="autoplayDefaultInterval" />
    <SubTitle>Nav & Dots</SubTitle>
    <NavAndDotsCarousel nodeKey="navAndDots" />
    <SubTitle>Nav & Autoplay with 6 second interval</SubTitle>
    <NavAndAutoplayCarousel nodeKey="navAndAutoPlay" />
    <SubTitle>Dots & Autoplay with 5 second interval</SubTitle>
    <DotsAndAutoplayCarousel nodeKey="dotsAndAutoPlay" />
    <SubTitle>Nav & Dots & Autoplay with 7 second interval</SubTitle>
    <NavAndDotsAndAutoplayCarousel nodeKey="navAndDotsAndAutoPlay" />
    <SubTitle>Autoplay with 10 second interval</SubTitle>
    <AutoPlayCustomIntervalCarousel nodeKey="autoplayCustomInterval" />
    <SubTitle>Chameleon that lets you choose from 4 components: Linkable, Gatsby (Performance) Image, Horizontal Card, Video</SubTitle>
    <ChameleonCarousel nodeKey="chameleon" />
  </>
);

const CarouselPage = (props: any) => (
  <Page {...props}>
    <Layout>
      <CarouselExamples />
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

export default CarouselPage;
export { CarouselExamples };
