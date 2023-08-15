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
  useGetter, useLocalStorage, useClickOutside,
} from './hooks';
import withEditButton, { createMenuOptionGroup } from './withEditButton.bl-edit';
import useContextMenuForm, { contextMenuForm, ContextMenuForm } from './contextMenuForm.bl-edit';
import type { FormBodyProps, FormBodyRenderer, ContextMenuPropsType } from './contextMenuForm.bl-edit';
import withCompoundForm, { useRegisterSnippet } from './withCompoundForm.bl-edit';
import withEditFormSnippet, { useEditFormProps } from './withEditFormSnippet';
import type { Options as EditFormSnippetOptions } from './withEditFormSnippet';
import {
  withLocalContextMenu,
  withContextActivator,
  withExtendHandler,
  withOnlyProps,
  withResizeDetector,
  withClickOutside,
} from './hoc.bl-edit';
import { ifToggledOff, ifToggledOn, withFlowToggle } from './withFlowToggle';
import { ifEditable, ifReadOnly, useEditToggle } from './withEditToggle.bl-edit';
import type {
  ContextMenuFormProps, IContextMenuItemProps, TMenuOption, TooltipProps,
} from './Types/ContextMenuTypes';
import type { PageEditContextInterface } from './PageEditContext/types';
import type {
  OptionGroupDefinition, EditButtonOptions, EditButtonProps, UseBodilessOverrides,
} from './Types/EditButtonTypes';
import type { TMenuOptionGetter, MenuOptionsDefinition } from './Types/PageContextProviderTypes';
import type { TOverlaySettings } from './Types/PageOverlayTypes';
import type { Snippet as FormSnippet } from './withCompoundForm.bl-edit';
import {
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withReactivateOnRemount,
} from './ActivateContext';
import {
  NotificationProvider,
  useNotifications,
  useNotify,
} from './NotificationProvider';
import withNotificationButton from './withNotificationButton';
import withChild, { withAppendChild, withPrependChild } from './withChild';
import withParent from './withParent';
import asBodilessComponent, { withActivatorWrapper } from './asBodilessComponent/asBodilessComponent.bl-edit';
import asBodilessReadOnlyComponent from './asBodilessComponent/asBodilessReadOnlyComponent';
import type { BodilessOptions, AsBodiless } from './Types/AsBodilessTypes';
import { useMenuOptionUI } from './components/ContextMenuContext.bl-edit';
import ContextSubMenu from './ContextMenu/ContextSubMenu';
import withSwitcherButton from './withSwitcherButton';
import OnNodeErrorNotification from './OnNodeErrorNotification';
import {
  getFromSessionStorage,
  saveToSessionStorage,
} from './SessionStorage';
import withResetButton from './withResetButton.bl-edit';

export * from './mobx.bl-edit';

export * from './components';
export * from './Store';
export * from './BackendClient';

export {
  asBodilessComponent,
  asBodilessReadOnlyComponent,
  asStatic,
  asReadOnly,
  withContextActivator,
  withActivatorWrapper,
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
  withCompoundForm,
  withEditFormSnippet,
  useRegisterSnippet,
  contextMenuForm,
  useContextMenuForm,
  ContextMenuForm,
  ContextSubMenu,
  useMenuOptionUI,
  ifEditable,
  ifReadOnly,
  withOnlyProps,
  withResizeDetector,
  withClickOutside,
  ActivateOnEffectProvider,
  withActivateOnEffect,
  useActivateOnEffect,
  useActivateOnEffectActivator,
  withReactivateOnRemount,
  withChild,
  withParent,
  withAppendChild,
  withPrependChild,
  ifToggledOff,
  ifToggledOn,
  withFlowToggle,
  useEditToggle,
  useNotifications,
  useNotify,
  useLocalStorage,
  useClickOutside,
  withExtendHandler,
  useExtendHandler,
  NotificationProvider,
  withNotificationButton,
  withSwitcherButton,
  OnNodeErrorNotification,
  getFromSessionStorage,
  saveToSessionStorage,
  withResetButton
};

export type {
  BodilessOptions,
  PageEditContextInterface,
  TMenuOption,
  TMenuOptionGetter,
  EditButtonOptions,
  FormBodyProps,
  FormBodyRenderer,
  ContextMenuPropsType,
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
  TooltipProps,
};

export type Bodiless<P, Q> = (C: ComponentType<P> | string) => ComponentType<Q>;
