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

import {
  useListContext,
} from '@bodiless/components';
import { useCategoryListContext } from './CategoryListContext';
import { Tag, TAG_ANY_KEY } from './FilterByGroupStore';
import { useTagsAccessors as useBaseTagsAccessors } from '../TagButton';

/* eslint-disable import/prefer-default-export */

const TAG_ANY_LABEL = '- Any -';

const useTagsAccessors = () => {
  const { categoryId, categoryName } = useCategoryListContext();
  const { currentItem } = useListContext();
  let { tag } = useBaseTagsAccessors();
  if (currentItem === TAG_ANY_KEY) {
    tag = {
      value: TAG_ANY_KEY,
      label: TAG_ANY_LABEL,
    };
  }
  return {
    tag: new Tag(tag.value ? tag.value.toString() : tag.label, tag.label, categoryId, categoryName),
  };
};

export {
  useTagsAccessors,
};
