import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow, mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import HoverMenu, { HoverMenuProps } from '../src/core/HoverMenu';

const setupPageEditContext = (isEdit: boolean): PageEditContext => {
  const pageEditContext = new PageEditContext();
  Object.defineProperty(pageEditContext, 'isEdit', { value: isEdit });
  return pageEditContext;
};

describe('hover menu', () => {
  it('should render', () => {
    const wrapper = shallow(<HoverMenu />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it('should have id, children and className', () => {
    const pageEditContext = setupPageEditContext(true);
    const content = Math.random();
    const props: HoverMenuProps = {
      className: 'fooClass',
    };

    const wrapper = mount(
      <PageEditContext.Provider value={pageEditContext}>
        <HoverMenu {...props}>
          {content}
        </HoverMenu>
      </PageEditContext.Provider>,
    );

    const div = wrapper.find('div');
    const { className, id } = div.props();
    expect(id).toContain('hover-menu-');
    expect(className).toEqual(props.className);
    expect(div.text()).toEqual(content.toString());
  });
});
