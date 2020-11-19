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

/* eslint-disable no-console */
const { copySync, existsSync, mkdirpSync } = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

let destDir = '';
let src = 'starter';
let srcDir = '';

const inquirer = require('inquirer');

const askSetup = () => {
  const questions = [
    {
      type: 'list',
      name: 'typeofsite',
      message: 'What type of new site do you want to create?',
      choices: ['starter', 'test-site'],
      default: src,
    },
    {
      type: 'input',
      name: 'destinationdir',
      message: 'What is location of new site or site to update? recommend path to be ../ so its outside of monorepo.:'
    },
    {
      type: 'confirm',
      name: 'gitinit',
      message: 'Do you want to run git-init on Destination Directory? Recommended if New Starter Site:',
      default: false,
    },
    {
      type: 'confirm',
      name: 'runinstall',
      message: 'Do you want to run npm install on Destination Directory? Skip if you plan to Pack:',
      default: true,
    },
    {
      type: 'confirm',
      name: 'runpack',
      message: 'Do you want to pack latest version of Bodiless into Destination Directory?',
      default: true,
    },
  ];
  return inquirer.prompt(questions);
};

const askOverride = () => {
  const questions = [
    {
      type: 'confirm',
      name: 'overwrite',
      message: 'Destination directory already exists. Do you want to stop?',
      default: false,
    },
  ];
  return inquirer.prompt(questions);
};

const createSite = () => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    mkdirpSync(destDir),
    copySync(srcDir, destDir, {
      overwrite: true,
      errorOnExist: true,
      dereference: true,
      filter: name => !name.match(/node_modules/) && !name.match(/\.git\//) && !name.match(/.cache/) && !name.match(/lib/) && !name.match('/doc/') && !name.match('/edit/'),
    });
  } catch (e) {
    console.error(`Unable to copy ${srcDir} to ${destDir}`);
    console.error(e);
    process.exit(1);
  }
  console.log(`Site has been successfully copied from ${srcDir} to ${destDir}`);
};

const runGit = () => {
  process.chdir(destDir);

  spawn('git', ['init'], {
    stdio: 'inherit',
    shell: true,
  });
};

const runInstall = () => {
  process.chdir(destDir);

  const child = spawn('npm', ['install'], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', code => {
    console.log();
    if (code) {
      console.error(`npm install exited with code ${code}`);
      process.exit(code);
    }
    console.log('Installation successful.');
    console.log(`Use "cd ${destDir} && npm start" to launch the editor.`);
  });

};

const runPack = () => {

  const packstr = `pack -s ${destDir}`;

  spawn('bodiless', [packstr], {
    stdio: 'inherit',
    shell: true,
  });
  console.log('Pack successful.');
};

const run = async () => {

  const args = process.argv.filter(arg => !arg.match(/^--/));
  let gitInit = 0;
  let pack = 0;
  let noInstall = 0;

  if (args.length >= 3) {
    /// Preserve original new script behavior
    destDir = args[2]
    src = args[3] || 'starter';
    noInstall = process.argv.find(arg => arg === '--no-install') || 1;
    console.log(noInstall);
  } else {
    const choice = await askSetup();
    src = choice.typeofsite;
    destDir = choice.destinationdir;
    noInstall = choice.runinstall;
    gitInit = choice.gitInit;
    pack = choice.runpack;
  };

  srcDir = path.resolve('.', 'examples', src);

  if (existsSync(destDir)) {
    const overrideChoice = await askOverride();
    if (overrideChoice.overwrite) process.exit(0);
  }

  createSite();

  if (gitInit) {
    runGit();
  }

  if (noInstall) {
    runInstall();
  }

  if (pack) {
    runPack();
  }
};

run();
