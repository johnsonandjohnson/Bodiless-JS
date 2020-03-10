/**
 * Copyright © 2019 Johnson & Johnson
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
import { TestableSingleAccordion as SingleAccordion } from '../src/components/SingleAccordion';

describe('Single Accordion organizm', () => {
  it('should be collapsed by default', () => {
    const wrapper = mount(<SingleAccordion nodeKey="test" />);
    expect(wrapper.render().hasClass('collapsed')).toBeTruthy();
    expect(wrapper.find('div[data-accordion-element="accordion-body-wrapper"]').hasClass('hidden')).toBeTruthy();
  });
  it('should be expanded if "expanded" property was passed', () => {
    const wrapper = mount(<SingleAccordion expanded nodeKey="test" />);
    expect(wrapper.render().hasClass('expanded')).toBeTruthy();
    expect(wrapper.render().hasClass('collapsed')).toBeFalsy();
    expect(wrapper.find('div[data-accordion-element="accordion-body-wrapper"]').hasClass('block')).toBeTruthy();
    expect(wrapper.find('div[data-accordion-element="accordion-body-wrapper"]').hasClass('hidden')).toBeFalsy();
  });
  it("should toggle on title's click", () => {
    const wrapper = mount(<SingleAccordion nodeKey="test" />);
    wrapper.find('div[data-accordion-element="accordion-title-wrapper"]').simulate('click');
    expect(wrapper.render().hasClass('expanded')).toBeTruthy();
    expect(wrapper.find('div[data-accordion-element="accordion-body-wrapper"]').hasClass('block')).toBeTruthy();
    wrapper.find('div[data-accordion-element="accordion-title-wrapper"]').simulate('click');
    expect(wrapper.render().hasClass('collapsed')).toBeTruthy();
    expect(wrapper.find('div[data-accordion-element="accordion-body-wrapper"]').hasClass('hidden')).toBeTruthy();
  });
});
