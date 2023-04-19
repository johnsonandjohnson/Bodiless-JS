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

import React from 'react';
import { RichText } from '@bodiless/richtext-ui';
import { stylable } from '@bodiless/fclasses';
import { useNode, NodeProvider } from '@bodiless/data';
import { withoutHydration } from '@bodiless/hydration';

/**
 * @private
 *
 * Wraps bodiless rich text editor in a proxy which can process plain text
 * data. Facilitates swapping of editors without data migration.
 */
const RichTextCleanBase = (props: any) => {
  const { node } = useNode();
  // Create a proxy which can process plain text data.
  const proxy = node.proxy({
    getData: (d: any) => {
      if (Array.isArray(d)) return d;
      if (d.text) {
        return [
          {
            type: 'paragraph',
            children: [
              {
                text: d.text,
              },
            ],
          },
        ];
      }
      return d;
    },
  });
  return (
    <NodeProvider node={proxy}>
      <RichText {...props} />
    </NodeProvider>
  );
};

/**
 * A clean rich text editor with no styling applied to
 */
export const RichTextClean = withoutHydration()(stylable(RichTextCleanBase));
