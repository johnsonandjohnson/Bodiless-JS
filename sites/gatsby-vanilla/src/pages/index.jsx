import * as React from 'react';
import { StaticImage } from 'gatsby-plugin-image';

import Layout from '../components/layout';
import Seo from '../components/seo';
import * as styles from '../components/index.module.css';

const links = [
  {
    text: 'Styleguide | Card',
    url: '/styleguide/card',
    description:
      'A styleguide page demonstrating Vital Components Card',
  },
];

const utmParameters = '?utm_source=starter&utm_medium=start-page&utm_campaign=default-starter';

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
    <ul className={styles.list}>
      {links.map(link => (
        <li key={link.url} className={styles.listItem}>
          <a
            className={styles.listItemLink}
            href={`${link.url}${utmParameters}`}
          >
            {link.text}
          </a>
          <p className={styles.listItemDescription}>{link.description}</p>
        </li>
      ))}
    </ul>
  </Layout>
);

/**
 * Head export to define metadata for the page
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */
export const Head = () => <Seo title="Home" />;

export default IndexPage;
