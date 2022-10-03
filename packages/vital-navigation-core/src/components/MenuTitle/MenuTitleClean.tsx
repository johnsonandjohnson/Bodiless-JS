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

import { asVitalTokenSpec } from '@bodiless/vital-elements';
import {
  A, designable, DesignableComponentsProps, withDesign
} from '@bodiless/fclasses';

import React, { ComponentType, FC, Fragment } from 'react';
// import type { MenuTitleComponents } from '@bodiless/navigation';

export type MenuTitleComponents = {
  Link: ComponentType<any>,
  Title: ComponentType<any>,
};

type MenuTitleProps = DesignableComponentsProps<MenuTitleComponents>;

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
export const MenuTitle = designable(MenuTitleComponents, 'MenuTitle')(MenuTitleBase);

const MenuTitleClean = withDesign({
  // Hardcode for now, will replace...
  // Link: addProps({children: '/link'}), // replaceWith(LinkClean),
  // Title: addProps({children: 'menutitle'}), // replaceWith(replaceable(EditorPlainClean)),
})(MenuTitle);

export const asMenuTitleToken = asVitalTokenSpec<MenuTitleComponents>();

export default MenuTitleClean;
