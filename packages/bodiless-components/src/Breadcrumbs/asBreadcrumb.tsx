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
  createContext, useContext, ComponentType, useLayoutEffect,
} from 'react';
import { useNode } from '@bodiless/core';
import { observer } from 'mobx-react-lite';
import { flow } from 'lodash';
import { BreadcrumbItem } from './BreadcrumbStore';
import type { BreadcrumbItemType } from './BreadcrumbStore';
import { useBreadcrumbStore, asHiddenBreadcrumbSource } from './BreadcrumbStoreProvider';
import type { LinkData } from '../Link';

const breadcrumbContext = createContext<BreadcrumbItemType | undefined>(undefined);

export const useBreadcrumbContext = () => useContext(breadcrumbContext);
export const BreadcrumbContextProvider = breadcrumbContext.Provider;

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
    const current = useBreadcrumbContext();
    const store = useBreadcrumbStore();
    const { node } = useNode();
    if (store === undefined) return <Component {...props} />;
    const titleNode = node.child<object>(titleNodeKey);
    const linkNode = node.child<LinkData>(linkNodeKey);
    // We need an id which will be the same for all breadcrumb sources which
    // render the same data.  Node path works well for this.
    const id = node.path.join('$');
    const item = new BreadcrumbItem({
      uuid: id,
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
    // During SSR we need to populate the store on render, bc effects are not executed.
    if (isSSR()) {
      store.setItem(item);
    } else {
      // Normally, conditional hooks violate the "rules of hooks", but here
      // the condition evaluates the same in a given render environment, and
      // we can't/shouldn't call useLayoutEffect during SSR.
      useLayoutEffect(() => {
        store.setItem(item);
      }, [titleNode.data, linkNode.data]);
      // deleting item from store on unmount
      useLayoutEffect(() => () => {
        store.deleteItem(id);
      }, []);
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
 * Use this HOC to wrap a menu so as to generate data for breadcrumbs
 * and menu trails. Must be rendered within a BreadcrumbStoreContext
 *
 * @param Component
 * The component providing the menu data structure.
 *
 * @return
 * A version of the component which populates an enclosing
 */
const asBreadcrumbSource = (withMenuDesign: Function) => (
  settings: BreadcrumbSettings,
) => <P extends object>(
  Component: ComponentType<P>,
) => {
  const Source = withMenuDesign({
    Item: asBreadcrumb(settings),
  })(Component);

  const SSRSource = flow(
    withMenuDesign({
      Item: asBreadcrumb(settings),
    }),
    asHiddenBreadcrumbSource,
  )(Component);

  const AsBreadcrumbSource = (props: P) => (
    <>
      {isSSR() && <SSRSource {...props} />}
      <Source {...props} />
    </>
  );
  return AsBreadcrumbSource;
};

export default asBreadcrumb;
export { asBreadcrumbSource };
