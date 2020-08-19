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

import React, { FC } from 'react';
import { shallow, mount } from 'enzyme';
import { observable } from 'mobx';
import {
  withContextActivator, withLocalContextMenu, withNodeDataHandlers, withOnlyProps,
} from '../src/hoc';

const TestComponent = ({ element: Element }: any) => (
  <Element><div>Test Component</div></Element>
);

describe('withOnlyProps', () => {
  it('keeps only the specified props', () => {
    const Base: FC<any> = () => null;
    const Test = withOnlyProps('foo', 'bar')(Base);
    const wrapper = shallow(<Test foo bar baz />);
    expect(wrapper.prop('foo')).toBeTruthy();
    expect(wrapper.prop('bar')).toBeTruthy();
    expect(wrapper.prop('baz')).toBeUndefined();
  });
});

describe('withContextActivator', () => {
  it('should be able to pass onClick handler to component', () => {
    const ContextActivator = withContextActivator('onClick')(TestComponent);
    const active = shallow(<ContextActivator />);
    expect(active.props()).toHaveProperty('onClick');
  });
});

describe('withLocalContextMenu', () => {
  it('should wrap component and suffix its name with `WithLocalContextMenu`', () => {
    const ContextMenuChild = withLocalContextMenu('div');
    const withMenu = mount(<ContextMenuChild id="testDiv" />);
    expect(withMenu.find('#testDiv')).toHaveLength(2);
    expect(withMenu.name()).toEqual('divWithLocalContextMenu');
  });
});

describe('withNodeDataHandlers', () => {
  it('should have componentData', () => {
    const values = {
      some: Math.random(),
    };
    const data = observable(values);
    const DataComponent = withNodeDataHandlers(data)(TestComponent);
    const withProps = shallow(<DataComponent />);
    expect(withProps.props().componentData).toEqual(values);
  });
});
