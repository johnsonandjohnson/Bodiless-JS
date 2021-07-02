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

import React, { ComponentType, FC } from 'react';
import { flow } from 'lodash';
import { withSidecarNodes, withNode, withNodeKey } from '@bodiless/core';
import { asEditable, withBodilessLinkToggle } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { CardClean } from '@bodiless/card';
import {
  A, Span, Token, asToken, Fragment, designable, TokenDef,
  withDesign, startWith, DesignableComponentsProps,
} from '@bodiless/fclasses';

type MenuTitleComponents = {
  Link: ComponentType<any>,
  Title: ComponentType<any>,
};

type MenuTitleProps = DesignableComponentsProps<MenuTitleComponents>;

const DEFAULT_NODE_KEYS = {
  toggleNodeKey: 'title$link-toggle',
  linkNodeKey: 'title$link',
  titleNodeKey: 'title$text',
};

const MenuTitleBase: FC<MenuTitleProps> = ({ components, ...rest }) => {
  const { Link, Title } = components;
  return (
    <Link {...rest}>
      <Title />
    </Link>
  );
};

const MenuTitleComponents: MenuTitleComponents = {
  Link: A,
  Title: Fragment,
};

/**
 * Clean component that renders Menu Titles.
 *
 * @see MenuTitleComponents for a list of design components.
 */
const MenuTitle = designable(MenuTitleComponents, 'MenuTitle')(MenuTitleBase);

const asMenuLink = (asEditableLink: typeof asBodilessLink) => asToken(
  withSidecarNodes(
    asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
  ),
);

/**
 * Token that adds a default Editors to the menu Title and Link.
 * Transforms Link into Editable Bodiless Link Toggle and Title to Editable.
 */
const withDefaultMenuTitleEditors = withDesign({
  Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(Span), true)),
  Title: asToken(
    startWith(Fragment),
    asEditable('text', 'Menu Item'),
  ),
});

/**
 * A helper to apply provided `withTitleEditors` Token to the Title menu key.
 * Applies `withDefaultMenuTitleEditors` token by default.
 *
 * @param withTitleEditors Token that will be applied to the Title key
 */
const withMenuTitleEditors = <P extends object>(
  withTitleEditors: Token = withDefaultMenuTitleEditors,
  ...tokenDefs: TokenDef[]
) => withDesign({
    Title: asToken(withTitleEditors, ...tokenDefs),
  });

/**
 * Token that transforms component into MenuTitle with node and 'title' nodeKey.
 * MenuTitle has Link and Title design keys. Can be applied to the Title design key.
 */
const asMenuTitle = flow(
  startWith(MenuTitle),
  withNode,
  withNodeKey('title'),
);

/**
 * Token that transforms component into Menu Card with node and 'title' nodeKey.
 * Can be applied to the Title design key.
 */
const asMenuCard = asToken(
  startWith(CardClean),
  withNode,
  withNodeKey('title'),
);

export default MenuTitle;
export {
  DEFAULT_NODE_KEYS,
  withMenuTitleEditors,
  withDefaultMenuTitleEditors,
  asMenuCard,
  asMenuTitle,
};
