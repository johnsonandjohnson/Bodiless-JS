import React from 'react';
import { flow } from 'lodash';

import { render } from 'enzyme';
import { withMockNode } from './helpers/MockContentNode';
import { asEditable } from '../src';

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
      )('apan');
      const wrapper = render(<Test />);
      expect(wrapper.text()).toBe('Now *s the t*me');
    });
  });
});
