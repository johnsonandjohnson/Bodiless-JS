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

import { ContentNode } from '@bodiless/data';

/**
 * Gets a list of redirect aliases.
 * @param node - the content node of the current component of its child/peer.
 * @returns key/value collection of disabled items or an empty object.
 */
const useGetRedirectAliases = (node: ContentNode<any>): any => {
  const aliases = node.peer<any>(['Site', 'redirect-aliases']).data;
  return aliases;
};

/**
 * Sets a list of redirect aliases.
 * Be careful, new aliases will replace old ones completely.
 *
 * @param node - the content node of the current component of its child/peer.
 * @param aliases - aliases object to be set.
 */
const useSetRedirectAliases = (node: ContentNode<any>, aliases: object) => {
  node.peer<any>(['Site', 'redirect-aliases']).setData(aliases);
};

export {
  useGetRedirectAliases,
  useSetRedirectAliases,
};
