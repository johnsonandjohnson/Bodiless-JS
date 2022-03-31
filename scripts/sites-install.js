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
const fs = require('fs-extra');
const path = require('path');
const { spawn } = require('child_process');

const packagesDir = '../../packages';
const site = process.argv[2] || 'test-site';
process.chdir(`./sites-test/${site}`);
console.log('Installing local packages to ', process.cwd());

// Get list of all package tarballs, keyed by package-name
const packageMap = fs.readdirSync(packagesDir).reduce(
  (map, name) => {
    const dir = path.join(packagesDir, name);
    const stats = fs.statSync(dir);
    if (stats.isDirectory()) {
      try {
        const packageJson = fs.readFileSync(`${dir}/package.json`);
        const packageJsonData = JSON.parse(packageJson);
        const tarballName = packageJsonData.name.replace('@bodiless/', 'bodiless-');
        if (packageJsonData.name.match(/^@bodiless\//)) {
          const tarball = `${dir}/${tarballName}-${packageJsonData.version}.tgz`;
          if (fs.existsSync(tarball)) {
            return { ...map, [packageJsonData.name]: tarball };
          }
        }
      } catch (e) {
        console.log(e);
      }
    }
    return map;
  },
  {},
);

// Get bodiless dependencies of the site
const packageJson = fs.readFileSync('./package.json');
const packageJsonData = JSON.parse(packageJson);
const { dependencies, devDependencies } = packageJsonData;
const bodilessDependencies = Object.keys({ ...dependencies, ...devDependencies })
  .filter(package => package.includes('@bodiless'))
  // Map them to the tarball files, warning if one is not found.
  .map(package => {
    if (packageMap[package]) return packageMap[package];
    console.warn(`Warning: no local package found for ${package}`);
    return false;
  })
  .filter(Boolean);

if (bodilessDependencies.length < 1) {
  console.warn('No local packages to install');
  return;
}

// Install local packages.
const args = `install --legacy-peer-deps --no-package-lock --package-lock-only ${bodilessDependencies.join(' ')}`.split(' ');
const child = spawn('npm', args, {
  stdio: 'inherit',
  shell: true,
});

child.on('close', code => {
  if (code) {
    console.log(`Local packages install errored with code ${code}`);
    process.exit(code);
  } else {
    console.log('Updated local package.json');
  }
  fs.copySync('../../package-lock.json', './package-lock.json');
  const child$ = spawn('npm', ['install', '--legacy-peer-deps'], {
    stdio: 'inherit',
    shell: true,
  });
  child$.on('close', code$ => {
    console.log(`Local packages install exited with code ${code$}`);
    process.exit(code$);
  });
});
