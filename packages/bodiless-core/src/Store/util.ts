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

import path from 'path';

const addPageLeaver = (getPendingRequests: () => any[]) => {
  if (typeof window !== 'undefined') {
    window.addEventListener('beforeunload', e => {
      if (getPendingRequests().length > 0) {
        // Cancel the event
        e.preventDefault();
        // Chrome requires returnValue to be set
        e.returnValue = 'Are you sure you want to leave?';
      } else {
        // the absence of a returnValue property on the event
        // will guarantee the browser unload happens
        delete e.returnValue;
      }
    });
  }
};

/**
   * Given a resource path, returns the key in the store where that item is saved.
   *
   * @param resourcePath
   * The unique path of the resource. In the default implementation, this is used to
   * post the data to the `/content` endpoint of the backend API.
   *
   * @returns
   * The fully qualified node key for this item. A `$` delimited string. The first
   * token represents the collection to which the item belongs (usually
   * either 'Page' or 'Site').  THe remainder is the path within the node tree.
   *
   * @see StoreItem.getResourcePathFromStoreKey
   */
function getStoreKeyFromResourcePath(resourcePath: string): string {
  const nodeKey = path.basename(resourcePath);
  const pagePath = path.dirname(resourcePath);
  const collection = pagePath === 'site' ? 'Site' : 'Page';
  const storeKey = `${collection}$${nodeKey}`;
  return storeKey;
}

/**
   * Given a key the store and a slug identifying the page to which this item
   * belongs, returns a unique path identifying the backend resource associated with
   * this item.
   *
   * @param storeKey
   * The fully qualified node key for this item. A `$` delimited string. The first
   * token represents the collection to which the item belongs (usually
   * either 'Page' or 'Site').  THe remainder is the path within the node tree.
   *
   * @param slug
   * The path of the page to which the item belongs.
   *
   * @returns
   * The unique path of the resource. In the default implementation, this is used to
   * post the data to the `/content` endpoint of the backend API.
   *
   * @example
   * ```
   * const path = StoreItem.getResourcePathFromStoreKey('Page$foo$bar', 'path/to/my/page');
   * //  path === 'pages/path/to/my/page/foo$bar'
   * ```
   *
   * @see StoreItem.getStoreKeyFromResourcePath
   */
function getResourcePathFromStoreKey(storeKey: string, slug: string): string {
  // Extract the collection name (query alias) from the left-side of the key name.
  const [collection, ...rest] = storeKey.split('$');
  // Re-join the rest of the key's right-hand side.
  const fileName = rest.join('$');

  // The query alias (collection) determines the filesystem location
  // where to store the JSON data files.
  // TODO: Don't hardcode 'pages' and provide mechanism for shared (cross-page) content.
  // const resourcePath = path.join('pages', this.store.slug || '', fileName);
  const resourcePath = collection === 'Page'
    ? path.join('pages', slug || '', fileName)
    : path.join('site', fileName);
  return resourcePath;
}

export { addPageLeaver, getResourcePathFromStoreKey, getStoreKeyFromResourcePath };
