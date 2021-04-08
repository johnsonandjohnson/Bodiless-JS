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
import { flow } from 'lodash';
import { withSidecarNodes } from '@bodiless/core';
import {
  designable,
  DesignableComponentsProps,
  Div,
  Img,
  replaceWith,
  withDesign,
  addProps,
} from '@bodiless/fclasses';
import { GatsbyLink } from '@bodiless/gatsby-theme-bodiless';
import { asEditableImagePlain as asEditableImage } from '../Image';
import { asEditableLink } from '../Elements.token';

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
  SiteLink: GatsbyLink,
};
const LogoClean: FC<Props> = ({ components }) => {
  const {
    SiteReturn,
    SiteLogo,
    SiteLink,
  } = components;

  return (
    <SiteReturn>
      <SiteLink>
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
    SiteLink: flow(
      withSidecarNodes(
        asEditableLink({ nodeKey: 'logolink', nodeCollection: 'site' }),
      ),
      addProps({
        href: '/',
      }),
    ),
  }),
);

const Logo = asLogo(LogoClean) as ComponentType;
export default Logo;
