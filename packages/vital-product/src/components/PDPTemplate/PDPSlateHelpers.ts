import { ContentfulTextNode, ContentfulHyperlinkNode } from './types';

/**
 * Class that represents Contentful Rich Text Node.
 * Use it to adjust non-RTE content types that need to be
 * used in Slate editors with `toSlateParagraphNode` or `toSlateTextNode`.
 */
export class TextNode implements ContentfulTextNode {
  data: Record<string, any> = {};

  marks: any[] = [];

  value: string;

  nodeType: 'text' = 'text';

  constructor(value: string) {
    this.value = value;
  }
}

/**
 * Converts a Contentful Rich Text Node to Slate Rich Text node.
 *
 * @param node
 * A Contentful Text Node to be converted to Slate Text Node.
 */
export const toSlateTextNode = (node: ContentfulTextNode) => {
  const isSuperscript = node.marks && node.marks.some((mark: any) => mark.type === 'superscript');
  const isBold = node.marks && node.marks.some((mark: any) => mark.type === 'bold');

  return {
    text: node.value,
    ...isSuperscript && { SuperScript: true },
    ...isBold && { Bold: true },
  };
};

/**
 * Converts a Contentful Rich Text Hyperlink Node to Slate Hyperlink node.
 *
 * @param node
 * A Contentful Hyperlink Node to be converted to Slate Hyperlink Node.
 */
export const toSlateHyperlinkNode = (node: ContentfulHyperlinkNode) => ({
  data: {
    openModal: true,
    slatenode: {
      href: node.data.uri,
    }
  },
  type: 'Link',
  children: [{ text: node.content[0].value }]
});

/**
 * Slate Nodes Processors that are mapped to the `nodeType` on the Contentful Node.
 */
const slateNodeProcessors = {
  text: toSlateTextNode,
  hyperlink: toSlateHyperlinkNode,
};

/**
 * Converts a list of Contentful Rich Text Nodes to the
 * Slate Rich Text Paragraph with Slate Text nodes.
 *
 * @param nodes
 * An array of Contentful Text Nodes to be converted to Slate Paragraph with Slate Text Nodes.
 */
export const toSlateParagraphNode = (children: ContentfulTextNode[] = []) => ({
  type: 'paragraph',
  children: children.length > 0
    ? children.map(c => slateNodeProcessors[c.nodeType](c as any))
    : [{ text: ''}],
});
