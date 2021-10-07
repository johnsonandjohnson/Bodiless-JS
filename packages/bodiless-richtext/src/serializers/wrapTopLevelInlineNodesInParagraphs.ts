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

import { jsx } from 'slate-hyperscript';
import { Text } from 'slate';
import type { Node as SlateNode } from 'slate';

/**
 * leveraging https://github.com/ianstormtaylor/slate/issues/3457#issuecomment-577395255
 */
const wrapTopLevelInlineNodesInParagraphs = (fragment: SlateNode[]) => {
  let inlineNodes: SlateNode[] = [];
  const newFragments: SlateNode[] = [];

  const maybePushInlineNodeParagraph = () => {
    if (inlineNodes.length > 0) {
      newFragments.push(jsx('element', { type: 'paragraph' }, inlineNodes));
      inlineNodes = [];
    }
  };

  fragment.forEach(node => {
    if (Text.isText(node) || node.type === 'Link') {
      inlineNodes.push(node);
    } else {
      maybePushInlineNodeParagraph();
      newFragments.push(node);
    }
  });
  maybePushInlineNodeParagraph();

  return newFragments;
};

export default wrapTopLevelInlineNodesInParagraphs;
