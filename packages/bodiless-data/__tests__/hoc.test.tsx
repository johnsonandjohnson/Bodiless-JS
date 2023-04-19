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
import { shallow } from 'enzyme';
import { observable } from 'mobx';
import {
  withNodeDataHandlers,
} from '../src/hoc';

const TestComponent = ({ element: Element }: any) => (
  <Element><div>Test Component</div></Element>
);

describe('withNodeDataHandlers', () => {
  it('should have componentData', () => {
    const values = {
      some: Math.random(),
    };
    const data = observable(values);
    const DataComponent = withNodeDataHandlers(data)(TestComponent);
    const withProps = shallow(<DataComponent />);
    expect(withProps.props().componentData).toEqual(values);
  });
});
