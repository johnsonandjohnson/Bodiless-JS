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

import { withoutProps, asToken } from '@bodiless/fclasses';
import {
  withContextActivator,
  withNode,
  withNodeDataHandlers,
  withLocalContextMenu,
  ifEditable,
  withNodeKey,
} from '@bodiless/core';
import { withTagButton, TagsNodeType } from '../TagButton';

const emptyValue:TagsNodeType = {
  tags: [],
};

// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
const asTaggableItem = (nodeKey?: string) => asToken(
  withoutProps([
    'registerSuggestions',
    'getSuggestions',
    'allowNew',
    'noSuggestionsText',
    'componentData',
    'inputAttributes',
    'seeAllText',
    'formBodyText',
    'formTitle',
    'setComponentData',
  ]),
  ifEditable(
    withTagButton,
    withContextActivator('onClick'),
    withLocalContextMenu,
  ),
  withNodeDataHandlers(emptyValue),
  withNode,
  withNodeKey(nodeKey),
);
export default asTaggableItem;
