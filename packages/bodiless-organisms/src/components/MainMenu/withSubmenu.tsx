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

import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  ReactNode,
} from 'react';
import {
  ListProps,
  withToggleButton,
  withToggleTo,
  ListDesignableComponents,
  asSublist,
} from '@bodiless/components';
import { withDesign } from '@bodiless/fclasses';
import { WithNodeProps } from '@bodiless/core';

type MenuSublistProps = Omit<ListProps, 'title' | keyof WithNodeProps> & {
  title: ReactNode,
};

const withSubmenuToggle = (Sublist: ComponentType<MenuSublistProps>) => (
  (Item: ComponentType<PropsWithChildren<{}>> | string) => {
    const ItemWithSubmenu: FC<ListProps> = ({
      children, unwrap, nodeKey, ...rest
    }) => (
      <Sublist title={children} unwrap={unwrap} {...rest} />
    );
    const ItemWithoutSubmenu: FC<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );

    return withToggleTo(ItemWithoutSubmenu)(ItemWithSubmenu);
  }
);

/**
 * HOC, adds the local context menu to the given component
 * @param Sublist
 */
const withSubmenu = (Sublist: ComponentType<MenuSublistProps>) => (
  withDesign<ListDesignableComponents>({
    ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
    Item: withSubmenuToggle(asSublist(Sublist)),
  })
);

export default withSubmenu;
