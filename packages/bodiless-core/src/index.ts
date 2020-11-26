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
  useGetter, useLocalStorage,
} from './hooks';
import withNode, { withNodeKey } from './withNode';
import withSidecarNodes, { startSidecarNodes, endSidecarNodes } from './withSidecarNodes';
import {
  withDefaultContent,
  withResetButton,
} from './Contentful';
import withEditButton, { useEditFormProps, createMenuOptionGroup } from './withEditButton';
import useContextMenuForm, { contextMenuForm, ContextMenuForm } from './contextMenuForm';
import withCompoundForm, { useRegisterSnippet } from './withCompoundForm';
import withEditFormSnippet from './withEditFormSnippet';
import type { Options as EditFormSnippetOptions } from './withEditFormSnippet';
import withData from './withData';
import NodeProvider, { useNode, useNodeDataHandlers } from './NodeProvider';
import { DefaultContentNode } from './ContentNode';
import type { ContentNode } from './ContentNode';
import {
  withNodeAndHandlers,
  withNodeDataHandlers,
  withLocalContextMenu,
  withContextActivator,
  withoutProps,
  withExtendHandler,
  withOnlyProps,
} from './hoc';
import { ifToggledOff, ifToggledOn, withFlowToggle } from './withFlowToggle';
import { ifEditable, ifReadOnly, useEditToggle } from './withEditToggle';
import type { ContextMenuFormProps, IContextMenuItemProps, TMenuOption } from './Types/ContextMenuTypes';
import type { PageEditContextInterface } from './PageEditContext/types';
import type {
  OptionGroupDefinition, EditButtonOptions, EditButtonProps, UseBodilessOverrides,
} from './Types/EditButtonTypes';
import type { TMenuOptionGetter, MenuOptionsDefinition } from './Types/PageContextProviderTypes';
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
import withNotificationButton from './withNotificationButton';
import withChild from './withChild';
import asBodilessComponent, { withActivatorWrapper, withBodilessData } from './asBodilessComponent';
import type { Options as BodilessOptions, AsBodiless } from './asBodilessComponent';
import { useMenuOptionUI } from './components/ContextMenuContext';
import ContextSubMenu from './ContextMenu/ContextSubMenu';
import withSwitcherButton from './withSwitcherButton';
import OnNodeErrorNotification from './OnNodeErrorNotification';

export * from './components';
export {
  asBodilessComponent,
  withBodilessData,
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
  useGetter,
  PageEditContext,
  useEditContext,
  useContextActivator,
  useUUID,
  withEditButton,
  createMenuOptionGroup,
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
  useMenuOptionUI,
  withData,
  NodeProvider,
  useNode,
  useNodeDataHandlers,
  DefaultContentNode,
  ifEditable,
  ifReadOnly,
  withoutProps,
  withOnlyProps,
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
  useLocalStorage,
  withExtendHandler,
  useExtendHandler,
  NotificationProvider,
  withNotificationButton,
  withSwitcherButton,
  OnNodeErrorNotification,
};

export type {
  ContentNode,
  BodilessOptions,
  PageEditContextInterface,
  TMenuOption,
  TMenuOptionGetter,
  WithNodeProps,
  WithNodeKeyProps,
  EditButtonOptions,
  OptionGroupDefinition,
  UseBodilessOverrides,
  EditButtonProps,
  TOverlaySettings,
  ContextMenuFormProps,
  IContextMenuItemProps,
  AsBodiless,
  FormSnippet,
  MenuOptionsDefinition,
  EditFormSnippetOptions,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
