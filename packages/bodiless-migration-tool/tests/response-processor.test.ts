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

import ResponseProcessor, { RedirectConfig, ExportFormat } from '../src/response-processor';

// eslint-disable-next-line import/no-extraneous-dependencies
const { Response } = require('puppeteer/lib/NetworkManager');
const fs = require('fs');
const jsYaml = require('js-yaml');

// jest.mock('fs');
fs.writeFile = jest.fn();
let rp = new ResponseProcessor();

describe('Process redirect urls', () => {
  beforeEach(() => {
    rp = new ResponseProcessor();
  });

  it('creates redirect rules with redirecting response', () => {
    Response.headers = jest.fn(() => ({
      location: 'http://example.com/page2/',
    }));
    Response.url = jest.fn(() => 'http://example.com/page1');
    [301, 302, 307, 308].forEach(code => {
      Response.status = jest.fn(() => code);
      rp.processRedirect(Response);
      expect(rp.redirects).toMatchObject({ '/page1': { to: '/page2/', code } });
    });
  });

  it('creates redirect rule for external redirection', () => {
    Response.headers = jest.fn(() => ({
      location: 'http://example.com/page2/',
    }));
    Response.url = jest.fn(() => 'http://test.com/page1');
    const code = 301;
    Response.status = jest.fn(() => code);
    rp.processRedirect(Response);
    expect(rp.redirects).toMatchObject({ '/page1': { to: 'http://example.com/page2/', code } });
  });

  it('creates redirect rule for asset resource', () => {
    Response.headers = jest.fn(() => ({
      location: 'http://example.com/image/b.png',
    }));
    Response.url = jest.fn(() => 'http://example.com/asset/a.png');
    const code = 301;
    Response.status = jest.fn(() => code);
    rp.processRedirect(Response);
    expect(rp.redirects).toMatchObject({ '/asset/a.png': { to: '/image/b.png', code } });
  });

  it('does not create redirect rules with non-redirecting response', () => {
    Response.headers = jest.fn(() => ({
      location: 'http://example.com/page2/',
    }));
    Response.url = jest.fn(() => 'http://example.com/page1');
    [200, 401, 404, 500].forEach(code => {
      Response.status = jest.fn(() => code);
      rp.processRedirect(Response);
      expect(rp.redirects).toMatchObject({});
    });
  });
});

describe('Export redirect rules to file', () => {
  beforeEach(() => {
    rp = new ResponseProcessor();
    const responseSet = [
      {
        url: 'http://example.com/page1',
        location: 'http://example.com/page2/',
        code: 301,
      },
      {
        url: 'http://example.com/page3',
        location: 'http://example.com/page4/',
        code: 302,
      },
    ];
    responseSet.forEach(_ => {
      Response.headers = jest.fn(() => ({
        location: _.location,
      }));
      Response.url = jest.fn(() => _.url);
      Response.status = jest.fn(() => _.code);
      rp.processRedirect(Response);
    });
  });

  it('creates exports in right format', () => {
    const conf: RedirectConfig = {
      path: '/path/to/export.yaml',
      format: ExportFormat.Yaml,
    };
    rp.exportRedirects(conf);
    expect(fs.writeFile.mock.calls.length).toBe(1);
    expect(fs.writeFile.mock.calls[0][0]).toBe(conf.path);
    expect(fs.writeFile.mock.calls[0][1]).toBe(jsYaml.dump({ paths: rp.redirects }));
  });

  it('throws exception for wrong export format', () => {
    const conf: RedirectConfig = {
      path: '/path/to/export.yaml',
      format: ExportFormat.Json,
    };
    try {
      rp.exportRedirects(conf);
    } catch (e) {
      expect(e.message).toBe('Unknown format is specified');
    }
  });
});
