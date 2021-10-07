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
import { Helmet } from 'react-helmet';

import { firstItemHomeLinkReducer } from './withBreadcrumbItemsFromStore';
import { useBreadcrumbStore } from './BreadcrumbStoreProvider';

import type { BreadcrumbsProps } from './types';

// We need a full url in the breadcrumbs LD item.
const generateUrl = (url: string) => (
  typeof window !== 'undefined'
    ? new URL(url, window.location.origin).href
    : url
);

type LDItemType = {
  '@type': string,
  position: number,
  item: {
    '@id': string,
    name: string | object,
  },
};

const withBreadcrumbsSD = (Component: ComponentType<BreadcrumbsProps>) => (
  props: BreadcrumbsProps,
) => {
  const {
    itemsReducer = firstItemHomeLinkReducer,
    renderLastItemWithoutLink = false,
    hasStartingTrail = false,
  } = props;
  const store = useBreadcrumbStore();
  const hasStartingTrail$ = typeof hasStartingTrail === 'function' ? hasStartingTrail() : hasStartingTrail;
  const renderLastItemWithoutLink$ = typeof renderLastItemWithoutLink === 'function'
    ? renderLastItemWithoutLink()
    : renderLastItemWithoutLink;

  // Do nothing if there is no store
  if (!store) return <Component {...props} />;

  const items = itemsReducer(store.breadcrumbTrail, { hasStartingTrail: hasStartingTrail$ });

  // Do nothing if there are no items in the store
  if (items.length <= 0) return <Component {...props} />;

  /* eslint-disable @typescript-eslint/indent */
  const breadcrumbItems = items.map(uuid => store.getItem(uuid))
    .reduce<LDItemType[]>((prev, current, index) => {
      if (current === undefined) return prev;
      const isLastItem = index === (items.length - 1);
      if (isLastItem && renderLastItemWithoutLink$) return prev;
      prev.push({
        '@type': 'ListItem',
        // We increment in 1 to accomodate for the index offset ( starts from 0 )
        position: index + 1,
        item: {
          '@id': current.link.data ? generateUrl(current.link.data) : '',
          name: current.title.data,
        },
      });
      return prev;
    },
  []);

  // We exclude first home trail and the last trail if `renderLastItemWithoutLink` enabled.
  // If no breadcrumbs left, do nothing.
  if (breadcrumbItems.length <= 0) return <Component {...props} />;

  const breadcrumbsSDHeader = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [...breadcrumbItems],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbsSDHeader)}
        </script>
      </Helmet>
      <Component {...props} />
    </>
  );
};

export default withBreadcrumbsSD;
