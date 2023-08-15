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
import {
  withSidecarNodes, withNode, withNodeKey,
} from '@bodiless/data';
import { asEditable, withBodilessLinkToggle } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { CardClean } from '@bodiless/card';
import {
  A, HOC, flowHoc, Fragment, designable, HOCDef,
  withDesign, startWith, DesignableComponentsProps,
} from '@bodiless/fclasses';

export type MenuTitleComponents = {
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

const asMenuLink = (asEditableLink: typeof asBodilessLink) => flowHoc(
  withSidecarNodes(
    asEditableLink('link', undefined, () => ({ groupLabel: 'Menu Link' })),
  ),
);

/**
 * HOC that adds a default Editors to the menu Title and Link.
 * Transforms Link into Editable Bodiless Link Toggle and Title to Editable.
 */
const withDefaultMenuTitleEditors = withDesign({
  Link: asMenuLink(withBodilessLinkToggle(asBodilessLink, startWith(A), true)),
  Title: flowHoc(
    startWith(Fragment),
    asEditable('text', 'Menu Item'),
  ),
});

/**
 * A helper to apply provided `withTitleEditors` HOC to the Title menu key.
 * Applies `withDefaultMenuTitleEditors` token by default.
 *
 * @param withTitleEditors HOC that will be applied to the Title key
 */
const withMenuTitleEditors = <P extends object>(
  withTitleEditors: HOC = withDefaultMenuTitleEditors,
  ...tokenDefs: HOCDef[]
) => withDesign({
    Title: flowHoc(withTitleEditors, ...tokenDefs),
  });

/**
 * HOC that transforms component into MenuTitle with node and 'title' nodeKey.
 * MenuTitle has Link and Title design keys. Can be applied to the Title design key.
 */
const asMenuTitle = flowHoc(
  startWith(MenuTitle),
  withNode,
  withNodeKey('title'),
);

/**
 * HOC that transforms component into Menu Card with node and 'title' nodeKey.
 * Can be applied to the Title design key.
 */
const asMenuCard = flowHoc(
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
