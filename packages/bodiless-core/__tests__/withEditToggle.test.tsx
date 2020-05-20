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
import { useEditToggle } from '../src/withEditToggle';
import { withFlowToggle } from '../src';
import PageEditContext from '../src/PageEditContext';

const EditableComponent = ({ element: Element }: any) => (
  <Element><div>Editable Component</div></Element>
);
const ReadOnlyComponent = ({ element: Element }: any) => (
  <Element><div>ReadOnly Component</div></Element>
);

const EditToggle = withFlowToggle(useEditToggle)(EditableComponent, ReadOnlyComponent);

const context = new PageEditContext();

describe('withEditToggle', () => {
  it('should return Editable if context.isEdit is true', () => {
    context.toggleEdit(true);
    const wrapper = shallow(<EditToggle />, { context });
    expect(wrapper.name()).toEqual(EditableComponent.name);
  });
  it('should return ReadOnly if context.isEdit is false', () => {
    context.toggleEdit(false);
    const wrapper = shallow(<EditToggle />, { context });
    expect(wrapper.name()).toEqual(ReadOnlyComponent.name);
  });
});
