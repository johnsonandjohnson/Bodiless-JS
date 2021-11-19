/**
 * Copyright © 2019 Johnson & Johnson
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

import flow from 'lodash/flow';
import { TreeHO } from './type';

export const TreeBob = () => false;
/**
 * treeKOPromisFlow takes a group of promises that resole to TreeHOs
 * and resolves to a flow of those TreeHOs.
 *
 * It is used to aggregate a bunch of TreeHO promises in to one.
 * @param promises
 */
export const treeHOPromiseFlow = (...promises:Promise<TreeHO>[]) => (
  Promise.all(promises).then((values:TreeHO[]) => flow(values) as TreeHO)
);
