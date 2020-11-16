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
import { TOverlaySettings } from '../Types/PageOverlayTypes';
import type { TMenuOption } from '../Types/ContextMenuTypes';

export type TMenuOptionGetter = () => TMenuOption[];

export type TPageOverlayStore = {
  data: TOverlaySettings,
  timeoutId: number,
};

export interface CanControlEditMode {
  isEdit: boolean;
  toggleEdit: (mode?: boolean) => void;
}
export interface CanControlLocalTooltipsVisibility {
  areLocalTooltipsDisabled: boolean;
  toggleLocalTooltipsDisabled: (isDisabled?: boolean) => void;
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
  id: string;
  name?: string;
  type?: string;
  getMenuOptions?: () => TMenuOption[];
}

export interface CanBeActivated {
  isActive: boolean
  isInnermost: boolean;
  hasLocalMenu: boolean;
  isInnermostLocalMenu: boolean;
  activate: () => void;
  /**
   * The currently active context, or undefined if no context is active.
   */
  activeContext?: PageEditContextInterface;
  /**
   * If the context is active, an array of its descendants, starting with its first child
   * and ending with the innermost active context.  If the context is not active, undefined.
   */
  activeDescendants?: PageEditContextInterface[];
}

export interface PageEditStoreInterface extends CanControlLocalTooltipsVisibility {
  activeContext: PageEditContextInterface | undefined;
  updateMenuOptions: (contexts: PageEditContextInterface) => string[];
  contextMenuOptions: TMenuOption[];
  isEdit: boolean;
  isPositionToggled: boolean;
  setActiveContext(context?: PageEditContextInterface): void;
  toggleEdit: (on?: boolean) => void;
  togglePosition: (on?: boolean) => void;
  contextTrail: string[];
  pageOverlay: TPageOverlayStore;
  optionMap: Map<string, Map<string, TMenuOption>>;
}

export interface PageEditContextInterface extends
  CanBeActivated,
  CanControlEditMode,
  CanControlMenuPosition,
  CanGetContextMenuOptions,
  CanControlPageOverlay,
  DefinesLocalEditContext,
  CanControlLocalTooltipsVisibility
// eslint-disable-next-line @typescript-eslint/brace-style
{
  readonly id: string;
  readonly name: string;
  readonly parent?: PageEditContextInterface;
  /**
   * The "peer" contexts registered with this context.  Peer contexts contribute their menu
   * options when the context wo which they are registered becomes active.
   */
  readonly peerContexts: PageEditContextInterface[];
  updateMenuOptions: () => void;
  /**
   * Function property which gets the menu options associated with this context.
   */
  readonly getMenuOptions: TMenuOptionGetter;
  /**
   * Spawn a child of this context (another context which, when activaged, will also activate
   * this one and all of its ancestors).
   */
  spawn: (v: DefinesLocalEditContext) => PageEditContextInterface;
  /**
   * Register a peer of this context (another context which will be activagted along with this one)
   */
  registerPeer: (c: PageEditContextInterface) => void;
  /**
   * Unregister all peers.
   */
  unregisterPeer: (c: PageEditContextInterface) => void;
}
