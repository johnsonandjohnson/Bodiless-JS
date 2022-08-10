import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { addClasses, as } from '@bodiless/fclasses';
import { asExternalBaseLink, LinkClean, vitalLinkCore } from '@bodiless/vital-link-core';
import { asExternalBaseButton, ButtonClean, vitalButtonsCore } from '@bodiless/vital-buttons-core';
import Layout from '../components/layout';
import Seo from '../components/seo';
import * as styles from '../components/index.module.css';

const CardLink = as(
  vitalLinkCore.Default,
  asExternalBaseLink({
    Text: 'StyleGuide Card',
    Link: '/styleguide/card/',
  }),
  addClasses('m-10'),
)(LinkClean);

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
    <div className={styles.textCenter}>
      <StaticImage
        src="../images/example.png"
        loading="eager"
        width={64}
        quality={95}
        formats={['auto', 'webp', 'avif']}
        alt=""
        style={{ marginBottom: 'var(--space-3)' }}
      />
      <h1>
        Welcome to
        {' '}
        <b>Vanilla Gatsby Featuring Vital Components!</b>
      </h1>

    </div>
    <CardLink />
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
