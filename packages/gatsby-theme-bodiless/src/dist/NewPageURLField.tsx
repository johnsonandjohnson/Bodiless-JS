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
import type {
  BaseFieldProps,
  FormValue,
  FormValues,
  FormError,
} from 'informed';
import path from 'path';

const BASE_PATH_FIELD_NAME = 'basePath';
const PAGE_URL_FIELD_NAME = 'pagePath';
const BASE_PATH_EMPTY_VALUE = '/';
const INPUT_FIELD_DEFAULT_CLASSES = 'bl-text-grey-900 bl-bg-grey-100 bl-text-xs bl-min-w-xl-grid-1 bl-my-grid-2 bl-p-grid-1';
const INPUT_FIELD_INLINE_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-inline');
const INPUT_FIELD_BLOCK_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-block bl-w-full');

const usePagePath = () => useNode().node.pagePath;

const useBasePathField = () => {
  const basePath = usePagePath();
  const {
    fieldState, fieldApi, ref, userProps,
  } = useField({
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
  };
};

const isEmptyValue = (value : FormValue) => Boolean(value) === false;

const validateEmptyField = (value: FormValue) => (isEmptyValue(value)
  ? 'Field can not be empty'
  : undefined
);

const validatePageUrl = (
  value: FormValue,
) => (
  typeof value === 'string' && !RegExp(/^[a-z0-9_/-]+$/i).test(value)
    ? 'No special characters or spaces allowed'
    : undefined
);

const validatePagePath = (
  value: FormValue,
) => (
  typeof value === 'string' && !RegExp(/^[a-z0-9_-]+$/i).test(value)
    ? 'No special characters or spaces allowed'
    : undefined
);

/**
 * props that can be passed to NewPageURLField
 * disallow overriding field prop
 * if we decide to allow overriding it in the future
 * then also we need to allow overriding the second NewPageURLField input
 */
type FieldProps = Omit<BaseFieldProps, 'field'>;
type FieldValidate = (value: FormValue, values: FormValues) => FormError;

const getPageUrlValidator = (validate?: FieldValidate) => useCallback(
  (value: FormValue, values: FormValues) => validateEmptyField(value)
    || validatePageUrl(value)
    || (validate && validate(value, values)),
  [],
);

const getPagePathValidator = (validate?: FieldValidate) => useCallback(
  (value: FormValue, values: FormValues) => validateEmptyField(value)
    || validatePagePath(value)
    || (validate && validate(value, values)),
  [],
);

const joinPath = (path1: string, path2: string) => path.join(path1, path2);

const fieldValueToUrl = (value: FormValue) => (typeof value === 'string'
  ? value || BASE_PATH_EMPTY_VALUE
  : BASE_PATH_EMPTY_VALUE);

/**
 * informed custom field that provides ability to enter new page path
 * the field contains 2 inputs: base path and page path
 * it is recommended to use getPathValue function to merge these 2 inputs
 * and to get result page path after the form containing this field is submitted
 * @param props informed field props
 */
const NewPageURLField = (props: FieldProps) => {
  const {
    ComponentFormLabel,
    ComponentFormLink,
    ComponentFormWarning,
  } = useMenuOptionUI();
  const {
    value: basePathValue,
    setValue: setBasePathValue,
    ...restBasePathProps
  } = useBasePathField();

  const isBasePathEmpty = isEmptyValue(basePathValue) || basePathValue === BASE_PATH_EMPTY_VALUE;
  const isFullUrl = isBasePathEmpty;

  const { validate, ...rest } = props;
  const {
    fieldState, fieldApi, render, ref, userProps,
  } = useField({
    field: PAGE_URL_FIELD_NAME,
    validate: isFullUrl ? getPageUrlValidator(validate) : getPagePathValidator(validate),
    ...rest,
  });
  const { value } = fieldState;
  const { setTouched, setValue, setError } = fieldApi;
  const { onChange, onBlur, ...restUserProps } = userProps;
  const fieldLabel = isFullUrl ? 'URL' : 'Page Path';
  const inputClasses = isFullUrl ? INPUT_FIELD_BLOCK_CLASSES : INPUT_FIELD_INLINE_CLASSES;
  return render(
    <>
      <ComponentFormLabel htmlFor="new-page-path">{fieldLabel}</ComponentFormLabel>
      {
        !isFullUrl
          ? (<span className="mr-1">{`${basePathValue}`}</span>)
          : null
      }
      <input
        {...restBasePathProps}
        type="hidden"
        value={isBasePathEmpty ? BASE_PATH_EMPTY_VALUE : basePathValue}
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
        onBlur={e => {
          setTouched(true);
          if (onBlur) {
            onBlur(e);
          }
        }}
      />
      {
        !isBasePathEmpty
        && (
          <div
            className="bl-block"
          >
            <ComponentFormLink
              onClick={() => {
                setValue(joinPath(basePathValue, fieldValueToUrl(value)));
                setBasePathValue(BASE_PATH_EMPTY_VALUE);
                if (validatePageUrl(value) === undefined) setError(undefined);
              }}
            >
              Edit
            </ComponentFormLink>
          </div>
        )
      }
      {
        fieldState.error ? (
          <ComponentFormWarning>{fieldState.error}</ComponentFormWarning>
        ) : null
      }
    </>,
  );
};

/**
 * function that can be used to get new page path value
 * this function should usually be invoked after an informed form
 * containing NewPageURLField field is submitted
 * @param values informed form values
 * @returns new page path
 */
const getPathValue = (values: FormValues) => {
  const {
    [BASE_PATH_FIELD_NAME]: basePagePath,
    [PAGE_URL_FIELD_NAME]: pageUrl,
  } = values;
  return joinPath(fieldValueToUrl(basePagePath), fieldValueToUrl(pageUrl));
};

export default NewPageURLField;
export { getPathValue };
export type { FieldProps };
