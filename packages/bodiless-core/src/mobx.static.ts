/**
 * Copyright © 2023 Johnson & Johnson
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

import identity from 'lodash/identity';

export const observer = identity;
export const isObservable = () => false;
export const toJS = identity;

const annotation = (arg1: any, arg2: any) => {
  if (typeof arg1 === 'function') {
    return arg1;
  }
  // action("name", fn() {})
  if (typeof arg2 === 'function') {
    return arg2;
  }
  return identity;
};

export const action = annotation;
export const computed = annotation;
export const makeObservable = () => {};
export const Observer = identity;
export const observable = annotation;
export const extendObservable = () => {};
