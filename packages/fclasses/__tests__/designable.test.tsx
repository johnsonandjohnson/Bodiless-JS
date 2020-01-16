import React, { ComponentType, Fragment } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { designable, Design } from '../src/Design';

describe('designable', () => {
  describe('when props are changed', () => {
    it('should update passthrough props', () => {
      type BarProps = {
        a: number;
      };
      const Bar = (props: BarProps) => {
        const { a } = props;
        return <div>{a}</div>;
      };
      const props = {
        a: 1,
      };
      // eslint-disable-next-line max-len
      const Component = designable({})(Bar);
      const wrapper = mount(<Component {...props} />);
      expect(wrapper.text()).toBe('1');
      const props$1 = {
        a: 2,
      };
      wrapper.setProps(props$1);
      expect(wrapper.text()).toBe('2');
    });
    it('should not update design', () => {
      type BarDC = {
        Inner: ComponentType<any>;
      };
      type BarProps = {
        components: BarDC,
      };
      const Bar = (props:BarProps) => {
        const { components } = props;
        const { Inner } = components;
        return <Inner />;
      };
      const Component = designable({ Inner: Fragment } as BarDC)(Bar);
      const design1 = {
        Inner: () => () => <div>1</div>,
      } as Design<BarDC>;
      const design2 = {
        Inner: () => () => <div>2</div>,
      } as Design<BarDC>;
      const wrapper = mount(<Component design={design1} />);
      expect(wrapper.text()).toBe('1');
      wrapper.setProps({ design: design2 });
      expect(wrapper.text()).toBe('1');
    });
  });
});
