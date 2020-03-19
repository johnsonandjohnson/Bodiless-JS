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
import React, {
  ComponentType,
} from 'react';
import {
  ListProps,
  withToggleTo,
} from '@bodiless/components';
import {
  useNode,
  NodeProvider,
} from '@bodiless/core';

/**
 * Takes a sublist component and returns a HOC which, when applied to a rc-menu item,
 * adds a toggled version of the sublist to the rc-menu item.
 *
 * @param Sublist The sublist component to add to each item.
 */
const asRCMenuSublist = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<any>) => {
    const ItemWithSublist: ComponentType<ListProps> = ({ children, ...rest }) => {
      // prepare and pass the submenu title as a prop according to rc-menu <SubMenu /> specification
      // wrap the title with current node,
      // otherwise the title will read data from incorrect node when it is rendered by <SubMenu />
      const { node } = useNode();
      const children$ = <NodeProvider node={node}>{children}</NodeProvider>;
      return (
        <Sublist title={children$} {...rest as any} />
      );
    };
    const ItemWithoutSublist: ComponentType<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );
    return withToggleTo(ItemWithoutSublist)(ItemWithSublist);
  }
);

export default asRCMenuSublist;
