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

import { useCallback } from 'react';
import { useNode } from '@bodiless/core';
import { useField } from 'informed';
import type {
  FormValue,
  FormValues,
} from 'informed';
import path from 'path';
import type { FieldValidate } from './types';

const BASE_PATH_FIELD_NAME = 'basePath';
const PAGE_URL_FIELD_NAME = 'pagePath';
const BASE_PATH_EMPTY_VALUE = '/';

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

export {
  usePagePath,
  useBasePathField,
  isEmptyValue,
  validateEmptyField,
  validatePageUrl,
  validatePagePath,
  getPageUrlValidator,
  getPagePathValidator,
  joinPath,
  fieldValueToUrl,
  getPathValue,
};
