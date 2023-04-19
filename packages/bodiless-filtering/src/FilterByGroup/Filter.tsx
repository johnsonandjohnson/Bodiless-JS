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

/* eslint-disable arrow-body-style, max-len, @typescript-eslint/no-unused-vars */
import React, { FC } from 'react';
import flow from 'lodash/flow';
import isEmpty from 'lodash/isEmpty';
import {
  ifReadOnly,
  ifEditable,
  withContextActivator,
  withLocalContextMenu,
} from '@bodiless/core';
import {
  withNodeKey,
  withNode,
  withNodeDataHandlers,
} from '@bodiless/data';
import {
  designable,
  Div,
  Input,
  Label,
  withDesign,
  stylable,
  flowHoc,
  HOC,
  withoutProps,
  startWith,
  ComponentOrTag,
  ComponentWithMeta,
  Fieldset,
} from '@bodiless/fclasses';
import {
  asEditable,
  asBodilessList,
  asSubList, withDeleteNodeOnUnwrap,
  withSubLists,
} from '@bodiless/components';
import { TAG_ANY_KEY } from './FilterByGroupStore';
import {
  TagTitleProps,
  TagTitleComponents,
} from './types';
import { useFilterByGroupContext, withTagProps } from './FilterByGroupContext';
import { useTagsAccessors } from './FilterModel';
import { withCategoryListContextProvider, useCategoryListContext } from './CategoryListContext';
import withTagButton from '../TagButton/withTagButton';
import { CategoryTitleClean, asFilterCategoryRegion } from './FilterCategory';

const tagTitleComponentsStart: TagTitleComponents = {
  FilterInputWrapper: Div,
  FilterGroupItemInput: Input,
  FilterGroupItemPlaceholder: Label,
  FilterGroupItemLabel: Label,
};

const withUnselectOnDelete: HOC<{ onDelete?: any }> = Component => props => {
  const {
    clearSelectedTags,
  } = useFilterByGroupContext();

  const onDelete = () => {
    clearSelectedTags();
  };
  return <Component {...props} onDelete={onDelete} />;
};

const TagTitleBase: FC<TagTitleProps> = ({
  components,
  onChange,
  emptyTitleText = 'Select Tag...',
  ...rest
}) => {
  const {
    FilterGroupItemInput,
    FilterGroupItemLabel,
    FilterGroupItemPlaceholder,
    FilterInputWrapper,
  } = components;

  const { tag } = useTagsAccessors();
  const { categoryId } = useCategoryListContext();

  const {
    selectTag,
    isTagSelected,
    unSelectTag,
    multipleAllowedTags,
  } = useFilterByGroupContext();

  if (tag === undefined) return <></>;
  const checked = isTagSelected(tag);

  const onSelect = () => (isTagSelected(tag) ? unSelectTag(tag, onChange) : selectTag(tag, onChange));

  const htmlId = `filter-category-${categoryId}-input-${tag.id === TAG_ANY_KEY ? categoryId : tag.id}`;

  return (
    <FilterInputWrapper {...rest} key={tag.id}>
      <FilterGroupItemInput
        type={multipleAllowedTags ? 'checkbox' : 'radio'}
        name={categoryId}
        value={tag.id}
        id={htmlId}
        onChange={onSelect}
        checked={checked}
      />
      {
        isEmpty(tag.name) ? (
          <FilterGroupItemPlaceholder htmlFor={htmlId}>
            { emptyTitleText }
          </FilterGroupItemPlaceholder>
        ) : (
          <FilterGroupItemLabel htmlFor={htmlId}>
            { tag.name }
          </FilterGroupItemLabel>
        )
      }
    </FilterInputWrapper>
  );
};

const TagTitle = flow(
  withoutProps([
    'componentData',
    'onContextMenu',
    'getSuggestions',
    'allowMultipleTags',
    'noSuggestionsText',
    'seeAllText',
    'formTitle',
    'formBodyText',
    'selectedTags',
    'registerSuggestions',
  ]),
  ifEditable(
    withTagButton(() => ({
      groupMerge: 'merge-up',
      label: 'Name',
    })),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  ifReadOnly(withoutProps(['setComponentData'])),
  withTagProps({
    allowMultipleTags: false,
    placeholder: 'Add or Create',
    formTitle: 'Group Membership',
    formBodyText: 'Select from available groups:',
    seeAllText: 'View All Groups',
    noSuggestionsText: 'No matching groups found.',
  }),
  withNodeDataHandlers({ tags: [] }),
  withNode,
  withNodeKey('tag'),
  designable(tagTitleComponentsStart, 'TagTitle'),
)(TagTitleBase);

const asFilter = flowHoc(
  asBodilessList(undefined, undefined, () => ({ groupLabel: 'Category' })),
  withDesign({
    Title: flowHoc(
      startWith(CategoryTitleClean),
      asEditable('category_name', 'Category Name'),
    ),
    Item: flowHoc(
      stylable,
      withCategoryListContextProvider,
    ),
    Wrapper: stylable,
  }),
  withSubLists(1)(
    flowHoc(
      asSubList(() => ({ groupLabel: 'Group' })),
      withDeleteNodeOnUnwrap('sublist'),
      withUnselectOnDelete,
      withDesign({
        Title: startWith(TagTitle),
        Wrapper: flowHoc(
          startWith(Fieldset),
          stylable,
          asFilterCategoryRegion
        ),
        Item: startWith(Div)
      }),
    ),
  ),
);

type FilterProps = {
  design: {
    CategoryList: HOC,
    TagList: HOC,
  },
};

const withFilterDesignTransformer = <P extends object>(Component: ComponentOrTag<P & FilterProps>) => {
  class WithFilterDesignTransformer extends React.PureComponent {
    Filter: ComponentWithMeta<P> = React.Fragment;

    RestProps = {};

    constructor(props: P & FilterProps) {
      super(props);
      const { design, ...restProps } = props;
      const {
        CategoryList: withCategoryListDesign,
        TagList: withTagListDesign,
        ...restDesignProps
      } = design;
      this.RestProps = {
        ...restProps,
        design: restDesignProps,
      };
      // @ts-ignore
      this.Filter = flowHoc(
        withCategoryListDesign,
        withDesign({
          Item: flowHoc(
            withDesign({
              SubList: withTagListDesign,
            }),
          ),
        }),
      )(Component);
    }

    render() {
      return (<this.Filter {...this.RestProps as P} />);
    }
  }

  return WithFilterDesignTransformer;
};

const FilterClean = flowHoc(
  asFilter,
  withFilterDesignTransformer as HOC,
  // This probably should not be in Clean...
  withNodeKey('filter'),
)('ul');

export default FilterClean;
