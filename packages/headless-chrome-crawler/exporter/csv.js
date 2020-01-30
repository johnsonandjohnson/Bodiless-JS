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

const map = require('lodash/map');
const get = require('lodash/get');
const { escapeQuotes } = require('../lib/helper');
const BaseExporter = require('./base');

/**
 * @implements {BaseExporter}
 */
class CSVExporter extends BaseExporter {
  /**
   * @override
   */
  constructor(settings) {
    super(settings);
    if (!this._settings.separator) this._settings.separator = ',';
    if (!this._settings.fields) throw new Error('Fields must be defined!');
  }

  /**
   * @param {!Object} result
   */
  writeLine(result) {
    const line = map(this._settings.fields, (field => (
      escapeQuotes(get(result, field), this._settings.separator)
    ))).join(this._settings.separator);
    this._stream.write(`${line}\n`);
  }

  /**
   * @override
   */
  writeHeader() {
    const header = map(this._settings.fields, (field => (
      escapeQuotes(field, this._settings.separator)
    ))).join(this._settings.separator);
    this._stream.write(`${header}\n`);
  }

  /**
   * @override
   */
  writeFooter() {}
}

module.exports = CSVExporter;
