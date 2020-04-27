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

import React, { useState } from 'react';
import { asTaggableItem, withFilterByTags } from '@bodiless/components';
import {
  H2, Span, Button, addClasses,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import { TagType } from '@bodiless/core';

const TagButton = addClasses('px-2 mb-2 mr-2 border border-gray-600')(Button);
const TagSpan = addClasses('px-2 mb-2 mr-2')(Span);
const getSuggestions = () => [
  { id: 0, name: 'foo' },
  { id: 1, name: 'baz' },
  { id: 2, name: 'bat' },
  { id: 3, name: 'bar' },
];
const TaggableFilterableItem = flow(
  withFilterByTags,
  asTaggableItem(),
)(TagSpan);
const TaggableFilterSelector = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  const Buttons = getSuggestions().map(tag => (
    <TagButton key={tag.id} onClick={() => setTags([tag])}>
      {tag.name}
    </TagButton>
  ));
  const props = {
    getSuggestions,
    placeholder: 'Add or create',
    formTitle: 'Groups',
    seeAllText: 'See all groups',
    formBodyText: 'Select from available tags:',
    allowNew: true,
    noSuggestionsText: 'No suggestions found',
  };
  const FilterableItemsList = getSuggestions().map(tag => (
    <TaggableFilterableItem
      id={tag.name}
      {...props}
      nodeKey={tag.name}
      key={tag.id}
      selectedTags={tags}
    >
      {tag.name}
    </TaggableFilterableItem>
  ));
  return (
    <div>
      <div>
        <H2>Select a tag to filter by</H2>
        {Buttons}
        <TagButton id="show-all" onClick={() => setTags([])}>
          ALL
        </TagButton>
      </div>
      <div>
        <h2>Filtered Components</h2>
        {FilterableItemsList}
      </div>
    </div>
  );
};

export default TaggableFilterSelector;
