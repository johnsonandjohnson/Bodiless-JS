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
import { useFormApi, Text } from 'informed';
import { isEmpty } from 'lodash';
import ReactTags, { ReactTagsProps, Tag as ReactTagType } from 'react-tag-autocomplete';

export type TagType = {
  id: string | number,
  name: string,
} | ReactTagType;

class Tag {
  readonly id: string = v4();

  name: string = '';

  constructor(name: string = '') {
    this.name = name;
  }
}

export type ReactTagsFieldProps = {
  allowMultipleTags?: boolean,
} & Omit<ReactTagsProps, 'handleDelete' | 'handleAddition'>;

const ReactTagsField = (props: ReactTagsFieldProps) => {
  const formApi = useFormApi();
  const currentTags = formApi.getValue<TagType[]>('tags') || [];
  const { allowMultipleTags, ...rest } = props;

  const handleAddition = (tag: TagType) => {
    let tagToAdd = tag;

    if (typeof tagToAdd.id !== 'number' && isEmpty(tagToAdd.id)) {
      tagToAdd = new Tag(tag.name);
    }

    const newTags = allowMultipleTags ? [...currentTags, tagToAdd] : [tagToAdd];
    formApi.setValue('tags', newTags);
  };

  const handleDelete = (i: number) => {
    const newTags = currentTags.slice(0);
    newTags.splice(i, 1);
    formApi.setValue('tags', newTags);
  };

  return (
    <>
      <Text type="hidden" field="tags" />
      <ReactTags
        {...rest}
        tags={currentTags}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
      />
    </>
  );
};

export default ReactTagsField;
export {
  Tag as BodilessTag,
};
