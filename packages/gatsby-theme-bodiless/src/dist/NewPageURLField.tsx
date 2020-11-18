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

import React, { useCallback } from 'react';
import { useMenuOptionUI, useNode } from '@bodiless/core';
import { useField } from 'informed';
import path from 'path';

const BASE_PATH_FIELD_NAME = 'basePath';
const PAGE_URL_FIELD_NAME = 'pagePath';
const INPUT_FIELD_DEFAULT_CLASSES = 'bl-text-grey-900 bg-grey-100 bl-text-xs bl-min-w-xl-grid-1 bl-my-grid-2 bl-p-grid-1';
const INPUT_FIELD_INLINE_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-inline');
const INPUT_FIELD_BLOCK_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-block bl-w-full');

const usePagePath = () => useNode().node.pagePath;

const useBasePathField = (props) => {
  const basePath = usePagePath();
  const { fieldState, fieldApi, ref, userProps } = useField({
    field: BASE_PATH_FIELD_NAME,
    initialValue: basePath,
  });
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const { onChange, onBlur, ...rest } = userProps;
  return {
    ref,
    value,
    setValue,
    onChange,
    ...rest,
  }
}

const getPageUrlValidate = () => useCallback(
  (value: string) => (!RegExp(/^[a-z0-9_/-]+$/i).test(value)
    ? 'No special characters or spaces allowed'
    : undefined),
  [],
);

const getPagePathValidate = () => useCallback(
  (value: string) => (!RegExp(/^[a-z0-9_-]+$/i).test(value)
    ? 'No special characters or spaces allowed'
    : undefined),
  [],
);

// since we want to join relative urls, path.join should be ok here
const joinUrl = (url1?: string, url2?: string) => path.join(url1 || '/', url2 || '');

const NewPageURLField = (props) => {
  const {
    ComponentFormLabel,
    ComponentFormLink,
    ComponentFormWarning,
  } = useMenuOptionUI();
  const {
    value: basePathValue,
    setValue: setBasePathValue,
    ...restBasePathProps
  } = useBasePathField(props);

  const isEmptyValue = value => value === undefined || value === '';
  const isBasePathValueEmpty = isEmptyValue(basePathValue) || basePathValue === '/';
  const isFullUrl = isBasePathValueEmpty;

  const { fieldState, fieldApi, render, ref, userProps } = useField({
    field: PAGE_URL_FIELD_NAME,
    validate: isFullUrl ? getPageUrlValidate() : getPagePathValidate(),
    ...props,
  });
  const { value } = fieldState;
  const { setTouched, setValue } = fieldApi;
  const { onChange, onBlur, ...rest } = userProps;
  const fieldLabel = isFullUrl ? 'URL' : 'Page Path';
  const inputClasses = isFullUrl ? INPUT_FIELD_BLOCK_CLASSES : INPUT_FIELD_INLINE_CLASSES; 
  return render(
    <React.Fragment>
      <ComponentFormLabel>{fieldLabel}</ComponentFormLabel>
      {
        !isFullUrl
        ? <span
            className="mr-1"
          >{
          `${basePathValue}`
          }</span>
         : null 
      }
      <input
        {...restBasePathProps}
        type='hidden'
        value={isBasePathValueEmpty ? '/' : basePathValue}
      />
      <input
        className={inputClasses}
        {...rest}
        ref={ref}
        value={isEmptyValue(value) ? '' : value}
        onChange={e => {
          setValue(e.target.value);
          if (onChange) {
            onChange(e);
          }
        }}
        onBlur={e => {
          setTouched(true);
          if (onBlur) {
            onBlur(e);
          }
        }}
      />
      {
        !isBasePathValueEmpty &&
        <ComponentFormLink
          onClick={() => {
            setValue(joinUrl(basePathValue, value));
            setBasePathValue('/');
          }}>
            Edit
        </ComponentFormLink>
      }
      {
        fieldState.error ? (
        <ComponentFormWarning>{fieldState.error}</ComponentFormWarning>
        ) : null
      }
    </React.Fragment>
  );
};

const getPathValue = values => {
  const {
    [BASE_PATH_FIELD_NAME]: basePagePath,
    [PAGE_URL_FIELD_NAME]: pageUrl,
  } = values;
  return joinUrl(basePagePath, pageUrl);
}

export default NewPageURLField;
export { getPathValue };
