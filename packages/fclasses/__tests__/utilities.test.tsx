import React, { useContext, FC } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme';
import { addPropsIf } from '../src';

describe('addPropsIf', () => {
  const Component = () => <></>;
  it('does not override passed props', () => {
    const Test: FC<any> = addPropsIf(() => true)({ foo: 'bar' })(Component);
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
