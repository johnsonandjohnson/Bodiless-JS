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

import React, { ComponentType, FC, PropsWithChildren } from 'react';
import { withDesign } from '@bodiless/fclasses';
import { withToggleButton, withToggleTo } from '../Toggle';
import { FinalProps as ListProps, ListDesignableComponents } from './types';
import { useItemsMutators } from './model';

/**
 * Takes a sublist component and return=s a HOC to add a toggled version
 * of it to a list item.
 *
 * @param Item The item to which the toggle should be added.
 */
const withSublistToggle = (Sublist: ComponentType<ListProps>) => (
  (Item: ComponentType<PropsWithChildren<{}>> | string) => {
    const ItemWithSublist: FC<ListProps> = ({ children, unwrap }) => {
      const { deleteList } = useItemsMutators();
      const unwrap$ = () => {
        deleteList('sublist');
        if (unwrap) {
          unwrap();
        }
      };
      return (
        <Item>
          {children}
          <Sublist unwrap={unwrap$} nodeKey="sublist" />
        </Item>
      );
    };
    return withToggleTo(Item)(ItemWithSublist);
  }
);

/**
 * Takes a sublist component and returns a HOC which, when applied to a list,
 * adds a toggled version of the sublist to each item in the list.
 *
 * @param Sublist The sublist component to add to each item.
 */
const withSublist = (Sublist: ComponentType<ListProps>) => withDesign<ListDesignableComponents>({
  ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
  Item: withSublistToggle(Sublist),
});

export default withSublist;
