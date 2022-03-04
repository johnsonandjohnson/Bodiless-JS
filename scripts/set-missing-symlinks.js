/**
 * Copyright © 2022 Johnson & Johnson
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
const fs = require('fs');
const path = require('path');

const checkSymlinkExists = dest => {
  // Cannot use fs.exists bc it checks the target of the symlink
  try {
    const stats = fs.lstatSync(dest);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Adds symlinks from site-level node_modules to their
 * equivalent at the repository root.  These are not created
 * by lerna, but are needed for some bodiess auto-discovery
 * mechanisms (docs, env vars, etc).
 *
 * @param string namespace 
 * The npm namespace to symlink.  Creates a symlink for the whole
 * namespace if it does not already exists, otehrwise, symlinks all
 * it's sub-packages.
 */
const setMissingSymlinks = namespace => {
  const nodeModules = path.resolve(path.join('.', 'node_modules'));
  if (!fs.existsSync(nodeModules)) fs.mkdirSync(nodeModules);
  const dest = path.resolve(path.join('.', 'node_modules', namespace));
  const source  = path.resolve(path.join('..', '..', 'node_modules', namespace));
  const  rel = path.relative(path.dirname(dest), source);
  if (!fs.existsSync(source) || !fs.statSync(source).isDirectory()) {
    console.warn(source, 'does not exist or is not a direlctory, not symlinking it.');
  } else if (!checkSymlinkExists(dest)) {
    console.log('Symlinking', dest, '->', rel);
    fs.symlinkSync(rel, dest);
  } else {
    console.log('Symlink to ', dest, 'already exists.');
  }
}

const args = process.argv.slice(2);
args.forEach(arg => setMissingSymlinks(arg));
