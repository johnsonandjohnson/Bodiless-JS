/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { as, startWith } from '@bodiless/fclasses';
import {
  LayoutClean, vitalLayout, asLayoutToken, vitalFooter
} from '@bodiless/vital-layout-core';
import Header from './header';
import './layout.css';

const VanillaLayout = asLayoutToken(vitalLayout.Base, {
  Components: {
    Header: startWith(Header),
    Footer: vitalFooter.Default,
  },
});

const VitalLayout = as(
  VanillaLayout,
)(LayoutClean);

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);

  return (
    <VitalLayout>
      <main>{children}</main>
    </VitalLayout>
  );
};

export default Layout;
