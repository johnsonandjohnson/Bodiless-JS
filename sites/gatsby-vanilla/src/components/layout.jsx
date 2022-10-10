import * as React from 'react';
import { as } from '@bodiless/fclasses';
import {
  LayoutClean, vitalLayout, asLayoutToken, vitalFooter
} from '@bodiless/vital-layout-core';
import { asVanillaHeader } from './header';

const VanillaLayout = asLayoutToken(vitalLayout.Base, {
  Components: {
    Header: asVanillaHeader,
    Footer: vitalFooter.Default,
  },
});

const VitalLayout = as(
  VanillaLayout,
)(LayoutClean);

const Layout = ({ children }) => (
  <VitalLayout>
    <main>{children}</main>
  </VitalLayout>
);

export default Layout;
