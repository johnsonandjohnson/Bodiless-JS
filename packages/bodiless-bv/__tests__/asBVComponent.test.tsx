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
import BVProductIsNotMapped from '../src/components/BVErrors';
import BVPlaceholder from '../src/components/BVPlaceholder';
import BVLoading from '../src/components/BVLoading';

const mockBVLoader = (isLoaded: boolean) => {
  jest.doMock('../src/components/BVLoader', () => ({
    useBVLoader: () => ({
      isLoaded,
    }),
  }));
};

const mockBodilessCore = (isEdit: boolean) => {
  jest.doMock('@bodiless/core', () => ({
    useEditContext: () => ({
      isEdit,
    }),
  }));
};

const creatAsBVComponent = () => {
  let asBVComponent;
  // @ts-ignore no types defined for jest.isolateModules
  jest.isolateModules(() => {
    // eslint-disable-next-line global-require,prefer-destructuring
    asBVComponent = require('../src/components/asBVComponent').asDesignableBVComponent;
  });
  return asBVComponent;
};

describe('asBVComponent', () => {
  it('renders BVProductIsNotMapped when productId is empty', () => {
    mockBVLoader(true);
    const TestComponent = () => <></>;
    const asBVComponent = creatAsBVComponent();
    // @ts-ignore
    const BVComponent = asBVComponent()(() => <TestComponent />);
    const wrapper = mount(<BVComponent productId="" />);
    expect(wrapper.find(BVProductIsNotMapped).length).toBe(1);
  });
  describe('when on edit mode', () => {
    it('renders BVPlaceholder ', () => {
      mockBodilessCore(true);
      mockBVLoader(true);
      const TestComponent = () => <></>;
      const componentName = 'BVComponentName';
      const asBVComponent = creatAsBVComponent();
      // @ts-ignore
      const BVComponent = asBVComponent(componentName)(() => <TestComponent />);
      const wrapper = mount(<BVComponent productId="123" />);
      expect(wrapper.find(BVPlaceholder).length).toBe(1);
      expect(wrapper.find(BVPlaceholder).prop('productId')).toBe('123');
      expect(wrapper.find(BVPlaceholder).prop('componentName')).toBe(componentName);
    });
  });
  describe('when on preview mode', () => {
    describe('when BVLoader is loaded', () => {
      it('renders BVComponent', () => {
        mockBodilessCore(false);
        mockBVLoader(true);
        const TestComponent = () => <></>;
        const asBVComponent = creatAsBVComponent();
        // @ts-ignore
        const BVComponent = asBVComponent()(() => <TestComponent />);
        const wrapper = mount(<BVComponent productId="123" />);
        expect(wrapper.find(TestComponent).length).toBe(1);
      });
    });
    describe('when BVLoader is not loaded', () => {
      it('renders BVLoading', () => {
        mockBodilessCore(false);
        mockBVLoader(false);
        const TestComponent = () => <></>;
        const asBVComponent = creatAsBVComponent();
        // @ts-ignore
        const BVComponent = asBVComponent()(() => <TestComponent />);
        const wrapper = mount(<BVComponent productId="123" />);
        expect(wrapper.find(BVLoading).length).toBe(1);
      });
    });
  });
});
