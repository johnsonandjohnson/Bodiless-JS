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

import React, { FC } from 'react';
import differenceWith from 'lodash/differenceWith';
import isEmpty from 'lodash/isEmpty';
import omit from 'lodash/omit';
import negate from 'lodash/negate';
import { useNode } from '@bodiless/core';
import {
  Enhancer, flowIf,
} from '@bodiless/fclasses';

import type { WithFilterByTagsProps } from './types';
import { useFilterByGroupContext, useRegisterItem } from './FilterByGroupContext';
import { TAG_ANY_KEY } from './FilterByGroupStore';
import { useTagsAccessors } from '../TagButton';

/**
 * @private
 * Determine whether a component should be displayed based on currently selected
 * tags.
 *
 * @param selectedTags
 * The selected tags to use.
 *
 * @returns
 * True if the component should be displayed, false otherwise.
 */
const useToggleByTags = ({ selectedTags }: WithFilterByTagsProps) => {
  const { multipleAllowedTags } = useFilterByGroupContext();
  const { getTags } = useTagsAccessors();
  const tags = getTags();

  // Show all items if there is no selected tag.
  if (isEmpty(selectedTags)) {
    return true;
  }

  if (multipleAllowedTags) {
    const selectedCategories = tags.reduce((prev, curr) => {
      const selectedTag = selectedTags.find(tag => tag.id === curr.id);
      const categoryId = selectedTag ? selectedTag.categoryId : undefined;
      return {
        ...prev,
        ...(
          categoryId ? {
            [categoryId]: true,
          } : {}
        ),
      };
    }, {}) as { [category: string]: boolean };

    return selectedTags
      .find(selectedTag => !selectedCategories[selectedTag.categoryId]) === undefined;
  }

  return (
    differenceWith(
      selectedTags,
      tags,
      (selectedTag, itemTag) => (selectedTag.id === TAG_ANY_KEY || selectedTag.id === itemTag.id),
    ).length === 0
  );
};

/**
 * Flow toggle to apply HOCs only if an item has all selected tags.
 */
const ifTagsSelected = flowIf(useToggleByTags);

/**
 * Flow toggle to apply HOCs only if an item does not have all selected tags.
 */
const ifTagsNotSelected = flowIf(negate(useToggleByTags));

/**
 * HOC to make an item filterable by tags. Must be applied with access to the
 * node containing the item's tags, and within the FilterByGroup context.
 */
const withFilterByTags: Enhancer<WithFilterByTagsProps> = Component => {
  const WithFilterByTags: FC<any> = (props: WithFilterByTagsProps) => {
    const { node } = useNode();
    const [id] = node.path.slice(-2);
    const isDisplayed = useToggleByTags(props);
    const { getFilteredItemData = () => {}, ...rest } = props;
    useRegisterItem({ id, isDisplayed, data: getFilteredItemData(node) });
    return isDisplayed ? <Component {...omit(rest, 'selectedTags') as any} /> : <></>;
  };
  return WithFilterByTags;
};

export { ifTagsSelected, ifTagsNotSelected, useToggleByTags };
export default withFilterByTags;
