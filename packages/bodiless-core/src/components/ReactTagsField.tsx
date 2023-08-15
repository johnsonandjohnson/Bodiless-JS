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

import React from 'react';
import { v4 } from 'uuid';
import { useFieldApi, Input, useFieldState } from 'informed';
import { ReactTags, ReactTagsProps, Tag as TagType } from 'react-tag-autocomplete';

class Tag {
  readonly value: string = v4();

  label: string = '';

  constructor(label: string = '') {
    this.label = label;
  }
}

export type ReactTagsFieldProps = {
  allowMultipleTags?: boolean,
} & Omit<ReactTagsProps, 'onDelete' | 'onAdd'>;

const ReactTagsField = (props: ReactTagsFieldProps) => {
  const { setValue } = useFieldApi('tags');
  const { value } = useFieldState('tags');
  const currentTags = value as TagType[] || [];
  const { allowMultipleTags, ...rest } = props;

  const handleAddition = (tag: TagType) => {
    let tagToAdd = tag;

    if (!tag.value) {
      tagToAdd = new Tag(tag.label);
    }
    if (!currentTags.some(currentTag => currentTag.label === tagToAdd.label)) {
      const newTags = allowMultipleTags ? [...currentTags, tagToAdd] : [tagToAdd];
      setValue(newTags);
    }
  };

  const handleDelete = (i: number) => {
    const newTags = currentTags.slice(0);
    newTags.splice(i, 1);
    setValue(newTags);
  };

  return (
    <>
      <Input type="hidden" name="tags" />
      <ReactTags
        {...rest}
        selected={currentTags}
        onDelete={handleDelete}
        onAdd={handleAddition}
      />
    </>
  );
};

export default ReactTagsField;
export {
  TagType,
  Tag as BodilessTag,
};
