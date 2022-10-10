import * as React from 'react';
import { addClasses, as } from '@bodiless/fclasses';
import { asExternalBaseButton, ButtonClean, vitalButtonsCore } from '@bodiless/vital-buttons-core';
import Layout from '../components/layout';
import Seo from '../components/seo';

const CardButton = as(
  vitalButtonsCore.Primary,
  asExternalBaseButton({
    Text: 'StyleGuide Card',
    Link: '/styleguide/card/',
  }),
  addClasses('w-60 m-10'),
)(ButtonClean);

const IndexPage = () => (
  <Layout>
    <Seo title="Home" />
    <h2 className="my-16">Visit here to see examples of Vital Cards:</h2>
    <CardButton />
  </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
