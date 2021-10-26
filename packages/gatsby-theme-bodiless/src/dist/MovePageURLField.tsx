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
import { useMenuOptionUI } from '@bodiless/core';
import { useField } from 'informed';
import {
  useBasePathField,
  isEmptyValue,
  getPageUrlValidator,
  getPagePathValidator,
} from './utils';
import type { FieldProps } from './types';

const PAGE_URL_FIELD_NAME = 'pagePath';
const BASE_PATH_EMPTY_VALUE = '/';
const INPUT_FIELD_DEFAULT_CLASSES = 'bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-min-w-xl-grid-1 bl-my-grid-2 bl-p-grid-1';
const INPUT_FIELD_INLINE_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-inline');
const INPUT_FIELD_BLOCK_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-block bl-w-full');

/**
 * informed custom field that provides ability to enter new page path
 * the field contains 2 inputs: base path and page path
 * it is recommended to use getPathValue function to merge these 2 inputs
 * and to get result page path after the form containing this field is submitted
 * @param props informed field props
 */
const MovePageURLField = (props: FieldProps) => {
  const {
    ComponentFormLabel,
    ComponentFormWarning,
  } = useMenuOptionUI();
  const {
    value: basePathValue,
    setValue: setBasePathValue,
    ...restBasePathProps
  } = useBasePathField();

  const basePathArray = basePathValue.split('/');
  basePathArray.splice(-2, 1);
  const parentBasePathValue = basePathArray.join('/');

  const isBasePathEmpty = isEmptyValue(parentBasePathValue)
  || parentBasePathValue === BASE_PATH_EMPTY_VALUE;
  const isFullUrl = isBasePathEmpty;

  const { validate, ...rest } = props;
  const {
    fieldState, fieldApi, render, ref, userProps,
  } = useField({
    field: PAGE_URL_FIELD_NAME,
    validate: isFullUrl ? getPageUrlValidator(validate) : getPagePathValidator(validate),
    placeholder: 'thispage',
    ...rest,
  });
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const { onChange, ...restUserProps } = userProps;
  const inputClasses = isFullUrl ? INPUT_FIELD_BLOCK_CLASSES : INPUT_FIELD_INLINE_CLASSES;
  return render(
    <>
      {
        !isFullUrl
          ? (<span className="mr-1">{`${parentBasePathValue}`}</span>)
          : null
      }
      <input
        {...restBasePathProps}
        type="hidden"
        value={isBasePathEmpty ? BASE_PATH_EMPTY_VALUE : parentBasePathValue}
      />
      <input
        name="new-page-path"
        className={inputClasses}
        {...restUserProps}
        ref={ref}
        value={isEmptyValue(value) ? '' : value}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      {
        fieldState.error ? (
          <ComponentFormWarning>{fieldState.error}</ComponentFormWarning>
        ) : null
      }
    </>,
  );
};

export default MovePageURLField;
