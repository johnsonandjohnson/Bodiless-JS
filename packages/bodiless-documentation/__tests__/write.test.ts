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

import path from 'path';
import fs from 'fs-extra';
import { writeTree, symlinkFile } from '../lib/write';

describe('writeTree', () => {
  const testPath = '/tmp/bdawrite';
  const symlinkTarget = path.join(testPath, 'target');
  beforeEach(() => {
    fs.removeSync(testPath);
    fs.mkdirSync(testPath);
    fs.closeSync(fs.openSync(symlinkTarget, 'w'));
  });
  afterEach(() => {
    fs.removeSync(testPath);
  });
  it('should create symlink at base level', (done:Function) => {
    const tree = { test1: symlinkTarget };
    writeTree({
      paths: tree,
      loc: testPath,
    }, symlinkFile).then(() => {
      expect(fs.existsSync(path.join(testPath, 'test1'))).toBe(true);
      done();
    });
  });
});
