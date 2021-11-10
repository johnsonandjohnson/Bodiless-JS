/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { useContext } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount, ComponentType } from 'enzyme';
import { addPropsIf } from '../src';

describe('addPropsIf', () => {
  const Component = () => <></>;
  it('does not override passed props', () => {
    const Test: ComponentType<any> = addPropsIf(() => true)({ foo: 'bar' })(Component);
    const wrapper = shallow(<Test foo="baz" />);
    expect(wrapper.find(Component).prop('foo')).toBe('baz');
  });
  describe('using a condition based on props', () => {
    const condition = ({ isTrue }: any) => Boolean(isTrue);
    const Test = addPropsIf(condition)({ testProp: 'foo' })(Component);
    it('adds props if a condition is true', () => {
      const wrapper = shallow(<Test isTrue />);
      expect(wrapper.find(Component).prop('testProp')).toBe('foo');
    });
    it('does not add props if a condition is false', () => {
      const wrapper = shallow(<Test />);
      expect(wrapper.find(Component).prop('testProp')).toBeUndefined();
    });
  });
  describe('using a condition based on context', () => {
    const Context = React.createContext({ isTrue: false });
    const condition = () => useContext(Context).isTrue;
    const Test = addPropsIf(condition)({ testProp: 'foo' })(Component);
    it('adds props if a condition is true', () => {
      const wrapper = mount((
        <Context.Provider value={{ isTrue: true }}>
          <Test />
        </Context.Provider>
      ));
      expect(wrapper.find(Component).prop('testProp')).toBe('foo');
    });
    it('does not add props if a condition is false', () => {
      const wrapper = mount((
        <Context.Provider value={{ isTrue: false }}>
          <Test />
        </Context.Provider>
      ));
      expect(wrapper.find(Component).prop('testProp')).toBeUndefined();
    });
  });
});
