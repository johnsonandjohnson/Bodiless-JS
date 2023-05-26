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

import fs from 'fs';
import path from 'path';

// ref: Inquirer.Question.validate
export type PromptValidator = (
  input: any,
  answers?: any,
) => (boolean | string | Promise<boolean | string>);

export const pathValidator: PromptValidator = inputPath => {
  const resolvedPath = path.resolve(process.cwd(), inputPath);
  if (
    fs.existsSync(resolvedPath)
    && !fs.lstatSync(resolvedPath).isDirectory()
  ) {
    return 'Please enter a valid path.';
  }
  try {
    fs.accessSync(resolvedPath, fs.constants.W_OK);
  } catch (err) {
    return `Path (${resolvedPath}) is not writable.`;
  }
  return true;
};

export const componentNameValidator: PromptValidator = (
  input, answers
) => {
  if (input.match(/[^_a-zA-Z0-9]/)) {
    return 'Component/Library name must be underscore or alphanumeric.';
  }
  if (answers && answers.destinationpath) {
    const componentPath = path.join(answers.destinationpath, 'components', input);
    if (fs.existsSync(componentPath)) {
      return 'Component directory already exists.';
    }
  }
  return true;
};

export const libraryNameValidator: PromptValidator = (
  input
) => {
  if (input.match(/[^_a-zA-Z0-9]/)) {
    return 'Component/Library name must be underscore or alphanumeric.';
  }
  return true;
};

export const packageNameValidator: PromptValidator = input => {
  if (input.match(/[^_@/\-a-zA-Z0-9]/)) {
    return 'Invalid package name';
  }
  return true;
};
