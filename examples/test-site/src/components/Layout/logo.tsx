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
import { Link, useStaticQuery, graphql } from 'gatsby';
import {
  designable,
  DesignableComponentsProps,
  Div,
  Img,
} from '@bodiless/fclasses';

type LogoComponents = {
  SiteReturn: ComponentType<any>,
  SiteLogo: ComponentType<any>,
};
export type Props = DesignableComponentsProps<LogoComponents> & HTMLProps<HTMLElement>;

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

  const data = useStaticQuery(graphql`
  query HeaderQuery {
    site {
      siteMetadata {
        logo
      }
    }
  }
  `);

  return (
    <SiteReturn>
      <SiteLink to="/">
        <SiteLogo src={data.site.siteMetadata.logo} alt="Return To Home" />
      </SiteLink>
    </SiteReturn>
  );
};

const Logo = designable(logoComponents)(LogoClean);
export default Logo;
