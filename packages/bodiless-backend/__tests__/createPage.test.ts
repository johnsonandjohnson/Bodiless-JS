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

import path from 'path';
import request from 'supertest';

const backendPrefix = '/prefix';
const backendFilePath = '/files';

const mockPageWrite = jest.fn();

jest.mock('../src/page', () => (pagePath: any) => ({
  file: `${backendFilePath}/${pagePath}.json`,
  write: mockPageWrite.mockResolvedValue(true),
  setBasePath: () => true,
}));

const getApp = () => {
  // eslint-disable-next-line global-require
  const Backend = require('../src/backend');
  const backend = new Backend();
  return backend.getApp();
};

describe('Create page endpoint', () => {
  // preparing environment variables
  // clearing mocks
  beforeEach(() => {
    jest.resetModules();
    process.env.GATSBY_BACKEND_PREFIX = backendPrefix;
    process.env.BODILESS_BACKEND_DATA_PAGE_PATH = backendFilePath;
    mockPageWrite.mockReset();
  });

  describe('when the page is created succefully', () => {
    const page = 'products';
    const template = '_default';
    const performRequest = (app$: any) => request(app$)
      .post(`${backendPrefix}/pages`)
      .send({
        path: page,
        template,
      });
    describe('index.json containing template', () => {
      it('should be writen to file system', async () => {
        const app = getApp();
        await performRequest(app);
        expect(mockPageWrite).toHaveBeenCalledTimes(1);
        const expected = path.resolve(backendFilePath, page, 'index.json');
        const resolved = await mockPageWrite.mock.instances[0];
        expect(resolved.file).toBe(expected);
      });
      it('should contain template', async () => {
        const app = getApp();
        await performRequest(app);
        expect(mockPageWrite.mock.calls[0][0]['#template']).toBe(template);
      });
    });
    it('should respond with 201 status', async () => {
      const app = getApp();
      const result = await performRequest(app);
      expect(result.status).toEqual(201);
    });
  });
});
