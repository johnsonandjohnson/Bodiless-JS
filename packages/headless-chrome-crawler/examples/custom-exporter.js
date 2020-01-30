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

const { inspect } = require('util');
const HCCrawler = require('headless-chrome-crawler');
const BaseExporter = require('headless-chrome-crawler/exporter/base');

const FILE = './tmp/result';

// Create a new exporter by extending BaseExporter interface
class InspectExporter extends BaseExporter {
  constructor(settings) {
    super(settings);
    if (!this._settings.depth) this._settings.depth = 2;
  }

  writeLine(result) {
    const line = inspect(result, { depth: this._settings.depth, breakLength: Infinity });
    this._stream.write(`${line}\n`);
  }

  writeHeader() {}

  writeFooter() {}
}

const exporter = new InspectExporter({
  file: FILE,
  depth: 1,
});

(async () => {
  const crawler = await HCCrawler.launch({ exporter, maxDepth: 2 });
  await crawler.queue('https://example.com/');
  await crawler.onIdle();
  await crawler.close();
})();
