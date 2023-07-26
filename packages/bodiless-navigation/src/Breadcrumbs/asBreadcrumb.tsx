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
  createContext, useContext, FC, useLayoutEffect,
} from 'react';
import { useNode } from '@bodiless/data';
import type { LinkData } from '@bodiless/components';
import { observer } from '@bodiless/core';
import type { HOC } from '@bodiless/fclasses';
import { BreadcrumbItem } from './BreadcrumbStore';
import type { BreadcrumbItemType } from './BreadcrumbStore';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';
import asHiddenBreadcrumbSource from './asHiddenBreadcrumbSource.bl-edit';

const breadcrumbContext = createContext<BreadcrumbItemType | undefined>(undefined);

/**
 * A Hook to get the current Breadcrumb Item context values.
 */
export const useBreadcrumbContext = () => useContext(breadcrumbContext);
export const BreadcrumbContextProvider = breadcrumbContext.Provider;

/**
 * Hook which can be used to determine if a menu item is part of
 * the current active breadcrumb trail.
 *
 * This hook is only accurate if
 * - The menu is inside a BreadcrumbStoreProvider.
 * - The menu item has been wrapped in asBreadcrumb
 *
 * @return true if the item is in the active trail, false otherwise.
 */
export const useIsActiveTrail = () => !!useBreadcrumbContext()?.isActive();

const isSSR = () => !(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
);

export type BreadcrumbSettings = {
  linkNodeKey: string,
  titleNodeKey: string,
};

/**
 * Creates a HOC which specifies that a wrapped component is a breadcrumb. The HOC
 * will read link and title from the specified nodekeys and will push link and title
 * to the breadcrumb store. Once the wrapped component is unmounted, the corresponding link
 * and title are deleted from the breadcrumb store
 *
 * @param settings The title and link nodekeys defining where to locate the link and title nodes.
 *
 * @return A HOC which defines the wrapped component as a breadcrumb.
 */
const asBreadcrumb = ({
  linkNodeKey,
  titleNodeKey,
}: BreadcrumbSettings): HOC => Component => {
  const AsBreadcrumb = observer((props: any) => {
    const current = useBreadcrumbContext();
    const store = useBreadcrumbStore();
    if (store === undefined) return <Component {...props} />;
    const { node } = useNode();

    const titleNode = node.child<{ text: string }>(titleNodeKey);
    const linkNode = node.child<LinkData>(linkNodeKey);

    // We need an id which will be the same for all breadcrumb sources which
    // render the same data.  Node path works well for this.
    const id = node.path.join('$');
    const item = new BreadcrumbItem({
      uuid: id,
      title: {
        data: titleNode.data.text,
        nodePath: [...node.path, titleNodeKey].join('$'),
      },
      link: {
        data: linkNode.data.href,
        nodePath: [...node.path, linkNodeKey].join('$'),
      },
      parent: current,
      store,
    });

    if (!BL_IS_EDIT) {
      // To avoid flicker, we need to populate the store on render
      // otherwise the breadcrumbs render with no items before
      // a layout effect is executed.
      store.setItem(item);
    }
    if (typeof window !== 'undefined') {
      useLayoutEffect(() => {
        store.setItem(item);
        return () => {
          store.deleteItem(item);
        };
      }, [titleNode.data, linkNode.data]);
    }

    return (
      <BreadcrumbContextProvider value={item}>
        <Component {...props} />
      </BreadcrumbContextProvider>
    );
  });
  return AsBreadcrumb;
};

/**
 * Use this HOC to wrap a menu so that it can serve a source of data for breadcrumbs
 * and menu trails. It creates a hidden version of the menu which is rendered only during
 * SSR, to ensure the breadcrumb data is pre-generated.
 *
 * You should wrap the whole menu in this HOC. You must also wrap the menu's items in
 * `asBreadcrumb`, and the all must be rendered within a BreadcrumbStoreContext
 *
 * @param Component
 * The component providing the menu data structure.
 *
 * @return
 * A version of the component which renders a hidden version of itself during SSR.
 *
 * @see asHiddenBreadcrumbSource
 * @see asBreadcrumb
 */
const asBreadcrumbSource: HOC = Component => {
  const SSRSource = asHiddenBreadcrumbSource(Component);

  const AsBreadcrumbSource: FC<any> = props => (
    <>
      {isSSR() && <SSRSource {...props} />}
      <Component {...props} />
    </>
  );
  return AsBreadcrumbSource;
};

export default asBreadcrumb;
export { asBreadcrumbSource };
