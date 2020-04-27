import React, { ComponentType } from 'react';
import { shallow, mount } from 'enzyme';
import { observable } from 'mobx';
import {
  withContextActivator,
  withLocalContextMenu,
  withNodeDataHandlers,
  withFlowToggle,
  ifToggledOn,
  ifToggledOff,
} from '../src/hoc';

const TestComponent = ({ element: Element }: any) => (
  <Element>
    <div>Test Component</div>
  </Element>
);

describe('withContextActivator', () => {
  it('should be able to pass onClick handler to component', () => {
    const ContextActivator = withContextActivator('onClick')(TestComponent);
    const active = shallow(<ContextActivator />);
    expect(active.props()).toHaveProperty('onClick');
  });
});

describe('withLocalContextMenu', () => {
  it('should wrap component and suffix its name with `WithLocalContextMenu`', () => {
    const ContextMenuChild = withLocalContextMenu('div');
    const withMenu = mount(<ContextMenuChild id="testDiv" />);
    expect(withMenu.find('#testDiv')).toHaveLength(2);
    expect(withMenu.name()).toEqual('divWithLocalContextMenu');
  });
});

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
