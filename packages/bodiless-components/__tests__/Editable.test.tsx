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

import React from 'react';
import flow from 'lodash/flow';

import { render, mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import { withMockNode } from './helpers/MockContentNode';
import { Editable, asEditable } from '../src';

describe('Editable', () => {
  describe('When editable', () => {
    let mockIsEdit: jest.SpyInstance;

    beforeAll(() => {
      mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
    });

    afterAll(() => {
      mockIsEdit.mockRestore();
    });

    it('Passes props to span', () => {
      const wrapper = mount(<Editable data-foo="bar" nodeKey="bar">Now is the time</Editable>);
      expect(wrapper.find('span').prop('data-foo')).toBe('bar');
    });

    it('Passes classname to span', () => {
      const wrapper = mount(<Editable nodeKey="bar" className="baz">Now is the time</Editable>);
      expect(wrapper.find('span').prop('className')?.split(' ')).toContain('baz');
    });

    it('Adds inline-editable class when className provided', () => {
      const wrapper = mount(<Editable nodeKey="bar" className="baz">Now is the time</Editable>);
      expect(wrapper.find('span').prop('className')?.split(' ')).toContain('bodiless-inline-editable');
    });

    it('Adds inline-editable class when no className provided', () => {
      const wrapper = mount(<Editable nodeKey="bar">Now is the time</Editable>);
      expect(wrapper.find('span').prop('className')).toBe('bodiless-inline-editable');
    });

    it('Adds test id for playwright', () => {
      const wrapper = mount(<Editable nodeKey="bar">Now is the time</Editable>);
      expect(wrapper.find('span').prop('data-test-id')).toBe('bodiless-inline-editable');
    });

    it('Accepts a custom tag', () => {
      const wrapper = mount(<Editable data-foo="bar" nodeKey="bar" tagName="h1">Now is the time</Editable>);
      expect(wrapper.find('h1').prop('data-foo')).toBe('bar');
    });
  });

  describe('When not editable', () => {
    it('Passes props to span', () => {
      const wrapper = mount(<Editable data-foo="bar" nodeKey="bar">Now is the time</Editable>);
      expect(wrapper.find('span').prop('data-foo')).toBe('bar');
    });
    it('Passes classname to span', () => {
      const wrapper = mount(<Editable nodeKey="bar" className="baz">Now is the time</Editable>);
      expect(wrapper.find('span').prop('className')?.split(' ')).toContain('baz');
    });

    it('Accepts a custom tag', () => {
      const wrapper = mount(<Editable data-foo="bar" nodeKey="bar" tagName="h1">Now is the time</Editable>);
      expect(wrapper.find('h1').prop('data-foo')).toBe('bar');
    });
  });
});

describe('asEditable', () => {
  describe('When not editable', () => {
    it('Invokes a sanitizer', () => {
      const data = {
        text: 'Now is the time',
      };
      const sanitizer = (text: string) => text.replace(/i/g, '*');
      const useOverrides = () => ({ sanitizer });
      const Test = flow(
        asEditable('foo', 'Foo', useOverrides),
        withMockNode(data),
      )('span');
      const wrapper = render(<Test />);
      expect(wrapper.text()).toBe('Now *s the t*me');
    });
  });
});
