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

const fs = require('fs');
const HCCrawler = require('headless-chrome-crawler');
const BaseCache = require('headless-chrome-crawler/cache/base');

const FILE = './tmp/fs-cache.json';

// Create a new cache by extending BaseCache interface
class FsCache extends BaseCache {
  init() {
    fs.writeFileSync(this._settings.file, '{}');
    return Promise.resolve();
  }

  clear() {
    fs.unlinkSync(this._settings.file);
    return Promise.resolve();
  }

  close() {
    return Promise.resolve();
  }

  get(key) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    return Promise.resolve(obj[key] || null);
  }

  set(key, value) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    obj[key] = value;
    fs.writeFileSync(this._settings.file, JSON.stringify(obj));
    return Promise.resolve();
  }

  enqueue(key, value, priority) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    const queue = obj[key] || [];
    const item = { value, priority };
    queue.push(item);
    queue.sort((a, b) => b.priority - a.priority);
    obj[key] = queue;
    fs.writeFileSync(this._settings.file, JSON.stringify(obj));
    return Promise.resolve();
  }

  dequeue(key) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    const queue = obj[key] || [];
    const item = queue.shift();
    fs.writeFileSync(FILE, JSON.stringify(obj));
    if (!item) return Promise.resolve(null);
    return Promise.resolve(item.value);
  }

  size(key) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    if (!obj[key]) return Promise.resolve(0);
    return Promise.resolve(obj[key].length);
  }

  remove(key) {
    const obj = JSON.parse(fs.readFileSync(this._settings.file));
    delete obj[key];
    fs.writeFileSync(FILE, JSON.stringify(obj));
    return Promise.resolve();
  }
}

const cache = new FsCache({ file: FILE });

(async () => {
  const crawler = await HCCrawler.launch({
    maxConcurrency: 1,
    onSuccess: result => {
      console.log(`Requested ${result.options.url}.`);
    },
    cache,
  });
  await crawler.queue('https://example.com/');
  await crawler.queue('https://example.net/');
  await crawler.queue('https://example.com/'); // The queue won't be requested
  await crawler.onIdle();
  await crawler.close();
})();
