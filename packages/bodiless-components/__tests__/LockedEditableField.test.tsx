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
import { shallow, mount } from 'enzyme';
import { flow } from 'lodash';
import {
  default as BaseLockedEditableField,
  asTestableLockedEditableField,
 } from '../src/LockedEditableField';

 const LockedEditableField = flow(
   asTestableLockedEditableField
 )(BaseLockedEditableField);

describe('LockedEditableField', () => {
  it('renders in preview mode by default', () => {
    const wrapper = mount(<LockedEditableField value="test" />);
    expect(wrapper.find('Input').length).toBe(0);
    expect(wrapper.find('EditLink').length).toBe(1);
    expect(wrapper.find('CancelLink').length).toBe(0);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('switches to edit mode when user click edit button', () => {
    const wrapper = mount(<LockedEditableField value="test" />);
    wrapper.find('EditLink').simulate('click');
    expect(wrapper.find('Input').length).toBe(1);
    expect(wrapper.find('EditLink').length).toBe(0);
    expect(wrapper.find('CancelLink').length).toBe(1);
    expect(wrapper.html()).toMatchSnapshot();
  });
  it('switches back to preview mode when user clicks cancel in edit mode', () => {
    const wrapper = mount(<LockedEditableField value="test" />);
    wrapper.find('EditLink').simulate('click');
    wrapper.find('CancelLink').simulate('click');
    expect(wrapper.find('Input').length).toBe(0);
    expect(wrapper.find('EditLink').length).toBe(1);
    expect(wrapper.find('CancelLink').length).toBe(0);
    expect(wrapper.html()).toMatchSnapshot();
  });
});