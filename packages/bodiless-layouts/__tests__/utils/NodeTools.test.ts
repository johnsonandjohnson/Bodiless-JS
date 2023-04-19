/**
 * Copyright © 2022 Johnson & Johnson
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

import { DefaultContentNode } from '@bodiless/data';
import axios from 'axios';
import {
  isImageNode, updateLibData, convertAssetImagePath, AssetImagePathConvertType,
} from '../../src/utils/NodeTools';

jest.mock('axios', () => ({
  ...jest.requireActual('axios'),
  post: jest.fn(),
}));

type MockNodeProps = {
  path: string[],
  data: any,
  getKeys?: () => string[],
  baseResourcePath?: string,
};

const mockStore = new Map();

const getMockNode = ({
  path,
  data,
  getKeys = () => [],
  baseResourcePath = '',
}: MockNodeProps) => {
  const path$ = path.join('$');
  if (data) {
    mockStore.set(path$, data);
  }
  const getters = {
    getNode: jest.fn(() => {
      const path$$ = path.join('$');
      return mockStore.get(path$$);
    }),
    getKeys,
    hasError: jest.fn(),
    getPagePath: jest.fn(() => '/'),
    getBaseResourcePath: jest.fn(() => baseResourcePath),
  };
  const actions = {
    setNode: jest.fn(),
    deleteNode: jest.fn(),
  };
  const defaultContentNode = new DefaultContentNode(actions, getters, path);
  jest.spyOn(defaultContentNode, 'child').mockImplementation(key => {
    const keys = Array.isArray(key) ? key : [key];
    return getMockNode({path: [...path, ...keys], data: null});
  });
  return defaultContentNode;
};

describe('isImageNode', () => {
  it('checks if it is an image node.', () => {
    const mockNodes = [
      {
        path: ['dir1', 'dir2', 'image'],
        data: {
          src: '/d1/d2/abc.jpg'
        },
        expected: true,
      },
      {
        path: ['dir1', 'dir2', 'dir3'],
        data: {
          src: 'abc.gif',
          alt: '',
          title: '',
        },
        expected: true,
      },
      {
        path: ['dir1', 'dir2', 'image'],
        data: {
          file: '/d1/d2/abc.pdf'
        },
        expected: false,
      },
      {
        path: ['dir1', 'dir2', 'style'],
        data: {
          file: '/d1/d2/style.css'
        },
        expected: false,
      },
    ];
    mockNodes.forEach(v => {
      const { path, data, expected } = v;
      const node = getMockNode({
        path,
        data,
      });
      expect(isImageNode(node)).toBe(expected);
    });
  });
});

describe('convertAssetImagePath', () => {
  const pageImageSrc = '/images/pages/flow-container/3fd47b03572bc5a70c2e6b34bed296c5/p6.jpg';
  const pageImageSrcWin = '/images\\pages\\\\flow-container\\3fd47b03572bc5a70c2e6b34bed296c5\\p6.jpg';
  const siteImageSrc = '/images/site/3fd47b03572bc5a70c2e6b34bed296c5/site.jpg';
  it('converts page level image path to site level path', () => {
    const expectedSrc = '/images/site/3fd47b03572bc5a70c2e6b34bed296c5/p6.jpg';
    const baseResourcePath = 'pages/flow-container/';
    const resultSrc = convertAssetImagePath(
      pageImageSrc, baseResourcePath, AssetImagePathConvertType.Site
    );
    expect(resultSrc).toBe(expectedSrc);
  });
  it('converts site level image path to page level path', () => {
    const expectedSrc = '/images/pages/flow-container/3fd47b03572bc5a70c2e6b34bed296c5/site.jpg';
    const baseResourcePath = 'pages/flow-container/';
    const resultSrc = convertAssetImagePath(
      siteImageSrc, baseResourcePath, AssetImagePathConvertType.Page
    );
    expect(resultSrc).toBe(expectedSrc);
  });
  it('converts Windows path style page level image path to site level path', () => {
    const expectedSrc = '/images/site/3fd47b03572bc5a70c2e6b34bed296c5/p6.jpg';
    const baseResourcePath = 'pages/flow-container/';
    const resultSrc = convertAssetImagePath(
      pageImageSrcWin, baseResourcePath, AssetImagePathConvertType.Site
    );
    expect(resultSrc).toBe(expectedSrc);
  });
});

describe('updateLibData', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it('moves source node to new path', () => {
    const getKeys = () => Array.from(mockStore.keys());
    const baseResourcePath = 'a1/a2/';
    const node1 = getMockNode({
      path: ['dir_1', 'dir_2'],
      data: { isParent: true },
      getKeys,
      baseResourcePath,
    });
    mockStore.set(['dir_1', 'dir_2', 'image'].join('$'), {
      src: '/images/a1/a2/image1.jpg',
    });

    const nodeDest = getMockNode({
      path: ['dir_x1', 'dir_x2'],
      data: {},
    });

    updateLibData(node1, nodeDest, false);
    expect(axios.post).toHaveBeenCalled();
  });
});
