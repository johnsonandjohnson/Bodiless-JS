/**
 * Copyright © 2022 Johnson & Johnson
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
import { mount } from 'enzyme';
import { CuratorClean } from '../src/components/Curator';
import CuratorPlaceholder from '../src/components/CuratorPlaceHolder';

const mockCuratorContext = (isLoaded: boolean) => {
  jest.doMock('../src/components/CuratorContext', () => ({
    useBVLoader: () => ({
      isLoaded,
    }),
  }));
};

const mockBodilessCore = (isEdit: boolean) => {
  jest.doMock('@bodiless/core', () => ({
    useEditContext: () => ({
      isEdit,
    })
  }));
};

describe('Curator', () => {
  it('renders Curator when curatorId and curatorSrc are empty', () => {
    mockCuratorContext(true);
    const wrapper = mount(<CuratorClean containerId="" curatorSrc="" />);
    expect(wrapper.find(CuratorClean).length).toBe(1);
    expect(wrapper.find(CuratorClean).prop('curatorSrc')).toBe('');
    expect(wrapper.find(CuratorClean).prop('containerId')).toBe('');
  });
  describe('when on edit mode', () => {
    it('renders CuratorPlaceHolder', () => {
      mockBodilessCore(true);
      mockCuratorContext(true);
      const wrapper = mount(<CuratorPlaceholder />);
      expect(wrapper.find(CuratorPlaceholder).length).toBe(1);
    });
  });
  describe('when on preview mode', () => {
    describe('when CuratorContext is loaded', () => {
      it('renders Curator', () => {
        mockBodilessCore(false);
        mockCuratorContext(true);
        const containerId = 'curator-feed-default-feed-layout';
        const curatorSrc = 'b59be9ca-afe7-47cf-9199-c2123491ca41';
        const wrapper = mount(<CuratorClean curatorSrc={curatorSrc} containerId={containerId} />);
        expect(wrapper.find(CuratorClean).length).toBeCloseTo(1);
        expect(wrapper.find(CuratorClean).prop('curatorSrc')).toBe(curatorSrc);
        expect(wrapper.find(CuratorClean).prop('containerId')).toBe(containerId);
      });
    });
  });
});
