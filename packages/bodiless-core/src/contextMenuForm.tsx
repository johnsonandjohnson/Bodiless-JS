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
import ReactTagsField from './components/ReactTagsField';

const defaultUI = {
  Icon: 'i',
  ComponentFormTitle: 'h3',
  ComponentFormLabel: 'label',
  ComponentFormButton: 'button',
  ComponentFormCloseButton: 'button',
  ComponentFormSubmitButton: 'button',
  ComponentFormUnwrapButton: 'button',
  ComponentFormText: Text,
  ComponentFormError: 'div',
  Form: 'div',
  ReactTags: ReactTagsField,
  ComponentFormList: 'ul',
  ComponentFormListItem: 'li',
  ComponentFormDescription: 'div',
};

export const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

export type FormProps = {
  closeForm: () => void;
  ui?: UI;
  'aria-label'?: string;
};

export type FormBodyProps<D> = FormProps & {
  formApi: FormApi<D>;
  formState: FormState<D>;
};

export type FormBodyRenderer<D> = (props: FormBodyProps<D>) => ReactNode;

export type Options<D> = {
  submitValues?: (componentData: D) => boolean|void;
  initialValues?: D;
  hasSubmit?: Boolean;
};

const contextMenuForm = <D extends object>(options: Options<D>) => (
  renderFormBody: FormBodyRenderer<D>,
) => {
  const ContextMenuForm = ({ closeForm, ui, ...rest }: FormProps) => {
    const { ComponentFormCloseButton, ComponentFormSubmitButton } = getUI(ui);
    const { submitValues, initialValues, hasSubmit = true } = options;
    return (
      <Form
        onSubmit={(values: D) => {
          if (!submitValues || !submitValues(values)) {
            closeForm();
          }
        }}
        initialValues={initialValues}
        {...rest}
      >
        {({ formApi, formState }) => (
          <>
            <ComponentFormCloseButton
              type="button"
              onClick={closeForm}
              aria-label="Cancel"
            />
            {renderFormBody({
              closeForm,
              formApi,
              formState,
              ui,
            })}
            {
              hasSubmit && !formState.invalid
              && (
                <ComponentFormSubmitButton aria-label="Submit" />
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
