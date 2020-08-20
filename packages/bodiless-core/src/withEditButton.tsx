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
import { PageEditContextInterface } from './PageEditContext/types';
import useContextMenuForm, {
  FormBodyProps as ContextMenuFormBodyProps,
} from './contextMenuForm';
import { withMenuOptions } from './PageContextProvider';
import type { TMenuOptionGetter } from './Types/PageContextProviderTypes';
import type { EditButtonProps, EditButtonOptions } from './Types/EditButtonTypes';

export const useEditFormProps = <P extends object, D extends object>({
  componentData,
  setComponentData,
  onSubmit,
  dataHandler,
}: P & EditButtonProps<D>) => {
  const initialValues = componentData;

  const initialValues$ = dataHandler && dataHandler.initialValueHandler
    ? dataHandler.initialValueHandler(initialValues) : initialValues;
  const submitValues = (values: D) => {
    setComponentData(values);
    Object.assign(componentData, values);
    // @todo: refactor - replace this workaround fix.
    Object.assign(initialValues$, dataHandler && dataHandler.initialValueHandler
      ? dataHandler.initialValueHandler(initialValues) : initialValues);
    if (onSubmit) onSubmit();
  };
  const submitValues$ = dataHandler && dataHandler.submitValueHandler
    ? flowRight(submitValues, dataHandler.submitValueHandler) : submitValues;
  return {
    submitValues: submitValues$,
    initialValues: initialValues$,
  };
};

export const createMenuOptionHook = <P extends object, D extends object>({
  icon,
  name,
  label,
  global,
  local,
  renderForm,
  useGetMenuOptions,
}: EditButtonOptions<P, D>) => (
    props: P & EditButtonProps<D>,
    context: PageEditContextInterface,
  ) => {
    const { unwrap, isActive } = props;
    const renderFormBody = (p: ContextMenuFormBodyProps<D>) => renderForm({
      ...p,
      unwrap,
      componentProps: props,
    });
    const form = useContextMenuForm({
      ...useEditFormProps(props),
      renderFormBody,
    });
    const getMenuOptions: TMenuOptionGetter = () => [
      {
        icon,
        name,
        label,
        isActive,
        global,
        local,
        // @TODO: Align this onSubmit prop received from ContextMenu with closeForm
        handler: () => form,
      },
    ];
    // If a hook providing additional menu options was specified, then call it.
    if (useGetMenuOptions) {
      const getMenuOptions$1 = useGetMenuOptions(props, context) || (() => []);
      return () => [...getMenuOptions(), ...getMenuOptions$1()];
    }
    return getMenuOptions;
  };

const withEditButton = <P extends object, D extends object>(
  options: EditButtonOptions<P, D>,
) => flowRight(
    withMenuOptions({
      useGetMenuOptions: createMenuOptionHook(options),
      name: options.name,
    }),
    withoutProps(['setComponentData', 'unwrap', 'isActive']),
  );

export default withEditButton;
