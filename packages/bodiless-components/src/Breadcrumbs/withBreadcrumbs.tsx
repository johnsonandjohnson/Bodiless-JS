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

import React, { ComponentType } from 'react';
import { useNode } from '@bodiless/core';
import { BreadcrumbStore } from './BreadcrumbStore';
import { Breadcrumbs } from './Breadcrumbs';
import { BreadcrumbStoreProvider } from './BreadcrumbStoreProvider';

/**
 * HOC that adds breadcrumb store and renders breadcrumbs.
 * @param Component that pushes its data to the store.
 */
export const withBreadcrumbStore = (Component: ComponentType<any>) => {
  const WithBreadcrumbStore = (props: any) => {
    const { node } = useNode();
    const { pagePath } = node;
    const store = new BreadcrumbStore(pagePath);
    return (
      <BreadcrumbStoreProvider store={store}>
        <Component {...props} />
      </BreadcrumbStoreProvider>
    );
  };
  return WithBreadcrumbStore;
};

/**
 * HOC that adds breadcrumb store and renders breadcrumbs.
 * @param Component that pushes its data to the store.
 */
const withBreadcrumbs = (Component: ComponentType<any>) => {
  const WithBreadcrumbs = (props: any) => (
    <>
      <Component {...props} />
      <Breadcrumbs {...props} />
    </>
  );
  return withBreadcrumbStore(WithBreadcrumbs);
};

export default withBreadcrumbs;
