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
  Fragment,
  ComponentType,
  FC,
  PropsWithChildren,
} from 'react';
import { flow } from 'lodash';
import { observer } from 'mobx-react-lite';
import { withNode, withOnlyProps } from '@bodiless/core';
import {
  designable, asComponent, addProps, withDesign,
} from '@bodiless/fclasses';
import { useItemsMutators, useItemsAccessors } from './model';
import {
  Props, FinalProps, ListDesignableComponents, ItemProps,
} from './types';

const NodeProvider = withNode<PropsWithChildren<{}>, any>(Fragment);
type ItemWithNodeProps = {
  nodeKey: string,
  component: ComponentType<any> | string,
};

const ItemWithNode: FC<ItemWithNodeProps&ItemProps> = props => {
  const { nodeKey, component: Component, ...rest } = props;
  return (
    <NodeProvider nodeKey={nodeKey}>
      <Component {...rest} />
    </NodeProvider>
  );
};

const startComponents: ListDesignableComponents = {
  Wrapper: asComponent('ul'),
  Item: asComponent('li'),
  // For title we have to strip the props if not wrapped.
  Title: withOnlyProps('key', 'children')(Fragment),
  ItemMenuOptionsProvider: Fragment,
};

const BasicList: FC<Props> = ({
  components,
  unwrap,
  onDelete,
  ...rest
}) => {
  const {
    Wrapper,
    Item,
    Title,
  } = components;

  const { addItem, deleteItem } = useItemsMutators({ unwrap, onDelete });
  const { getItems } = useItemsAccessors();
  const itemData = getItems();
  const canDelete = () => Boolean(getItems().length > 1 || unwrap);

  // Iterate over all items in the list creating list items.
  const items = itemData.map(item => (
    <ItemWithNode
      component={Item}
      key={item}
      nodeKey={item}
      addItem={() => addItem(item)}
      deleteItem={() => deleteItem(item)}
      canDelete={canDelete}
    >
      <Title />
    </ItemWithNode>
  ));
  return (
    <Wrapper {...rest}>
      {items}
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
  designable(startComponents, 'List'),
  withNode,
)(BasicList) as ComponentType<FinalProps>;
List.displayName = 'List';

export default List;
export { asTestableList };
