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
import React, { FC, ComponentType, HTMLProps } from 'react';
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
  useTagsAccessors,
  ifViewportIs,
  ifViewportIsNot,
} from '@bodiless/components';
import {
  TagTitleProps,
  TagTitleComponents,
  FilterProps,
  FilterComponents,
} from './types';
import { useFilterByGroupContext, withTagProps } from './FilterByGroupContext';
import { asExpandedOnDesktopBody } from './token';
import { withAccordionSublist } from '../Accordion';

const tagTitleComponentsStart: TagTitleComponents = {
  FilterInputWrapper: Div,
  FilterGroupItemInput: Input,
  FilterGroupItemPlaceholder: Label,
  FilterGroupItemLabel: Label,
};

const withUnselectOnDelete = <P extends object>(Component: ComponentType<P>) => (props: P) => {
  const {
    setSelectedNode,
    setSelectedTag,
  } = useFilterByGroupContext();

  const onDelete = (deletedItem: any) => {
    setSelectedTag();
    setSelectedNode();
  };
  return <Component {...props} onDelete={onDelete} />;
};

const TagTitleBase: FC<TagTitleProps> = ({
  components,
  emptyTitleText = 'Select Tag...',
  ...rest
}) => {
  const {
    FilterGroupItemInput,
    FilterGroupItemLabel,
    FilterGroupItemPlaceholder,
    FilterInputWrapper,
  } = components;

  const { tag, nodeId } = useTagsAccessors();
  const {
    selectedTag,
    selectedNode,
    setSelectedNode,
    setSelectedTag,
  } = useFilterByGroupContext();

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
          ? (<FilterGroupItemPlaceholder htmlFor={nodeId}>{ emptyTitleText }</FilterGroupItemPlaceholder>)
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
    'noSuggestionsText',
    'seeAllText',
    'formTitle',
    'formBodyText',
    'selectedTags',
    'registerSuggestions',
  ]),
  ifEditable(
    withTagButton,
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

const TestFilterComponentsStart: FilterComponents = {
  CategoryList: flow(
    asEditableList,
    withDesign({
      Title: flow(
        replaceWith(H3),
        asEditable('category_name', 'Category Name'),
        // cast is necessary bc asEditable produces a component whose children prop is a string.
      ) as (C: ComponentType<any>) => ComponentType<any>,
      Item: stylable,
      Wrapper: stylable,
    }),
  )(List),
  TagList: flow(
    withUnselectOnDelete,
    asEditableList,
    withDesign({
      Title: replaceWith(TagTitle),
      Wrapper: stylable,
    }),
  )(List),
};

class FilterBase extends React.PureComponent {
  Filter: ComponentType<HTMLProps<HTMLHeadingElement>> = Div;

  RestProps = {};

  constructor(props: FilterProps) {
    super(props);
    const { components, ...rest } = props;
    const { TagList, CategoryList } = components;

    const AccordionTagList = asExpandedOnDesktopBody(TagList);

    this.RestProps = rest;
    this.Filter = flow(
      ifViewportIs(['lg', 'xl', 'xxl'])(withBasicSublist(TagList)),
      ifViewportIsNot(['lg', 'xl', 'xxl'])(withAccordionSublist(AccordionTagList)),
    )(CategoryList);
  }

  render() {
    return (<this.Filter {...this.RestProps} />);
  }
}

const FilterClean = flow(
  withNodeKey('filter'),
  designable(TestFilterComponentsStart, 'Filter'),
)(FilterBase);

export default FilterClean;
