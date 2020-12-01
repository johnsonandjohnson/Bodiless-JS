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

import React from 'react';
import { mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import { flow } from 'lodash';
import { asBodilessLink } from '../src/Link';
import { HrefNormalizer } from '../src/Link/NormalHref';
import { withMockNode } from './helpers/MockContentNode';
import findContextMenuForm from './helpers/findContextMenuForm';

const mockCreateNormalHref = jest.fn((href: string) => ({
  toString: () => `mock://${href}`,
}));
jest.mock('../src/Link/NormalHref', () => (
  jest.fn().mockImplementation((href: string) => mockCreateNormalHref(href))
));

describe('asBodilessLink', () => {
  describe('link normalization', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    describe('on render', () => {
      it('invokes the default normalizer', () => {
        const A = asBodilessLink()('a');
        const wrapper = mount(<A href="foo" id="test" />);
        expect(mockCreateNormalHref).toBeCalledWith('foo');
        expect(wrapper.find('a#test').prop('href')).toBe('mock://foo');
      });
      it('invokes a custom normalizer', () => {
        const normalizeHref: HrefNormalizer = jest.fn((href?: string) => `custommock://${href}`);
        const A = asBodilessLink(undefined, undefined, () => ({ normalizeHref }))('a');
        const wrapper = mount(<A href="foo" id="test" />);
        expect(mockCreateNormalHref).not.toBeCalled();
        expect(normalizeHref).toBeCalledWith('foo');
        expect(wrapper.find('a#test').prop('href')).toBe('custommock://foo');
      });
    });

    describe('on save', () => {
      let mockIsEdit: jest.SpyInstance;

      beforeAll(() => {
        mockIsEdit = jest.spyOn(PageEditContext.prototype, 'isEdit', 'get').mockReturnValue(true);
      });

      afterAll(() => {
        mockIsEdit.mockRestore();
      });

      it('invokes the default normalizer', () => {
        const A = flow(
          asBodilessLink(),
          withMockNode,
        )('a');
        const wrapper = mount(<A />);
        const formWrapper = findContextMenuForm(wrapper);
        formWrapper.prop('submitValues')!({ href: 'bar' });
        expect(mockCreateNormalHref).toBeCalledWith('bar');
        expect(A.node.setData).toBeCalledWith({ href: 'mock://bar' });
      });

      it('invokes a custom normalizer', () => {
        const normalizeHref: HrefNormalizer = jest.fn((href?: string) => `custommock://${href}`);
        const A = flow(
          asBodilessLink(undefined, undefined, () => ({ normalizeHref })),
          withMockNode,
        )('a');
        const wrapper = mount(<A />);
        const formWrapper = findContextMenuForm(wrapper);
        formWrapper.prop('submitValues')!({ href: 'bar' });
        expect(mockCreateNormalHref).not.toBeCalled();
        expect(A.node.setData).toBeCalledWith({ href: 'custommock://bar' });
      });
    });
  });
});
