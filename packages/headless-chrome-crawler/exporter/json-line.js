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

const pick = require('lodash/pick');
const BaseExporter = require('./base');

/**
 * @implements {BaseExporter}
 */
class JSONLineExporter extends BaseExporter {
  /**
   * @param {!Object} result
   * @override
   */
  writeLine(result) {
    if (this._settings.fields) result = pick(result, this._settings.fields);
    const line = JSON.stringify(result, this._settings.jsonReplacer);
    this._stream.write(`${line}\n`);
  }

  /**
   * @override
   */
  writeHeader() {}

  /**
   * @override
   */
  writeFooter() {}
}

module.exports = JSONLineExporter;
