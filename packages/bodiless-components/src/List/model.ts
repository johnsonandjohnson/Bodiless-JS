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

import { v4 } from 'uuid';
import { useNode } from '@bodiless/data';
import { ListData, ListBaseProps } from './types';

/**
 * Returns a pair of functions which can be used to get or set
 * the items in the component's ContentNode.
 */
export const useItemsAccessors = () => {
  const { node } = useNode<ListData>();
  return {
    // We provide a default element for top level lists.
    getItems: () => node?.data?.items || ['default'],
    setItems: (items: string[]) => node.setData({ ...node.data, items }),
    deleteSubnode: (item?: string) => {
      const path$ = item ? node.path.concat(item) : node.path;
      return node.delete(path$);
    },
  };
};

/**
 * Returns a method which can be used to delete an item, or call
 * an "unwrap" handler if there is only one item in the list.
 */
const useDeleteItem = ({ unwrap, onDelete }: Pick<ListBaseProps, 'unwrap' | 'onDelete'>) => {
  const { getItems, setItems, deleteSubnode } = useItemsAccessors();
  return (item: string) => {
    const items = getItems().filter(item$ => item$ !== item);
    setItems(items);
    deleteSubnode(item);
    if (onDelete) {
      onDelete(item);
    }
    if (items.length === 0 && unwrap) {
      unwrap();
    }
  };
};

/**
 * Returns a method which can be used to delete a sublist
 */
const useDeleteSublist = () => {
  const { deleteSubnode } = useItemsAccessors();
  return () => deleteSubnode('sublist');
};

/**
 * Returns a method which can be used to add an item after the specified
 * item.
 */
const useAddItem = () => {
  const { getItems, setItems } = useItemsAccessors();
  return (item: string) => {
    const items = getItems();
    const index = items.findIndex(item$ => item$ === item);
    const newItemId = v4();
    const newItems = [
      ...items.slice(0, index + 1),
      newItemId,
      ...items.slice(index + 1),
    ];
    setItems(newItems);

    return newItemId;
  };
};

const useMoveItem = () => {
  const { getItems, setItems } = useItemsAccessors();
  return (item: string, offset: number) => {
    const items = getItems();
    const newItems: Array<string> = items.filter(i => i !== item);
    const index = items.findIndex(i => i === item);
    const newIndex = index + offset;
    if (newIndex <= 0) newItems.splice(0, 0, item);
    else if (newIndex >= items.length - 1) newItems.push(item);
    else newItems.splice(newIndex, 0, item);
    setItems(newItems);
  };
};

/**
 * Returns a set of functions which can be used to insert, move
 * or delete items.
 */
export const useItemsMutators = (props?: Pick<ListBaseProps, 'unwrap' | 'onDelete'>) => ({
  addItem: useAddItem(),
  deleteItem: useDeleteItem(props || { unwrap: undefined, onDelete: undefined }),
  moveItem: useMoveItem(),
  deleteSublist: useDeleteSublist(),
});
