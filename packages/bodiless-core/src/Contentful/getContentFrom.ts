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

import type { Path, ContentNode } from '../ContentNode';
import type { GetContentFrom } from './ContentfulNode';

/**
 * helper to read data from a content node
 * can be used for providing default content for a node from another node
 * @param path - path to node read content from
 */
const getContentFrom = <D extends object, E extends object = D>(
  path: Path,
): GetContentFrom<D, E> => (node: ContentNode<D>) => node.peer<E>(path).data;

export default getContentFrom;
