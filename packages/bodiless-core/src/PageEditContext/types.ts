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

// Internal mobx store which holds the state.
import React from 'react';
import { TOverlaySettings } from '../Types/PageOverlayTypes';

export type TMenuOption = {
  name: string;
  icon?: string;
  label?: string;
  isActive?: () => boolean;
  isDisabled?: () => boolean;
  isHidden?: () => boolean;
  handler?: (event: React.MouseEvent) => any;
  local?: boolean;
  global?: boolean;
  group?: string;
};

export type TMenuOptionGetter = () => TMenuOption[];

export type TPageOverlayStore = {
  data: TOverlaySettings,
  timeoutId: number,
};

export interface CanControlEditMode {
  isEdit: boolean;
  toggleEdit: (mode?: boolean) => void;
}
export interface CanControlMenuPosition {
  isPositionToggled: boolean;
  togglePosition: (mode?: boolean) => void;
}
export interface CanControlPageOverlay {
  pageOverlay: TPageOverlayStore,
  showPageOverlay: (settings?: TOverlaySettings) => void;
  hidePageOverlay: (settings?: TOverlaySettings) => void;
  showError: (settings?: TOverlaySettings) => void;
}
export interface CanGetContextMenuOptions {
  contextMenuOptions: TMenuOption[];
}
export interface DefinesLocalEditContext {
  name: string;
  id: string;
  getMenuOptions?: () => TMenuOption[];
}
export interface CanBeActivated {
  isActive: boolean;
  isInnermost: boolean;
  hasLocalMenu: boolean;
  isInnermostLocalMenu: boolean;
  activate: () => void;
  refresh: () => void;
}
export interface PageEditStore {
  activeContext: PageEditContextInterface | undefined;
  contextMenuOptions: TMenuOption[];
  isEdit: boolean;
  setActiveContext(context?: PageEditContextInterface): void;
  toggleEdit(): void;
  togglePosition(): void;
  contextTrail: string[];
}

export interface PageEditContextInterface extends
  CanBeActivated,
  CanControlEditMode,
  CanControlMenuPosition,
  CanGetContextMenuOptions,
  CanControlPageOverlay,
  DefinesLocalEditContext
{
  readonly id: string;
  readonly name: string;
  readonly getMenuOptions: TMenuOptionGetter;
  spawn: (v: DefinesLocalEditContext) => PageEditContextInterface;
}
