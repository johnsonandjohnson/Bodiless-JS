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
import { Div, designable, Fragment } from '@bodiless/fclasses';
import { RichTextClean } from '@bodiless/vital-editors';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { withoutHydration } from '@bodiless/hydration';
import { SocialLinksClean } from '../SocialLinks';
import type { CopyrightRowComponents, CopyrightRowProps } from './types';

const copyrightRowComponents: CopyrightRowComponents = {
  Wrapper: Div,
  CopyrightWrapper: Div,
  DisclaimerWrapper: Fragment,
  Disclaimer: RichTextClean,
  Copyright: RichTextClean,
  SocialLinksWrapper: Div,
  SocialLinks: SocialLinksClean,
};

const CopyrightRowCleanBase: FC<CopyrightRowProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.CopyrightWrapper>
      <C.Copyright />
    </C.CopyrightWrapper>
    <C.SocialLinksWrapper>
      <C.SocialLinks />
    </C.SocialLinksWrapper>
    <C.DisclaimerWrapper>
      <C.Disclaimer />
    </C.DisclaimerWrapper>
  </C.Wrapper>
);

const CopyrightRowClean = designable(copyrightRowComponents, 'CopyrightRow')(CopyrightRowCleanBase);
/**
 * A clean static copyright row to be used in footer following vital design
 * with copyright & social links.
 *
 * @category Component
 *
 */
const CopyrightRowStatic = withoutHydration()(CopyrightRowClean);

/**
 * A token modifier that respects the CopyRightRow Components.
 *
 * @category Token Collection
 */
const asCopyrightRowToken = asVitalTokenSpec<CopyrightRowComponents>();

// These are used in defining the VitalCopyrightRow interface.
const copyrightRowToken = asCopyrightRowToken();
export type CopyrightRowToken = typeof copyrightRowToken;

export default CopyrightRowClean;
export { asCopyrightRowToken, CopyrightRowStatic };
