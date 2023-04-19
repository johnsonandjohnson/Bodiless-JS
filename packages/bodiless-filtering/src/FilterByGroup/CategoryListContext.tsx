/**
 * Copyright © 2021 Johnson & Johnson
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
  createContext,
  useContext,
} from 'react';
import { useNode } from '@bodiless/data';
import { useListContext } from '@bodiless/components';
import type { ComponentOrTag } from '@bodiless/fclasses';

type CategoryListContextType = {
  categoryId?: string,
  categoryName?: string,
};

const CategoryListContext = createContext<CategoryListContextType>({});
const useCategoryListContext = () => useContext(CategoryListContext);

const withCategoryListContextProvider = (Component: ComponentOrTag<any>) => {
  const WithCategoryListContextProvider = (props: any) => {
    const { currentItem } = useListContext();
    // Grab the categoryName from the node and pass it to the context.
    const { node } = useNode();
    const categoryNameNodePath = node.peer<{ text: string }>([
      ...node.path.slice(0, node.path.length - 1),
      'category_name',
    ]);

    const categoryListValue = {
      categoryId: currentItem,
      categoryName: categoryNameNodePath.data.text,
    };

    return (
      <CategoryListContext.Provider value={categoryListValue}>
        <Component {...props} />
      </CategoryListContext.Provider>
    );
  };
  return WithCategoryListContextProvider;
};

export {
  useCategoryListContext,
  withCategoryListContextProvider,
};
