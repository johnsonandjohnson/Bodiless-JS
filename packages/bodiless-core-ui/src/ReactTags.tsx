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

import React, { ComponentType } from 'react';
import { ReactTagsField as ReactTagsFieldClean, ReactTagsFieldProps } from '@bodiless/core';

const ReactTagsField: ComponentType<ReactTagsFieldProps> = props => {
  const classes = {
    root: `
      bl-flex bl-relative bl-flex-col-reverse bl-rounded-sm bl-text-xs
      bl-leading-tight bl-cursor-text bl-gray-900`,
    rootFocused: 'is-focused',
    selected: 'bl-max-w-xl-grid-1 bl-inline',
    selectedTag: `
      bl-inline-block bl-box-border bl-mr-grid-1 bl-mb-grid-1
      bl-py-grid-1 bl-px-grid-2 bl-border bl-border-solid
      bl-border-gray-400 bl-gray-900 bl-rounded-sm bl-bg-gray-100
      bl-react-tags__selected-tag`,
    selectedTagName: 'bl-text-gray-900',
    search: 'bl-inline-block bl-py-grid-1 bl-px-grid-0 bl-mb-grid-1 bl-max-w-full bl-min-w-xl-grid-1',
    searchInput: 'bl-text-gray-900 bl-react-tags__search-input',
    suggestions: 'bl-text-gray-900 bl-absolute bl-top-full bl-w-full bl-left-grid-0 bl-z-10 bl-react-tags__suggestions',
    suggestionActive: 'is-active',
    suggestionDisabled: 'is-disabled',
  };

  return (
    <ReactTagsFieldClean
      classNames={classes}
      autoresize={false}
      {...props}
    />
  );
};

export default ReactTagsField;
