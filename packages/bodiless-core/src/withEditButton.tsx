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
import { withPageContext, withoutProps, UseGetMenuOptions } from './hoc';
import { PageEditContextInterface } from './PageEditContext/types';
import contextMenuForm, {
  FormBodyProps as ContextMenuFormBodyProps,
} from './contextMenuForm';
import { TMenuOptionGetter } from './Types/PageContextProviderTypes';

export type FormBodyProps<D> = ContextMenuFormBodyProps<D> & {
  unwrap?: () => void;
  // @todo: Make props a generic type.
  parentComponentProps?: any;
};

export type FormBodyRenderer<D> = (p: FormBodyProps<D>) => ReactNode;

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
  renderForm: FormBodyRenderer<D>;
  // Allow additional buttons.
  useGetMenuOptions?: UseGetMenuOptions<P>;
};

export const createMenuOptionHook = <P extends object, D extends object>({
  icon,
  name,
  global,
  local,
  renderForm,
  useGetMenuOptions,
}: EditButtonOptions<P, D>) => (
    props: P & EditButtonProps<D>,
    context: PageEditContextInterface,
  ) => {
    const {
      componentData, setComponentData, unwrap, isActive, onSubmit,
    } = props;
    const submitValues = (values: D) => {
      setComponentData(values);
      Object.assign(componentData, values);
      if (onSubmit) onSubmit();
    };
    const render = (p: ContextMenuFormBodyProps<D>) => renderForm({ ...p, unwrap, parentComponentProps: props });
    const form = contextMenuForm({
      submitValues,
      initialValues: componentData,
    })(render);
    const getMenuOptions: TMenuOptionGetter = () => [
      {
        icon,
        name,
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
    withPageContext({
      useGetMenuOptions: createMenuOptionHook(options),
      name: options.name,
    }),
    withoutProps(['setComponentData', 'unwrap', 'isActive']),
  );

export default withEditButton;
