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

import {
  isUrlExternal,
  isUrlRelative,
  cfDecodeEmail,
} from '../src/helpers';

describe('relative urls', () => {
  test('relative urls', () => {
    expect(isUrlRelative('test.png')).toBe(true);
    expect(isUrlRelative('/test.png')).toBe(true);
    expect(isUrlRelative('https://localhost/test.png')).toBe(false);
  });
});

describe('Decoding Cloudflare-protected Emails', () => {
  test('decoding', () => {
    expect(cfDecodeEmail('314554424571455442451f525e5c'))
      .toBe('test@test.com');
  });
});

describe('isUrlExternal', () => {
  test('www and non-www urls are not external', () => {
    expect(isUrlExternal('www.example.com', 'example.com')).toBe(false);
    expect(isUrlExternal('www.example.com/path1', 'example.com')).toBe(false);
    expect(isUrlExternal('www.example.com/path1', 'example.com/path2')).toBe(false);
  });
  test('http and https of the same domain are not external', () => {
    expect(isUrlExternal('https://www.example.com', 'http://www.example.com')).toBe(false);
    expect(isUrlExternal('https://example.com', 'http://www.example.com')).toBe(false);
    expect(isUrlExternal('https://example.com', 'http://example.com')).toBe(false);
  });
  test('different domain urls are external', () => {
    expect(isUrlExternal('https://www.example2.com', 'https://www.example.com')).toBe(true);
    expect(isUrlExternal('https://www.example2.com/test1', 'https://www.example.com/test2')).toBe(true);
  });
});
