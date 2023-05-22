/* eslint-disable import/no-dynamic-require */
/* eslint-disable import/no-extraneous-dependencies */
/**
 * Copyright © 2022 Johnson & Johnson
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

// @preval

const path = require('path');
const resolveConfig = require('tailwindcss/resolveConfig');

const tailwindConfig = require(`${path.resolve()}/tailwind.config`);
// Fixing webpack error Expecting Unicode escape sequence
const resolvedConfigsString = JSON.stringify(resolveConfig(tailwindConfig));
const resolvedConfigs = JSON.parse(resolvedConfigsString);

module.exports = resolvedConfigs;
