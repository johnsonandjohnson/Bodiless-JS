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

/* eslint-disable global-require */

export {};
let fs = require('fs');

jest.mock('fs');
jest.mock('path', () => ({
  ...jest.requireActual('path'),
  resolve: (...pathSegment: any) => [...pathSegment].join('/'),
}));

const generateMock = (ssiConfPath: string) => {
  const ssiConf = {
    foo: {
      pragma: '<!--# include virtual="/foo.html" -->',
      dev: {
        file: 'foo.dev.html',
      },
      prod: {
        file: 'foo.prod.html',
      },
    },
  };
  process.env.SSI_CONF_PATH = ssiConfPath;
  fs.readFileSync.mockImplementation((path$: string) => {
    if (path$ === ssiConfPath) {
      return JSON.stringify(ssiConf);
    }
    if (path$ === `${ssiConfPath}/foo.dev.html`) {
      return '<div>foo dev</div>';
    }
    if (path$ === `${ssiConfPath}/foo.prod.html`) {
      return '<div>foo prod</div>';
    }
    return '';
  });
  fs.existsSync.mockImplementation(() => true);
};

describe('ssi files generator', () => {
  beforeEach(() => {
    jest.resetModules();
    fs = require('fs');
    jest.mock('fs');
    jest.clearAllMocks();
    jest.resetAllMocks();
    process.env.VOLUME_DIR = '/volume';
    process.env.DOCUMENT_ROOT = '/public';
  });
  describe('during build phase', () => {
    it('creates symlinks to html files defined in ssi conf', () => {
      const ssiConfDefaultPath = 'ssi/ssi_conf.json';
      generateMock(ssiConfDefaultPath);
      const generateSSIFiles = require('../src/generate-ssi-files');
      generateSSIFiles.main('build');
      expect(fs.symlink.mock.calls[0][0]).toBe('/volume/foo.html');
      expect(fs.symlink.mock.calls[0][1]).toBe('/public/foo.html');
    });
  });
  describe('during deploy phase', () => {
    describe('when SSI_ENV is set to dev', () => {
      it('takes and writes dev file', () => {
        const ssiConfDefaultPath = 'ssi/ssi_conf.json';
        generateMock(ssiConfDefaultPath);
        const generateSSIFiles = require('../src/generate-ssi-files');
        generateSSIFiles.main('deploy');
        expect(fs.copyFile.mock.calls[0][0]).toBe('ssi/foo.dev.html');
        expect(fs.copyFile.mock.calls[0][1]).toBe('/volume/foo.html');
      });
    });
    describe('when SSI_ENV is set to prod', () => {
      it('takes and writes prod file', () => {
        const ssiConfDefaultPath = 'ssi/ssi_conf.json';
        generateMock(ssiConfDefaultPath);
        process.env.SSI_ENV = 'prod';
        const generateSSIFiles = require('../src/generate-ssi-files');
        generateSSIFiles.main('deploy');
        expect(fs.copyFile.mock.calls[0][0]).toBe('ssi/foo.prod.html');
        expect(fs.copyFile.mock.calls[0][1]).toBe('/volume/foo.html');
      });
    });
  });
});
