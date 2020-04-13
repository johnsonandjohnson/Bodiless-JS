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

import request from 'supertest';

const backendPrefix = '/prefix';
const backendFilePath = '/files';

const mockPageDelete = jest.fn();
const mockPage = jest.fn().mockImplementation(() => ({
  delete: mockPageDelete.mockResolvedValue(true),
}));

jest.mock('../src/page', () => mockPage);
jest.mock('../src/logger');

const getApp = () => {
  // eslint-disable-next-line global-require
  const Backend = require('../src/backend');
  const backend = new Backend();
  return backend.getApp();
};

describe('delete content endpoint', () => {
  // preparing environment variables
  // clearing mocks
  beforeEach(() => {
    jest.resetModules();
    process.env.GATSBY_BACKEND_PREFIX = backendPrefix;
    process.env.BODILESS_BACKEND_DATA_PAGE_PATH = backendFilePath;
    mockPageDelete.mockReset();
  });

  const performRequest = (app$: any, filePath: string) => request(app$)
    .delete(`${backendPrefix}/content/${filePath}`);

  it('should invoke local file deletion', async () => {
    const app = getApp();
    const filePath = 'test';
    await performRequest(app, filePath);
    expect(mockPage.mock.calls[0][0]).toBe(filePath);
    expect(mockPageDelete).toHaveBeenCalledTimes(1);
  });
});
