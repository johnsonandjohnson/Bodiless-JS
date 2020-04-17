/**
 * Copyright © 2020 Johnson & Johnson
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
import { flow, isEmpty } from 'lodash';
import {
  withNodeKey,
  withNode,
  withNodeDataHandlers,
  ifReadOnly,
  withoutProps,
  ifEditable,
  withContextActivator,
  withLocalContextMenu,
} from '@bodiless/core';
import {
  designable,
  Div,
  H3,
  Input,
  Label,
  withDesign,
  replaceWith,
  stylable,
} from '@bodiless/fclasses';
import {
  List,
  asEditable,
  asEditableList,
  withBasicSublist,
  withTagButton,
  TagButtonOptions,
} from '@bodiless/components';
import {
  TagTitleProps,
  TagTitleComponents,
  FilterProps,
  FilterComponents,
} from './types';
import { useItemsAccessors } from './FilterByGroupModel';
import { useFilterByGroupContext, withRegisterSuggestions } from './FilterByGroupContext';

const tagTitleComponentsStart: TagTitleComponents = {
  FilterInputWrapper: Div,
  FilterGroupItemInput: Input,
  FilterGroupItemPlaceholder: Label,
  FilterGroupItemLabel: Label,
};

const useWithTagButton = () => {
  // const { getSuggestions } = useFilterByGroupContext();

  const tagButtonOptions: TagButtonOptions = {
    getSuggestions: () => [],
    allowMultipleTags: false,
  };

  return withTagButton(tagButtonOptions);
};

const TagTitleBase: FC<TagTitleProps> = ({ components, ...rest }) => {
  const {
    FilterGroupItemInput,
    FilterGroupItemLabel,
    FilterGroupItemPlaceholder,
    FilterInputWrapper,
  } = components;

  const { tag, nodeId } = useItemsAccessors();
  const {
    selectedTag,
    selectedNode,
    setSelectedNode,
    setSelectedTag,
    useRegisterSuggestions,
  } = useFilterByGroupContext();

  const onSelect = () => {
    setSelectedNode(nodeId);
    setSelectedTag(tag);
  };

  const isTagSelected = Boolean(selectedTag && selectedTag.id === tag.id);
  const isNodeSelected = Boolean(selectedNode === nodeId);


  /**
   * TODO:
   *
   * Since FilterList below defined inside render fn
   * useRegisterSuggestions() creates new Ref each re-render
   */
  useRegisterSuggestions()([tag]);

  return (
    <FilterInputWrapper {...rest} key={tag.id}>
      <FilterGroupItemInput
        type="radio"
        name="filter-item"
        value={tag.id}
        id={nodeId}
        onChange={() => onSelect()}
        checked={isNodeSelected && isTagSelected}
      />
      {
        isEmpty(tag.name)
          ? (<FilterGroupItemPlaceholder>Select tag...</FilterGroupItemPlaceholder>)
          : (<FilterGroupItemLabel>{ tag.name }</FilterGroupItemLabel>)
      }
    </FilterInputWrapper>
  );
};

const TagTitle = flow(
  designable(tagTitleComponentsStart),
  withoutProps(['componentData', 'onContextMenu']),
  ifEditable(
    useWithTagButton(),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  ifReadOnly(withoutProps(['setComponentData'])),
  withNodeDataHandlers({ tags: [] }),
  withNode,
  withNodeKey('tag'),
)(TagTitleBase);

const TestFilterComponentsStart: FilterComponents = {
  CategoryList: flow(
    asEditableList,
    withDesign({
      Title: flow(
        replaceWith(H3),
        asEditable('category_name', 'Category Name'),
      ),
    }),
  )(List),
  TagList: flow(
    asEditableList,
    withDesign({
      Title: replaceWith(TagTitle),
      Wrapper: stylable,
    }),
  )(List),
};

const Filter: FC<FilterProps> = ({ components }) => {
  const { CategoryList, TagList } = components;

  // TODO: Still inside render fn
  const FilterList = withBasicSublist(TagList)(CategoryList);

  return (<FilterList nodeKey="filter" />);
};

const FilterClean = flow(
  designable(TestFilterComponentsStart),
)(Filter);

export default FilterClean;
