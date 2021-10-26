/**
 * Copyright © 2021 Johnson & Johnson
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

const origin = '/from';
const destination = '/to';
const backendPrefix = '/prefix';
const backendFilePath = '/files';

const mockPageClone = jest.fn();

jest.mock('../src/page', () => (pagePath: any) => ({
  path: pagePath,
  copyDirectory: pagePath === destination
    ? mockPageClone.mockResolvedValue(true)
    : mockPageClone.mockRejectedValue(false),
  setBasePath: () => true,
}));

const getApp = () => {
  // eslint-disable-next-line global-require
  const Backend = require('../src/backend');
  const backend = new Backend();
  return backend.getApp();
};

describe('Clone page endpoint', () => {
  // preparing environment variables
  // clearing mocks
  beforeEach(() => {
    jest.resetModules();
    process.env.GATSBY_BACKEND_PREFIX = backendPrefix;
    process.env.BODILESS_BACKEND_DATA_PAGE_PATH = backendFilePath;
    mockPageClone.mockReset();
  });

  const performRequest = (app$: any, data: any) => request(app$)
    .post(`${backendPrefix}/clone`)
    .send(data);

  describe('when the page is cloned succefully', () => {
    const data = { origin, destination };
    it('cloned page should be writen to file system', async () => {
      const app = getApp();
      await performRequest(app, data);
      expect(mockPageClone).toHaveBeenCalledTimes(1);
      const resolved = await mockPageClone.mock.instances[0];
      expect(resolved.path).toBe(destination);
    });

    it('should get the correct parameters', async () => {
      const app = getApp();
      await performRequest(app, data);
      expect(mockPageClone.mock.calls[0][0]).toBe(origin);
      expect(mockPageClone.mock.calls[0][1]).toBe(destination);
    });

    it('should respond with 200 status', async () => {
      const app = getApp();
      const result = await performRequest(app, data);
      expect(result.status).toEqual(200);
    });
  });

  describe('when the page is cloned failed', () => {
    const data = { origin, destination: '/page/error' };
    it('should respond with 500 status', async () => {
      const app = getApp();
      const result = await performRequest(app, data);
      expect(result.status).toEqual(500);
    });
  });
});
