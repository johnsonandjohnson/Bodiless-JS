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

import React, { FC, HTMLProps } from 'react';

import {
  A,
  DesignableComponentsProps,
  Span,
  Img,
  designable,
  ComponentOrTag,
} from '@bodiless/fclasses';
import {
  asVitalTokenSpec,
} from '@bodiless/vital-elements';

export type LogoComponents = {
  Wrapper: ComponentOrTag<any>,
  Image: ComponentOrTag<any>,
  Link: ComponentOrTag<any>,
};

type LogoProps = DesignableComponentsProps<LogoComponents> & HTMLProps<HTMLElement>;

const logoComponents: LogoComponents = {
  Wrapper: Span,
  Image: Img,
  Link: A,
};

/**
 * @private
 * Base logo component.
 */
const LogoBase: FC<LogoProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Link>
      <C.Image />
    </C.Link>
  </C.Wrapper>
);

/**
 * Crete a logo token.
 */
const asLogoToken = asVitalTokenSpec<LogoComponents>();

/**
 * Clean component to be used for the site logo
 */
const LogoClean = designable(logoComponents, 'Logo')(LogoBase);

export default LogoClean;
export { asLogoToken };
