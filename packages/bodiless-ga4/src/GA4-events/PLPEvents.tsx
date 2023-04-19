/**
 * Copyright © 2022 Johnson & Johnson
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

import React, { useEffect, FC } from 'react';
import { useFilterByGroupContext } from '@bodiless/filtering';
import type { FilteredItemType } from '@bodiless/filtering';
import { ContentNode } from '@bodiless/data';
import { Token, addProps } from '@bodiless/fclasses';
import type { FlowContainerWrapperProps } from '@bodiless/layouts';
import MD5 from 'crypto-js/md5';
import { ItemsDataType, pushPLPAnalytics } from '../util/pushPLPAnalytics';

const generateHash = (str: string) => MD5(str).toString();

const FILTER_BY_GROUP = 'filter_by_group';

const GA4_EVENTS = {
  viewItemList: 'view_item_list',
  selectItem: 'select_item',
};

/**
 * @private
 * reads the brand name from the DOM metatag
 */
export const getBrandName = (): string => {
  if (typeof document !== 'undefined') {
    return (
      document
        .querySelector('meta[name="bl-brand"]')
        ?.getAttribute('content') || 'N/A'
    );
  }
  return 'N/A';
};

/**
 * @private
 * reads the page title from the DOM title tag.
 */
export const getPageTitle = (): string => {
  if (typeof document !== 'undefined') {
    return document.querySelector('title')?.innerText || 'N/A';
  }
  return 'N/A';
};

/**
 * @private
 * Converts list of selected tags into the "facets" string required by datalayer.
 */
export const getFacetsData = (selectedTags: any[] = []): string => selectedTags.map((tag) => `${tag.categoryName}:${tag.name}`).join('~');

/**
 * @private
 * Converts list of filtered items to the items array required by datalayer.
 */
const getItemsData = (items: FilteredItemType[]): ItemsDataType[] => items
  .filter((item) => item.isDisplayed)
  .map((item) => ({
    item_id: item.id,
    ...item.data,
  }));

/**
 * @private
 * Callback provided to `withFilterByTags` to append data to the filtered items list.
 */
const getFilteredItemData = (tagsNode: ContentNode<any>) => {
  const node = tagsNode.peer(tagsNode.path.slice(0, -1));
  const pageTitle = getPageTitle();
  const brandName = getBrandName();
  const uuidHash = generateHash(`${brandName}${pageTitle}Page$product_listing`);
  const titleNode = node.child<any>('title');
  const titleArray = Array.isArray(titleNode.data)
    && titleNode.data[0]
    && titleNode.data[0].children
    ? titleNode.data[0].children
    : [];
  // eslint-disable-next-line no-nested-ternary
  const productTitle = Array.isArray(titleNode.data)
    ? titleArray && titleArray.length > 0
      ? titleArray[0].text
      : ''
    : titleNode.data.text || '';

  const { tags = [] } = tagsNode.data;
  const tagsData = tags.length > 0 ? tags.map((tag: any) => tag.name) : [];
  const itemCats = tagsData.join(',');
  return {
    item_brand: brandName,
    item_category: itemCats,
    item_list_id: uuidHash,
    item_list_name: pageTitle,
    item_name: productTitle,
  };
};

/**
 * HOC which causes a filterable item to append data required for the
 * datalayer when it registers itself.
 *
 * @example
 * ```
 * const ProductListing = asFlowContainerToken({
 *   ...,
 *   Analytics: {
 *     ...,
 *     ComponentWrapper: as(withSelectItemGA4Event, withRegisterGA4ProductData),
 *   },
 *   ...
 * });
 * ```
 */
export const withRegisterGA4ProductData = addProps({ getFilteredItemData });

/**
 * Fires a GA4 event when a product from the product list is selected.
 *
 * @param Component
 * The component to which this behavior should be attached.
 *
 * @returns
 * A version of the component with the behavior attached.
 *
 * @example
 * ```
 * const ProductListing = asFlowContainerToken({
 *   ...,
 *   Analytics: {
 *     ...,
 *     ComponentWrapper: as(withSelectItemGA4Event, withRegisterGA4ProductData),
 *   },
 *   ...
 * });
 * ```
 */
export const withSelectItemGA4Event: Token = (Component) => {
  const WithSelectItemGA4Event: FC<any> = (props) => {
    const { getSelectedTags, getFilteredItems } = useFilterByGroupContext();
    const selectedTags = getSelectedTags();
    const filteredItems = getFilteredItems();
    const onClick = (event: React.MouseEvent<HTMLElement>) => {
      if (filteredItems.length === 0) return;
      const pageTitle = getPageTitle();
      const brandName = getBrandName();
      const uuidHash = generateHash(
        `${brandName}${pageTitle}Page$product_listing`,
      );
      const elem = event.currentTarget;
      const currentIndex = elem.parentNode !== null
        ? Array.from(elem.parentNode.children).indexOf(elem)
        : 0;
      pushPLPAnalytics({
        event: GA4_EVENTS.selectItem,
        ecommerce: {
          facets: getFacetsData(selectedTags),
          items: getItemsData(filteredItems),
          itemListId: uuidHash,
          itemListName: pageTitle,
          searchType: FILTER_BY_GROUP,
          slot: currentIndex + 1,
        },
      });
    };
    return <Component {...props} onClick={onClick} />;
  };
  return WithSelectItemGA4Event;
};

/**
 * Fires a GA4 event when the product list is loaded or filtered.
 *
 * @param Component
 * The component to which this behavior should be attached.
 *
 * @returns
 * A version of the component with the behavior attached.
 */
export const withViewItemsGA4Event: Token = (Component) => {
  const WithViewItemsGA4Event: FC<any> = (props: FlowContainerWrapperProps) => {
    const { itemCount } = props;
    const { getFilteredItems, filtersInitialized, getSelectedTags } = useFilterByGroupContext();
    const filteredItems = getFilteredItems();
    const selectedTags = getSelectedTags();
    useEffect(() => {
      // Wait until all items have registered themselves. Note that `filteredItems` always
      // contains all items; the filtered ones have `isDisplayed` property set to false.
      if (filteredItems.length < itemCount) return;
      const pageTitle = getPageTitle();
      const brandName = getBrandName();
      const uuidHash = generateHash(
        `${brandName}${pageTitle}Page$product_listing`,
      );
      pushPLPAnalytics({
        event: GA4_EVENTS.viewItemList,
        ecommerce: {
          facets: getFacetsData(selectedTags),
          items: getItemsData(filteredItems),
          itemListId: uuidHash,
          itemListName: pageTitle,
          searchType: FILTER_BY_GROUP,
        },
      });
      // Only execute the effect when the filteredItems change (not the selectedTags).
      // This avoids firing the event twice since these are in different states.
    }, [filteredItems, filtersInitialized]);
    return <Component {...(props as any)} />;
  };
  return WithViewItemsGA4Event;
};
