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
  createContext, useContext, ComponentType, useRef,
} from 'react';
import {
  useNode,
} from '@bodiless/core';
import { v4 } from 'uuid';
import {
  useBreadcrumbStore,
  BreadcrumbItem,
  BreadcrumbItemInterface,
} from './Breadcrumb/BreadcrumbStore';

type LinkData = {
  href: string,
};

const breadcrumbContext = createContext<BreadcrumbItemInterface | undefined>(undefined);

export const useBreadcrumbContext = () => useContext(breadcrumbContext);
export const BreadcrumbContextProvider = breadcrumbContext.Provider;

const withBreadcrumbContext = <P extends object>(Component: ComponentType<P>) => {
  const WithBreadcrumbContext = (props: P) => {
    const { node } = useNode<LinkData>();
    const contextUuidRef = useRef(v4());
    const store = useBreadcrumbStore();
    if (store === undefined) return <Component {...props} />;
    const current = useBreadcrumbContext();
    const item = new BreadcrumbItem({
      uuid: contextUuidRef.current,
      title: {
        data: node.getChildData('title$text'),
        nodePath: [...node.path, 'title$text'].join('$'),
      },
      link: {
        data: node.getChildData<LinkData>('title$link').href,
        nodePath: [...node.path, 'title$link'].join('$'),
      },
      parent: current,
      store,
    });
    store.setItem(item);
    return (
      <BreadcrumbContextProvider value={item}>
        <Component {...props} />
      </BreadcrumbContextProvider>
    );
  };
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
const asBreadcrumb = withBreadcrumbContext;

export default asBreadcrumb;
