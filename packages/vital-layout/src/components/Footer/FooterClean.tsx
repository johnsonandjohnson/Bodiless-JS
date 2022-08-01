/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { FC } from 'react';
import {
  Div, designable, Footer, Fragment
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { MenuClean } from '@bodiless/vital-navigation';
import { CopyrightRowClean } from './CopyrightRow';
import type { FooterComponents, FooterProps } from './types';

const footerComponents: FooterComponents = {
  Wrapper: Footer,
  Container: Div,
  Column1Wrapper: Fragment,
  Column2Wrapper: Div,
  MenuRow: Div,
  CopyrightRow: CopyrightRowClean,
  RewardsWrapper: Fragment,
  Rewards: Fragment,
  FooterMenuWrapper: Div,
  FooterMenu: MenuClean,
  CopyrightRowOutsideColumns: Fragment,
};

const FooterCleanBase: FC<FooterProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Container>
      <C.Column1Wrapper>
        <C.RewardsWrapper>
          <C.Rewards />
        </C.RewardsWrapper>
      </C.Column1Wrapper>
      <C.Column2Wrapper>
        <C.MenuRow>
          <C.FooterMenuWrapper>
            <C.FooterMenu />
          </C.FooterMenuWrapper>
        </C.MenuRow>
        <C.CopyrightRow />
      </C.Column2Wrapper>
      <C.CopyrightRowOutsideColumns />
    </C.Container>
  </C.Wrapper>
);

/**
 * A clean footer to be used in pages layouts following vital design.
 *
 * @category Component
 *
 */
const FooterClean = designable(footerComponents, 'Footer')(FooterCleanBase);

/**
 * A token modifier that respects the Footer Components.
 *
 * @category Token Collection
 */
export const asFooterToken = asVitalTokenSpec<FooterComponents>();

// These are used in defining the VitalFooter interface.
const footerToken = asFooterToken();
export type FooterToken = typeof footerToken;

export default FooterClean;
