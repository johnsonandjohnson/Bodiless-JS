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
import { flow } from 'lodash';
import { withDesign, HOC } from '@bodiless/fclasses';
import { asBodilessLink, withLinkToggle } from '@bodiless/components';
import { withNode, withNodeKey } from '@bodiless/core';
import AsEditable from './types/AsEditable';
/**
 * HOC, that injects editable link toggle component into component design (usually Menu or Submenu)
 */
const withEditableTitle = (editable: AsEditable) => withDesign({
  Title: flow(
    asBodilessLink('title-link'),
    withLinkToggle,
    withNode,
    withNodeKey('title'),
    editable('text', 'Menu Item'),
  ) as HOC,
});

export default withEditableTitle;
