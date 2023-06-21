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

import React, { Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { flowHoc, withTokenFilter, HOCWithMeta } from '../src';
import type { HOC } from '../src';

const { meta } = flowHoc;

const addProp = (name?: string, value?: string): HOC => Comp => (props: any) => {
  if (!name) return <Comp {...props} />;
  const propsToAdd = {
    [name]: value || name,
  };
  return <Comp {...propsToAdd} {...props} />;
};

describe('flowHoc', () => {
  describe('meta', () => {
    it('meta.term creates an object of the right shape', () => {
      const t = meta.term('foo')('bar');
      expect(t).toEqual({ categories: { foo: ['bar'] } });
    });
  });

  describe('addProp helper', () => {
    const Base = () => <></>;
    it('Adds a prop', () => {
      const Test = addProp('foo', 'bar')(Base);
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'bar',
      });
    });

    it('Adds a prop with default value', () => {
      const Test = addProp('foo')(Base);
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'foo',
      });
    });

    it('Allows added props to be overridden', () => {
      const Test = addProp('foo', 'bar')(Base);
      // @ts-ignore prop foo does not exist on test
      const wrapper = mount(<Test foo="baz" />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'baz',
      });
    });
  });

  describe('HOC order', () => {
    const Base = () => <></>;
    it('Applies HOCs left to right', () => {
      const asTest = flowHoc(
        addProp('foo'),
        addProp('foo', 'bar'),
      );
      const Test = asTest(Base);
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).prop('foo')).toBe('bar');
    });

    it('Applies HOCs left to right including nested tokens', () => {
      const asFoo = flowHoc(
        addProp('foo'),
      );
      const asTest = flowHoc(
        asFoo,
        addProp('foo', 'bar'),
      );
      const Test = asTest(Base);
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).prop('foo')).toBe('bar');
    });

    it('Ignores undefined tokens', () => {
      const withPossiblyUndefinedToken = (token?: HOC) => flowHoc(
        token,
        addProp('bar'),
      );
      let Test = withPossiblyUndefinedToken()(Base);
      let wrapper = mount(<Test />);
      expect(wrapper.find(Base).prop('bar')).toBeTruthy();
      Test = withPossiblyUndefinedToken(addProp('foo'))(Base);
      wrapper = mount(<Test />);
      expect(wrapper.find(Base).prop('bar')).toBeTruthy();
      expect(wrapper.find(Base).prop('foo')).toBeTruthy();
    });
  });

  describe('Meta propagation', () => {
    it('Propagates original metadata', () => {
      const Base = () => <></>;
      Base.title = 'BaseTitle';
      const asPropagate = flowHoc(addProp('prop'));
      const Wrong = addProp()(Base);
      expect(Wrong.title).toBeUndefined();
      const Right = asPropagate(Base);
      expect(Right.title).toBe('BaseTitle');
    });

    it('Propagates added metadata', () => {
      const withNewMeta = flowHoc(
        meta.term('Type')('New'),
        addProp(),
      );
      const Test = withNewMeta(Fragment);
      expect(Test.categories?.Type.includes('New')).toBeTruthy();
    });

    it('Merges categories', () => {
      const Base = () => <></>;
      Base.categories = { Type: ['Base'] };
      const asTest = flowHoc(
        meta.term('Type')('Foo'),
      );
      const Test = asTest(Base);
      expect(Test.categories).toEqual({ Type: ['Base', 'Foo'] });
    });

    it('Overwrites titles', () => {
      const Base = () => <></>;
      Base.title = 'BaseTitle';
      const asTest = flowHoc(
        { title: 'Foo' },
      );
      const Test = asTest(Base);
      expect(Test.title).toBe('Foo');
    });

    it('Adds metadata from nested tokens', () => {
      const asFoo = flowHoc(meta.term('Type')('Foo'));
      const asBar = flowHoc(meta.term('Type')('Bar'));
      const asBaz = flowHoc(asBar, meta.term('Type')('Baz'));
      const asTest = flowHoc(
        asFoo,
        asBaz,
        { title: 'Test' },
        meta.term('Type')('Test'),
      );
      const Test = asTest(Fragment);
      expect(Test.title).toBe('Test');
      expect(Test.categories).toEqual({
        Type: ['Foo', 'Bar', 'Baz', 'Test'],
      });
    });

    it('Adds an empty meta when composed items do not have metadata', () => {
      const asTestToken = flowHoc(addProp('prop'));
      expect(asTestToken.meta).toStrictEqual({});
    });
  });

  describe('Filtering', () => {
    const Base = () => <></>;
    const asFoo = flowHoc(
      meta.term('Type')('Filtered'),
      meta.term('Name')('Foo'),
      addProp('foo'),
    );

    const asBar = flowHoc(
      meta.term('Type')('Unfiltered'),
      meta.term('Name')('Bar'),
      addProp('bar'),
    );

    const withoutFiltered = withTokenFilter(
      (t: HOCWithMeta) => !t.meta?.categories?.Type?.includes('Filtered')
    );

    it('Filters flat tokens', () => {
      const asTest = flowHoc(asFoo, asBar);
      const asFiltered = flowHoc(asTest, withoutFiltered);
      const Test = asTest(Base);
      const Filtered = asFiltered(Base);
      expect(Test.categories).toEqual({
        Type: ['Filtered', 'Unfiltered'],
        Name: ['Foo', 'Bar'],
      });
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'foo',
        bar: 'bar',
      });
      expect(Filtered.categories).toEqual({
        Type: ['Unfiltered'],
        Name: ['Bar'],
      });
      const wrapperF = mount(<Filtered />);
      expect(wrapperF.find(Base).props()).toEqual({
        bar: 'bar',
      });
    });

    it('Filters nested tokens', () => {
      const withNestedFoo = flowHoc(
        asFoo,
        meta.term('Name')('NestedFoo'),
        addProp('nestedFoo'),
      );
      const asTest = flowHoc(withNestedFoo, asBar);
      const asFiltered = flowHoc(asTest, withoutFiltered);
      const Test = asTest(Base);
      const Filtered = asFiltered(Base);
      expect(Test.categories).toEqual({
        Type: ['Filtered', 'Unfiltered'],
        Name: ['Foo', 'NestedFoo', 'Bar'],
      });
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'foo',
        bar: 'bar',
        nestedFoo: 'nestedFoo',
      });
      expect(Filtered.categories).toEqual({
        Type: ['Unfiltered'],
        Name: ['NestedFoo', 'Bar'],
      });
      const wrapperF = mount(<Filtered />);
      expect(wrapperF.find(Base).props()).toEqual({
        bar: 'bar',
        nestedFoo: 'nestedFoo',
      });
    });

    it('Propagates a filter', () => {
      const asBarNotFoo = flowHoc(withoutFiltered, asBar);
      const asTest = flowHoc(asFoo, asBarNotFoo);
      const Test = asTest(Base);
      expect(Test.categories).toEqual({
        Type: ['Unfiltered'],
        Name: ['Bar'],
      });
      const wrapperF = mount(<Test />);
      expect(wrapperF.find(Base).props()).toEqual({
        bar: 'bar',
      });
    });
  });

  describe('When undefined argument passed', () => {
    it('accepts it and ignores it', () => {
      const Base = () => <></>;
      const asTestToken = flowHoc(
        addProp('prop'),
        undefined,
      );
      expect(asTestToken.meta).toStrictEqual({});
      const Test = addProp('foo')(Base);
      const wrapper = mount(<Test />);
      expect(wrapper.find(Base).props()).toEqual({
        foo: 'foo',
      });
    });
  });
});
