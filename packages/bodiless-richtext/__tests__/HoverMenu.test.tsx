import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import HoverMenu, { HoverMenuProps } from '../src/core/HoverMenu';

describe('hover menu', () => {
  it('should render', () => {
    const wrapper = shallow(<HoverMenu />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should have id, children and className', () => {
    const content = Math.random();
    const props: HoverMenuProps = {
      className: 'fooClass',
    };
    const wrapper = shallow(
      <HoverMenu {...props}>
        {content}
      </HoverMenu>,
    );
    const div = wrapper.find('div');
    const { className, id } = div.props();
    expect(id).toContain('hover-menu-');
    expect(className).toEqual(props.className);
    expect(div.text()).toEqual(content.toString());
  });
});
