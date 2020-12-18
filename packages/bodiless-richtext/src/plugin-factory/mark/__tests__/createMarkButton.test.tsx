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
import createMarkButton from '../createMarkButton';
import { inactiveValueWithMark, activeValue } from './fixtures/markState';
import SlateEditorContext from '../../../core/SlateEditorContext';

const toggleStub = jest.fn();
const isActiveStub = jest.fn(() => true);

jest.mock('slate-react', () => ({
  useSlate: () => ({
    editor: {
      selection: [],
    },
  }),
}));

jest.mock('../markUtils', () => ({
  createIsActive: () => isActiveStub,
  createToggleMark: () => toggleStub,
}));

describe('createBlockButton:', () => {
  const markType = 'custom_mark';
  const markIcon = 'arrow_down';
  const Button = createMarkButton(markType, markIcon);

  beforeEach(() => {
    toggleStub.mockClear();
    isActiveStub.mockClear();
  });

  test('Button click triggers toggle and isActive on and off', () => {
    const contextValue = {
      value: inactiveValueWithMark,
    };
    // @ts-ignore
    const wrapper = mount(
      // @ts-ignore Our mock context value doesn't need all the properties.
      <SlateEditorContext.Provider value={contextValue}>
        <Button />
      </SlateEditorContext.Provider>,
    );
    const button = wrapper.find('button');

    button.simulate('mousedown');

    expect(toggleStub.mock.calls.length).toBe(1);
    expect(isActiveStub.mock.calls.length).toBe(1);

    button.simulate('mousedown');

    expect(toggleStub.mock.calls.length).toBe(2);
  });

  test('Button becomes active when the selection with mark is highlighted', () => {
    const contextValue = {
      value: activeValue,
    };
    // @ts-ignore
    const wrapper = mount(
      // @ts-ignore Our mock context value doesn't need all the properties.
      <SlateEditorContext.Provider value={contextValue}>
        <Button />
      </SlateEditorContext.Provider>,
    );
    const button = wrapper.find('button');

    expect(button.hasClass('active')).toBeTruthy();
  });
});
