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
} from '@bodiless/components';
import { withDesign } from '@bodiless/fclasses';


const withSubmenuToggle = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<PropsWithChildren<{}>> | string) => {
    const ItemWithoutSubmenu: FC<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );
    return withToggleTo(ItemWithoutSubmenu)(Sublist);
  }
);

/**
 * HOC, adds the local context menu to the given component
 * @param Sublist
 */
const withSubmenu = (Sublist: ComponentType<ListProps>) => (
  withDesign<ListDesignableComponents>({
    ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
    Item: withSubmenuToggle(Sublist),
  })
);

export default withSubmenu;
