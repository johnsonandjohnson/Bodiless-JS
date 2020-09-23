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

import { flowRight } from 'lodash';
import { withoutProps } from './hoc';
import useContextMenuForm, {
  FormBodyProps as ContextMenuFormBodyProps,
} from './contextMenuForm';
import { withMenuOptions } from './PageContextProvider';
import type { EditButtonProps, EditButtonOptions } from './Types/EditButtonTypes';

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

const createMenuOptionHook = <P extends object, D extends object>(
  options: EditButtonOptions<P, D> | ((props: P) => EditButtonOptions<P, D>),
) => (
    props: P & EditButtonProps<D>,
  ) => {
    const options$ = typeof options === 'function' ? options(props) : options;
    const {
      renderForm,
      ...rest
    } = options$;
    const { isActive } = props;
    const render = useContextMenuForm(useEditFormProps({ ...props, renderForm }));
    const menuOption = {
      ...rest,
      handler: () => render,
    };
    if (isActive) menuOption.isActive = isActive;
    return [menuOption];
  };

/**
 * Uses the provided options to create an HOC which adds an edit button provider
 * to the wrapped component.
 *
 * @param options The options defining the edit button.
 *
 * @return An HOC which will add an edit button for the wrapped component.
 */
const withEditButton = <P extends object, D extends object>(
  options: EditButtonOptions<P, D> | ((props: P) => EditButtonOptions<P, D>),
) => flowRight(
    withMenuOptions({
      useMenuOptions: createMenuOptionHook(options),
      name: options.name,
      peer: (options as EditButtonOptions<P, D>).peer,
    }),
    withoutProps(['setComponentData', 'isActive']),
  );
export default withEditButton;
