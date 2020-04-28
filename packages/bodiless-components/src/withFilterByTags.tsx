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

import {
  withoutProps,
  ifToggledOn,
  ifToggledOff,
  TagType,
} from '@bodiless/core';
import { replaceWith } from '@bodiless/fclasses';
import { flowRight, differenceWith } from 'lodash';
import useTagsAccessors from './TagButton/TagModel';

type ToggleByTagsProps = {
  selectedTags: TagType[];
};

/**
 * Determine which component to show based on selected tags.
 * @param selectedTags
 *  The selected tags to use.
 */
const useToggleByTags = <P extends object>({
  selectedTags,
}: P & ToggleByTagsProps) => {
  const { getTags } = useTagsAccessors();
  const tags = getTags();
  return (
    differenceWith(
      selectedTags,
      tags,
      (selectedTag, itemTag) => selectedTag.name === itemTag.name,
    ).length === 0
  );
};

const ifTagsSelected = ifToggledOn(useToggleByTags);
const ifTagsNotSelected = ifToggledOff(useToggleByTags);

const withFilterByTags = flowRight(
  ifTagsNotSelected(replaceWith(() => null)),
  withoutProps(['selectedTags']),
);

export { ifTagsSelected, ifTagsNotSelected };
export default withFilterByTags
