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

export {};
const fs = require('fs');
// eslint-disable-next-line import/no-extraneous-dependencies
const { shallow } = require('enzyme');
const replace = require('replace-in-file');

const { onPreRenderHTML } = require('../gatsby-ssr');
const { onPostBuild } = require('../gatsby-node');

jest.mock('fs');
jest.mock('replace-in-file');

const generateMock = (path$: string, conf: object) => {
  fs.readFileSync.mockImplementation((path$$: string) => {
    if (path$ === path$$) {
      return JSON.stringify(conf);
    }
    return '';
  });
};

describe('add ssi components', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });
  describe('during ssr phase', () => {
    it('should add fake ssi elements to head', () => {
      const pragma = '<!--# include virtual="/foo.html" -->';
      const ssiConf = {
        foo: {
          pragma,
          dev: {
            file: 'foo.dev.html',
          },
          prod: {
            file: 'foo.prod.html',
          },
        },
      };
      const ssiConfDefaultPath = 'ssi/ssi_conf.json';
      generateMock(ssiConfDefaultPath, ssiConf);
      const getHeadComponents = () => [];
      const replaceHeadComponents = jest.fn();
      onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, { ssiEntities: ssiConf });
      const ssiElement = replaceHeadComponents.mock.calls[0][0][0];
      const wrapper = shallow(ssiElement);
      expect(wrapper.html()).toBe('<ssi-element-foo></ssi-element-foo>');
    });
  });
  describe('during postBuild phase', () => {
    it('should replace fake ssi elements', () => {
      const pragma = '<!--# include virtual="/foo.html" -->';
      const ssiConf = {
        foo: {
          pragma,
          dev: {
            file: 'foo.dev.html',
          },
          prod: {
            file: 'foo.prod.html',
          },
        },
      };
      const ssiConfDefaultPath = 'ssi/ssi_conf.json';
      generateMock(ssiConfDefaultPath, ssiConf);
      onPostBuild({}, {});
      expect(replace.sync).toHaveBeenCalledTimes(1);
      const ssiElementRegex = /<ssi-element-foo>(.*?)<\/ssi-element-foo>/;
      expect(replace.sync.mock.calls[0][0].from[0]).toStrictEqual(ssiElementRegex);
      expect(replace.sync.mock.calls[0][0].to[0]).toBe(pragma);
    });
  });
  describe('when ssi not configured', () => {
    describe('during ssr phase', () => {
      it('should not trigger adding elements to head', () => {
        const getHeadComponents = () => [];
        const replaceHeadComponents = jest.fn();
        onPreRenderHTML({ getHeadComponents, replaceHeadComponents }, {});
        expect(replaceHeadComponents).toHaveBeenCalledTimes(0);
      });
    });
    describe('during postBuild phase', () => {
      it('should not process html files of generated pages', () => {
        onPostBuild({}, {});
        expect(replace.sync).toHaveBeenCalledTimes(0);
      });
    });
  });
});
