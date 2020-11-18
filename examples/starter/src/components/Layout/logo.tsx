/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { FC, ComponentType, HTMLProps } from 'react';
import { Link } from 'gatsby';
import { flow } from 'lodash';
import {
  designable,
  DesignableComponentsProps,
  Div,
  Img,
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { asEditableImage } from '../Elements.token';

type LogoComponents = {
  SiteReturn: ComponentType<any>,
  SiteLogo: ComponentType<any>,
  SiteLink: ComponentType<any>,
};
export type Props = DesignableComponentsProps<LogoComponents> & HTMLProps<HTMLElement>;

// SiteLink uses Gatsby Link, so we can benefit from gatsby performance that page doesn't reload.
const logoComponents:LogoComponents = {
  SiteReturn: Div,
  SiteLogo: Img,
  SiteLink: Link,
};
const LogoClean: FC<Props> = ({ components }) => {
  const {
    SiteReturn,
    SiteLogo,
    SiteLink,
  } = components;

  return (
    <SiteReturn>
      <SiteLink to="/">
        <SiteLogo />
      </SiteLink>
    </SiteReturn>
  );
};

// Override asEditableImage nodekey to store in site nodeCollection.
const LogoImg = asEditableImage({ nodeKey: 'image', nodeCollection: 'site' })(Img);

const asLogo = flow(
  designable(logoComponents, 'Logo'),
  withDesign({
    SiteLogo: replaceWith(LogoImg),
  }),
);

const Logo = asLogo(LogoClean);
export default Logo;
