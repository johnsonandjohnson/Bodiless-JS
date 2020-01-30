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

/* eslint-disable import/no-unresolved */
const redis = require('redis');
const BaseCache = require('./base');

const DEQUEUE_SCRIPT = `
local queue = redis.call('ZREVRANGE', KEYS[1], 0, 0)[1]\n
if (queue) then\n
  redis.call('ZREM', KEYS[1], queue)\n
end\n
return queue\n
`;

/**
 * @implements {BaseCache}
 */
class RedisCache extends BaseCache {
  /**
   * @override
   * @return {!Promise}
   */
  init() {
    this._client = redis.createClient(this._settings);
    return Promise.resolve();
  }

  /**
   * @return {!Promise}
   * @override
   */
  clear() {
    return new Promise((resolve, reject) => {
      this._client.flushdb(error => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }

  /**
   * @return {!Promise}
   * @override
   */
  close() {
    this._client.quit();
    return Promise.resolve();
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   * @override
   */
  get(key) {
    return new Promise((resolve, reject) => {
      this._client.get(key, (error, json) => {
        if (error) {
          reject(error);
          return;
        }
        try {
          const value = JSON.parse(json || null);
          resolve(value);
        } catch (_error) {
          reject(_error);
        }
      });
    });
  }

  /**
   * @param {!string} key
   * @param {!string} value
   * @return {!Promise}
   * @override
   */
  set(key, value) {
    return new Promise((resolve, reject) => {
      let json;
      try {
        json = JSON.stringify(value);
      } catch (error) {
        reject(error);
        return;
      }
      this._client.set(key, json, error => {
        if (error) {
          reject(error);
          return;
        }
        if (!this._settings.expire) {
          resolve();
          return;
        }
        this._client.expire(key, this._settings.expire, _error => {
          if (_error) {
            reject(_error);
            return;
          }
          resolve();
        });
      });
    });
  }

  /**
   * @param {!string} key
   * @param {!string} value
   * @param {!number=} priority
   * @return {!Promise}
   * @override
   */
  enqueue(key, value, priority = 1) {
    return new Promise((resolve, reject) => {
      let json;
      try {
        json = JSON.stringify(value);
      } catch (error) {
        reject(error);
        return;
      }
      this._client.zadd(key, priority, json, error => {
        if (error) {
          reject(error);
          return;
        }
        if (!this._settings.expire) {
          resolve();
          return;
        }
        this._client.expire(key, this._settings.expire, _error => {
          if (_error) {
            reject(_error);
            return;
          }
          resolve();
        });
      });
    });
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   * @override
   */
  dequeue(key) {
    return new Promise((resolve, reject) => {
      this._client.eval(DEQUEUE_SCRIPT, 1, key, (error, json) => {
        if (error) {
          reject(error);
          return;
        }
        try {
          const value = JSON.parse(json || null);
          resolve(value);
        } catch (_error) {
          reject(_error);
        }
      });
    });
  }

  /**
   * @param {!string} key
   * @return {!Promise<!number>}
   * @override
   */
  size(key) {
    return new Promise((resolve, reject) => {
      this._client.zcount(key, '-inf', 'inf', (error, size) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(size || 0);
      });
    });
  }

  /**
   * @param {!string} key
   * @return {!Promise}
   * @override
   */
  remove(key) {
    return new Promise((resolve, reject) => {
      this._client.del(key, error => {
        if (error) {
          reject(error);
          return;
        }
        resolve();
      });
    });
  }
}

module.exports = RedisCache;
