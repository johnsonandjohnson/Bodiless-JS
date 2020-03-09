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
} from '@bodiless/components';

/**
 * HOC, takes a list component
 * extracts title from list, the title is in the list children
 * wraps the title with current node, otherwise the title will read data from list node
 * passes the title as a prop according to rc-menu <SubMenu /> api
 */

const asBurgerMenuSublist = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<any>) => {
    const ItemWithSublist: ComponentType<ListProps> = ({ ...props }) => (
      <Sublist {...props} />
    );
    const ItemWithoutSublist: ComponentType<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );
    return {
      ItemWithSublist,
      ItemWithoutSublist,
    };
  }
);

export default asBurgerMenuSublist;
