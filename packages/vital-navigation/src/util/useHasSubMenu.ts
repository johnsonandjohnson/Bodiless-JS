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

import { useNode } from '@bodiless/data';

/**
 * A hook that returns `true` if a menu has submenu, `false` otherwise.
 */
const useHasSubMenu = () => {
  // Gets menu node.
  const { node } = useNode();
  const { path } = node;

  // Creates submenu path and retrieves its related node.
  const subMenuPath: string[] = path.concat(['cham-sublist']);
  const subMenuNode = node.peer<{ component: string }>(subMenuPath);

  // Gets submenu component type from data.
  const { data } = subMenuNode;
  const { component } = data;

  if (component === 'List') {
    return true;
  }

  return false;
};

export default useHasSubMenu;
