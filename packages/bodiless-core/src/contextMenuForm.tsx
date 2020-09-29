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

import React, { FC, ReactNode, useCallback } from 'react';
import { Form, FormApi, FormState } from 'informed';
import { useMenuOptionUI } from './components/ContextMenuContext';
import type { ContextMenuFormProps } from './Types/ContextMenuTypes';

export type Options<D> = {
  submitValues?: (componentData: D) => boolean|void;
  onClose?: (componentData: D) => boolean|void;
  initialValues?: D;
  hasSubmit?: ((componentData: D) => boolean) | boolean;
};

export type FormBodyProps<D> = ContextMenuFormProps & Options<D> & {
  formApi: FormApi<D>;
  formState: FormState<D>;
};

export type FormBodyRenderer<D> = (props: FormBodyProps<D>) => ReactNode;

export type ContextMenuPropsType<D> = ContextMenuFormProps & Options<D> & {
  children: FormBodyRenderer<D>|ReactNode,
};

export type FormChromeProps = {
  hasSubmit: boolean;
  title?: string;
} & ContextMenuFormProps;

export const FormChrome: FC<FormChromeProps> = (props) => {
  const {
    children,
    title,
    hasSubmit,
    closeForm,
  } = props;
  const {
    ComponentFormTitle, ComponentFormCloseButton, ComponentFormSubmitButton,
  } = useMenuOptionUI();

  return (
    <>
      <ComponentFormCloseButton
        type="button"
        aria-label="Cancel"
        onClick={() => closeForm()}
      />
      <ComponentFormTitle>{title}</ComponentFormTitle>
      {children}
      {hasSubmit && (<ComponentFormSubmitButton aria-label="Submit" />)}
    </>
  );
};

export const ContextMenuForm = <D extends object>(props: ContextMenuPropsType<D>) => {
  const {
    closeForm,
    onClose,
    ui,
    submitValues = () => undefined,
    initialValues = {} as D,
    hasSubmit = true,
    children = () => <></>,
    ...rest
  } = props;

  const callOnClose = (values: D) => {
    if (typeof onClose === 'function') {
      onClose(values);
    }
    closeForm();
  };
  return (
    <Form
      onSubmit={(values: D) => {
        if (!submitValues(values)) {
          callOnClose(values);
        }
      }}
      initialValues={initialValues}
      {...rest}
    >
      {({ formApi, formState }) => (
        <FormChrome
          hasSubmit={typeof hasSubmit === 'function'
            ? hasSubmit(formState.values) && !formState.invalid
            : hasSubmit && !formState.invalid}
          closeForm={() => callOnClose(formState.values)}
        >
          {typeof children === 'function'
            ? children({
              closeForm, formApi, formState, ui,
            })
            : children}
        </FormChrome>
      )}
    </Form>
  );
};

export const contextMenuForm = <D extends object>(options: Options<D> = {}) => (
  renderForm?: FormBodyRenderer<D>,
) => (
  (props: Omit<ContextMenuFormProps, 'children'>) => (
    <ContextMenuForm {...options} {...props}>
      {renderForm || (() => <></>)}
    </ContextMenuForm>
  )
);

type HookOptions<D> = Options<D> & {
  renderForm?: FormBodyRenderer<D>,
};

const useContextMenuForm = <D extends object>(options: HookOptions<D> = {}) => {
  const { renderForm, ...rest } = options;
  return useCallback(
    contextMenuForm(rest)(renderForm),
    [options],
  );
};

export default useContextMenuForm;
