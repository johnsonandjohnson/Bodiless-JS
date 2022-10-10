import * as React from 'react';
import { as } from '@bodiless/fclasses';
import {
  LayoutClean, vitalLayout, asLayoutToken, vitalFooter
} from '@bodiless/vital-layout-core';
import { vitalSpacing } from '@bodiless/vital-elements';
import { asVanillaHeader } from './header';
import { asVanillaFooter } from './footer';

const VanillaLayout = asLayoutToken(vitalLayout.Base, {
  Components: {
    Header: asVanillaHeader,
    Footer: asVanillaFooter,
  },
  Theme: {
    ContainerWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
  }
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
