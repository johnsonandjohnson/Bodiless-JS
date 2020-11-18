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
  createContext, useContext, ComponentType, useRef, useEffect,
} from 'react';
import { useNode } from '@bodiless/core';
import { v4 } from 'uuid';
import { observer } from 'mobx-react-lite';
import { BreadcrumbItem } from './BreadcrumbStore';
import type { BreadcrumbItemType } from './BreadcrumbStore';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';
import type { LinkData } from '../Link';

const breadcrumbContext = createContext<BreadcrumbItemType | undefined>(undefined);

export const useBreadcrumbContext = () => useContext(breadcrumbContext);
export const BreadcrumbContextProvider = breadcrumbContext.Provider;

export type BreadcrumbSettings = {
  linkNodeKey: string,
  titleNodeKey: string,
};

/**
 * hook that checks whether the component is rendered the first time
 *
 * @returns true when the component is rendered the first time, otherwise false
 */
const useIsFirstRender = () => {
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
  }, []);
  return !isMounted.current;
};

/**
 * Creates an HOC which specifies that a wrapped component is a breadcrumb. The HOC
 * will read link and title from the specified nodekeys and will push link and title
 * to the breadcrumb store. Once the wrapped component is unmounted, the corresponding link
 * and title are deleted from the breadcrumb store
 *
 * @param settings The title and link nodekeys defining where to locate the link and title nodes.
 *
 * @return An HOC which defines the wrapped component as a breadcrumb.
 */
const asBreadcrumb = ({
  linkNodeKey,
  titleNodeKey,
}: BreadcrumbSettings) => <P extends object>(Component: ComponentType<P>) => {
  const AsBreadcrumb = observer((props: P) => {
    const { node } = useNode();
    const titleNode = node.child<object>(titleNodeKey);
    const linkNode = node.child<LinkData>(linkNodeKey);
    const contextUuidRef = useRef(v4());
    const store = useBreadcrumbStore();
    if (store === undefined) return <Component {...props} />;
    const current = useBreadcrumbContext();
    const item = new BreadcrumbItem({
      uuid: contextUuidRef.current,
      title: {
        data: titleNode.data,
        nodePath: [...node.path, titleNodeKey].join('$'),
      },
      link: {
        data: linkNode.data.href,
        nodePath: [...node.path, linkNodeKey].join('$'),
      },
      parent: current,
      store,
    });
    const isFirstRender = useIsFirstRender();
    // hit breadcrumb store during first render
    // so that get breadcrumbs generated during server-side rendering
    if (isFirstRender) {
      store.setItem(item);
    }
    useEffect(() => {
      store.setItem(item);
    }, [titleNode.data, linkNode.data]);
    // deleting item from store on unmount
    useEffect(() => () => {
      store.deleteItem(contextUuidRef.current);
    }, []);
    return (
      <BreadcrumbContextProvider value={item}>
        <Component {...props} />
      </BreadcrumbContextProvider>
    );
  });
  return AsBreadcrumb;
};

export default asBreadcrumb;
