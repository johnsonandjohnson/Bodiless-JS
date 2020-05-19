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

import page404Handler, {
  isCurrentPage404,
  getPage404DefaultUrl,
} from '../src/page404-handler';

describe('isCurrentPage404', () => {
  it('should check whether the first string param is equal to the second', () => {
    const input1 = 'https://example.com/404';
    const input2 = 'https://example.com/zzz';
    expect(isCurrentPage404(input1, input1)).toBe(true);
    expect(isCurrentPage404(input1, input2)).toBe(false);
  });
});

describe('getPage404DefaultUrl', () => {
  it('should return default 404 url, based on the main url', () => {
    const input = 'https://example.com/zzzz/dddd';
    const expected = 'https://example.com/404';
    expect(getPage404DefaultUrl(input)).toBe(expected);
  });
});

describe('page404Handler.getParams', () => {
  it('should return an object with default page 404 params', () => {
    const input = {
      url: 'https://example.com/',
    };
    const expected = {
      isPage404Disabled: false,
      page404Url: 'https://example.com/404',
    };
    const input1 = {
      url: 'https://example.com/',
      page404Url: 'https://example.com/custom-404',
    };
    const expected1 = {
      isPage404Disabled: false,
      page404Url: 'https://example.com/custom-404',
    };
    expect(page404Handler.getParams(input)).toEqual(expected);
    expect(page404Handler.getParams(input1)).toEqual(expected1);
  });
});

describe('page404Handler.processScrapedPage', () => {
  const input = {
    pageUrl: 'https://example.com/custom-404',
    rawHtml: '',
    status: 404,
    processedHtml: '',
    metatags: [],
    scripts: [],
    inlineScripts: [],
    styles: [],
    links: [],
    inlineStyles: [],
    images: [],
  };
  it('should do nothing if page 404 functionality is disabled', () => {
    const page404params = {
      isPage404Disabled: true,
      page404Url: 'https://example.com/404',
    };
    const expected = input;
    expect(page404Handler.processScrapedPage(input, page404params)).toEqual(expected);
  });
  it(`should change page url to /404 so that page creator always uses /404 path even for custom
"page not found" pages`, () => {
    const page404params = {
      isPage404Disabled: false,
      page404Url: 'https://example.com/custom-404',
    };
    const expected = 'https://example.com/404';
    expect(page404Handler.processScrapedPage(input, page404params).pageUrl).toBe(expected);
  });
  it(`should throw an error if current page responses with 404 status,
but it is not a default 404 page`, () => {
    const page404params = {
      isPage404Disabled: false,
      page404Url: 'https://example.com/another-default-404',
    };
    expect(() => page404Handler.processScrapedPage(input, page404params)).toThrow(
      `Page ${input.pageUrl} does not exist and will be redirected to default 404 page.`,
    );
  });
});
