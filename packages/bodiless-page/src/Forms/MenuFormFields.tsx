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
import { useField } from 'informed';
import { usePageMenuOptionUI } from '../MenuOptionUI';
import {
  PAGE_URL_FIELD_NAME,
  BASE_PATH_EMPTY_VALUE,
  INPUT_FIELD_INLINE_CLASSES,
  INPUT_FIELD_BLOCK_CLASSES,
} from '../constants';
import type { FieldProps, CustomFieldProps } from '../types';
import {
  fieldValueToUrl,
  getPageUrlValidator,
  isEmptyValue,
  joinPath,
  useBasePathField,
  validatePageUrl,
} from '../utils';

type UserPropsWithPlaceholder = {
  placeholder: string
  onChange?: any
} & CustomFieldProps;

/**
 * informed custom field that provides ability to enter new page path
 * the field contains 2 inputs: base path and page path
 * it is recommended to use getPathValue function to merge these 2 inputs
 * and to get result page path after the form containing this field is submitted
 * @param props informed field props
 */
const PageURLField = (props: FieldProps) => {
  const {
    ComponentFormLabelSmall,
    ComponentFormLinkEdit,
    ComponentFormWarning,
  } = usePageMenuOptionUI();
  const {
    value: basePathValue,
    setValue: setBasePathValue,
    ...restBasePathProps
  } = useBasePathField();

  const isBasePathEmpty = isEmptyValue(basePathValue) || basePathValue === BASE_PATH_EMPTY_VALUE;
  const isFullUrl = isBasePathEmpty;

  const {
    fieldLabel, fieldFull, required, simpleValidation, validate, ...rest
  } = props;

  const {
    fieldState, fieldApi, render, ref, userProps
  } = useField<UserPropsWithPlaceholder, string>({
    type: 'string',
    name: PAGE_URL_FIELD_NAME,
    validate: getPageUrlValidator(validate, required, simpleValidation),
    placeholder: isFullUrl ? '/mypath/mypage' : 'my-page',
    ...rest,
  });
  const { value } = fieldState;
  const { setValue, setError } = fieldApi;
  const { onChange, ...restUserProps } = userProps;

  const label = fieldLabel || (isFullUrl ? 'URL' : 'Page Path');
  const inputClasses = isFullUrl ? INPUT_FIELD_BLOCK_CLASSES : INPUT_FIELD_INLINE_CLASSES;

  return render(
    <>
      <ComponentFormLabelSmall htmlFor="new-page-path">{label}</ComponentFormLabelSmall>
      {
        fieldFull && !isFullUrl
          ? (<span className="mr-1">{`${basePathValue}`}</span>)
          : null
      }
      <input
        {...restBasePathProps}
        type="hidden"
        value={(isBasePathEmpty ? BASE_PATH_EMPTY_VALUE : basePathValue) as string}
      />
      <input
        name="new-page-path"
        className={inputClasses}
        {...restUserProps}
        ref={ref}
        value={isEmptyValue(value) ? '' : value as string}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      {
        fieldFull && !isBasePathEmpty
        && (
          <div
            className="bl-block"
          >
            <ComponentFormLinkEdit
              onClick={() => {
                setValue(joinPath(basePathValue as string, fieldValueToUrl(value)));
                setBasePathValue(BASE_PATH_EMPTY_VALUE);
                if (validatePageUrl(value) === undefined) setError(undefined);
              }}
            >
              Edit
            </ComponentFormLinkEdit>
          </div>
        )
      }
      {
        fieldState.error ? (
          <ComponentFormWarning>{fieldState.error as string}</ComponentFormWarning>
        ) : null
      }
    </>,
  );
};

/**
 * informed custom field that provides ability to move existing page page into new path
 * the field contains 2 inputs: base path and page path
 * it is recommended to use getPathValue function to merge these 2 inputs
 * and to get result page path after the form containing this field is submitted
 * @param props informed field props
 */
const MovePageURLField = (props: FieldProps) => {
  const {
    ComponentFormWarning,
    ComponentFormLabelSmall,
  } = usePageMenuOptionUI();
  const {
    value: basePathValue,
    setValue: setBasePathValue,
    ...restBasePathProps
  } = useBasePathField();

  const basePathArray = (basePathValue as string).split('/');
  basePathArray.splice(-2, 1);
  const parentBasePathValue = basePathArray.join('/');

  const isBasePathEmpty = isEmptyValue(parentBasePathValue)
  || parentBasePathValue === BASE_PATH_EMPTY_VALUE;

  const { required, validate, ...rest } = props;
  const {
    fieldState, fieldApi, render, ref, userProps
  } = useField<UserPropsWithPlaceholder, string>({
    type: 'string',
    name: PAGE_URL_FIELD_NAME,
    validate: getPageUrlValidator(validate, required),
    placeholder: '/parentpage/thispage',
    ...rest,
  });
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const { onChange, ...restUserProps } = userProps;
  const fieldLabel = 'New URL';
  const inputClasses = INPUT_FIELD_INLINE_CLASSES;
  return render(
    <>
      <ComponentFormLabelSmall htmlFor="new-page-path">{fieldLabel}</ComponentFormLabelSmall>
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
        value={isEmptyValue(value) ? '' : value as string}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
      />
      {
        fieldState.error ? (
          <ComponentFormWarning>{fieldState.error as string}</ComponentFormWarning>
        ) : null
      }
    </>,
  );
};

export {
  MovePageURLField,
  PageURLField,
};
