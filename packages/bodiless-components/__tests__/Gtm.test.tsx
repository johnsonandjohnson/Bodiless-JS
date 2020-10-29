/**
 * Copyright © 2020 Johnson & Johnson
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
import { mount } from 'enzyme';
import {
  DefaultContentNode,
  NodeProvider,
  PageEditContext,
  useEditContext,
} from '@bodiless/core';
import withDataLayerItem, { withDefaultDataLayer, withDataLayerScript } from '../src/GTM/gtm';

const getMockNode = (data: string) => {
  const getters = {
    getNode: jest.fn(() => ({ content: data })),
    getKeys: jest.fn(),
    hasError: jest.fn(),
    getPagePath: jest.fn(() => '/'),
    getBaseResourcePath: jest.fn(() => '/'),
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

const testDefaultDataLayer = {
  dataLayerName: 'dataLayer',
  dataLayerData: {
    customKey: {
      foo: 'foo value',
      bar: {
        bat: 'bat value',
      },
    },
  },
};
describe('DataLayer process', () => {
  describe('withDataLayerItem', () => {
    // dataSet array, to be expendable for future test cases.
    const dataSet = [
      {
        name: 'data1',
        label: 'Date 1',
        key: 'data-1',
        content: 'Page Type',
      },
    ];
    it('Add dataLayer data to Helmet', () => {
      process.env.NODE_ENV = 'production';
      const data = dataSet[0];

      const withDataLayerItemPageType = withDataLayerItem({
        name: data.name,
        label: data.label,
        path: 'customKey.pageType',
      });

      const expectedScript = 'window.dataLayer = window.dataLayer || [];window.dataLayer.push({"foo":"foo value","bar":{"bat":"bat value"},"pageType":"Page Type"});';
      const PageDataLayer = flowRight(
        withDefaultDataLayer(testDefaultDataLayer) as () => React.ComponentType,
        withDataLayerItemPageType(data.key),
        withDataLayerScript,
      )(Helmet);
      const TestDataLayerComponent = () => (
        <NodeProvider node={getMockNode(data.content)}>
          <PageDataLayer />
        </NodeProvider>
      );
      const wrapper = mount(<TestDataLayerComponent />);
      const helmet = Helmet.peek() as any;
      expect(helmet.scriptTags).toHaveLength(1);
      expect(helmet.scriptTags[0].innerHTML).toBe(expectedScript);
      wrapper.unmount();
    });

    it('adds GTM form snippet when UI is editable', () => {
      const data = dataSet[0];
      const withDataLayerItemPageType = withDataLayerItem({
        name: data.name,
        label: data.label,
        path: '0.pageType',
      });

      const PageType = flowRight(withDataLayerItemPageType(data.key))(Helmet);
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

    it('does NOT add GTM form snippet when UI is not editable', () => {
      const data = dataSet[0];
      const withDataLayerItemPageType = withDataLayerItem({
        name: data.name,
        label: data.label,
        path: '0.pageType',

      });

      const PageType = flowRight(withDataLayerItemPageType(data.key))(Helmet);
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
});
