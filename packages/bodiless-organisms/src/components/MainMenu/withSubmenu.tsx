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

import {
  ComponentType,
} from 'react';
import {
  ListProps,
  withToggleButton,
  withToggleFrom,
  ListDesignableComponents,
} from '@bodiless/components';
import { withDesign } from '@bodiless/fclasses';
/**
 * HOC, adds the local context menu to the given component
 * @param Sublist
 */
const withSubmenu = (Sublist: ComponentType<ListProps>) => (
  withDesign<ListDesignableComponents>({
    ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
    Item: withToggleFrom(Sublist),
  })
);

export default withSubmenu;
