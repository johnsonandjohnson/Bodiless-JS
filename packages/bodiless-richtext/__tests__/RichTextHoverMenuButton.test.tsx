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

import React, { ComponentType } from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { PageEditContext } from '@bodiless/core';
import {
  withDesign,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import {
  asMark,
  withButton,
} from '../src/RichTextItemSetters';

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

const createPluginButtonMock = () => {
  const createPluginButtonMockFn = jest.fn()
    .mockReturnValue(() => <></>);
  jest.doMock('../src/plugin-factory/createPluginButton', () => ({
    __esModule: true,
    default: createPluginButtonMockFn,
  }));
  return createPluginButtonMockFn;
};

const applyTestHoc = (Component: ComponentType) => (props: any) => <Component {...props} />;

describe('RichText hover menu button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when a component with default key is added', () => {
    it('should create a hover menu button with a default icon', () => {
      const createPluginButtonMockFn = createPluginButtonMock();
      const simpleDesign = {
        SuperScript: applyTestHoc,
      };
      const pageEditContext = setupPageEditContext(true);
      const RichText = createRichtext();
      const PlainEditor = withDesign(simpleDesign)(RichText);
      mount(
        <PageEditContext.Provider value={pageEditContext}>
          <PlainEditor />
        </PageEditContext.Provider>,
      );
      expect(createPluginButtonMockFn.mock.calls.length).toBe(1);
      expect(createPluginButtonMockFn.mock.calls[0][0].icon).toBe('format_size');
    });
  });
  describe('when a component with a custom key is added', () => {
    it('should create a hover menu button with specfied icon', () => {
      const createPluginButtonMockFn = createPluginButtonMock();
      const withStrikeThroughMeta = flow(asMark, withButton('format_strikethrough'));
      const simpleDesign = {
        CustomStrikeThrough: withStrikeThroughMeta,
      };
      const pageEditContext = setupPageEditContext(true);
      const RichText = createRichtext();
      const PlainEditor = withDesign(simpleDesign)(RichText);
      mount(
        <PageEditContext.Provider value={pageEditContext}>
          <PlainEditor />
        </PageEditContext.Provider>,
      );
      expect(createPluginButtonMockFn.mock.calls.length).toBe(1);
      expect(createPluginButtonMockFn.mock.calls[0][0].icon).toBe('format_strikethrough');
    });
  });
  describe('when a custom component is added between 2 default components', () => {
    it('should create 3 hover buttons preserving the component order', () => {
      const createPluginButtonMockFn = createPluginButtonMock();
      const withStrikeThroughMeta = flow(asMark, withButton('format_strikethrough'));
      const simpleDesign = {
        Bold: applyTestHoc,
        CustomStrikeThrough: withStrikeThroughMeta,
        Italic: applyTestHoc,
      };
      const pageEditContext = setupPageEditContext(true);
      const RichText = createRichtext();
      const PlainEditor = withDesign(simpleDesign)(RichText);
      mount(
        <PageEditContext.Provider value={pageEditContext}>
          <PlainEditor />
        </PageEditContext.Provider>,
      );
      expect(createPluginButtonMockFn.mock.calls.length).toBe(3);
      expect(createPluginButtonMockFn.mock.calls[0][0].icon).toBe('format_bold');
      expect(createPluginButtonMockFn.mock.calls[1][0].icon).toBe('format_strikethrough');
      expect(createPluginButtonMockFn.mock.calls[2][0].icon).toBe('format_italic');
    });
  });
});
