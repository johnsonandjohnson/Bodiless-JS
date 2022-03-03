import React from 'react';
import { RichText } from '@bodiless/richtext-ui';
import { stylable } from '@bodiless/fclasses';
import { useNode, NodeProvider } from '@bodiless/core';

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
export const RichTextClean = stylable(RichTextCleanBase);
