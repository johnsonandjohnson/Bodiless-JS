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

/**
 * @file
 * Integration tests for context menu forms.
 */
import React, { useState } from 'react';
import { mount, shallow } from 'enzyme';
import {
  contextMenuForm, ContextMenuForm, FormBodyRenderer,
} from '../src/contextMenuForm';
import type { ContextMenuFormProps } from '../src/Types/ContextMenuTypes';

describe('contextMenuForm', () => {
  it('Applies options as props to the innter ContextMenuForm', () => {
    const render = jest.fn();
    const submitValues = jest.fn();
    const closeForm = jest.fn();
    const initialValues = {
      foo: 'bar',
    };
    const element = contextMenuForm({ submitValues, initialValues })(render)({ closeForm });
    element.props.children();
    expect(render).toHaveBeenCalled();
    element.props.submitValues();
    expect(submitValues).toHaveBeenCalled();
    expect(element.props.initialValues.foo).toBe('bar');
    element.props.closeForm();
    expect(closeForm).toHaveBeenCalled();
  });

  it('Allows options to be overridden', () => {
    const render = jest.fn();
    const options = {
      submitValues: jest.fn(),
      initialValues: {
        foo: 'bar',
      },
    };
    const props = {
      closeForm: jest.fn(),
      submitValues: jest.fn(),
      initialValues: {
        foo: 'baz',
      },
    };

    const form = contextMenuForm(options)(render);
    // @ts-ignore We're not providng all necessary props here.
    const element = form(props);
    element.props.submitValues();
    expect(props.submitValues).toHaveBeenCalled();
    expect(options.submitValues).not.toHaveBeenCalled();
    expect(element.props.initialValues.foo).toBe('baz');
  });
});

describe('ContextMenuForm', () => {
  describe('submitValues prop', () => {
    const submit = jest.fn();
    const close = jest.fn();
    const jsx = (
      <ContextMenuForm submitValues={submit} closeForm={close}>
        {() => <></>}
      </ContextMenuForm>
    );
    it('Closes the form when the submit handler returns nothing', () => {
      const wrapper = shallow(jsx);
      wrapper.prop('onSubmit')();
      expect(close).toHaveBeenCalled();
    });
    it('Does not close the form when the submit handler returns true', () => {
      submit.mockReturnValueOnce(true);
      close.mockReset();
      const wrapper = shallow(
        (<ContextMenuForm closeForm={close}>{() => <></>}</ContextMenuForm>),
      );
      wrapper.prop('onSubmit')();
      expect(close).toHaveBeenCalled();
    });
    it('Closes the form when no submit handler is provided', () => {
      close.mockReset();
      const wrapper = shallow(jsx);
      wrapper.prop('onSubmit')();
      expect(close).not.toHaveBeenCalled();
    });
  });
});

describe('ContextMenuForm (High Level)', () => {
  it('Allows state from an enclosing component to be used in the form and submit handler', () => {
    const submit = jest.fn();
    const close = jest.fn();
    const Form = (props: ContextMenuFormProps) => {
      const [state, setState] = useState('unclicked');
      const renderForm: FormBodyRenderer<{}> = () => (
        <button type="button" id="clickme" onClick={() => setState('clicked')}>{state}</button>
      );
      const submitValues = () => submit(state);
      return (
        <ContextMenuForm {...props} submitValues={submitValues}>
          {renderForm}
        </ContextMenuForm>
      );
    };
    const wrapper = mount(<Form closeForm={close} />);
    const stateButton = wrapper.find('button#clickme');
    expect(stateButton.text()).toBe('unclicked');
    stateButton.simulate('click');
    expect(stateButton.text()).toBe('clicked');
    const submitButton = wrapper.find('button[aria-label="Submit"]');
    submitButton.simulate('submit');
    expect(submit).toHaveBeenCalled();
    expect(submit.mock.calls[0][0]).toBe('clicked');
    expect(close).toHaveBeenCalled();
  });
});
