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

/* eslint-disable no-await-in-loop, no-param-reassign, no-console, no-return-await */
const fs = require('fs');
const ora = require('ora');
const glob = require('glob');
const util = require('util');

const asyncGlob = util.promisify(glob);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const copyrightText = `/**
 * Copyright © ${new Date().getFullYear()} Johnson & Johnson
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
 */\n
`;

const getExtension = filename => filename.split('.').pop();

const asyncForEach = async (arr, callback) => {
  for (let index = 0; index < arr.length; index += 1) {
    await callback(arr[index], index, arr);
  }
};

const convertToShTypeComment = string => {
  const shReplacer = /\*|\//g;
  return string.replace(shReplacer, '#');
};

const hasCopyright = string => /Copyright .*© [0-9]+ Johnson & Johnson/.test(string);

const respectShebang = (fileData, comment) => {
  // We need to keep Shebang string as a first line at all times.
  // https://stackoverflow.com/questions/16516840/effects-of-comment-lines-before-and-or-after-the-comment-like-bin-sh-line
  const shebangString = fileData.split('\n')[0];
  const isValidShebang = shebangString.includes('#!');

  const updatedFileData = isValidShebang
    ? [fileData.slice(0, shebangString.length + 1), comment, fileData.slice(shebangString.length + 1)].join('')
    : comment += fileData;

  return updatedFileData;
};

const prependComment = async (filePath, comment, spinner) => {
  spinner.text = `Adding copyright to ${filePath}`;

  try {
    const isShellType = ['sh', 'yaml'].includes(getExtension(filePath));
    const fileData = await readFile(filePath, 'utf8');

    if (hasCopyright(fileData)) return;

    const updatedFileData = isShellType
      ? respectShebang(fileData, convertToShTypeComment(comment))
      : respectShebang(fileData, comment);

    await writeFile(filePath, updatedFileData, 'utf8');
  } catch (err) {
    console.error(err);
    spinner.fail('Something went wrong.');
  }
};

const addCopyright = async () => {
  const spinner = ora('Retrieving all source files...').start();
  const ignore = [
    '**/bodiless.index.css',
    '**/node_modules/**',
    '**/coverage/**',
    '**/*.config.js',
    '**/gatsby-*.js',
    '**/index.css',
    '**/dist/**',
    '**/lib/**',
  ];
  const globPattern = '**/*.{js,ts,jsx,tsx,css,sh,yaml}';

  const files = await asyncGlob(globPattern, { dot: true, ignore });

  spinner.text = 'All source files have been retrieved. Start writing copyright headers...';
  await asyncForEach(files, async fPath => await prependComment(fPath, copyrightText, spinner));
  spinner.succeed('Success! All source files have been updated! \n');
};

addCopyright();
