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
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const RED='\u001b[31m';
const GREEN='\u001b[32m';
const NC='\u001b[0m';

const vitalPath = 'packages/__vital__';
const vitalNextPath = 'packages/__vital_next__';
const vitalPrefix = '__vital__';
const vitalNextPrefix = '__vital_next__';

const commonIgnore = [
  '/CHANGELOG.md',
  '/package.json',
  '/lib',
  '/node_modules',
  '/.turbo',
];
const vitalIgnore = [
  '/gatsby-ssr.js'
];
const vitalNextIgnore = [
  '/src/dm-sans-font.css'
];

const scanDirRecursive = (baseDir, dir, ignore) => {
  let paths = [];
  const files = fs.readdirSync(dir, { withFileTypes: true });
  files.forEach(file => {
    const fullPath = path.join(dir, file.name);
    if (ignore.indexOf(fullPath.replace(baseDir, '')) > -1) return;

    if (file.isDirectory()) {
      paths = paths.concat(scanDirRecursive(baseDir, path.join(dir, file.name), ignore));
    } else {
      paths.push(path.join(dir, file.name));
    }
  });
  return paths;
};

const calculateHash = (files, packagePrefix = null) => {
  const hashes = [];
  files.forEach(file => {
    const hash = execSync(`git show HEAD:${file}`).toString();
    if (!packagePrefix) {
      hashes.push(hash);
    } else {
      hashes.push(hash.replaceAll(packagePrefix, 'PREFIX'));
    }
  });
  return crypto.createHash('sha256').update(hashes.join('')).digest('hex');
};

const vitalFiles = scanDirRecursive(vitalPath, vitalPath, [...commonIgnore, ...vitalIgnore]);
const vitalHash = calculateHash(vitalFiles);

const vitalNextFiles = scanDirRecursive(
  vitalNextPath, vitalNextPath, [...commonIgnore, ...vitalNextIgnore]
);
const vitalNextHash = calculateHash(vitalNextFiles);

const vitalRelativeFiles = vitalFiles.map(file => file.replace(vitalPath, ''));
const vitalNextRelativeFiles = vitalNextFiles.map(file => file.replace(vitalNextPath, ''));

if (vitalHash !== vitalNextHash) {
  const differences = [];
  const vitalMoreFiles = vitalRelativeFiles.filter(
    file => !vitalNextRelativeFiles.includes(file.replace(vitalPrefix, vitalNextPrefix))
  );
  const vitalNextMoreFiles = vitalNextRelativeFiles.filter(
    file => !vitalRelativeFiles.includes(file.replace(vitalNextPrefix, vitalPrefix))
  );

  // Log file missing from --vital-next--
  vitalMoreFiles.forEach(file => differences.push(
    `${RED}\t--vital-- contains the file ${file}, it is missing from --vital-next--.${NC}`
  ));

  // Log file missing from --vital--
  vitalNextMoreFiles.forEach(file => differences.push(
    `${RED}\t--vital-next-- contains the file ${file}, it is missing from --vital--${NC}`
  ));

  const commonFiles = vitalRelativeFiles.filter(
    file => vitalNextRelativeFiles.includes(file)
  );

  commonFiles.forEach(file => {
    const vitalFile = path.join(vitalPath, file);
    const vitalNextFile = path.join(vitalNextPath, file);
    const vitalHash = calculateHash([vitalFile], vitalPrefix);
    const vitalNextHash = calculateHash([vitalNextFile], vitalNextPrefix);
    if (vitalHash !== vitalNextHash) {
      differences.push(
        `\t${RED}${vitalFile} differs by ${vitalNextFile}${NC}`
      );
    }
  });

  if (differences.length === 0) {
    console.error(`${GREEN}The packages __vital__ and __vital_next__ have the same code structure.${NC}`);
    process.exit(0);
  }

  console.error(`${RED}The packages __vital__ and __vital_next__ differ in these files:${NC}\n`);
  differences.forEach(difference => console.error(difference));
  process.exit(-1);
}

console.error(`${GREEN}The packages __vital__ and __vital_next__ are identical.${NC}`);
