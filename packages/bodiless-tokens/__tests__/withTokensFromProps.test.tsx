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
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import type { HTMLProps } from 'react';
import { v4 } from 'uuid';
import {
  ComponentOrTag, Token, asToken, Tag,
} from '@bodiless/fclasses';
import { withTokensFromProps } from '../src';

const withRandomKey = <P extends object>(Component: ComponentOrTag<P>) => {
  const WithRandomKey = (props: P) => <Component {...props} key={v4()} />;
  return WithRandomKey;
};

describe('withTokensFromProps', () => {
  const createTestToken = (attr: string): Token => (
    <P extends object>(C: ComponentOrTag<P>) => {
      const attrProp = { [attr]: true };
      const WithTestToken = (props: P) => <C {...props} {...attrProp} />;
      return WithTestToken;
    }
  ) as Token;

  it('Applies tokens provided as props', () => {
    const token1 = createTestToken('data-token1');
    const token2 = createTestToken('data-token2');
    const Test = withTokensFromProps<HTMLProps<HTMLSpanElement>>('span');
    const wrapper = mount(<Test tokens={[token1, token2]} id="test" />);
    expect(wrapper.find('span#test').prop('data-token1')).toBeDefined();
    expect(wrapper.find('span#test').prop('data-token2')).toBeDefined();
  });

  it('Does not re-render tokens when they change', () => {
    const token1 = createTestToken('data-token1');
    const token2 = createTestToken('data-token2');
    const Test = withTokensFromProps<HTMLProps<HTMLSpanElement>>('span');
    const wrapper = mount(<Test tokens={[token1]} id="test" />);
    expect(wrapper.find('span#test').prop('data-token1')).toBeDefined();
    wrapper.setProps({ tokens: [token2] });
    wrapper.update();
    expect(wrapper.find('span#test').prop('data-token1')).toBeDefined();
    expect(wrapper.find('span#test').prop('data-token2')).toBeUndefined();
  });

  it('updates tokens when wrapped in withRandomKey', () => {
    const token1 = createTestToken('data-token1');
    const token2 = createTestToken('data-token2');
    const Test = asToken(
      withTokensFromProps,
      withRandomKey,
    )('span' as Tag);
    const wrapper = mount(<Test tokens={[token1]} id="test" />);
    expect(wrapper.find('span#test').prop('data-token1')).toBeDefined();
    wrapper.setProps({ tokens: [token2] });
    expect(wrapper.find('span#test').prop('data-token1')).toBeUndefined();
    expect(wrapper.find('span#test').prop('data-token2')).toBeDefined();
  });

  it('Re-renders other props when they change', () => {
    const token1 = createTestToken('data-token1');
    const Test = withTokensFromProps<HTMLProps<HTMLSpanElement>>('span');
    const wrapper = mount(<Test tokens={[token1]} id="test" className="foo" />);
    const span = wrapper.find('span#test');
    expect(span.prop('data-token1')).toBeDefined();
    expect(span.prop('className')).toBe('foo');
    wrapper.setProps({ className: 'bar' });
    expect(wrapper.find('span#test').prop('className')).toBe('bar');
  });
});
