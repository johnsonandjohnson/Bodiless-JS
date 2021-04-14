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
  useMemo,
} from 'react';
import { flow } from 'lodash';
import { observer } from 'mobx-react-lite';
import { withNode } from '@bodiless/core';
import {
  designable, asComponent, addProps, withDesign, Fragment,
} from '@bodiless/fclasses';
import { useItemsMutators, useItemsAccessors } from './model';
import {
  ListBaseProps, ListProps, ListComponents, ListContextValue,
} from './types';

const ListContext = React.createContext<ListContextValue>({});
const useListContext = () => React.useContext(ListContext);

const ListItemNodeProvider = withNode<any, any>(Fragment);

const listComponents: ListComponents = {
  Wrapper: asComponent('ul'),
  Item: asComponent('li'),
  Title: Fragment,
};

const ListBase: FC<ListBaseProps> = ({
  components,
  unwrap,
  onDelete,
  prependItems = [],
  appendItems = [],
  ...rest
}) => {
  const {
    Wrapper,
    Item,
    Title,
  } = components;

  const { addItem, deleteItem } = useItemsMutators({ unwrap, onDelete });
  const { getItems } = useItemsAccessors();
  const dataItems = getItems();
  const items = [
    ...prependItems,
    ...dataItems,
    ...appendItems,
  ];

  // We memoize the whole array to avoid conditional hooks...
  const contextValues: ListContextValue[] = useMemo(
    () => items.map(currentItem => {
      const value: ListContextValue = { items, currentItem };
      // Can only insert items after items that come from data or after the final prepend item.
      if (dataItems.includes(currentItem)
        || currentItem === prependItems[prependItems.length - 1]
      ) {
        value.addItem = () => addItem(currentItem);
      }
      // Can only delete items which are not static and only if it would not empty the list.
      if (dataItems.includes(currentItem)
        && (dataItems.length > 1 || unwrap || items.length > dataItems.length)
      ) {
        value.deleteItem = () => deleteItem(currentItem);
      }

      return value;
    }),
    [dataItems, prependItems, appendItems],
  );

  // Iterate over all items in the list creating list items.
  const itemElements = items.map((currentItem, i) => (
    <ListContext.Provider key={currentItem} value={contextValues[i]}>
      <ListItemNodeProvider nodeKey={currentItem}>
        <Item>
          <Title />
        </Item>
      </ListItemNodeProvider>
    </ListContext.Provider>
  ));

  return (
    <Wrapper {...rest}>
      {itemElements}
    </Wrapper>
  );
};

const asTestableList = (listName: string) => withDesign({
  Wrapper: addProps({ 'data-list-element': listName }),
  Title: addProps({ 'data-list-element': 'title' }),
  Item: addProps({ 'data-list-element': 'item' }),
});

/**
 * A List component.
 */
const List = flow(
  observer,
  designable(listComponents, 'List'),
  withNode,
)(ListBase) as ComponentType<ListProps>;
List.displayName = 'List';

export default List;
export { asTestableList, useListContext };
