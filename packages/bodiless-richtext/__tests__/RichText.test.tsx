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
import {
  Value as SlateEditorValue,
  ValueJSON as SlateEditorValueJSON,
} from 'slate';
import { Editor } from 'slate-react';

const setEditMode = (isEdit: boolean) => {
  // @TODO bodiless-core internals should not be touched
  // bodiless-core should be refactored to allow injecting of default edit mode
  window.sessionStorage.isEdit = isEdit;
};
setEditMode(true);
// eslint-disable-next-line import/first
import { PageEditContext } from '@bodiless/core';
// eslint-disable-next-line import/first
import defaultValue from '../src/default-value';

const getDefaultRichTextItems = () => ({});
const getRichTextInitialValue = () => ({});

const setupPageEditContext = (isEdit: boolean): PageEditContext => {
  const pageEditContext = new PageEditContext();
  Object.defineProperty(pageEditContext, 'isEdit', { value: isEdit });
  return pageEditContext;
};

const createRichtext = () => {
  let RichText;
  // @ts-ignore no types defined for jest.isolateModules
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require
    RichText = require('../src/RichText').default;
  });
  return RichText as any;
};

describe('RichText', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when value prop is not passed', () => {
    it('passes default value to ReactEditor', () => {
      const design = {};
      const RichText = createRichtext();
      const wrapper = mount(<RichText design={design} />);
      const editor = wrapper.find('Editor');
      const valueProp = editor.prop('value') as unknown as SlateEditorValue;
      // eslint-disable-next-line max-len
      const defaultJSONValue = SlateEditorValue.fromJSON(defaultValue as SlateEditorValueJSON).toJSON();
      expect(valueProp.toJSON()).toStrictEqual(defaultJSONValue);
    });
  });
  describe('richtext content editable', () => {
    // eslint:disable-next-line: max-line-length
    test('richtext is editable, hover menu and buttons rendered when isEdit enabled in pageEditContext', () => {
      const RichText = createRichtext();
      const pageEditContext = setupPageEditContext(true);
      const wrapper = mount(
        <PageEditContext.Provider value={pageEditContext}>
          <RichText design={getDefaultRichTextItems()} initialValue={getRichTextInitialValue()} />
        </PageEditContext.Provider>,
      );
      expect(wrapper.find('Editor').props().readOnly).toBe(false);
      expect(wrapper.find('HoverMenu').length).toBe(1);
      expect(wrapper.find('PageContextProvider').length).toBe(1);

      const editor = wrapper.find('Editor').instance() as Editor;
      PageEditContext.prototype.refresh = jest.fn();
      expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(0);
      editor.props.onChange!({ operations: [] as any, value: SlateEditorValue.create() });
      expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(1);

      PageEditContext.prototype.activate = jest.fn();
      expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(0);
      wrapper.find('Editor').simulate('click');
      expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(1);
    });

    // eslint:disable-next-line: max-line-length
    test('richtext is not editable, hover menu and buttons are not rendered when isEdit disabled in pageEditContext', () => {
      const RichText = createRichtext();
      const pageEditContext = setupPageEditContext(false);
      const wrapper = mount(
        <PageEditContext.Provider value={pageEditContext}>
          <RichText design={getDefaultRichTextItems()} initialValue={getRichTextInitialValue()} />
        </PageEditContext.Provider>,
      );

      expect(wrapper.find('Editor').props().readOnly).toBe(true);
      expect(wrapper.find('HoverMenu').length).toBe(0);
      expect(wrapper.find('PageContextProvider').length).toBe(0);

      const editor = wrapper.find('Editor').instance() as Editor;
      editor.props.onChange!({ operations: [] as any, value: SlateEditorValue.create() });
      expect(PageEditContext.prototype.refresh).toHaveBeenCalledTimes(0);

      expect(wrapper.find('Editor').props().onClick).toBeUndefined();
      wrapper.find('Editor').simulate('click');
      expect(PageEditContext.prototype.activate).toHaveBeenCalledTimes(0);
    });
  });
});
