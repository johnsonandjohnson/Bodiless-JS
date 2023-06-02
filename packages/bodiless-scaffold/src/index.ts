/**
 * Copyright © 2023 Johnson & Johnson
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

import { Plop, run } from 'plop';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Validate scaffold types. Only allow "component" for now. Extend this as needed.
const validScaffoldTypes = ['component'];
const scaffoldType = process.argv.slice(2).shift() || 'component';
if (!validScaffoldTypes.includes(scaffoldType)) {
  console.error(`
Error: Invalid scaffold type: ${scaffoldType}.
Valid types are: "${validScaffoldTypes.join(', ')}"\n`);
  process.exit(1);
}

const dir = dirname(fileURLToPath(import.meta.url));
const cwd = process.cwd();
const configPath = join(dir, `config/${scaffoldType}.js`);
const preload = process.env.PLOP_PRELOAD || '';
const completion = process.env.PLOP_COMPLETION || '';

const execute = (env: any) => {
  Plop.prepare(
    {
      cwd,
      configPath,
      preload: preload || [],
      completion,
    },
    (env) => {
      const options = {
        ...env,
        dest: cwd,
      };
      run(options, undefined, true);
    },
  );
};

export { execute };
