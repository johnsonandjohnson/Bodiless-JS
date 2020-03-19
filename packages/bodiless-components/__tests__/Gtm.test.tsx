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
import { withEvent } from '../src/GTM/gtm';

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
process.env.NODE_ENV = 'production';
const ExampleGTMHelmetEvent = flowRight(
  withEvent(
    'globalDataLayer',
    {
      event: 'foo',
      page: {
        country: 'US',
        language: 'EN',
        hostname: 'bodilessjs.com',
      },
    },
    'foo',
    '',
  ),
)(Helmet);

describe('withEvent', () => {
  it('add a data layer script in the Helmet component', () => {
    const mockItem = {
      'foo': {
        page: {
          pageType: 'pageType',
        },
      },
    };
    setMockNode(mockItem);
    let wrapper = shallow(<ExampleGTMHelmetEvent />);
    expect(wrapper.childAt(0).type()).toEqual('script');
    expect(eval(wrapper.childAt(0).text())).toBe(1);
  });
});
