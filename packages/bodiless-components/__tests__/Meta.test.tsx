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
import { Helmet } from 'react-helmet';
import { flowRight } from 'lodash';
import { shallow, mount } from 'enzyme';
import {
  DefaultContentNode,
  NodeProvider,
  PageEditContext,
  useEditContext,
} from '@bodiless/core';
import { withMeta, withTitle, withMetaHtml } from '../src/Meta/Meta';

const getMockNode = (data: string) => {
  const getters = {
    getNode: jest.fn(() => ({ content: data })),
    getKeys: jest.fn(),
    hasError: jest.fn(),
    getPagePath: jest.fn(() => '/'),
  };
  const actions = {
    setNode: jest.fn(),
    deleteNode: jest.fn(),
  };
  return new DefaultContentNode(actions, getters, '');
};

class EditOnlyContext extends PageEditContext {
  // eslint-disable-next-line class-methods-use-this
  get isEdit() { return true; }
}
class NonEditContext extends PageEditContext {
  // eslint-disable-next-line class-methods-use-this
  get isEdit() { return false; }
}

describe('Meta data process', () => {
  describe('withMeta', () => {
    // dataSet array, to be expendable for future test cases.
    const dataSet = [
      {
        name: 'data1',
        label: 'Date 1',
        key: 'data-1',
        content: Math.random().toString(),
      },
    ];
    it('Add meta data to Helmet', () => {
      const data = dataSet[0];
      const withMetaPageData = withMeta({
        name: data.name,
        label: data.label,
      });

      const PageMeta = flowRight(withMetaPageData(data.key))(Helmet);
      const TestMetaComponent = () => (
        <NodeProvider node={getMockNode(data.content)}>
          <PageMeta />
        </NodeProvider>
      );
      const wrapper = mount(<TestMetaComponent />);
      const helmet = Helmet.peek() as any;
      expect(helmet.metaTags).toHaveLength(1);
      expect(helmet.metaTags[0].name).toBe(data.name);
      expect(helmet.metaTags[0].content).toBe(data.content);

      // withMeta has Sidecar applied.
      expect(wrapper.find('EndSidecarNodes')).toHaveLength(1);
      expect(wrapper.find('StartSidecarNodes')).toHaveLength(1);
      wrapper.unmount();
    });

    it('adds meta form snippet when UI is editable', () => {
      const data = dataSet[0];
      const withMetaPageData = withMeta({
        name: data.name,
        label: data.label,
      });

      const PageType = flowRight(withMetaPageData(data.key))(Helmet);
      const TestMetaComponent = () => {
        const oldContext = useEditContext();
        const newContext = new EditOnlyContext(oldContext);
        return (
          <PageEditContext.Provider value={newContext}>
            <NodeProvider node={getMockNode(data.content)}>
              <PageType />
            </NodeProvider>
          </PageEditContext.Provider>
        );
      };
      const wrapper = mount(<TestMetaComponent />);
      expect(wrapper.find('WithEditFormSnippet')).toHaveLength(1);
      wrapper.unmount();
    });

    it('does NOT add meta form snippet when UI is not editable', () => {
      const data = dataSet[0];
      const withMetaPageData = withMeta({
        name: data.name,
        label: data.label,
      });

      const PageType = flowRight(withMetaPageData(data.key))(Helmet);
      const TestMetaComponent = () => {
        const oldContext = useEditContext();
        const newContext = new NonEditContext(oldContext);
        return (
          <PageEditContext.Provider value={newContext}>
            <NodeProvider node={getMockNode(data.content)}>
              <PageType />
            </NodeProvider>
          </PageEditContext.Provider>
        );
      };
      const wrapper = mount(<TestMetaComponent />);
      expect(wrapper.find('WithEditFormSnippet')).toHaveLength(0);
      wrapper.unmount();
    });
  });

  describe('withTitle', () => {
    it('Add title to Helmet', () => {
      const data = {
        name: 'title1',
        label: 'Title 1',
        key: 'title-1',
        content: Math.random().toString(),
      };
      const withMetaPageTitle = withTitle({
        name: data.name,
        label: data.label,
      });

      const PageMeta = flowRight(withMetaPageTitle(data.key))(Helmet);
      const TestMetaComponent = () => (
        <NodeProvider node={getMockNode(data.content)}>
          <PageMeta />
        </NodeProvider>
      );
      const wrapper = mount(<TestMetaComponent />);
      const helmet = Helmet.peek() as any;
      expect(helmet.title).toBe(data.content);
      // withTitle has Sidecar applied.
      expect(wrapper.find('EndSidecarNodes')).toHaveLength(1);
      expect(wrapper.find('StartSidecarNodes')).toHaveLength(1);
      wrapper.unmount();
    });
  });
});

const ExampleHelmetHtml = flowRight(withMetaHtml('en', '', ''))(Helmet);
describe('withMetaTagHtml', () => {
  it('add a Html element to the Helmet component', () => {
    const wrapper = shallow(<ExampleHelmetHtml />);
    // Expect the tag to be <html>
    expect(wrapper.childAt(0).type()).toEqual('html');
    // Expect the lang prop to exist and its value to be 'en'.
    expect(wrapper.find('html').prop('lang')).toEqual('en');
  });
});
