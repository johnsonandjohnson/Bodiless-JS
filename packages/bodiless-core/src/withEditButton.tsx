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

import { ReactNode } from 'react';
import { flowRight } from 'lodash';
import { withMenuOptions, withoutProps, UseGetMenuOptions } from './hoc';
import { PageEditContextInterface } from './PageEditContext/types';
import useContextMenuForm, {
  FormBodyProps as ContextMenuFormBodyProps,
} from './contextMenuForm';
import { TMenuOptionGetter } from './Types/PageContextProviderTypes';

export type FormBodyProps<P, D> = ContextMenuFormBodyProps<D> & {
  unwrap?: () => void;
  componentProps: P;
};
export type FormBodyRenderer<P, D> = (p: FormBodyProps<P, D>) => ReactNode;

export type EditButtonProps<D> = {
  setComponentData: (componentData: D) => void;
  componentData: D;
  unwrap?: () => void;
  isActive?: () => boolean;
  onSubmit?: () => void;
};

export type EditButtonOptions<P, D> = {
  icon: string;
  name: string;
  label?: string;
  global?: boolean;
  local?: boolean;
  renderForm: FormBodyRenderer<P, D>;
  // Allow additional buttons.
  useGetMenuOptions?: UseGetMenuOptions<P>;
};

export const useEditFormProps = <P extends object, D extends object>({
  componentData,
  setComponentData,
  onSubmit,
}: P & EditButtonProps<D>) => {
  const submitValues = (values: D) => {
    setComponentData(values);
    Object.assign(componentData, values);
    if (onSubmit) onSubmit();
  };
  return {
    submitValues,
    initialValues: componentData,
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
