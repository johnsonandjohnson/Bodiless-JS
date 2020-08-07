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

import { spawn, SpawnOptions } from 'child_process';
import * as path from 'path';

export default class Spawner {
  options: SpawnOptions;

  constructor(monorepo: string) {
    this.options = {
      stdio: 'inherit',
      shell: true,
    };
    // Add the monorepo npm bin directory to the path, bc some packages
    // may use binaries in their pack command which are only available there.
    const { PATH: PATH$ } = process.env;
    const PATH = PATH$ + path.delimiter + path.join(monorepo, 'node_modules', '.bin');
    this.options.env = { ...process.env, PATH };
    this.spawn = this.spawn.bind(this);
  }

  /**
   * Spawns a child process and returns a promise.
   */
  spawn(...[cmd, ...args]: string[]) {
    return new Promise<Error|number>((resolve, reject) => {
      const child = spawn(cmd, args, this.options);
      child.on('close', code => resolve(code));
      child.on('error', error => reject(error));
    });
  }
}
