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

import { useNode } from '@bodiless/core';
import { useField } from 'informed';
import type {
  FormValue,
  FormValues,
} from 'informed';
import path from 'path';
import type {
  FieldValidate,
} from './types';
import handle from '../ResponseHandler';

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

const VALIDATEMSG = 'No special characters, capital letters or spaces allowed, no beginning or ending with - or _';
const pagePathReg = /^[a-z0-9](?:[_-]?[a-z0-9]+)*$/;
const pagePathvalidate = (url: string) => {
  const hasInvalidParts = url.split('/').filter(item => {
    if (item === '') {
      return false;
    }
    if (!RegExp(pagePathReg).test(item)) {
      return true;
    }
    return false;
  });
  return hasInvalidParts.length > 0;
};

const validatePageUrl = (
  value: FormValue,
) => (
  typeof value === 'string' && (pagePathvalidate(value) || !RegExp(/^[a-z0-9_/-]+$/).test(value))
    ? VALIDATEMSG
    : undefined
);

const validatePagePath = (
  value: FormValue,
) => (
  typeof value === 'string' && !RegExp(pagePathReg).test(value)
    ? VALIDATEMSG
    : undefined
);

const getPageUrlValidator = (validate?: FieldValidate) => (
  value: FormValue, values: FormValues,
) => validateEmptyField(value)
    || validatePageUrl(value)
    || (validate && validate(value, values));

const getPagePathValidator = (validate?: FieldValidate) => (
  value: FormValue, values: FormValues,
) => validateEmptyField(value)
    || validatePagePath(value)
    || (validate && validate(value, values));

const hasPageChild = async ({ pagePath, client } : any) => {
  const result = await handle(client.directoryChild(pagePath));
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
  usePagePath,
  useBasePathField,
  isEmptyValue,
  validateEmptyField,
  validatePageUrl,
  validatePagePath,
  getPageUrlValidator,
  getPagePathValidator,
  hasPageChild,
  joinPath,
  fieldValueToUrl,
  getPathValue,
};
