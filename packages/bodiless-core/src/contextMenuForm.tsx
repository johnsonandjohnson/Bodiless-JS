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

import React, { ReactNode } from 'react';
import {
  Form, FormApi, FormState, Text,
} from 'informed';
import { UI } from './Types/ContextMenuTypes';

const defaultUI = {
  Icon: 'i',
  ComponentFormTitle: 'h3',
  ComponentFormLabel: 'label',
  ComponentFormButton: 'button',
  ComponentFormCloseButton: 'button',
  ComponentFormUnwrapButton: 'button',
  ComponentFormText: Text,
  ComponentFormError: 'div',
  Form: 'div',
};

export const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

export type FormProps = {
  closeForm: () => void;
  ui?: UI;
};

export type FormBodyProps<D> = FormProps & {
  formApi: FormApi<D>;
  formState: FormState<D>;
};

export type FormBodyRenderer<D> = (props: FormBodyProps<D>) => ReactNode;

export type Options<D> = {
  submitValues?: (componentData: D) => void;
  initialValues?: D;
  hasSubmit?: Boolean;
};

const contextMenuForm = <D extends object>(options: Options<D>) => (
  renderFormBody: FormBodyRenderer<D>,
) => {
  const ContextMenuForm = ({ closeForm, ui }: FormProps) => {
    const { ComponentFormButton, Icon } = getUI(ui);
    const { submitValues, initialValues, hasSubmit = true } = options;
    return (
      <Form
        onSubmit={(values: D) => {
          if (submitValues) submitValues(values);
          closeForm();
        }}
        initialValues={initialValues}
      >
        {({ formApi, formState }) => (
          <>
            <ComponentFormButton
              type="button"
              onClick={closeForm}
              className="bl-float-right"
            >
              <Icon>cancel</Icon>
            </ComponentFormButton>
            {renderFormBody({
              closeForm,
              formApi,
              formState,
              ui,
            })}
            {hasSubmit && !formState.invalid
            && (
              <div className="bl-clearfix">
                <ComponentFormButton type="submit" className="bl-float-right">
                  <Icon>done</Icon>
                </ComponentFormButton>
              </div>
            )
            }
          </>
        )}
      </Form>
    );
  };
  ContextMenuForm.displayName = 'ComponentForm';
  return ContextMenuForm;
};

export default contextMenuForm;
