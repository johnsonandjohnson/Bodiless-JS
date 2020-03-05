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
import { ComponentClass } from 'react';
import { flow } from 'lodash';
import { SubMenu } from 'rc-menu';
import {
  withDesign,
  stylable,
  replaceWith,
} from '@bodiless/fclasses';
import asMainMenu from './asMainMenu';
import asRCMenuSublist from './asRCMenuSublist';
/**
 * HOC, that incorporate the given component (usually based on <List /> component)
 * with rc-menu <Submenu /> component
 */
const asMainSubMenu = flow(
  // extract list title, wrap with current node and pass it as title prop to rc-menu <Submenu />
  asRCMenuSublist,
  asMainMenu,
  withDesign({
    Wrapper: replaceWith(stylable(SubMenu as ComponentClass)),
  }),
);

export default asMainSubMenu;
