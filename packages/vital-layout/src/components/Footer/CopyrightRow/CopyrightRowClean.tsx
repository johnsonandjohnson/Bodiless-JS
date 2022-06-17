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
import { Div, designable } from '@bodiless/fclasses';
import { RichTextClean } from '@bodiless/vital-editors';
import { asVitalTokenSpec } from '@bodiless/vital-elements';
import { withoutHydration } from '@bodiless/hydration';
import { SocialLinksClean } from '../SocialLinks';
import type { CopyrightRowComponents, CopyrightRowProps } from './types';

const copyrightRowComponents: CopyrightRowComponents = {
  Wrapper: Div,
  CopyrightWrapper: Div,
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
  </C.Wrapper>
);

/**
 * A clean copyright row to be used in footer
 */
const CopyrightRowClean = designable(copyrightRowComponents, 'CopyrightRow')(CopyrightRowCleanBase);

export const asCopyrightRowToken = asVitalTokenSpec<CopyrightRowComponents>();

export default withoutHydration()(CopyrightRowClean);
