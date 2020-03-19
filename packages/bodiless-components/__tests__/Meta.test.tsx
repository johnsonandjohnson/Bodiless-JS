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
import { shallow } from 'enzyme';
import { withMetaTitle, withMeta, withMetaHtml } from '../src/Meta/Meta';

const core = require('@bodiless/core');

jest.mock('@bodiless/core');

const setMockNode = (items: any) => {
  const node = {
    child: (key: string) => ({
      data: items[key],
    }),
  };
  core.useNode.mockReturnValue({ node });
  return node;
};
// <titl>test title</title>
const TitleMeta = flowRight(withMetaTitle('page-title', ''))(Helmet);

describe('withMetaTitle', () => {
  it('add a title in the Helmet component', () => {
    const mockItem = {
      'page-title': {
        content: 'test-title',
      },
    };
    setMockNode(mockItem);
    let wrapper = shallow(<TitleMeta />);
    console.log(wrapper.debug());
    expect(wrapper.childAt(0).type()).toEqual('title');
    expect(wrapper.childAt(0).text()).toEqual('test-title');

    // Test empty values will generate emtpy tag:
    const emptyMockItem = {
      'page-title': {
        content: '',
      },
    };
    setMockNode(emptyMockItem);
    wrapper = shallow(<TitleMeta />);
    expect(wrapper.childAt(0).type()).toEqual('title');
    expect(wrapper.childAt(0).text()).toHaveLength(0);
  });
});

const PageTypeMeta = flowRight(withMeta('pageType', 'pageType', ''))(Helmet);
const PageDescriptionMeta = flowRight(
  withMeta('description', 'description', ''),
)(Helmet);
describe('withMetaTag', () => {
  it('add a Meta tag to the Helmet component', () => {
    const mockItems = {
      pageType: {
        content: 'test-type',
      },
    };
    setMockNode(mockItems);
    const wrapper = shallow(<PageTypeMeta />);
    // Expect the tag to be <meta>.
    expect(wrapper.childAt(0).type()).toEqual('meta');
    expect(wrapper.childAt(0).prop('name')).toEqual('pageType');
    // Expect the value property name to exist and the value to be 'test-type'.
    expect(wrapper.find('meta').prop('content')).toEqual('test-type');

    const mockDescriptionItems = {
      description: {
        content: 'test-description',
      },
    };
    setMockNode(mockDescriptionItems);
    const descriptionMetaWrapper = shallow(<PageDescriptionMeta />);

    expect(descriptionMetaWrapper.childAt(0).type()).toEqual('meta');
    expect(descriptionMetaWrapper.childAt(0).prop('name')).toEqual(
      'description',
    );
    // Expect the value property name to exist and the value to be 'test-type'.
    expect(descriptionMetaWrapper.find('meta').prop('content')).toEqual(
      'test-description',
    );
    // There should be no meta tags when the data is empty.
    const mockEmtpyMetaItem = {};
    setMockNode(mockEmtpyMetaItem);
    const emptyMetaWrapper = shallow(<PageDescriptionMeta />);
    expect(emptyMetaWrapper.find('meta')).toHaveLength(0);
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
