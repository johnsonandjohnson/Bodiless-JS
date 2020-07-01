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
import withSidecarNodes, { startSidecarNodes, endSidecarNodes } from './withSidecarNodes';
import {
  withDefaultContent,
  withResetButton,
} from './Contentful';
import withEditButton, { useEditFormProps } from './withEditButton';
import type { EditButtonProps } from './withEditButton';
import useContextMenuForm, { contextMenuForm, ContextMenuForm } from './contextMenuForm';
import type { FormProps as ContextMenuFormProps } from './contextMenuForm';
import withData from './withData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import {
  withMenuOptions,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  withContextActivator,
  withoutProps,
} from './hoc';
import { ifToggledOff, ifToggledOn, withFlowToggle } from './withFlowToggle';
import { ifEditable, ifReadOnly, useEditToggle } from './withEditToggle';
import type { TMenuOption, PageEditContextInterface } from './PageEditContext/types';
import type { EditButtonOptions } from './Types/EditButtonTypes';
import type { TMenuOptionGetter } from './Types/PageContextProviderTypes';
import type { WithNodeProps, WithNodeKeyProps } from './Types/NodeTypes';
import type { TOverlaySettings } from './Types/PageOverlayTypes';
import {
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
} from './ActivateContext';
import {
  NotificationProvider,
  useNotifications,
  useNotify,
} from './NotificationProvider';
import NotificationButtonProvider from './NotificationButtonProvider';
import SwitcherButtonProvider from './SwitcherButtonProvider';
import withChild from './withChild';
import asBodilessComponent, { withActivatorWrapper } from './asBodilessComponent';
import type { Options as BodilessOptions, AsBodiless } from './asBodilessComponent';
import { useUI as useFormUI } from './components/ContextMenuItem';

export * from './components';
export {
  asBodilessComponent,
  asStatic,
  withContextActivator,
  withActivatorWrapper,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  PageContextProvider,
  withMenuOptions,
  PageEditContext,
  useEditContext,
  useContextActivator,
  useUUID,
  withEditButton,
  useEditFormProps,
  withNode,
  withNodeKey,
  withSidecarNodes,
  startSidecarNodes,
  endSidecarNodes,
  contextMenuForm,
  useContextMenuForm,
  ContextMenuForm,
  useFormUI,
  withData,
  NodeProvider,
  useNode,
  useNodeDataHandlers,
  DefaultContentNode,
  ifEditable,
  ifReadOnly,
  withoutProps,
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withChild,
  withDefaultContent,
  withResetButton,
  ifToggledOff,
  ifToggledOn,
  withFlowToggle,
  useEditToggle,
  NotificationProvider,
  NotificationButtonProvider,
  useNotifications,
  useNotify,
  SwitcherButtonProvider,
};

export type {
  BodilessOptions,
  PageEditContextInterface,
  TMenuOption,
  TMenuOptionGetter,
  WithNodeProps,
  WithNodeKeyProps,
  EditButtonOptions,
  EditButtonProps,
  TOverlaySettings,
  ContextMenuFormProps,
  AsBodiless,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
