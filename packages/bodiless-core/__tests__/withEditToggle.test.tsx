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
