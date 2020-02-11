import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount, ReactWrapper } from 'enzyme';
import Image from '../src/Image';

let wrapper: ReactWrapper;
let menuButton: ReactWrapper;
let menuForm: ReactWrapper;
let menuPopup: ReactWrapper;

const imageProps = { nodeKey: 'imageKey' };

describe('image interactions', () => {
  it('should render an image menu item when clicked', () => {
    wrapper = mount(
      <div>
        <Image {...imageProps} />
      </div>,
    );

    const image = wrapper.find({ ...imageProps }).at(0);
    expect(image).toHaveLength(1);

    image.find('img').simulate('click');
    menuButton = wrapper.find('i');
    expect(menuButton.text()).toBe('image');
  });

  it('menu button should toggle context menu visibility when clicked', () => {
    menuButton.simulate('click');
    let tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeTruthy();

    menuButton.simulate('click');

    tooltips = wrapper.find('Tooltip');

    menuPopup = tooltips.at(1);
    expect(menuPopup.prop('visible')).toBeFalsy();
  });

  it('context form should have src and alt input fields with cancel and done buttons', () => {
    menuButton.simulate('click');
    menuForm = menuPopup.find('form');

    const imageSrc = menuForm.find('input#image-src');
    expect(imageSrc).toHaveLength(1);
    expect(imageSrc.prop('value')).toBe('/images/placeholder.png');

    const imageAlt = menuForm.find('input#image-alt');
    expect(imageAlt).toHaveLength(1);
    expect(imageAlt.prop('value')).toBe('Alt Text');

    const cancelButton = menuForm.find('button[aria-label="Cancel"]');
    expect(cancelButton).not.toBeUndefined();
    expect(cancelButton.prop('type')).toBe('button');
    const submitButton = menuForm.find('button[aria-label="Submit"]');
    expect(submitButton).not.toBeUndefined();
    expect(submitButton.prop('type')).toBeUndefined();
  });


  it('context menu form should close and save content when done is clicked', () => {
    let imageSrc = menuForm.find('input#image-src');
    imageSrc.simulate('change', { target: { value: 'ok' } });

    expect(wrapper.find('Popup[visible=true]')).toHaveLength(2);

    const doneButton = menuForm.find('button[aria-label="Submit"]');
    doneButton.simulate('submit');

    expect(wrapper.find('Popup[visible=true]')).toHaveLength(1);

    menuButton = wrapper.find('i');
    menuButton.simulate('click');

    menuPopup = wrapper.find('Tooltip[visible=true]').at(1);
    menuForm = menuPopup.find('form');
    imageSrc = menuForm.find('input#image-src');

    expect(imageSrc.prop('value')).toBe('ok');
  });
});
