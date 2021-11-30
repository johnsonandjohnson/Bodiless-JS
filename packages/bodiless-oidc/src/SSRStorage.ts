/**
 * Copyright © 2021 Johnson & Johnson
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

export class SSRStorage implements Storage {
  private _valuesMap: Map<any, any>;

  public constructor() {
    this._valuesMap = new Map();
  }

  public getItem(key: any) {
    const stringKey = String(key);
    if (this._valuesMap.has(key)) {
      return String(this._valuesMap.get(stringKey));
    }
    return null;
  }

  public setItem(key: any, val: any) {
    this._valuesMap.set(String(key), String(val));
  }

  public removeItem(key: any) {
    this._valuesMap.delete(key);
  }

  public clear() {
    this._valuesMap.clear();
  }

  public key(i: number) {
    if (arguments.length === 0) {
      throw new TypeError("Failed to execute 'key' on 'Storage': 1 argument required, but only 0 present."); // this is a TypeError implemented on Chrome, Firefox throws Not enough arguments to Storage.key.
    }
    var arr = Array.from(this._valuesMap.keys());
    return arr[i];
  }

  get length() {
    return this._valuesMap.size;
  }
}

export const isSSR = () => !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);
