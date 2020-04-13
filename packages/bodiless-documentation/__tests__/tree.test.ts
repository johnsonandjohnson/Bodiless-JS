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

import path from 'path';
import fs from 'fs-extra';
import { flow } from 'lodash';
import {
  withTree,
  prependPath,
  withDeepValue,
  getTreeFromDir,
  getSimplePaths,
  validatePaths,
} from '../lib/tree';
import { TreeHO } from '../lib/type';

describe('prePendPath', () => {
  it('should add paths to all string values', () => {
    const input = { a: './bob', b: { c: './sue' } };
    const expectResult = { a: '/e/r/bob', b: { c: '/e/r/sue' } };
    const prePath = '/e/r';
    expect(prependPath(prePath)(input)).toStrictEqual(expectResult);
  });
});
describe('withTree', () => {
  it('should respect the ordering of a toc', () => {
    const value1 = {
      foo: {
        'bar.md': './README.md',
      },
      'baz.md': './baz.md',
    };
    const value2 = {
      bing: {
        'bop.md': './README.md',
      },
      'baz.md': './baz.md',
      foo: {
        'bizzle.md': './bizzle.md',
        'pizzle.md': './README.md',
      },
    };
    const toc = {
      foo: {
        'pizzle.md': '',
      },
      'baz.md': '',
      bing: {},
    };
    const result1 = flow(withTree(value1), withTree(value2))(toc);
    expect(Object.getOwnPropertyNames(result1)[0]).toEqual('foo');
    expect(Object.getOwnPropertyNames(result1)[1]).toEqual('baz.md');
    expect(Object.getOwnPropertyNames(result1)[2]).toEqual('bing');
    expect(Object.getOwnPropertyNames(result1.foo)[0]).toEqual('pizzle.md');
    const result2 = flow(withTree(value2), withTree(value1))(toc);
    expect(Object.getOwnPropertyNames(result2)[0]).toEqual('foo');
    expect(Object.getOwnPropertyNames(result2)[1]).toEqual('baz.md');
    expect(Object.getOwnPropertyNames(result2)[2]).toEqual('bing');
    expect(Object.getOwnPropertyNames(result2.foo)[0]).toEqual('pizzle.md');
  });
  it('It should add a key when the input has one', () => {
    const input = {};
    const value = { products: { cool: './Readme.md' } };
    const result = withTree(value)(input);
    expect(result).toHaveProperty('products');
  });
  it('should add an abs Path when a string is added', () => {
    const input = {};
    const value = { products: { cool: './Readme.md' } };
    const result = withTree(value)(input);
    expect(result).toStrictEqual({ products: { cool: './Readme.md' } });
  });
  it('if we add a dir where there is a file the file is move to README.md', () => {
    const input = { products: '/tmp/to/other/Readme.md' };
    const value = { products: { cool: './Readme.md' } };
    const result = withTree(value)(input);
    expect(result).toStrictEqual({
      products: {
        'README.md': '/tmp/to/other/Readme.md',
        cool: './Readme.md',
      },
    });
  });
  it('If we add a path to a dir then we should instead add it to README.md', () => {
    const input = { products: { cool: '/tmp/to/other/Readme.md' } };
    const value = { products: './Readme.md' };
    const result = withTree(value)(input);
    expect(result).toStrictEqual({
      products: {
        cool: '/tmp/to/other/Readme.md',
        'README.md': './Readme.md',
      },
    });
  });
  it('Should be able to take more than one new item', () => {
    const input = { products: '/tmp/to/other/Readme.md' };
    const value = { stuff: 'stuff.md', otherstuff: './thing.md' };
    const result = withTree(value)(input);
    expect(result).toStrictEqual({
      products: '/tmp/to/other/Readme.md',
      stuff: 'stuff.md',
      otherstuff: './thing.md',
    });
  });
});
describe('withDeepValue', () => {
  it('Take a string and return a function that will set it on a Tree', () => {
    const tree = {};
    const key = 'addme';
    const value = 'value add';
    expect(withDeepValue(key, value)(tree)).toStrictEqual({
      [key]: value,
    });
  });
  it('takes an array of keys and walks the tree to add the value', () => {
    const tree = {};
    const key = ['addme', 'addme2'];
    const value = 'value add';
    expect(withDeepValue(key, value)(tree)).toStrictEqual({
      [key[0]]: {
        [key[1]]: value,
      },
    });
  });
  it('Starting values sould be presevered', () => {
    const tree = {
      deep1: {
        a: 'b',
      },
      c: 'd',
    };
    const key = ['deep1', 'addme2'];
    const value = 'value add';
    expect(withDeepValue(key, value)(tree)).toStrictEqual({
      [key[0]]: {
        [key[1]]: value,
        a: 'b',
      },
      c: 'd',
    });
  });
});
describe('getTreeFromDir', () => {
  const testPath = '/tmp/dbact';
  beforeEach(() => {
    fs.removeSync(testPath);
    fs.mkdirSync(testPath);
  });
  it('Should create a string with full path for file', (done:Function) => {
    const file1 = path.join(testPath, 'file1.md');
    fs.closeSync(fs.openSync(file1, 'w'));
    getTreeFromDir(testPath).then((result:TreeHO) => {
      expect(result({})).toStrictEqual({ 'file1.md': file1 });
      done();
    });
  });
  it('Should create key with object for a dir if there is a file in it', (done:Function) => {
    const dir1 = path.join(testPath, 'dir1');
    fs.mkdirSync(dir1);
    const file2 = path.join(dir1, 'file2.md');
    fs.closeSync(fs.openSync(file2, 'w'));
    getTreeFromDir(testPath).then((result:Function) => {
      expect(result({})).toStrictEqual({ dir1: { 'file2.md': file2 } });
      done();
    });
  });
  it('Should respect what came before', (done:Function) => {
    const startTree = { a: 'b' };
    const file1 = path.join(testPath, 'file1.md');
    fs.closeSync(fs.openSync(file1, 'w'));
    getTreeFromDir(testPath).then((result:Function) => {
      expect(result(startTree)).toStrictEqual({ 'file1.md': file1, ...startTree });
      done();
    });
  });
});
describe('getSimplePaths', () => {
  it('Should create a list of path from nested tree', () => {
    const input = {
      a: {
        b: {
          c: 'd',
        },
      },
      y: 'y',
    };
    const expectResult = ['d', 'y'];
    expect(getSimplePaths(input)).toStrictEqual(expectResult);
  });
});
describe('validatePaths', () => {
  it('Should throw an error if passed path has letter case typos', () => {
    const input = [
      path.resolve('PackAge.json'),
    ];
    // 'no such file' error on Linux.
    // The file is found but the path is not case-sensitively equial on Mac.
    expect(() => validatePaths(input)).toThrow(
      /no such file or directory|Make sure the path is case-sensitively correct/,
    );
  });
});
