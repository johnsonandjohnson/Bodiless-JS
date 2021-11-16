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
    const wrapper = mount(<CuratorClean containerId='' curatorSrc='' />);
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