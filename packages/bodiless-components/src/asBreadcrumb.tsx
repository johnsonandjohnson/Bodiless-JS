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

import React, {
  createContext, useContext, ComponentType, useEffect,
} from 'react';
import { observable, action } from 'mobx';
import {
  useNode, WithNodeKeyProps, withNode, withNodeKey, ifToggledOn, ifToggledOff,
} from '@bodiless/core';
import { flow } from 'lodash';
import { observer } from 'mobx-react-lite';

const DEFAULT_URL_BASE = 'http://host';

type LinkData = {
  href: string,
};

type BreadcrumbContextInterface = {
  readonly url: URL;
  readonly parent?: BreadcrumbContextInterface;
  isSubpathOf: (parent?: BreadcrumbContextInterface) => boolean;
  isAncestorOf: (descendant?: BreadcrumbContextInterface) => boolean;
  spawn: (href: string) => BreadcrumbContextInterface;
  readonly isActive: boolean;
  activate: () => void;
};

type BreadcrumbStoreInterface = {
  setActiveItem: (item: BreadcrumbContextInterface) => void;
  isActive: (item: BreadcrumbContextInterface) => boolean;
};

class BreadcrumbStore implements BreadcrumbStoreInterface {
  @observable activeItem: BreadcrumbContextInterface | undefined = undefined;

  @action setActiveItem(item: BreadcrumbContextInterface) {
    if (this.activeItem && item.isAncestorOf(this.activeItem)) {
      return;
    }
    this.activeItem = item;
  }

  isActive(item: BreadcrumbContextInterface) {
    return item.isAncestorOf(this.activeItem);
  }
}

const defaultStore = new BreadcrumbStore();

export class BreadcrumbContext implements BreadcrumbContextInterface {
  protected store: BreadcrumbStoreInterface = defaultStore;

  readonly url: URL;

  readonly parent: BreadcrumbContextInterface|undefined;

  constructor(href: string = '/', parent?: BreadcrumbContextInterface) {
    const base = typeof window === 'undefined'
      ? DEFAULT_URL_BASE
      : `${window.location.protocol}//${window.location.host}`;
    this.url = new URL(href, base);
    this.parent = parent;
  }

  isSubpathOf(parent?: BreadcrumbContextInterface) {
    if (!parent || parent.url.host !== this.url.host) return false;
    return new RegExp(`^${parent.url.pathname}`).test(this.url.pathname);
  }

  isAncestorOf(descendant?: BreadcrumbContextInterface) {
    if (!descendant || descendant.url.host !== this.url.host) return false;
    for (let current: BreadcrumbContextInterface|undefined = descendant;
      current;
      current = current.parent
    ) {
      if (current === this) return true;
    }
    return false;
  }

  spawn(path: string): BreadcrumbContextInterface {
    return new BreadcrumbContext(path, this);
  }

  get isActive(): boolean {
    return this.store.isActive(this);
  }

  activate() {
    this.store.setActiveItem(this);
  }
}

const breadcrumbContext = createContext<BreadcrumbContextInterface>(new BreadcrumbContext());

export const useBreadcrumbContext = () => useContext(breadcrumbContext);
export const BreadcrumbContextProvider = breadcrumbContext.Provider;

const withBreadcrumbContext = <P extends object>(Component: ComponentType<P>) => {
  const WithBreadcrumbContext = observer((props: P) => {
    const { node } = useNode<LinkData>();
    const current = useBreadcrumbContext();
    // @TODO: What should we do if link has no href?
    const next = current.spawn(node.data.href || '/');
    const page = new BreadcrumbContext(node.pagePath);
    useEffect(() => {
      if (page.isSubpathOf(next)) {
        next.activate();
      }
    }, [node.data.href]);
    return (
      <BreadcrumbContextProvider value={next}>
        <Component {...props} />
      </BreadcrumbContextProvider>
    );
  });
  return WithBreadcrumbContext;
};

/**
 * Creates an HOC which specifies that a wrapped component is a breadcrumb. The HOC
 * will compare link data (href) from the specified nodekey with the current page
 * path and mark the breadcrumb as "active" if the current page matches or is a
 * subpage. When a breadcrumb is active, all parent breadcrumbs are also marked
 * as active.  The state of the breadcrumb can then be tested with the
 * `useIsBreadcrumbActive` hook, or with the `ifActiveVBreadcrumb` or
 * `ifNotActiveBreadcrumb` flow toggles, to control rendering.
 *
 * @param nodeKeys The nodekeys defining where to locate the link data defining this breadcrumb.
 *
 * @return An HOC which defines the wrapped component as a breadcrumb.
 */
const asBreadcrumb = (nodeKeys?: WithNodeKeyProps) => flow(
  withBreadcrumbContext,
  withNode,
  withNodeKey(nodeKeys),
);

export const useIsActiveBreadcrumb = () => useBreadcrumbContext().isActive;

export const ifActiveBreadcrumb = ifToggledOn(useIsActiveBreadcrumb);

export const ifNotActiveBreadcrumb = ifToggledOff(useIsActiveBreadcrumb);

export default asBreadcrumb;
