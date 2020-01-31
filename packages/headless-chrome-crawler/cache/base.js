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
 *
 * Copyright (c) 2017 yujiosaka
 * Licensed under MIT.
 *
 */

/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * @interface
 */
class BaseCache {
  /**
   * @param {!Object=} settings
   */
  constructor(settings) {
    this._settings = settings || {};
  }

  /**
   * @return {!Promise}
   */
  init() {
    throw new Error('Init is not overridden!');
  }

  /**
   * @return {!Promise}
   */
  close() {
    throw new Error('Close is not overridden!');
  }

  /**
   * @return {!Promise}
   */
  clear() {
    throw new Error('Clear is not overridden!');
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   */
  get(key) {
    throw new Error('Get is not overridden!');
  }

  /**
   * @param {!string} key
   * @param {!string} value
   * @return {!Promise}
   */
  set(key, value) {
    throw new Error('Set is not overridden!');
  }

  /**
   * @param {!string} key
   * @param {!string} value
   * @param {!number=} priority
   * @return {!Promise}
   */
  enqueue(key, value, priority) {
    throw new Error('Enqueue is not overridden!');
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   */
  dequeue(key) {
    throw new Error('Dequeue is not overridden!');
  }

  /**
   * @param {!string} key
   * @return {!Promise<!number>}
   */
  size(key) {
    throw new Error('Size is not overridden!');
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   */
  remove(key) {
    throw new Error('Remove is not overridden!');
  }
}

module.exports = BaseCache;
