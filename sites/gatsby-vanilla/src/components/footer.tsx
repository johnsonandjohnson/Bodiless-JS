import * as React from 'react';
import {
  on, replaceWith,
} from '@bodiless/fclasses';
import { MenuCleanNonEditable } from '@bodiless/vital-navigation-core';
import {
  vitalFooter, asFooterToken,
} from '@bodiless/vital-layout-core';
import { FooterMenu } from './menu';

const Copyright = () => (
  <div>
    <p>@Copyright Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Vivamus laoreet. </p>
  </div>
);

export const asVanillaFooter = asFooterToken(vitalFooter.Default, {
  Components: {
    FooterMenu: on(MenuCleanNonEditable)(FooterMenu),
    CopyrightRow: replaceWith(Copyright),
  },
});
