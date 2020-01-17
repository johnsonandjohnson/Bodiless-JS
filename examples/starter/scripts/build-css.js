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

/* eslint no-console: 0 */
require('dotenv').config();
const fs = require('fs');
const util = require('util');
const ora = require('ora');
const exec = util.promisify(require('child_process').exec);

const unlinkFile = util.promisify(fs.unlink);

const BODILESS_TAILWIND_THEME_ENABLED = (process.env.BODILESS_TAILWIND_THEME_ENABLED || '1') === '1';

const deleteFile = async filePath => {
  if (fs.existsSync(filePath)) {
    try {
      await unlinkFile(filePath);
    } catch (err) {
      console.error(err);
    }
  }
};

const buildTailwind = async (cmd, fileOutputPath) => {
  if (BODILESS_TAILWIND_THEME_ENABLED) {
    const loadingSpinner = ora('Building Site Tailwind Theme...').start();

    try {
      const { stdout } = await exec(cmd);

      console.log(stdout);
      loadingSpinner.succeed('Site Tailwind Theme has been successfully built! \n');
    } catch (err) {
      console.error(err);
      loadingSpinner.fail('Something went wrong.');
    }
  } else {
    // We want to make sure there are no tailwind classes left if tailwind theme is disabled.
    const loadingSpinner = ora('Site Tailwind Theme Is Disabled. Making sure no Site Tailwind Theme classes left...').start();

    deleteFile(fileOutputPath);

    loadingSpinner.succeed('Site Tailwind Theme Is Disabled. No Site Tailwind Theme classes left!');
  }
};

const buildCss = async () => {
  const tailwindIndexPath = './src/components/index.tailwind.css';
  const siteTailwindOutputPath = './src/components/index.css';
  const siteTailwindConfigPath = './tailwind.config.js';

  const siteTailwindBuildCmd = `tailwind build ${tailwindIndexPath} -c ${siteTailwindConfigPath} -o ${siteTailwindOutputPath}`;

  await buildTailwind(siteTailwindBuildCmd, siteTailwindOutputPath);
};

buildCss();
