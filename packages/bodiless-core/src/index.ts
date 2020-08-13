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

import { ComponentType } from 'react';
import PageContextProvider, { withMenuOptions, useRegisterMenuOptions } from './PageContextProvider';
import PageEditContext from './PageEditContext';
import asStatic from './asStatic';
import asReadOnly from './asReadOnly';
import {
  useEditContext, useUUID, useContextActivator, useExtendHandler,
} from './hooks';
import withNode, { withNodeKey } from './withNode';
import withSidecarNodes, { startSidecarNodes, endSidecarNodes } from './withSidecarNodes';
import {
  withDefaultContent,
  withResetButton,
} from './Contentful';
import withEditButton, { useEditFormProps } from './withEditButton';
import useContextMenuForm, { contextMenuForm, ContextMenuForm } from './contextMenuForm';
import withCompoundForm, { useRegisterSnippet } from './withCompoundForm';
import withEditFormSnippet from './withEditFormSnippet';
import withData from './withData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import {
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  withContextActivator,
  withoutProps,
  withExtendHandler,
} from './hoc';
import { ifToggledOff, ifToggledOn, withFlowToggle } from './withFlowToggle';
import { ifEditable, ifReadOnly, useEditToggle } from './withEditToggle';
import type { ContextMenuFormProps, IContextMenuItemProps, TMenuOption } from './Types/ContextMenuTypes';
import type { PageEditContextInterface } from './PageEditContext/types';
import type { EditButtonOptions, EditButtonProps } from './Types/EditButtonTypes';
import type { TMenuOptionGetter, UseGetMenuOptions } from './Types/PageContextProviderTypes';
import type { WithNodeProps, WithNodeKeyProps } from './Types/NodeTypes';
import type { TOverlaySettings } from './Types/PageOverlayTypes';
import type { Snippet as FormSnippet } from './withCompoundForm';
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
import useNotificationButton from './withNotificationButton';
import withChild from './withChild';
import asBodilessComponent, { withActivatorWrapper } from './asBodilessComponent';
import type { Options as BodilessOptions, AsBodiless } from './asBodilessComponent';
import { useContextMenuUIContext as useFormUI } from './components/ContextMenuContext';
import ContextSubMenu from './ContextMenu/ContextSubMenu';
import useSwitcherButton from './useSwitcherButton';
import OnNodeErrorNotification from './OnNodeErrorNotification';

export * from './components';
export {
  asBodilessComponent,
  asStatic,
  asReadOnly,
  withContextActivator,
  withActivatorWrapper,
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  PageContextProvider,
  withMenuOptions,
  useRegisterMenuOptions,
  PageEditContext,
  useEditContext,
  useContextActivator,
  useUUID,
  withEditButton,
  useEditFormProps,
  withNode,
  withNodeKey,
  withSidecarNodes,
  withCompoundForm,
  withEditFormSnippet,
  useRegisterSnippet,
  startSidecarNodes,
  endSidecarNodes,
  contextMenuForm,
  useContextMenuForm,
  ContextMenuForm,
  ContextSubMenu,
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
  useNotifications,
  useNotify,
  withExtendHandler,
  useExtendHandler,
  NotificationProvider,
  useNotificationButton,
  useSwitcherButton,
  OnNodeErrorNotification,
};

export type {
  BodilessOptions,
  PageEditContextInterface,
  TMenuOption,
  TMenuOptionGetter,
  UseGetMenuOptions,
  WithNodeProps,
  WithNodeKeyProps,
  EditButtonOptions,
  EditButtonProps,
  TOverlaySettings,
  ContextMenuFormProps,
  IContextMenuItemProps,
  AsBodiless,
  FormSnippet,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
