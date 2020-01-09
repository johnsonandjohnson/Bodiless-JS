import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import { Transformer } from '../src/Design';

describe('Transformer', () => {
  describe('when props are changed', () => {
    it('should update passthrough props', () => {
      const Foo = () => <></>;
      const Bar = (props: any) => <Foo {...props} />;
      const transformer = (props: any) => props;
      const props = {
        a: 1,
      };
      // eslint-disable-next-line max-len
      const wrapper = shallow(<Transformer transformer={transformer} acomponent={Bar} {...props} />);
      expect(wrapper.prop('a')).toBe(1);
      const props$1 = {
        a: 2,
      };
      wrapper.setProps(props$1);
      expect(wrapper.prop('a')).toBe(2);
    });
  });
});
