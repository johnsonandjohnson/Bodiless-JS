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

import  { HTMLProps } from 'react';
import {
  withContextActivator,
  withNode,
  withNodeDataHandlers,
  withLocalContextMenu,
  WithNodeProps,
  ifEditable,
  Bodiless,
  ifReadOnly,
  withNodeKey,
  withoutProps,
} from '@bodiless/core';
import { flowRight } from 'lodash';
import {withTagButton} from '../TagButton';
// Type of the data used by this component.
// @Todo: Determine if this type is necessary?
type Props = HTMLProps<HTMLElement>;


const emptyValue = {
  tags: '',
};

// Composed hoc which creates editable version of the component.
// Note - the order is important. In particular:
// - the node data handlers must be outermost
// - anything relying on the context (activator, indicator) must be
//   *after* `withEditButton()` as this establishes the context.
// - withData must be *after* the data handlers are defiend.
// @todo: revist review the markup produced by adding a tag: Determine what we need to do with withData?
// @todo revisit suggestions as they need to be passed at runtime?
export const asTaggableItem = (nodeKey?: string, suggestions?: any) => {
  return flowRight(
    withNodeKey(nodeKey),
    withNode,
    withNodeDataHandlers(emptyValue),
    ifReadOnly(withoutProps(['setComponentData'])),
    ifEditable(
      withTagButton({suggestions}),
      withContextActivator('onClick'),
      withLocalContextMenu,
    ),
    withoutProps([
      'suggestions',
      'inputPlaceHolder',
      'allowNew',
      'noSuggestionsText',
      'componentData',
    ]),
  ) as Bodiless<Props, Props & Partial<WithNodeProps>>;
};
export default asTaggableItem;
