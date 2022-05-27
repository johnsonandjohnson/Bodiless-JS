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
import defaultValue from '../src/default-value';
import type { Value as SlateEditorValue } from '../src/Type';

const setEditMode = (isEdit: boolean) => {
  // @TODO bodiless-core internals should not be touched
  // bodiless-core should be refactored to allow injecting of default edit mode
  window.sessionStorage.isEdit = isEdit;
};
setEditMode(true);

const createRichtext = () => {
  let RichText;
  // @ts-ignore no types defined for jest.isolateModules
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require
    RichText = require('../src/RichText.static').default;
  });
  return RichText as any;
};

describe('RichText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('by default', () => {
    it('produces markup that matches defined snapshot', () => {
      const RichText = createRichtext();
      const wrapper = mount(<RichText />);
      expect(wrapper.html()).toMatchSnapshot();
    });
  });
  describe('when value prop is not passed', () => {
    it('passes default value to ReactEditor', () => {
      const design = {};
      const RichText = createRichtext();
      const wrapper = mount(<RichText design={design} />);
      const editor = wrapper.find('Slate');
      const valueProp = editor.prop('value') as unknown as SlateEditorValue;
      expect(valueProp).toStrictEqual(defaultValue);
    });
  });
});
