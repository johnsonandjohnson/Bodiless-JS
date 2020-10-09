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
import { FormBodyProps as ContextMenuFormBodyProps } from '../contextMenuForm';
import { TMenuOption } from './ContextMenuTypes';

type EditDataHandler<D> = {
  initialValueHandler?: (values: any) => D;
  submitValueHandler?: (values: D) => any;
};

export type FormBodyProps<P, D> = ContextMenuFormBodyProps<D> & {
  componentProps: P;
};

export type FormBodyRenderer<P, D> = (p: FormBodyProps<P, D>) => ReactNode;

export type EditButtonProps<D> = {
  setComponentData: (componentData: D) => void;
  componentData: D;
  isActive?: () => boolean;
  onSubmit?: () => void;
};

export type EditButtonOptions<P, D> = Omit<TMenuOption, 'handler'> & {
  renderForm: FormBodyRenderer<P, D>,
} & EditDataHandler<D>;
