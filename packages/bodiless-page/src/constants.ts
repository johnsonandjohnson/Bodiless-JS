/**
 * Copyright © 2022 Johnson & Johnson
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

const BASE_PATH_EMPTY_VALUE = '/';
const BASE_PATH_FIELD_NAME = 'basePath';
const PAGE_URL_FIELD_NAME = 'pagePath';
const PAGE_URL_INVALID_MESSAGE = 'No special characters, capital letters or spaces allowed, no beginning or ending with - or _';

const DEFAULT_PAGE_TEMPLATE = '_default';
const DEFAULT_PAGE_REDIRECT_STATUS = '301';

const INPUT_FIELD_DEFAULT_CLASSES = 'bl-text-gray-900 bl-bg-gray-100 bl-text-xs bl-min-w-xl-grid-1 bl-my-grid-2 bl-p-grid-1';
const INPUT_FIELD_INLINE_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-inline');
const INPUT_FIELD_BLOCK_CLASSES = INPUT_FIELD_DEFAULT_CLASSES.concat(' bl-block bl-w-full');

const PATTERN_INSENSITIVE_VALID_PATH_URL = /(^\/+|^http|^www)/i;

export {
  BASE_PATH_EMPTY_VALUE,
  BASE_PATH_FIELD_NAME,
  PAGE_URL_FIELD_NAME,
  PAGE_URL_INVALID_MESSAGE,
  DEFAULT_PAGE_TEMPLATE,
  DEFAULT_PAGE_REDIRECT_STATUS,
  INPUT_FIELD_DEFAULT_CLASSES,
  INPUT_FIELD_INLINE_CLASSES,
  INPUT_FIELD_BLOCK_CLASSES,
  PATTERN_INSENSITIVE_VALID_PATH_URL,
};
