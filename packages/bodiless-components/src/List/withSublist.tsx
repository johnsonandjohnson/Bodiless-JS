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

import React, { ComponentType as CT, FC, PropsWithChildren } from 'react';
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
const withSublistToggle = (Sublist: CT<ListProps>) => (
  (Item: CT<PropsWithChildren<{}>> | string) => {
    const ItemWithSublist: FC<ListProps> = ({ children, ...rest }) => (
      <Item>
        {children}
        <Sublist {...rest} />
      </Item>
    );
    const ItemWithoutSublist: FC<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );
    return withToggleTo(ItemWithoutSublist)(ItemWithSublist);
  }
);

/**
 * Takes a component
 * returns a new component with sublist node key and sublist deletion on unwrap
 */
const withDeleteSublistOnUnwrap = <T extends ListProps>(Sublist: CT<T>) => (props: T) => {
  const { deleteSublist } = useItemsMutators();
  const { unwrap } = props;
  const unwrap$ = () => {
    deleteSublist();
    if (unwrap) {
      unwrap();
    }
  };
  return <Sublist {...props} unwrap={unwrap$} nodeKey="sublist" />;
};

/**
 * Takes a sublist component and returns a HOC which, when applied to a list,
 * adds a toggled version of the sublist to each item in the list.
 *
 * @param Sublist The sublist component to add to each item.
 */
const withSublist = (Sublist: CT<ListProps>) => withDesign<ListDesignableComponents>({
  ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
  Item: withSublistToggle(withDeleteSublistOnUnwrap(Sublist)),
});

export default withSublist;
export { withDeleteSublistOnUnwrap };
