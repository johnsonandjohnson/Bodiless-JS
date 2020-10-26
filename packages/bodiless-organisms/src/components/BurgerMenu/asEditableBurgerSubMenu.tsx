/**
 * Copyright Ã‚Â© 2019 Johnson & Johnson
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
import { flow } from 'lodash';
import {
  withDesign, HOC,
} from '@bodiless/fclasses';
import {
  withNode,
  withNodeKey,
  withoutProps,
} from '@bodiless/core';
import {
  withDeleteSublistOnUnwrap,
  withLinkToggle,
} from '@bodiless/components';
import asEditableMenu from '../MainMenu/asEditableMenu';
import withEditableTitle from '../MainMenu/withEditableTitle';
import asBurgerSubMenu from './asBurgerSubMenu';
import AsEditable from '../MainMenu/types/AsEditable';

const asEditableBurgerSubMenu = (HeaderContent: string, editable: AsEditable) => flow(
  asBurgerSubMenu(HeaderContent),
  withDesign({
    Title: flow(
      withoutProps(['unwrap', 'href']),
    ),
    Body: withDesign({
      Header: flow(
        withNodeKey('component'),
        withLinkToggle,
        withNodeKey('title'),
      ),
      InnerLinks: flow(
        withNode,
        withDeleteSublistOnUnwrap,
        asEditableMenu(editable),
      ) as HOC,
    }),
  }),
  withEditableTitle(editable),
);
export default asEditableBurgerSubMenu;
