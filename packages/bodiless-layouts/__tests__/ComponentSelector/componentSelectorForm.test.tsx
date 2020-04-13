import React, { Fragment } from 'react';
import { contextMenuForm } from '@bodiless/core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { shallow } from 'enzyme';
import ComponentSelector from '../../src/ComponentSelector';
import componentSelectorForm from '../../src/ComponentSelector/componentSelectorForm';
import { EditFlexboxProps } from '../../src/FlexboxGrid/types';

jest.mock('../../src/');

const editContext = {
  activate: jest.fn(),
  isEdit: true,
};
const activateOnEffect = {
  setId: jest.fn(),
};
const contextMenuFormInner = jest.fn();
jest.mock('@bodiless/core', () => ({
  useEditContext: () => editContext,
  useActivateOnEffect: () => activateOnEffect,
  // useNode: jest.fn(),
  contextMenuForm: jest.fn(() => contextMenuFormInner),
}));

const mockContextMenuForm = contextMenuForm as jest.Mock;
const mockContextMenuFormInner = mockContextMenuForm();

describe('componentSelectorForm', () => {
  function renderComponentSelectorForm(extraProps?: Omit<EditFlexboxProps, 'components'>) {
    const Foo = Fragment;
    const Bar = Fragment;
    const props = {
      components: { Foo, Bar },
      ...(extraProps || {}),
    };

    const onSelect = jest.fn();
    const closeForm = jest.fn();
    const renderProps = {
      ui: {},
      closeForm,
    };
    componentSelectorForm(props, onSelect);
    const render = mockContextMenuFormInner.mock.calls[0][0];
    const C = () => <>{render(renderProps)}</>;
    const wrapper = shallow(<C />).find(ComponentSelector);
    return {
      onSelect, closeForm, wrapper, props,
    };
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Requests no submit button', () => {
    renderComponentSelectorForm();
    expect(mockContextMenuForm).toHaveBeenCalledTimes(1);
    expect(mockContextMenuForm.mock.calls[0][0].hasSubmit).toBeFalsy();
  });


  it('Passes correct onSelect handler to ComponentSelector', () => {
    const { onSelect, closeForm, wrapper } = renderComponentSelectorForm();
    // @ts-ignore
    wrapper.prop('onSelect')();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(closeForm).toHaveBeenCalledTimes(1);
  });

  it('Passes correct components ComponentSelector', () => {
    const { wrapper, props } = renderComponentSelectorForm();
    expect(wrapper.prop('components')).toEqual(Object.values(props.components));
  });

  it('Passes ui from props through to component selector', () => {
    const { wrapper } = renderComponentSelectorForm({ ui: { MasterWrapper: 'section' } });
    expect(wrapper.prop('ui')!.MasterWrapper).toBe('section');
  });
});
