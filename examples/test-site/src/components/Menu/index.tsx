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

import React, { FC, ComponentType } from 'react';
import { flow } from 'lodash';
import { withPageDimensionsContext, ifViewportIs, ifViewportIsNot } from '@bodiless/components';
import {
  withDesign,
  designable,
  DesignableComponentsProps,
  Div,
} from '@bodiless/fclasses';

import SimpleMenu from './SimpleMenu';
import MegaMenu from './MegaMenu';

import { SimpleBurgerMenu, MegaBurgerMenu } from '../BurgerMenu';
import { breakpoints } from '../Page';

type MenuComponents = {
  Menu: ComponentType<any>,
};

type MenuType = (Menu: ComponentType<any>) => ComponentType<any>;

const menuComponentsStart:MenuComponents = {
  Menu: Div,
};

const MenuClean: FC<DesignableComponentsProps<MenuComponents>> = ({ components, ...rest }) => {
  const { Menu } = components;

  return (
    <nav aria-label="Navigation Menu">
      <Menu {...rest} />
    </nav>
  );
};

const ResponsiveMenuClean = designable(menuComponentsStart)(MenuClean);

const withMenu = (Menu: MenuType) => withDesign<MenuComponents>({ Menu });

const ResponsiveSimpleMenu = flow(
  ifViewportIs(['lg', 'xl', 'xxl'])(withMenu(() => SimpleMenu)),
  ifViewportIsNot(['lg', 'xl', 'xxl'])(withMenu(() => SimpleBurgerMenu)),
  withPageDimensionsContext({ breakpoints }),
)(ResponsiveMenuClean);

const ResponsiveMegaMenu = flow(
  ifViewportIs(['lg', 'xl', 'xxl'])(withMenu(() => MegaMenu)),
  ifViewportIsNot(['lg', 'xl', 'xxl'])(withMenu(() => MegaBurgerMenu)),
  withPageDimensionsContext({ breakpoints }),
)(ResponsiveMenuClean);

export {
  ResponsiveSimpleMenu,
  ResponsiveMegaMenu,
};
