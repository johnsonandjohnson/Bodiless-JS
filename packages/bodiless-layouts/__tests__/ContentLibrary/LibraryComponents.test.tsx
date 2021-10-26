/**
 * Copyright © 2021 Johnson & Johnson
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
import { shallow, mount } from 'enzyme';
import {
  asToken,
  withDesign,
} from '@bodiless/fclasses';
import { withLibraryComponents } from '../../src/ContentLibrary/withLibraryComponents';
import EditFlowContainer from '../../src/FlowContainer/EditFlowContainer';

describe('withLibraryComponents', () => {
  it('adds empty design if no content library data exists.', () => {
    const ComponentWithLibrary = withLibraryComponents()(EditFlowContainer);
    const wrapper = shallow(<ComponentWithLibrary />);
    expect(wrapper.props()).toEqual(expect.objectContaining({ design: {} }));
  });

  it('keeps designs added from other HOCs.', () => {
    const design$a = {
      Foo1: asToken(),
      Foo2: asToken(),
    };
    const design$b = {
      Foo3: asToken(),
    };
    const ComponentWithLibrary = asToken(
      withDesign(design$a),
      withLibraryComponents(),
      withDesign(design$b),
    )(EditFlowContainer);
    const wrapper = mount(<ComponentWithLibrary />);
    const designProp = wrapper.find(EditFlowContainer).prop('design');
    expect(designProp).toHaveProperty('Foo1');
    expect(designProp).toHaveProperty('Foo2');
    expect(designProp).toHaveProperty('Foo3');
  });
});
