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
} from 'react';
import {
  ListProps,
  withToggleButton,
  withToggleTo,
  ListDesignableComponents,
  asSublist,
} from '@bodiless/components';
import { withDesign } from '@bodiless/fclasses';
import {
  useNode,
  withNode,
  withNodePath,
} from '@bodiless/core';
import { flow } from 'lodash';

const withBurgerSubmenuToggle = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<PropsWithChildren<{}>> | string) => {
    const ItemWithSubmenu: FC<ListProps> = props => {
      const { node } = useNode();
      const Sublist1 = withDesign({
        Title: flow(
          withNode,
          withNodePath(node.path),
        ),
      })(Sublist);
      return <Sublist1 {...props} />;
    };
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
const withBurgerSubmenu = (Sublist: ComponentType<ListProps>) => (
  withDesign<ListDesignableComponents>({
    ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
    Item: withBurgerSubmenuToggle(asSublist(Sublist)),
  })
);

export default withBurgerSubmenu;
