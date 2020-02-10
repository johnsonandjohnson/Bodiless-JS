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

/* eslint-disable no-console */
export const getFromSessionStorage = (key: string, defValue: any = null) => {
  let val = defValue;

  try {
    if (typeof window !== 'undefined') {
      val = JSON.parse(window.sessionStorage.getItem(key) || JSON.stringify(defValue));
    }
  } catch (e) {
    console.error(`Can not read "${key}" from session storage.`, e);
  }

  return val;
};

export const saveToSessionStorage = (key: string, val: any) => {
  try {
    if (typeof window !== 'undefined') {
      window.sessionStorage.setItem(key, JSON.stringify(val));
    }
  } catch (e) {
    console.error(`Can't write "${key}" to session storage.`, e);
  }
};
