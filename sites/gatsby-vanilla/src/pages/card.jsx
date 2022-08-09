import * as React from 'react';
import { as } from '@bodiless/fclasses';
import {
  CardCleanCore, vitalCardCore, asExternalBaseCard, asExternalHeroCard
} from '@bodiless/vital-card-core';
import Layout from '../components/layout';
import Seo from '../components/seo';

const ExternalCard = as(
  vitalCardCore.Base,
  asExternalBaseCard({
    Title: 'External Data: Card Title',
    Eyebrow: 'External Data: Card Eyebrow',
    Description: 'External Data: Card Description',
    CTALink: 'https://example.com',
    Image: {
      src: 'https://picsum.photos/400',
      alt: 'CMS Card Image',
      title: 'CMS Card Image',
    },
  }),
)(CardCleanCore);

const HeroExternalCard = as(
  vitalCardCore.HeroBase,
  vitalCardCore.WithHorizontalContentCentered,
  vitalCardCore.WithHorizontalLeftOrientation,
  asExternalHeroCard({
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
  }),
)(CardCleanCore);

const CardPage = () => (
  <Layout>
    <Seo title="Card" />
    <h1 className="text-vital-primary-header-copy text-m-3xl lg:text-3xl">CARD PAGE</h1>
    <ExternalCard />
    <HeroExternalCard />
  </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Card = () => <Seo title="Card" />;

export default CardPage;
