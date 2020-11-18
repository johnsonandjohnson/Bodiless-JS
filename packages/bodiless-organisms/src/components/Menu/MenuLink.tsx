/**
 * Copyright © 2019 Johnson & Johnson
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
import {
  A,
  designable,
  DesignableComponentsProps,
} from '@bodiless/fclasses';

type MenuLinkComponents = {
  Link: ComponentType<any>,
  ActiveLink: ComponentType<any>,
};

const menulinkComponents: MenuLinkComponents = {
  Link: A,
  ActiveLink: A,
};

const isCurrentPage = (href: string | undefined) => {
  if (!href || (typeof window === 'undefined')) {
    return false;
  }
  const urls = [];
  urls.push(window.location.toString());

  let relativeUrl = window.location.pathname;
  urls.push(relativeUrl);
  if (window.location.search) {
    relativeUrl += window.location.search;
    urls.push(relativeUrl);
  }
  if (window.location.hash) {
    relativeUrl += window.location.hash;
    urls.push(relativeUrl);
    urls.push(window.location.hash); // a case when only a hash presents in link href
  }
  return urls.indexOf(href) > -1;
};

export type Props = {
  href?: string,
  unwrap?: Function,
} & DesignableComponentsProps<MenuLinkComponents> & HTMLProps<HTMLElement>;

/**
 * Toggles between two states. Render <ActiveLink /> when the active page URL (window.location)
 * matches to href attribute of the component. Otherwise the <Link /> will be rendered
 * Note - below the href prop is passed in by the withData() HOC which is part of asBodilessLink.
 * @constructor
 */
const MenuLinkBase: FC<Props> = ({ components, unwrap, ...rest }) => {
  const { Link, ActiveLink } = components;
  const { href } = rest;
  // Note isCurrentPage is standing in for whatever algorithm you use to match the
  // href to the current browser location.
  return isCurrentPage(href) ? (<ActiveLink {...rest} />) : (<Link {...rest} />);
};

const MenuLink = designable(menulinkComponents, 'MenuLink')(MenuLinkBase);

export default MenuLink;
