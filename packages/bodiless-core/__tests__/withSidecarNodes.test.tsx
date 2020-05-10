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

import React, { ComponentType } from 'react';
import { flowRight } from 'lodash';
import { mount } from 'enzyme';
import withNode, { withNodeKey } from '../src/withNode';
import { useNode } from '../src/NodeProvider';
import withSidecarNodes from '../src/withSidecarNodes';

type HOC = (C: ComponentType<any>) => ComponentType<any>;
type Bodiless = (key?: string) => HOC;

const withEnhancement = (id: string) => (Component: ComponentType<any>) => (props: any) => {
  const { node } = useNode();
  const enhancement = {
    [`data-enh-${id}`]: node.path.join('$'),
  };
  return (
    <Component {...props} {...enhancement} />
  );
};

const NodePathPrinter = (props: any) => (<span {...props}>{useNode().node.path.join('$')}</span>);

const asBodilessComponent: Bodiless = (nodeKey?: string) => flowRight(
  withNodeKey(nodeKey),
  withNode,
);

const withCompoundEnhancement: Bodiless = (nodeKey?: string) => flowRight(
  asBodilessComponent(nodeKey),
  withEnhancement('foo'),
  asBodilessComponent('bar'),
  withEnhancement('bar'),
);

describe('withSidecarNodes', () => {
  it('is tested against the correct baseline', () => {
    const asTestWithoutEnhancement: HOC = flowRight(
      asBodilessComponent('test'),
    );
    const Test = asTestWithoutEnhancement(NodePathPrinter);
    const wrapper = mount(<Test id="test" />);
    expect(wrapper.find('span#test').text()).toBe('root$test');
  });

  it('adds new children and restores original node', () => {
    const asTestWithEnhancement: HOC = flowRight(
      withNodeKey('test'),
      withSidecarNodes(
        withCompoundEnhancement('foo'),
      ),
      asBodilessComponent(),
    );
    const Test = asTestWithEnhancement(NodePathPrinter);
    const wrapper = mount(<Test id="test" />);
    const span = wrapper.find('span#test');
    expect(span.text()).toBe('root$test');
    expect(span.prop('data-enh-foo')).toBe('root$test$foo');
    expect(span.prop('data-enh-bar')).toBe('root$test$foo$bar');
  });

  it('adds new peers and restores original node', () => {
    const asTestWithEnhancement: HOC = flowRight(
      withSidecarNodes(
        withCompoundEnhancement('foo'),
      ),
      asBodilessComponent('test'),
    );
    const Test = asTestWithEnhancement(NodePathPrinter);
    const wrapper = mount(<Test id="test" />);
    const span = wrapper.find('span#test');
    expect(span.text()).toBe('root$test');
    expect(span.prop('data-enh-foo')).toBe('root$foo');
    expect(span.prop('data-enh-bar')).toBe('root$foo$bar');
  });
});

export default withCompoundEnhancement;
