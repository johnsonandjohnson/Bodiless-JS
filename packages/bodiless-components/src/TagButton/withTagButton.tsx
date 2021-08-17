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

import React, { HTMLProps } from 'react';
import isEmpty from 'lodash/isEmpty';
import {
  EditButtonOptions,
  withEditButton,
  useMenuOptionUI,
  useEditContext,
  TagType,
  useNodeDataHandlers,
} from '@bodiless/core';
import { asToken } from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';
import { TagButtonProps, TagsNodeType, WithRegisterSuggestionsType } from './types';

export type UseTagButtonOverrides<P = any> = (props: P) => Partial<EditButtonOptions<P, any>>;

type TagButtonType = EditButtonOptions<TagButtonProps & HTMLProps<HTMLElement>, TagsNodeType>;

// Options used to create an edit button.
export const tagButtonOptions: TagButtonType = {
  icon: 'local_offer',
  label: 'Groups',
  groupLabel: 'Filter',
  name: 'Tag',
  renderForm: ({ componentProps }) => {
    const {
      ComponentFormTitle,
      ComponentFormLabel,
      ComponentFormUnwrapButton,
      ReactTags,
    } = useMenuOptionUI();

    const {
      getSuggestions = () => [],
      placeholder = 'Select Tags',
      noSuggestionsText = 'No matching tags found.',
      minQueryLength = 1,
      allowNew = true,
      allowMultipleTags = true,
      inputAttributes = { name: 'react-tags-input' },
      formTitle = 'Tags',
      formBodyText = 'Select from available tags:',
      seeAllText = 'See all tags',
      autofocus = false,
    } = componentProps;

    const suggestions = getSuggestions();

    const context = useEditContext();
    const displayListOfTags = () => context.showPageOverlay({
      message: suggestions
        .slice()
        .reduce((acc: any, _tag: TagType) => `${acc}\n${_tag.name}`, ''),
      hasSpinner: false,
      hasCloseButton: true,
    });

    return (
      <>
        <ComponentFormTitle>{formTitle}</ComponentFormTitle>
        <ComponentFormLabel>{formBodyText}</ComponentFormLabel>
        <ReactTags
          suggestions={suggestions}
          placeholder={placeholder}
          noSuggestionsText={noSuggestionsText}
          minQueryLength={minQueryLength}
          allowNew={allowNew}
          allowMultipleTags={allowMultipleTags}
          inputAttributes={inputAttributes}
          autofocus={autofocus}
        />
        <ComponentFormUnwrapButton type="button" onClick={displayListOfTags}>
          {seeAllText}
        </ComponentFormUnwrapButton>
      </>
    );
  },

  global: false,
  local: true,
};

const withRegisteredTags: HOC<WithRegisterSuggestionsType> = Component => {
  const WithRegisteredTags = (props: any) => {
    const { registerSuggestions } = props;
    const { componentData } = useNodeDataHandlers<TagsNodeType>();

    if (!isEmpty(componentData) && componentData.tags) {
      registerSuggestions([...componentData.tags]);
    }

    return <Component {...props} />;
  };
  return WithRegisteredTags;
};

const withTagButton = (useOverrides?: UseTagButtonOverrides) => {
  const editButtonOptions = useOverrides
    ? (props: any) => ({ ...tagButtonOptions, ...useOverrides(props) })
    : tagButtonOptions;
  return asToken(
    withEditButton(editButtonOptions),
    withRegisteredTags,
  );
};

export default withTagButton;
