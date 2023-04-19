/**
 * Copyright © 2021 Johnson & Johnson
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

import {
  ContentNode,
} from '@bodiless/data';
import { LinkData } from './types';

const ensureTrailingSlash = (href: string) => (href.endsWith('/') ? href : `${href}/`);

/**
 * A hook that checks if a content node of the current component or its children
 * contains href.
 * Can be used in a richtext item (slatenode), list (menu) item or link component itself.
 * @param node: content node object.
 * @returns href: string or undefined.
 */
const useGetLinkHref = (node: ContentNode<any>) => {
  if (node.data === undefined) {
    return undefined;
  }
  if (typeof node.data.href === 'string') {
    return ensureTrailingSlash(node.data.href);
  }
  if (typeof node.child<LinkData>('link').data.href === 'string') {
    return ensureTrailingSlash(node.child<LinkData>('link').data.href);
  }
  if (typeof node.child<LinkData>('title$link').data.href === 'string') {
    return ensureTrailingSlash(node.child<LinkData>('title$link').data.href);
  }
  return undefined;
};

export default useGetLinkHref;
