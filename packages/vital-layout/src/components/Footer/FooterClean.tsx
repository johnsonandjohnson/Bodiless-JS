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
import { Div, designable, Footer } from '@bodiless/fclasses';
import { RichTextClean } from '@bodiless/vital-editors';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { MenuClean } from '@bodiless/vital-navigation';
import { RewardsClean } from './Rewards';
import { SocialLinksClean } from './SocialLinks';
import type { FooterComponents, FooterProps } from './types';

const footerComponents: FooterComponents = {
  Wrapper: Footer,
  Container: Div,
  Column: Div,
  Row: Div,
  RewardsWrapper: Div,
  Rewards: RewardsClean,
  FooterMenuWrapper: Div,
  FooterMenu: MenuClean,
  CopyrightWrapper: Div,
  Copyright: RichTextClean,
  SocialLinksWrapper: Div,
  SocialLinks: SocialLinksClean,
};

const FooterCleanBase: FC<FooterProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Container>
      <C.Column>
        <C.RewardsWrapper>
          <C.Rewards />
        </C.RewardsWrapper>
      </C.Column>
      <C.Column>
        <C.Row>
          <C.FooterMenuWrapper>
            <C.FooterMenu />
          </C.FooterMenuWrapper>
        </C.Row>
        <C.Row>
          <C.CopyrightWrapper>
            <C.Copyright />
          </C.CopyrightWrapper>
          <C.SocialLinksWrapper>
            <C.SocialLinks />
          </C.SocialLinksWrapper>
        </C.Row>
      </C.Column>
    </C.Container>
  </C.Wrapper>
);

/**
 * A clean footer to be used in pages layouts.
 */
const FooterClean = designable(footerComponents, 'Footer')(FooterCleanBase);

export const asFooterToken = asVitalTokenSpec<FooterComponents>();

export default FooterClean;
