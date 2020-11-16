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

import React, { ConsumerProps, FC } from 'react';
import { Observer } from 'mobx-react';
import {
  DefinesLocalEditContext,
  PageEditContextInterface,
  PageEditStoreInterface,
  TMenuOptionGetter,
} from './types';
import { TOverlaySettings } from '../Types/PageOverlayTypes';
import { defaultStore, defaultOverlaySettings } from './Store';

/**
 * A Page Edit Context represents a particular state of the page editor, usually
 * defined by what element of the page is "active" or "focused". Currently, the
 * only bit of state tracked in the context are context menu options (along with
 * whether a context is "active", which can be used to highlight the component
 * which registered the context.
 * - Contexts are nested (so that a parent context is "active" when any of
 * its child contexts are active).
 * - Contexts are established using the React context API - and each PageEditContext
 * instance is a "value".
 * - The PageEditContext instance also contains a reference to the page edit store,
 * which tracks editor UI state (eg the currently active context).
 * - The react context container (created by React.createContext) of which the
 * PageEditContext instance is a value is available as a static property of the class via:
 *    - PageEditContext.context (the context object, suitable for use as a component contextType).
 *    - PageEditContext.Consumer (an observable version of PageEditContext.context.Consumer).
 *    - PageEditContext.Provider (equivalent to PageEditContext.context.Provider).
 * Singleton store.
 */
class PageEditContext implements PageEditContextInterface {
  readonly id: string = 'Root';

  readonly name: string = 'Root';

  readonly getMenuOptions: TMenuOptionGetter = () => [];

  readonly parent: PageEditContextInterface | undefined;

  readonly type: string | undefined;

  protected store: PageEditStoreInterface = defaultStore;

  hasLocalMenu = false;

  // When called with no argument this creates a new store and react context.
  constructor(values?: DefinesLocalEditContext, parent?: PageEditContextInterface) {
    if (values) {
      this.id = values.id;
      this.name = values.name || values.id;
      if (values.getMenuOptions) this.getMenuOptions = values.getMenuOptions;
      if (values.type) this.type = values.type;
    }
    if (parent) {
      this.parent = parent;
    }
  }

  protected peerContextMap: Map<string, PageEditContextInterface|null> = new Map();

  get peerContexts() {
    // Cast is necessary bc ts can't figure out that the filter removes all the nulls.
    return Array.from(this.peerContextMap.values()).filter(Boolean) as PageEditContextInterface[];
  }

  /**
   * Registers a context as a peer.  Peer contexts contribute their menu options whenever the
   * context to which they are registered is activated.
   *
   * @param context The peer context to register.
   */
  registerPeer(context: PageEditContextInterface) {
    this.peerContextMap.set(context.id, context);
  }

  /**
   * Marks a peer context as "unregistered".  An unregistered peer will not contribute
   * its menu options.
   *
   * @param context The peer context to unregister.
   */
  unregisterPeer(context: PageEditContextInterface) {
    if (this.peerContextMap.has(context.id)) {
      // We mark it as unregistered instead of deleting it in order to preserve
      // the original insertion order if/when it is added back.
      this.peerContextMap.set(context.id, null);
    }
  }

  unregisterPeers() {
    this.peerContextMap = new Map();
  }

  static root = new PageEditContext();

  static context = React.createContext<PageEditContextInterface>(PageEditContext.root);

  // Make our context consumer observable.
  // See https://github.com/mobxjs/mobx-react/issues/471.
  // eslint-disable-next-line react/prop-types
  static Consumer: FC<ConsumerProps<PageEditContextInterface>> = ({ children }) => (
    <PageEditContext.context.Consumer>
      {value => <Observer>{() => children(value)}</Observer>}
    </PageEditContext.context.Consumer>
  );

  static Provider = PageEditContext.context.Provider;

  // Create a new context value with this as its parent.
  spawn(values: DefinesLocalEditContext): PageEditContextInterface {
    return new PageEditContext(values, this);
  }

  // Make this the "current" context.
  activate() {
    this.store.setActiveContext(this);
  }

  updateMenuOptions() {
    this.store.updateMenuOptions(this);
  }

  // Tests whether this context is "active" - i.e. whether it or one of its descendants is the
  // "current" context.
  get isActive() {
    return !this.parent || this.store.contextTrail.includes(this.id);
  }

  get isInnermost() {
    return Boolean(
      this.store.activeContext && this.store.activeContext.id === this.id,
    );
  }

  get activeContext() {
    return this.store.activeContext;
  }

  get activeDescendants() {
    const trail: PageEditContextInterface[] = [];
    for (let c = this.activeContext; c; c = c.parent) {
      if (c === this) return trail.reverse();
      trail.push(c);
    }
    return undefined;
  }

  get isInnermostLocalMenu() {
    const getId = (context: PageEditContextInterface):string => {
      if (context.hasLocalMenu) return context.id;
      if (context.parent) return getId(context.parent);
      return '';
    };
    return Boolean(
      this.hasLocalMenu
      && this.store.activeContext
      && getId(this.store.activeContext) === this.id,
    );
  }

  get isEdit() {
    return this.store.isEdit;
  }

  toggleEdit(on?: boolean) {
    this.store.toggleEdit(on);
  }

  get isPositionToggled() {
    return this.store.isPositionToggled;
  }

  togglePosition(on?: boolean) {
    this.store.togglePosition(on);
  }

  get contextMenuOptions() {
    return this.store.contextMenuOptions;
  }

  get optionMap() {
    return this.store.optionMap;
  }

  get pageOverlay() {
    return this.store.pageOverlay;
  }

  showPageOverlay(passedSettings: TOverlaySettings | undefined) {
    clearTimeout(this.store.pageOverlay.timeoutId);
    const settings = {
      ...defaultOverlaySettings,
      isActive: true,
      ...passedSettings,
    };
    this.store.pageOverlay.data = settings;

    if (settings.maxTimeoutInSeconds) {
      this.store.pageOverlay.timeoutId = window.setTimeout(() => {
        this.showError({
          message: `The application encountered an issue.
Please try your operation again if it was not successful.`,
        });
      }, settings.maxTimeoutInSeconds * 1000);
    }
  }

  hidePageOverlay() {
    this.showPageOverlay({
      isActive: false,
    });
  }

  showError(passedSettings: TOverlaySettings | undefined) {
    const settings = {
      message: 'An error has occurred.',
      hasCloseButton: true,
      hasSpinner: false,
      ...passedSettings,
    };
    this.showPageOverlay(settings);
  }

  get areLocalTooltipsDisabled() {
    return this.store.areLocalTooltipsDisabled || !this.store.isEdit;
  }

  toggleLocalTooltipsDisabled(isDisabled?: boolean) {
    this.store.toggleLocalTooltipsDisabled(isDisabled);
  }
}

export default PageEditContext;
