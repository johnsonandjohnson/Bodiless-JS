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

import React, {
  ComponentType as CT,
} from 'react';
import { v1 } from 'uuid';
import flowRight from 'lodash/flowRight';
import { EditButtonProps, EditButtonOptions } from './Types/EditButtonTypes';
import type { FormBodyRenderer as Renderer } from './Types/EditButtonTypes';
import type { FormBodyProps as ContextMenuFormBodyProps } from './contextMenuForm';
import { useRegisterSnippet } from './withCompoundForm';
import type { Snippet } from './withCompoundForm';

export type Options<P, D> = {
  renderForm: Renderer<P, D>,
  submitValueHandler?: (values: D) => any,
  initialValueHandler?: (values: any) => D,
};

type UseEditFormProps<P, D> = P & EditButtonProps<D> & Pick<EditButtonOptions<P, D>, 'renderForm'|'initialValueHandler'|'submitValueHandler'>;

/**
 * Generates required props to pass to `ContextMenuForm`
 * using the normal bodiless data handlers. For example:
 * ```
 * const useMyContextMenuForm = props => (
 *   const render = () => (
 *     <ContextMenuForm {..useEditFormProps(props)}>
 *       // Custom form components
 *     </ContextMenuForm>
 *   );
 *   // use this render to provide a menu button.
 * );
 * ```
 * Alternatively you can pass an additional renderForm callback
 * to generate props suitable for `useEditForm`:
 * ```
 * const WithMyContextMenuForm = props => (
 *   const renderForm = () => // Custom form components
 *   const render = useContextMenuForm(useEditFormProps({ ...props, renderForm }));
 *   // use this render to provide a menu button.
 * };
 * ```
 *
 * @param props The props passed to the component providing the form.
 *
 * @return Props suitable for passing to ContextMenuForm.
 */
export const useEditFormProps = <P extends object, D extends object>(
  props: UseEditFormProps<P, D>,
) => {
  const {
    componentData: initialValues$,
    setComponentData,
    onSubmit,
    initialValueHandler,
    submitValueHandler,
    renderForm: renderForm$,
  } = props;

  const initialValues = initialValueHandler
    ? initialValueHandler(initialValues$) : initialValues$;
  const submitValues$ = (values: D) => {
    setComponentData(values);
    if (onSubmit) onSubmit();
  };
  const submitValues = submitValueHandler
    ? flowRight(submitValues$, submitValueHandler) : submitValues$;
  if (renderForm$) {
    // Pass component props to the render function.
    const renderForm = (p: ContextMenuFormBodyProps<D>) => renderForm$({
      ...p,
      // @TODO: Avoid passing all the props.
      componentProps: props,
    });
    return { initialValues, submitValues, renderForm };
  }
  return { initialValues, submitValues };
};

type Options$<P, D> = Options<P, D> | ((props: P) => Options<P, D>);

const withEditFormSnippet = <P extends object, D extends object>(options: Options$<P, D>) => (
  (Component: CT<P>) => {
    const id = v1();
    const WithEditFormSnippet = (props: P & EditButtonProps<D>) => {
      const options$ = typeof options === 'function' ? options(props) : options;
      const { renderForm, initialValueHandler, submitValueHandler } = options$;
      const { renderForm: render, ...rest } = useEditFormProps({
        ...props,
        renderForm,
        initialValueHandler,
        submitValueHandler,
      });
      const snippet: Snippet<D> = {
        id,
        ...rest,
        render: render || (() => <></>),
      };
      useRegisterSnippet(snippet);
      return <Component {...props} />;
    };
    return WithEditFormSnippet;
  }
);

export default withEditFormSnippet;
