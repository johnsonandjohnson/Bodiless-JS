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

import { spawn } from 'child_process';
import type { SpawnOptionsWithoutStdio } from 'child_process';
import Logger from './logger';

const logger = new Logger('BACKEND');

export type GitInfoType = {
  stdout: string,
  stderr: string,
  code: number | null;
};

export class GitCmdError extends Error {
  code: number | null = 0;

  info?: GitInfoType;
}

/*
This Class wraps spawn and lets us build out git commands with standard responses
*/
class GitCmd {
  cmd: string = '';

  params: string[] = [];

  files: string[] = [];

  options?: SpawnOptionsWithoutStdio;

  constructor() {
    this.cmd = 'git';
    this.params = [];
    this.files = [];
    this.options = {};
  }

  add(...params: string[]) {
    this.params.push(...params);
    return this;
  }

  set(options: SpawnOptionsWithoutStdio) {
    this.options = { ...this.options, ...options };
    return this;
  }

  addFiles(...files: string[]) {
    this.files.push(...files);
    // const rawFiles = [...arguments]
    // this.files.push(...rawFiles.map((file) => file.replace(/ /,'\ ')))
    return this;
  }

  spawn() {
    const args = [...this.params, ...this.files];
    logger.log(
      `Spawning command: ${this.cmd}`,
      ...args,
      Date.now().toString(),
      process.cwd()
    );
    return spawn(this.cmd, args, this.options);
  }

  exec() {
    return new Promise<GitInfoType>((resolve, reject) => {
      const cmd = this.spawn();
      let stderr = '';
      let stdout = '';
      cmd.stdout.on('data', data => {
        stdout += data.toString();
      });
      // Git cmd error handling.
      cmd.stderr.on('data', data => {
        stderr += data.toString();
      });
      // Spawn syscall error handling.
      cmd.on('error', (err) => {
        stderr += err.message;
      });
      cmd.on('close', code => {
        logger.log(
          stdout,
          stderr,
          `${code || 0}`,
        );
        if (code === 0) {
          resolve({ stdout, stderr, code });
          return;
        }
        // Allow plumbing commands with --quiet flag to return either 0 or 1.
        if (this.params.includes('--quiet')) {
          resolve({ stdout, stderr, code });
          return;
        }

        const error = new GitCmdError(`${stderr}`);
        error.code = code;
        error.info = { stdout, stderr, code };
        reject(error);
      });
    });
  }

  static cmd() {
    return new GitCmd();
  }
}

export default GitCmd;
