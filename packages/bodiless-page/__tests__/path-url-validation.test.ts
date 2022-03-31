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

import { validatePagePath, validatePageUrl } from '../src/utils';

describe('validatePath', () => {
  it('Should return undefined when the path is valid.', () => {
    const path = 'shampoo_1';
    expect(validatePagePath(path)).toBeUndefined();
  });
  it('Should return a string warning when the path contains special chars', () => {
    const path = 'sha##mpoo';
    expect(typeof validatePagePath(path)).toBe('string');
  });
  it('Should return a string warning when the path contains uppercase letters', () => {
    const path = 'Shampoo';
    expect(typeof validatePagePath(path)).toBe('string');
  });
  it('Should return a string warning when the path contains spaces', () => {
    const path = 'shampo o1';
    expect(typeof validatePagePath(path)).toBe('string');
  });
  it('Should return a string warning when the path starts/ends with _ or -', () => {
    const path1 = 'shampoo_';
    const path2 = '_shampoo';
    const path3 = 'shampoo-';
    const path4 = '-shampoo';
    expect(typeof validatePagePath(path1)).toBe('string');
    expect(typeof validatePagePath(path2)).toBe('string');
    expect(typeof validatePagePath(path3)).toBe('string');
    expect(typeof validatePagePath(path4)).toBe('string');
  });
  it('Should return a string warning when the path is empty.', () => {
    const path = '';
    expect(typeof validatePagePath(path)).toBe('string');
  });
});

describe('validateUrl', () => {
  it('Should return undefined when the url is valid.', () => {
    const url = '/products/shampoo_1';
    expect(validatePageUrl(url)).toBeUndefined();
  });
  it('Should return a string warning when the url contains special chars.', () => {
    const url = '/products/shampoo@1';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
  it('Should return a string warning when the url contains uppercase letters', () => {
    const url = '/products/Shampoo';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
  it('Should return a string warning when the url contains spaces', () => {
    const url = '/products/shampo o1';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
  it('Should return a string warning when the url starts/ends with _ or -', () => {
    const url1 = '/products/shampoo_';
    const url2 = '_/products/shampoo';
    const url3 = '/products/shampoo-';
    const url4 = '-/products/shampoo';
    expect(typeof validatePageUrl(url1)).toBe('string');
    expect(typeof validatePageUrl(url2)).toBe('string');
    expect(typeof validatePageUrl(url3)).toBe('string');
    expect(typeof validatePageUrl(url4)).toBe('string');
  });
  it('Should return a string warning when the url is empty.', () => {
    const url = '';
    expect(typeof validatePageUrl(url)).toBe('string');
  });
});
