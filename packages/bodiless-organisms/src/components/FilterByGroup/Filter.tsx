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
import React, { FC, ComponentType as CT } from 'react';
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
} from '@bodiless/components';
import {
  TagTitleProps,
  TagTitleComponents,
  FilterProps,
  FilterComponents,
} from './types';
import { useItemsAccessors } from './FilterByGroupModel';
import { useFilterByGroupContext } from './FilterByGroupContext';

const tagTitleComponentsStart: TagTitleComponents = {
  FilterInputWrapper: Div,
  FilterGroupItemInput: Input,
  FilterGroupItemPlaceholder: Label,
  FilterGroupItemLabel: Label,
};

const withTagButtonProps = <P extends object>(Component: CT<P>) => (props: P) => {
  const { getSuggestions } = useFilterByGroupContext();

  const tagButtonProps = {
    allowMultipleTags: false,
    getSuggestions,
  };

  return <Component {...props} {...tagButtonProps} />;
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

  useRegisterSuggestions()([tag]);

  const onSelect = () => {
    setSelectedNode(nodeId);
    setSelectedTag(tag);
  };

  const isSelectedTagUpdated = (selectedTag && selectedNode)
    && (nodeId === selectedNode)
    && (tag.id !== selectedTag.id);

  if (isSelectedTagUpdated) {
    setSelectedTag(tag);
    setSelectedNode(nodeId);
  }

  /**
   * TODO:
   *
   * 'checked' in FilterGroupItemInput doesn't get re-rendered right away in Edit mode
   * since local context menu "steals" click. It is still updated in context
   * and working as expected. Select input gest updated once we hide localContextMenu.
   */
  const isTagSelected = Boolean(selectedTag && selectedTag.id === tag.id);
  const isNodeSelected = Boolean(selectedNode === nodeId);

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
          ? (<FilterGroupItemPlaceholder htmlFor={nodeId}>Select tag...</FilterGroupItemPlaceholder>)
          : (<FilterGroupItemLabel htmlFor={nodeId}>{ tag.name }</FilterGroupItemLabel>)
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
  ]),
  ifEditable(
    withTagButton(),
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  ifReadOnly(withoutProps(['setComponentData'])),
  withTagButtonProps,
  withNodeDataHandlers({ tags: [] }),
  withNode,
  withNodeKey('tag'),
  designable(tagTitleComponentsStart),
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

class FilterBase extends React.PureComponent {
  Filter = Div;

  RestProps = {};

  constructor(props: FilterProps) {
    super(props);
    const { components, ...rest } = props;
    const { TagList, CategoryList } = components;

    this.RestProps = rest;
    this.Filter = withBasicSublist(TagList)(CategoryList);
  }

  render() {
    return (<this.Filter {...this.RestProps} />);
  }
}

const FilterClean = flow(
  withNodeKey('filter'),
  designable(TestFilterComponentsStart),
)(FilterBase);

export default FilterClean;
