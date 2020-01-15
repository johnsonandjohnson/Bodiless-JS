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
import {
  withDesign,
} from '@bodiless/fclasses';
import { flow } from 'lodash';
import {
  asMark,
  withButton,
  withKey,
} from '../src/RichTextItemSetters';

const createRichtext = () => {
  let RichText;
  // @ts-ignore no types defined for jest.isolateModules
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require
    RichText = require('../src/RichText').default;
  });
  return RichText as any;
};

const createKeyboardPluginMock = () => {
  const createKeyboardPluginMockFn = jest.fn();
  jest.doMock('../src/plugin-factory/keyBoardShortcut', () => ({
    __esModule: true,
    createKeyboardPlugin: (props: any) => {
      createKeyboardPluginMockFn(props);
      return {};
    },
  }));
  return createKeyboardPluginMockFn;
};

const applyTestHoc = (Component: ComponentType) => (props: any) => <Component {...props} />;

describe('RichText keyboard shortcut', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when a component with default key is added', () => {
    it('should create a keyboard shortcut', () => {
      const simpleDesign = {
        SuperScript: applyTestHoc,
      };
      const createKeyboardPluginMockFn = createKeyboardPluginMock();
      const RichText = createRichtext();
      const PlainEditor = withDesign(simpleDesign)(RichText);
      mount(<PlainEditor />);
      expect(createKeyboardPluginMockFn.mock.calls.length).toBe(1);
      expect(createKeyboardPluginMockFn.mock.calls[0][0].key).toBe('s');
    });
  });
  describe('when a component with a custom key is added', () => {
    it('should create a keyboard shortcut', () => {
      const createKeyboardPluginMockFn = createKeyboardPluginMock();
      const withStrikeThroughMeta = flow(asMark, withKey('t'), withButton('format_strikethrough'));
      const simpleDesign = {
        CustomStrikeThrough: withStrikeThroughMeta,
      };
      const RichText = createRichtext();
      const PlainEditor = withDesign(simpleDesign)(RichText);
      mount(<PlainEditor />);
      expect(createKeyboardPluginMockFn.mock.calls.length).toBe(1);
      expect(createKeyboardPluginMockFn.mock.calls[0][0].key).toBe('t');
    });
  });
});
