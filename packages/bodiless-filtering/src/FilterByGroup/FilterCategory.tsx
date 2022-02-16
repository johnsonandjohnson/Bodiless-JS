import {
  Token, H3, StylableProps, DesignableComponentsProps, designable
} from '@bodiless/fclasses';
import React, {
  ComponentType, FC, HTMLProps,
} from 'react';
import { useCategoryListContext } from './CategoryListContext';

const asFilterCategoryRegion: Token = Component => props => {
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
