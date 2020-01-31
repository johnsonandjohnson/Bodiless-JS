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

const extend = require('lodash/extend');
const { createWriteStream } = require('fs');

/**
 * @interface
 */
class BaseExporter {
  /**
   * @param {!Object=} settings
   */
  constructor(settings) {
    this._settings = extend({ encoding: 'utf8' }, settings);
    this._stream = createWriteStream(this._settings.file, this._settings.encoding);
    if (!this._settings.file) throw new Error('File must be defined!');
  }

  end() {
    this._stream.end();
  }

  /**
   * @return {!Promise}
   */
  async onEnd() {
    await new Promise((resolve, reject) => {
      this._stream.on('finish', resolve);
      this._stream.on('error', reject);
    });
  }

  /**
   * @param {!Object} result
   */
  writeLine() {
    throw new Error('Write footer is not overridden!');
  }

  writeHeader() {
    throw new Error('Write header is not overridden!');
  }

  writeFooter() {
    throw new Error('Write footer is not overridden!');
  }
}

module.exports = BaseExporter;
