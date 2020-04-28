import React, { useState, FC } from 'react';
import { flow } from 'lodash';
import {
  withNode, DefaultContentNode, NodeProvider, TagType,
} from '@bodiless/core';

import { mount } from 'enzyme';
import withFilterByTags from '../src/withFilterByTags';
import { TagsNodeType } from '../src/TagButton/types';

type TestData = { [key: string]: TagsNodeType };

const testTags: TestData = {
  foo: { tags: [{ id: 'fooID', name: 'foo' }] },
  bar: { tags: [{ id: 'barID', name: 'bar' }] },
  baz: { tags: [{ id: 'batID', name: 'bat' }] },
  bat: { tags: [{ id: 'bazID', name: 'baz' }] },
};

const getMockNode = () => {
  const getters = {
    getNode: jest.fn((path: string[]) => testTags[path[path.length - 1]]),
    getKeys: jest.fn(() => Object.keys(testTags)),
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
        <button id="show-foo" type="button" onClick={() => setTags([{ id: 'fooID', name: 'foo' }])}>
          foo
        </button>
        <button id="show-bar" type="button" onClick={() => setTags([{ id: 'barID', name: 'bar' }])}>
          bar
        </button>
        <button id="show-baz" type="button" onClick={() => setTags([{ id: 'barID', name: 'bat' }])}>
          baz
        </button>
        <button id="show-bat" type="button" onClick={() => setTags([{ id: 'bazID', name: 'baz' }])}>
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
    expect(wrapper.find('div#foo')).toHaveLength(1);
    expect(wrapper.find('div#bar')).toHaveLength(0);
    expect(wrapper.find('div#baz')).toHaveLength(0);
    expect(wrapper.find('div#bat')).toHaveLength(0);
  });
});
