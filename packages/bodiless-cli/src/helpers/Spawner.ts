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
  spawn, execSync, SpawnOptions, ExecOptions,
} from 'child_process';
import * as path from 'path';

export default class Spawner {
  options: SpawnOptions|(ExecOptions & Pick<SpawnOptions, 'stdio'>);

  constructor(monorepo?: string) {
    this.options = {
      stdio: 'inherit',
      shell: true,
    };
    if (monorepo) {
      // Add the monorepo npm bin directory to the path, bc some packages
      // may use binaries in their pack command which are only available there.
      const monorepoBinPath = path.join(monorepo, 'node_modules', '.bin');
      // process.env may have PATH variant with different casing (e.g. Path)
      // see https://github.com/nodejs/node/issues/34667#issuecomment-670505074
      const pathEnvKey = Object.keys(process.env).find(x => x.toUpperCase() === 'PATH') || 'PATH';
      const { [pathEnvKey]: PATH } = process.env;
      const PATH$ = PATH ? PATH + path.delimiter + monorepoBinPath : monorepoBinPath;
      this.options.env = {
        ...process.env,
        [pathEnvKey]: PATH$,
      };
    }
    this.spawn = this.spawn.bind(this);
  }

  /**
   * Spawns a child process and returns a promise.
   */
  spawn(...[cmd, ...args]: string[]) {
    return new Promise<Error|number>((resolve, reject) => {
      const child = spawn(cmd, args, this.options);
      child.on('close', code => (code ? reject(new Error(`Exit code ${code} in ${cmd}`)) : resolve(code as number)));
      child.on('error', error => reject(error));
    });
  }

  execSync(...args: string[]) {
    return execSync(args.join(' '), this.options as ExecOptions);
  }
}
