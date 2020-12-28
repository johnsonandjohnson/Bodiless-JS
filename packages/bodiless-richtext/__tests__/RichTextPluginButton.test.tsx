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
  asBlock,
  asInline,
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

const applyTestHoc = (Component: ComponentType) => (props: any) => <Component {...props} />;

const createBlockButtonMock = () => {
  const createBlockButtonMockFn = jest.fn()
    .mockReturnValue(() => <></>);
  jest.doMock('../src/plugin-factory/block/createBlockButton', () => ({
    __esModule: true,
    default: createBlockButtonMockFn,
  }));
  return createBlockButtonMockFn;
};

const createInlineButtonMock = () => {
  const createInlineButtonMockFn = jest.fn()
    .mockReturnValue(() => <></>);
  jest.doMock('../src/plugin-factory/inline/createInlineButton', () => ({
    __esModule: true,
    default: createInlineButtonMockFn,
  }));
  return createInlineButtonMockFn;
};

const createMarkButtonMock = () => {
  const createMarkButtonFn = jest.fn()
    .mockReturnValue(() => <></>);
  jest.doMock('../src/plugin-factory/mark/createMarkButton', () => ({
    __esModule: true,
    default: createMarkButtonFn,
  }));
  return createMarkButtonFn;
};

describe('RichText plugin button', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  describe('when a component with default key is added', () => {
    describe('when a block component is added', () => {
      it('should create a block button', () => {
        const simpleDesign = {
          H1: applyTestHoc,
        };
        const pageEditContext = setupPageEditContext(true);
        const createBlockButtonMockFn = createBlockButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);

        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );

        // mount(<PlainEditor />);
        expect(createBlockButtonMockFn.mock.calls.length).toBe(1);
        expect(createBlockButtonMockFn.mock.calls[0][0]).toBe('H1');
      });
    });
    describe('when an inline component is added', () => {
      it('should create an inline button', () => {
        const simpleDesign = {
          Link: applyTestHoc,
        };
        const pageEditContext = setupPageEditContext(true);
        const createInlineButtonMockkFn = createInlineButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);
        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );
        expect(createInlineButtonMockkFn.mock.calls.length).toBe(1);
        expect(createInlineButtonMockkFn.mock.calls[0][0]).toBe('Link');
      });
    });
    describe('when a mark component is added', () => {
      it('should create a mark button', () => {
        const simpleDesign = {
          SuperScript: applyTestHoc,
        };
        const pageEditContext = setupPageEditContext(true);
        const createMarkButtonMockFn = createMarkButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);
        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );
        expect(createMarkButtonMockFn.mock.calls.length).toBe(1);
        expect(createMarkButtonMockFn.mock.calls[0][0]).toBe('SuperScript');
      });
    });
  });
  describe('when a component with a custom key is added', () => {
    describe('when a block component is added', () => {
      it('should create a block button', () => {
        const withStrikeThroughMeta = flow(asBlock, withButton('format_strikethrough'));
        const simpleDesign = {
          CustomStrikeThrough: withStrikeThroughMeta,
        };
        const pageEditContext = setupPageEditContext(true);
        const createBlockButtonMockFn = createBlockButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);
        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );
        expect(createBlockButtonMockFn.mock.calls.length).toBe(1);
        expect(createBlockButtonMockFn.mock.calls[0][0]).toBe('CustomStrikeThrough');
      });
    });
    describe('when an inline component is added', () => {
      it('should create an inline button', () => {
        const withStrikeThroughMeta = flow(asInline, withButton('format_strikethrough'));
        const simpleDesign = {
          CustomStrikeThrough: withStrikeThroughMeta,
        };
        const pageEditContext = setupPageEditContext(true);
        const createInlineButtonMockkFn = createInlineButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);
        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );
        expect(createInlineButtonMockkFn.mock.calls.length).toBe(1);
        expect(createInlineButtonMockkFn.mock.calls[0][0]).toBe('CustomStrikeThrough');
      });
    });
    describe('when a mark component is added', () => {
      it('should create a mark button', () => {
        const withStrikeThroughMeta = flow(asMark, withButton('format_strikethrough'));
        const simpleDesign = {
          CustomStrikeThrough: withStrikeThroughMeta,
        };
        const pageEditContext = setupPageEditContext(true);
        const createMarkButtonMockFn = createMarkButtonMock();
        const RichText = createRichtext();
        const PlainEditor = withDesign(simpleDesign)(RichText);
        mount(
          <PageEditContext.Provider value={pageEditContext}>
            <PlainEditor />
          </PageEditContext.Provider>,
        );
        expect(createMarkButtonMockFn.mock.calls.length).toBe(1);
        expect(createMarkButtonMockFn.mock.calls[0][0]).toBe('CustomStrikeThrough');
      });
    });
  });
});
