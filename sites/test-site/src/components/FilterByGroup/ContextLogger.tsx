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

import React, { useState, useRef } from 'react';
import {
  Div, Button, addClasses, flowHoc, ComponentOrTag,
} from '@bodiless/fclasses';
import {
  useFilterByGroupContext,
  withTagProps,
  Tag,
} from '@bodiless/filtering';
import { BodilessTag, TagType } from '@bodiless/core';

const AddButton = addClasses('px-2 mb-2 mr-2 border border-gray-600')(Button);
const TagComponent = addClasses('px-3 my-2 mr-2 mb-2 border border-gray-600 inline-block')(Div);

const ContextLoggerBase: ComponentOrTag<any> = () => {
  const { getSuggestions, useRegisterSuggestions, getSelectedTags } = useFilterByGroupContext();
  const [allSuggestions, setAllSuggestions] = useState(getSuggestions());
  const registerSuggestions = useRegisterSuggestions();

  const randomSuggestions = useRef([] as TagType[]);

  const tagElements = allSuggestions.map(tag => (
    <TagComponent key={tag.value}>{ tag.label || ' - ' }</TagComponent>
  ));

  const addRandomTag = () => {
    /* eslint-disable no-bitwise */
    const newTag = new BodilessTag(`#${(Math.random() * 0xFFFFFF << 0).toString(16)}`);
    randomSuggestions.current.push(newTag);
    registerSuggestions(randomSuggestions.current.map(
      tag => new Tag((tag.value || '').toString(), tag.label)
    ));
    setAllSuggestions(getSuggestions());
  };

  return (
    <Div>
      <AddButton onClick={() => addRandomTag()}>Add Random Tag</AddButton>
      <AddButton onClick={() => setAllSuggestions(getSuggestions())}>Refresh</AddButton>
      <br />
      <strong>Selected Tag: </strong>
      <pre>
        {JSON.stringify(getSelectedTags(), null, 2)}
      </pre>

      <strong>All Tags: </strong>
      <Div>
        { tagElements }
        <pre>
          {JSON.stringify(allSuggestions, null, 2)}
        </pre>
      </Div>

    </Div>
  );
};

const ContextLogger = flowHoc(
  withTagProps(),
)(ContextLoggerBase);

export default ContextLogger;
export {
  ContextLogger,
};
