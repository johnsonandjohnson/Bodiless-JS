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

const commmonIgnore = [
  '/CHANGELOG.md',
  '/package.json',
  '/lib',
  '/node_modules',
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

const calculateHash = (files) => {
  const hashes = [];
  files.forEach(file => {
    const hash = execSync(`git show HEAD:${file}`).toString();
    hashes.push(hash);
  });
  return crypto.createHash('sha256').update(hashes.join('')).digest('hex');
};

const vitalFiles = scanDirRecursive(vitalPath, vitalPath, [...commmonIgnore, ...vitalIgnore]);
const vitalHash = calculateHash(vitalFiles);

const vitalNextFiles = scanDirRecursive(
  vitalNextPath, vitalNextPath, [...commmonIgnore, ...vitalNextIgnore]
);
const vitalNextHash = calculateHash(vitalNextFiles);

const vitalRelativeFiles = vitalFiles.map(file => file.replace(vitalPath, ''));
const vitalNextRelativeFiles = vitalNextFiles.map(file => file.replace(vitalNextPath, ''));

if (vitalHash !== vitalNextHash) {
  const differences = [];
  const vitalMoreFiles = vitalRelativeFiles.filter(
    file => !vitalNextRelativeFiles.includes(file)
  );
  const vitalNextMoreFiles = vitalNextRelativeFiles.filter(
    file => !vitalRelativeFiles.includes(file)
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
    const vitalHash = calculateHash([vitalFile]);
    const vitalNextHash = calculateHash([vitalNextFile]);
    if (vitalHash !== vitalNextHash) {
      differences.push(
        `\t${RED}${vitalFile} differs by ${vitalNextFile}${NC}`
      );
    }
  });

  console.error(`${RED}The packages __vital__ and __vital_next__ differ in these files:${NC}\n`);
  differences.forEach(difference => console.error(difference));
  process.exit(-1);
}

console.error(`${GREEN}The packages __vital__ and __vital_next__ are identical.${NC}`);
