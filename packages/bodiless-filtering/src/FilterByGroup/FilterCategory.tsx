/**
 * Copyright © 2022 Johnson & Johnson
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

import {
  H3, StylableProps, DesignableComponentsProps, designable, HOC
} from '@bodiless/fclasses';
import React, {
  ComponentType, FC, HTMLProps,
} from 'react';
import { useCategoryListContext } from './CategoryListContext';

const asFilterCategoryRegion: HOC = Component => props => {
  const { categoryId } = useCategoryListContext();

  return (
    <Component
      role="region"
      aria-labelledby={`filter-category-${categoryId}`}
      {...props}
    />
  );
};

type FilterCategoryTitleComponents = {
  Title: ComponentType<StylableProps & HTMLProps<HTMLHeadingElement>>
};

const filterCategoryTitleComponents: FilterCategoryTitleComponents = {
  Title: H3
};

const FilterCategoryTitleBase: FC<DesignableComponentsProps<FilterCategoryTitleComponents>> = ({
  components, ...props
}) => {
  const { Title } = components;
  const { categoryId } = useCategoryListContext();

  return (
    <Title
      id={`filter-category-${categoryId}`}
      tabIndex={0}
      {...props}
    />
  );
};

const CategoryTitleClean = designable(filterCategoryTitleComponents, 'CategoryTitle')(FilterCategoryTitleBase);

export {
  CategoryTitleClean,
  asFilterCategoryRegion,
};
