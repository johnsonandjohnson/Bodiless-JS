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

const { spawn } = require('child_process');
const Logger = require('./logger');

const logger = new Logger('BACKEND');
/*
This Class wraps spawn and lets us build out git commands with standard responses
*/
class GitCmd {
  constructor() {
    this.cmd = 'git';
    this.params = [];
    this.files = [];
    this.options = {};
  }

  add(...params) {
    this.params.push(...params);
    return this;
  }

  set(options) {
    this.options = { ...this.options, ...options };
    return this;
  }

  addFiles(...files) {
    this.files.push(...files);
    // const rawFiles = [...arguments]
    // this.files.push(...rawFiles.map((file) => file.replace(/ /,'\ ')))
    return this;
  }

  spawn() {
    const args = [...this.params, ...this.files];
    logger.log([`Spawning command: ${this.cmd}`, ...args, Date.now(), process.cwd()]);
    return spawn(this.cmd, args, this.options);
  }

  exec() {
    return new Promise((resolve, reject) => {
      const cmd = this.spawn();
      let stderr = '';
      let stdout = '';
      cmd.stdout.on('data', data => {
        stdout += data.toString();
      });
      cmd.stderr.on('data', data => {
        stderr += data.toString();
      });
      cmd.on('close', code => {
        logger.log(stdout, stderr, code);
        if (code === 0) {
          resolve({ stdout, stderr, code });
          return;
        }
        // Allow plumbing commands with --quiet flag to return either 0 or 1.
        if (this.params.includes('--quiet') || 1) {
          resolve({ stdout, stderr, code });
          return;
        }

        console.error(stderr);
        const error = new Error(`${stderr}`);
        error.code = `${code}`;
        error.info = { stdout, stderr, code };
        reject(error);
      });
    });
  }

  static cmd() {
    return new GitCmd();
  }
}

module.exports = GitCmd;
