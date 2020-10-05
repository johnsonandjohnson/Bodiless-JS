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

import fs from 'fs';
import glob from 'glob';
import { Index } from 'lunr';
import SearchTool from '../src/SearchTool';

const searchTool = new SearchTool({});
describe('Search Tool', () => {
  const settings = {
    sourcePath: '/path/to/source',
    sourceTypes: ['html', 'htm'],
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('throws Error if source path does not exist', () => {
    jest.spyOn(fs, 'existsSync').mockImplementationOnce(() => false);
    expect(() => searchTool.findSourceFiles(settings)).toThrow(
      /Invalid source path/,
    );
  });

  it('collects source files by type from source path', () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    const sync = jest.spyOn(glob, 'sync');

    searchTool.findSourceFiles(settings);
    expect(sync).toHaveBeenCalledTimes(1);
    expect(sync).toHaveBeenCalledWith(
      '**/+(*.html|*.htm)',
      expect.objectContaining({ cwd: '/path/to/source' }),
    );

    const settingsRelativePath = {
      sourcePath: 'relative_path/to/source',
      sourceTypes: ['html', 'htm'],
    };
    searchTool.findSourceFiles(settingsRelativePath);
    expect(sync).toHaveBeenCalledWith(
      '**/+(*.html|*.htm)',
      expect.objectContaining({ cwd: `${process.cwd()}/relative_path/to/source` }),
    );
  });
});
