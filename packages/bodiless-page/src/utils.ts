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

import {
  handleBackendResponse,
} from '@bodiless/core';
import { useNode } from '@bodiless/data';
import { useField } from 'informed';
import path from 'path';
import {
  BASE_PATH_EMPTY_VALUE,
  BASE_PATH_FIELD_NAME,
  PAGE_URL_FIELD_NAME,
  PAGE_URL_INVALID_MESSAGE,
  PAGE_URL_NOT_ALLOWED_EMPTY_FIELD,
  PAGE_URL_NOT_ALLOWED_SPACES,
  PATTERN_HAS_SPACES,
  PATTERN_PAGE_PATH,
  PATTERN_PAGE_URL,
} from './constants';
import type {
  FieldValidate,
} from './types';

type FormValues = Record<string, unknown>;
type FormValue = unknown;
const usePagePath = () => useNode().node.pagePath;

const useBasePathField = () => {
  const basePath = usePagePath();
  const {
    fieldState, fieldApi, ref, informed, userProps
  } = useField({
    type: 'string',
    name: BASE_PATH_FIELD_NAME,
    initialValue: basePath,
  });
  const { value } = fieldState;
  const { setValue } = fieldApi;
  const { onChange } = informed;
  return {
    ref,
    value,
    setValue,
    onChange,
    ...userProps as Object,
  };
};

const isEmptyValue = (value : FormValue) => Boolean(value) === false;

const validateEmptyField = (value: FormValue) => (
  isEmptyValue(value) ? PAGE_URL_NOT_ALLOWED_EMPTY_FIELD : undefined
);

const pagePathvalidate = (url: string) => {
  const hasInvalidParts = url.split('/').filter(item => {
    if (item === '') {
      return false;
    }
    if (!RegExp(PATTERN_PAGE_PATH).test(item)) {
      return true;
    }
    return false;
  });
  return hasInvalidParts.length > 0;
};

const validatePageUrl = (
  value: FormValue,
) => (
  typeof value === 'string' && (pagePathvalidate(value) || !RegExp(PATTERN_PAGE_URL).test(value))
    ? PAGE_URL_INVALID_MESSAGE
    : undefined
);

const validatePagePath = (
  value: FormValue,
) => (
  typeof value === 'string' && !RegExp(PATTERN_PAGE_PATH).test(value)
    ? PAGE_URL_INVALID_MESSAGE
    : undefined
);

const validatePageSimple = (
  value: FormValue,
) => (
  typeof value === 'string' && RegExp(PATTERN_HAS_SPACES).test(value)
    ? PAGE_URL_NOT_ALLOWED_SPACES
    : undefined
);

const getPageUrlValidator = (
  validate?: FieldValidate,
  required?: boolean,
  simpleValidation?: boolean,
) => (value: FormValue) => (
  (required && validateEmptyField(value))
  || (simpleValidation && validatePageSimple(value))
  || (!simpleValidation && validatePageUrl(value))
  || (validate && validate(value))
);

const hasPageChild = async ({ pagePath, client }: any) => {
  const result = await handleBackendResponse(client.directoryChild(pagePath));
  if (result.response && result.message === 'Success') {
    return Promise.resolve();
  }
  return Promise.reject(new Error(result.message));
};

const joinPath = (path1: string, path2: string) => path.join(path1, path2);

const fieldValueToUrl = (value: FormValue) => (typeof value === 'string'
  ? value || BASE_PATH_EMPTY_VALUE
  : BASE_PATH_EMPTY_VALUE);

/**
 * function that can be used to get new page path value
 * this function should usually be invoked after an informed form
 * containing PageURLField field is submitted
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
  fieldValueToUrl,
  getPageUrlValidator,
  getPathValue,
  hasPageChild,
  isEmptyValue,
  joinPath,
  usePagePath,
  useBasePathField,
  validateEmptyField,
  validatePagePath,
  validatePageUrl,
};
