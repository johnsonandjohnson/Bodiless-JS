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

import { ComponentType } from 'react';
import PageContextProvider from './PageContextProvider';
import PageEditContext from './PageEditContext';
import asStatic from './asStatic';
import { useEditContext, useUUID, useContextActivator } from './hooks';
import withNode, { withNodeKey } from './withNode';
import withEditButton from './withEditButton';
import contextMenuForm from './contextMenuForm';
import withData from './withData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import {
  withPageContext,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  withContextActivator,
  withoutProps,
} from './hoc';
import { ifEditable, ifReadOnly, withEditToggle } from './withEditToggle';
import { TMenuOption } from './PageEditContext/types';
import { EditButtonOptions } from './Types/EditButtonTypes';
import { TMenuOptionGetter } from './Types/PageContextProviderTypes';
import { WithNodeProps } from './Types/NodeTypes';
import { TOverlaySettings } from './Types/PageOverlayTypes';
import {
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
} from './ActivateContext';
import withChild from './withChild';

export * from './components';
export {
  asStatic,
  withContextActivator,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  TMenuOption,
  TMenuOptionGetter,
  TOverlaySettings,
  PageContextProvider as ContextProvider,
  withPageContext as withMenuOptions,
  PageEditContext,
  useEditContext,
  useContextActivator,
  useUUID,
  withEditButton,
  WithNodeProps,
  EditButtonOptions,
  withNode,
  withNodeKey,
  contextMenuForm,
  withData,
  NodeProvider,
  useNode,
  useNodeDataHandlers,
  DefaultContentNode,
  ifEditable,
  ifReadOnly,
  withEditToggle,
  withoutProps,
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withChild,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
