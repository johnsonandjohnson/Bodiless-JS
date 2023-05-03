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

import React, { useState, FC } from 'react';
import flow from 'lodash/flow';
import { TagType } from '@bodiless/core';
import {
  withNode, DefaultContentNode, NodeProvider,
} from '@bodiless/data';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import type { TagsNodeType } from '../src/TagButton/types';
import withFilterByTags from '../src/FilterByGroup/withFilterByTags';

type TestData = { [key: string]: TagsNodeType };

const testTags: TestData = {
  foo: { tags: [{ value: 'fooID', label: 'foo' }] },
  bar: { tags: [{ value: 'barID', label: 'bar' }] },
  baz: { tags: [{ value: 'batID', label: 'bat' }] },
  bat: { tags: [{ value: 'bazID', label: 'baz' }] },
};

const getMockNode = () => {
  const getters = {
    getNode: jest.fn((path: string[]) => testTags[path[path.length - 1]]),
    getKeys: jest.fn(() => Object.keys(testTags)),
    hasError: jest.fn(),
    getPagePath: jest.fn(() => '/'),
    getBaseResourcePath: jest.fn(() => '/'),
  };
  const actions = {
    setNode: jest.fn(),
    deleteNode: jest.fn(),
  };
  return new DefaultContentNode(actions, getters, '');
};

const TestDiv: FC<any> = props => <div {...props} />;

const FilterableItem = flow(
  withFilterByTags,
  withNode,
)(TestDiv) as React.ComponentType<any>;

const TestFilterSelector = () => {
  const [tags, setTags] = useState<TagType[]>([]);
  return (
    <div>
      <div>
        <h2>Select a tag to filter by</h2>
        <button id="show-foo" type="button" onClick={() => setTags([{ value: 'fooID', label: 'foo' }])}>
          foo
        </button>
        <button id="show-bar" type="button" onClick={() => setTags([{ value: 'barID', label: 'bar' }])}>
          bar
        </button>
        <button id="show-baz" type="button" onClick={() => setTags([{ value: 'barID', label: 'bat' }])}>
          baz
        </button>
        <button id="show-bat" type="button" onClick={() => setTags([{ value: 'bazID', label: 'baz' }])}>
          bat
        </button>
      </div>
      <div>
        <h2>Filtered Components</h2>
        <NodeProvider node={getMockNode()}>
          <FilterableItem nodeKey="foo" selectedTags={tags} id="foo">
            foo
          </FilterableItem>
          <FilterableItem nodeKey="bar" selectedTags={tags} id="bar">
            bar
          </FilterableItem>
          <FilterableItem nodeKey="baz" selectedTags={tags} id="baz">
            baz
          </FilterableItem>
          <FilterableItem nodeKey="bat" selectedTags={tags} id="bat">
            bat
          </FilterableItem>
        </NodeProvider>
      </div>
    </div>
  );
};
describe('withFilterByTags', () => {
  it('Hides all items which do not match selected tags', () => {
    const wrapper = mount(<TestFilterSelector />);
    wrapper.find('#show-foo').simulate('click');
    expect(wrapper.find('div#foo')?.prop('style')?.display).toBeUndefined();
    expect(wrapper.find('div#bar')?.prop('style')?.display).toBe('none');
    expect(wrapper.find('div#baz')?.prop('style')?.display).toBe('none');
    expect(wrapper.find('div#bat')?.prop('style')?.display).toBe('none');
  });
});
