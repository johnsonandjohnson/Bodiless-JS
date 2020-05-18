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
import withSidecarNodes, { endSidecarNodes } from '../src/withSidecarNodes';
import { ifToggledOn } from '../src/withFlowToggle';

type HOC = (C: ComponentType<any>) => ComponentType<any>;
type Bodiless = (key?: string) => HOC;

const withPropEnhancement = (id: string) => (Component: ComponentType<any>) => (
  (props: any) => {
    const { node } = useNode();
    const enhancement = {
      [`data-enh-${id}`]: node.path.join('$'),
    };
    return (
      <Component {...props} {...enhancement} />
    );
  }
);

const withFoo: Bodiless = (nodeKey?: string) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withPropEnhancement('foo'),
);

const withBar: Bodiless = (nodeKey?: string) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withPropEnhancement('bar'),
);

const withBaz: Bodiless = (nodeKey?: string) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withPropEnhancement('baz'),
);

const spanWithId = (id: string) => (props: any) => <span {...props} id={id} />;

describe('Sidecar Node Use Cases', () => {
  describe('Adding a toggle', () => {
    const mockNodeData = jest.fn();
    const useDataToggle = () => mockNodeData(useNode<any>().node.path.join('$'));
    const withToggleTo = (ToComponent: ComponentType<any>) => (nodeKey?: string) => flowRight(
      withNodeKey(nodeKey),
      withNode,
      ifToggledOn(useDataToggle)(
        () => ToComponent,
      ),
    );
    const Span = spanWithId('test');
    it('has the correct baseline', () => {
      const Test = withFoo('foo')(Span);
      const wrapper = mount(<Test />);
      expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$foo');
    });
    describe('Without sidecar', () => {
      const Bar = withBar('foo')(spanWithId('bar'));
      const Test = flowRight(
        withToggleTo(Bar)('toggle'),
        withFoo('foo'),
      )(Span);
      it('modifies the child nodekey when toggled off', () => {
        mockNodeData.mockReset();
        mockNodeData.mockReturnValueOnce(false);
        const wrapper = mount(<Test />);
        expect(mockNodeData.mock.calls[0][0]).toBe('root$toggle');
        expect(wrapper.find('span#bar')).toHaveLength(0);
        expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$toggle$foo');
      });
      it('modifies the child nodekey when toggled on', () => {
        mockNodeData.mockReset();
        mockNodeData.mockReturnValueOnce(true);
        const wrapper = mount(<Test />);
        expect(mockNodeData.mock.calls[0][0]).toBe('root$toggle');
        expect(wrapper.find('span#test')).toHaveLength(0);
        expect(wrapper.find('span#bar').prop('data-enh-bar')).toBe('root$toggle$foo');
      });
    });
    describe('With sidecar', () => {
      const Bar = withBar('foo')(spanWithId('bar'));
      const Test = flowRight(
        withSidecarNodes(
          withToggleTo(endSidecarNodes(Bar))('toggle'),
        ),
        withFoo('foo'),
      )(Span);
      it('does not change the child nodekey when toggled off', () => {
        mockNodeData.mockReset();
        mockNodeData.mockReturnValueOnce(false);
        const wrapper = mount(<Test />);
        expect(mockNodeData.mock.calls[0][0]).toBe('root$toggle');
        expect(wrapper.find('span#bar')).toHaveLength(0);
        expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$foo');
      });
      it('does not modify the child nodekey when toggled on', () => {
        mockNodeData.mockReset();
        mockNodeData.mockReturnValueOnce(true);
        const wrapper = mount(<Test />);
        expect(mockNodeData.mock.calls[0][0]).toBe('root$toggle');
        expect(wrapper.find('span#test')).toHaveLength(0);
        expect(wrapper.find('span#bar').prop('data-enh-bar')).toBe('root$foo');
      });
    });
  });
  describe('Enhancing a flow container item wrapper without changing data', () => {
    const ChildNodeProvider:any = withNode(React.Fragment);
    const Item:any = withFoo()(spanWithId('item'));
    const BasicWrapper:any = spanWithId('wrapper');
    const asFlowContainerItem = (Wrapper: any) => (
      <ChildNodeProvider nodeKey="child">
        <Wrapper>
          <Item />
        </Wrapper>
      </ChildNodeProvider>
    );
    it('has a correct baseline', () => {
      const baseline = asFlowContainerItem(BasicWrapper);
      const wrapper = mount(baseline);
      expect(wrapper.find('span#item').prop('data-enh-foo')).toBe('root$child');
    });
    it('leaves original nodekey unchanged when enhancement is in sidecar', () => {
      const EnhancedWrapper = withSidecarNodes(withBar('barkey'))(BasicWrapper);
      const test = asFlowContainerItem(EnhancedWrapper);
      const wrapper = mount(test);
      expect(wrapper.find('span#item').prop('data-enh-foo')).toBe('root$child');
      expect(wrapper.find('span#wrapper').prop('data-enh-bar')).toBe('root$child$barkey');
    });
    it('changes the original nodekey when enhancement is not in sidecar', () => {
      const EnhancedWrapper = withBar('barkey')(BasicWrapper);
      const test = asFlowContainerItem(EnhancedWrapper);
      const wrapper = mount(test);
      expect(wrapper.find('span#item').prop('data-enh-foo')).toBe('root$child$barkey');
      expect(wrapper.find('span#wrapper').prop('data-enh-bar')).toBe('root$child$barkey');
    });
  });
});

describe('withSidecarNodes', () => {
  it('Preserves the original nodeKey when an HOC is applied outside.', () => {
    const Test = flowRight(
      withSidecarNodes(
        withFoo('foo'),
      ),
      withBar('bar'),
    )(spanWithId('test'));
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$foo');
    expect(wrapper.find('span#test').prop('data-enh-bar')).toBe('root$bar');
  });
  it('Preserves the original nodeKey when wrapping a component.', () => {
    const Bar = withBar('bar')(spanWithId('test'));
    const baseline = mount(<Bar />);
    const Test = flowRight(
      withSidecarNodes(
        withFoo('foo'),
      ),
    )(Bar);
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$foo');
    expect(wrapper.find('span#test').prop('data-enh-bar')).toBe('root$bar');
    expect(baseline.find('span#test').prop('data-enh-bar')).toBe('root$bar');
  });
  it('Supports multiple sidecars', () => {
    const Test = flowRight(
      withFoo('foo'),
      withSidecarNodes(
        withBar('bar'),
      ),
      withSidecarNodes(
        withBaz('baz'),
      ),
    )(spanWithId('test'));
    const wrapper = mount(<Test />);
    expect(wrapper.find('span#test').prop('data-enh-foo')).toBe('root$foo');
    expect(wrapper.find('span#test').prop('data-enh-bar')).toBe('root$foo$bar');
    expect(wrapper.find('span#test').prop('data-enh-baz')).toBe('root$foo$baz');
  });
  it('Supports nested sidecars', () => {
    const Test = flowRight(
      withSidecarNodes(
        withNodeKey('foobar'),
        withNode,
        withSidecarNodes(
          withSidecarNodes(
            withBar('bar'),
          ),
          withFoo('foo'),
        ),
      ),
      withBaz('baz'),
    )(spanWithId('test'));
    const wrapper = mount(<Test />);
    const span = wrapper.find('span#test');
    expect(span.prop('data-enh-foo')).toBe('root$foobar$foo');
    expect(span.prop('data-enh-bar')).toBe('root$foobar$bar');
    expect(span.prop('data-enh-baz')).toBe('root$baz');
  });
});
