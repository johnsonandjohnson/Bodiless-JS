import * as React from 'react';
import {
  as, H1, H2, Div
} from '@bodiless/fclasses';
import {
  CardCleanNonEditable, vitalCardCore, asExternalBaseCard, asExternalHeroCard
} from '@bodiless/vital-card-core';
import { vitalTypography } from '@bodiless/vital-elements';
import Layout from '../../components/layout';
import Seo from '../../components/seo';

const WithExtSrc = asExternalBaseCard({
  Title: 'External Data: Card Title',
  Eyebrow: 'External Data: Card Eyebrow',
  Description: 'External Data: Card Description',
  CTALink: 'https://example.com',
  CTAText: 'Read More',
  Image: {
    src: 'https://picsum.photos/400',
    alt: 'CMS Card Image',
    title: 'CMS Card Image',
  },
});

const WithExtHeroSrc = asExternalHeroCard({
  Title: 'External Data: Hero Card Title',
  Eyebrow: 'External Data: Hero Card Eyebrow',
  Description: 'External Data: Hero Card Description',
  CTALink: 'https://example.com',
  CTAText: 'Read More',
  Image: {
    src: 'https://picsum.photos/400',
    alt: 'Hero Card Image',
    title: 'Hero Card Image',
  },
});

const ExternalCard = as(
  vitalCardCore.Base,
  WithExtSrc,
)(CardCleanNonEditable);

const VerticalCard = as(
  vitalCardCore.Default,
  vitalCardCore.WithVerticalOrientation,
  WithExtSrc,
)(CardCleanNonEditable);

const HorizontalLeftCard = as(
  vitalCardCore.Default,
  vitalCardCore.WithHorizontalLeftOrientation,
  vitalCardCore.WithHorizontalContentAtTop,
  WithExtSrc,
)(CardCleanNonEditable);

const HorizontalLeftImageCenteredContentCard = as(
  vitalCardCore.Default,
  vitalCardCore.WithHorizontalLeftOrientation,
  vitalCardCore.WithHorizontalContentCentered,
  WithExtSrc,
)(CardCleanNonEditable);

const HorizontalRightCard = as(
  vitalCardCore.Default,
  vitalCardCore.WithHorizontalRightOrientation,
  vitalCardCore.WithHorizontalContentAtTop,
  WithExtSrc,
)(CardCleanNonEditable);

const HorizontalRightImageCenteredContentCard = as(
  vitalCardCore.Default,
  vitalCardCore.WithHorizontalRightOrientation,
  vitalCardCore.WithHorizontalContentCentered,
  WithExtSrc,
)(CardCleanNonEditable);

const HeroExternalCard = as(
  vitalCardCore.HeroBase,
  vitalCardCore.WithHorizontalContentCentered,
  vitalCardCore.WithHorizontalLeftOrientation,
  vitalCardCore.WithPrimaryTextLink,
  WithExtHeroSrc,
)(CardCleanNonEditable);

const HeroExternalPrimaryButtonCard = as(
  vitalCardCore.HeroBase,
  vitalCardCore.WithHorizontalContentCentered,
  vitalCardCore.WithHorizontalLeftOrientation,
  vitalCardCore.WithPrimaryButton,
  WithExtHeroSrc,
)(CardCleanNonEditable);

const HeroExternalSecondaryButtonCard = as(
  vitalCardCore.HeroBase,
  vitalCardCore.WithHorizontalContentCentered,
  vitalCardCore.WithHorizontalLeftOrientation,
  vitalCardCore.WithSecondaryButton,
  WithExtHeroSrc,
)(CardCleanNonEditable);

const H1title = as(vitalTypography.H1, 'pt-4')(H1);
const Subtitle = as(vitalTypography.H2, 'pt-4')(H2);

const CardPage = () => (
  <Layout>
    <Seo title="Card" />
    <H1title>Card Page</H1title>
    <p>Replication of Bodiless Vital Editable Card Page</p>
    <Div className="md:w-1/2 mb-8">
      <Subtitle>Default Card</Subtitle>
      <ExternalCard />
      <Subtitle>Vertical Card</Subtitle>
      <VerticalCard />
    </Div>
    <Subtitle>Horizontal Card Variations</Subtitle>
    <Div className="md:w-2/3 mb-8">
      <Subtitle>Left Image : Content Top Aligned </Subtitle>
      <HorizontalLeftCard />
      <Subtitle>Left Image : Content Centered</Subtitle>
      <HorizontalLeftImageCenteredContentCard />
      <Subtitle>Right Image : Content Top Aligned </Subtitle>
      <HorizontalRightCard />
      <Subtitle>Right Image : Content Centered</Subtitle>
      <HorizontalRightImageCenteredContentCard />
    </Div>
    <Subtitle>Hero Card Variations</Subtitle>
    <HeroExternalCard />
    <HeroExternalPrimaryButtonCard />
    <HeroExternalSecondaryButtonCard />
  </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Card = () => <Seo title="Card" />;

export default CardPage;
