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

import type { ReactNode } from 'react';
import type { FormBodyProps as ContextMenuFormBodyProps } from '../contextMenuForm';
import type { TMenuOption } from './ContextMenuTypes';
import type { MenuOptionsDefinition } from './PageContextProviderTypes';

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

/**
 * A menu option with an optional group label.
 */
export type OptionGroupDefinition = TMenuOption & {
  /**
   * Optional label for the context menu group to which the button will belong.
   * If omitted, will use the button label.
   */
  groupLabel?: string,
};

export type EditButtonOptions<P = any, D = any> = Omit<OptionGroupDefinition, 'handler'> & {
  /**
   * Callback to render the body of the edit form.
   */
  renderForm: FormBodyRenderer<P, D>,
} & EditDataHandler<D> & Partial<MenuOptionsDefinition<P>>;

export type BodilessOverrides<P = any, D = any, E = {}> =
  Partial<EditButtonOptions<P, D> & E>;

export type UseBodilessOverrides<P = any, D = any, E = {}> = (
  props: P & EditButtonProps<D>,
) => BodilessOverrides<P, D, E>;
