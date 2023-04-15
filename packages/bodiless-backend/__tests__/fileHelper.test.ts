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
import MD5 from 'crypto-js/md5';
import { tmpdir } from 'os';
import { resolveRelativeToMe } from './tools';

const backendPrefix = '/prefix';
const backendStaticPath = tmpdir();
const filePath = resolveRelativeToMe('fixtures', 'images', 'image.png');

const getApp = () => {
  // eslint-disable-next-line global-require
  const Backend = require('../src/backend');
  const backend = new Backend();
  return backend.getApp();
};

describe('Create fileHelper endpoint', () => {
  // preparing environment variables
  // clearing mocks
  beforeEach(() => {
    jest.resetModules();
    process.env.GATSBY_BACKEND_PREFIX = backendPrefix;
    process.env.BODILESS_BACKEND_STATIC_PATH = backendStaticPath;
  });

  describe('when the image is uploaded succefully', () => {
    const nodePath = 'Page$homepage$309e2660-767a-11ea-8222-6fba863d924a$image';
    const file = '';
    const performRequest = (app$: any) => request(app$)
      .post(`${backendPrefix}/asset/pages`)
      .field('nodePath', nodePath)
      .set('Content-Type', 'multipart/form-data')
      .attach('file', filePath);
    it('should respond with 200 status', async () => {
      const app = getApp();
      const result = await performRequest(app);
      expect(result.status).toEqual(200);
    });
    it('should respond filesPath', async () => {
      const app = getApp();
      const result = await performRequest(app);
      const filesPath = [
        `/${['images', 'pages', MD5(nodePath).toString(), 'image.png'].join('/')}`
      ];
      const expected = { filesPath };
      expect(result.body).toMatchObject(expected);
    });
  });
});
