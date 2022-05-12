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

import {
  Command,
} from '@oclif/command';
import init from '../helpers/generate-env-vars';

/**
 * Defines the 'generate-env-vars' command.
 */
export default class GenerateEnvVars extends Command {
  static description = 'Generate .env files for current site';

  static examples = [
    '$ bodiless generate-env-vars'
  ];

  async run() {
    try {
      init();
    } catch (e) {
      this.error(e as Error);
    }
  }
}
