/* eslint-disable no-console */
/**
 * Copyright © 2019 Johnson & Johnson
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

class Logger {
  prefix: string = '';

  constructor(prefix: string) {
    this.prefix = `[${prefix.toUpperCase()}]`;
  }

  print(message: string[], severity?: string) {
    const fullMessage = [this.prefix, new Date().toISOString(), ...message];
    switch (severity) {
      case 'error':
        console.error(...fullMessage);
        break;
      case 'warn':
        console.warn(...fullMessage);
        break;
      default:
        console.log(...fullMessage);
    }
  }

  log(...args: string[]) {
    this.print(args);
  }

  error(...args: string[]) {
    this.print(args, 'error');
  }

  warn(...args: string[]) {
    this.print(args, 'warn');
  }
}

export default Logger;
