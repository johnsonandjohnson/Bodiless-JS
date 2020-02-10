import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
import Link from '../src/Link';

let wrapper: ReactWrapper;
let menuButton: ReactWrapper;
let menuForm: ReactWrapper;
let menuPopup: ReactWrapper;

const firstLinkProps = { nodeKey: 'oneLink' };
const secondLinkProps = { nodeKey: 'anotherLink' };

describe('link interactions', () => {
  it('should render a link menu item when clicked', () => {
    wrapper = mount(
      <div>
        <Link {...firstLinkProps}>This is a link</Link>
        <Link {...secondLinkProps}>This is another link</Link>
      </div>,
    );
    const firstLink = wrapper.find({ ...firstLinkProps }).at(0);
    expect(firstLink).toHaveLength(1);

    firstLink.find('a').simulate('click');
    menuButton = wrapper.find('i');
    expect(menuButton.text()).toBe('link');
  });

  it('link button should toggle context menu visibility when clicked', () => {
    menuButton.simulate('click');
    let tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeTruthy();

    menuButton.simulate('click');

    tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeFalsy();
  });

  it('context form should have link-href input field with cancel and done buttons', () => {
    menuButton.simulate('click');
    menuForm = menuPopup.find('form');

    const inputField = menuForm.find('input#link-href');
    expect(inputField).toHaveLength(1);

    const buttons = menuForm.find('button');
    expect(buttons.at(0).text()).toBe('cancel');
    expect(buttons.at(1).text()).toBe('done');
  });


  it('context menu form should close and save content when done is clicked', () => {
    let inputField = menuForm.find('input#link-href');
    inputField.simulate('change', { target: { value: 'ok' } });

    expect(wrapper.find('Popup[visible=true]')).toHaveLength(2);

    const buttons = menuForm.find('button');
    const doneButton = buttons.at(1);
    doneButton.simulate('submit');

    expect(wrapper.find('Popup[visible=true]')).toHaveLength(1);

    menuButton = wrapper.find('i');
    menuButton.simulate('click');

    menuPopup = wrapper.find('Tooltip[visible=true]').at(1);
    menuForm = menuPopup.find('form');
    inputField = menuForm.find('input#link-href');

    expect(inputField.prop('value')).toBe('ok');

    wrapper.find({ ...secondLinkProps }).find('a').simulate('click');
    wrapper.find({ ...firstLinkProps }).find('a').simulate('click');

    menuButton = wrapper.find('i');
    menuButton.simulate('click');

    menuPopup = wrapper.find('Tooltip[visible=true]').at(1);
    menuForm = menuPopup.find('form');
    inputField = menuForm.find('input#link-href');
    expect(inputField.prop('value')).toBe('ok');
  });

  it('context form should not save content when cancel is clicked', () => {
    const inputField = menuForm.find('input#link-href');
    inputField.simulate('change', { target: { value: 'this should not be saved' } });
    expect(wrapper.find('Popup[visible=true]')).toHaveLength(2);
    menuForm.find('button').at(0).simulate('submit');
    expect(wrapper.find('Popup[visible=true]')).toHaveLength(1);
    expect(inputField.prop('value')).toBe('ok');
  });
});
