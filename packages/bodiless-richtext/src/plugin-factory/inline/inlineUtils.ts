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

import { Editor, Transforms, Range } from 'slate';
import { DataJSON } from '../../Type';

const isInlineActive = (editor: Editor, format: string) => {
  let match = false;
  const nodes = Editor.nodes(editor, {
    match: n => n.type === format,
  });
  // ToDo: find a way how to solve the linting error and keep functionality working
  // eslint-disable-next-line no-restricted-syntax
  for (const [node] of nodes) {
    if (node.type === format) match = true;
    break;
  }
  return !!match;
};

export const createIsActive = (
  format: string,
) => (editor: Editor) => isInlineActive(editor, format);

export const hasInline = (format: string, editor: Editor) => isInlineActive(editor, format);

export const createInline = (inlineType: string, data: DataJSON) => ({
  data,
  type: inlineType,
});

export const removeInline = (
  editor: Editor,
  inlineType: string,
) => Transforms.unwrapNodes(editor, { match: n => n.type === inlineType });

export const wrapInline = (
  editor: Editor,
  inlineType: string,
  data: DataJSON,
) => {
  if (isInlineActive(editor, inlineType)) {
    removeInline(editor, inlineType);
  }

  const { selection } = editor;
  const isCollapsed = selection && Range.isCollapsed(selection);

  const inlineNode = {
    data,
    type: inlineType,
    children: [],
  };

  if (isCollapsed) {
    Transforms.insertNodes(editor, inlineNode);
  } else {
    Transforms.wrapNodes(editor, inlineNode, { split: true });
    Transforms.collapse(editor, { edge: 'end' });
  }
};

export type UpdateInlineOptions = {
  editor: Editor;
  data: DataJSON;
  type: string;
  at: Range;
};

export type InsertInlineOptions = {
  editor: Editor;
  inlineType: string;
};
export type createToggleInlineOptions = {
  editor: Editor;
};

export const updateInline = ({
  editor,
  type,
  data,
  at,
}: UpdateInlineOptions) => {
  Transforms.setNodes(
    editor,
    {
      data,
      type,
    },
    {
      at: at || editor.selection,
      match: n => n.type === type,
    },
  );
};

export const insertInline = ({
  editor,
  inlineType,
}: InsertInlineOptions) => {
  const { selection } = editor;
  const isExpanded = selection && Range.isExpanded(selection);

  if (hasInline(inlineType, editor)) {
    removeInline(editor, inlineType);
  } else if (isExpanded) {
    wrapInline(editor, inlineType, { openModal: true });
  }
};

export const toggleInline = ({
  editor,
  inlineType,
}: InsertInlineOptions) => {
  const isActive = isInlineActive(editor, inlineType);

  if (isActive) {
    removeInline(editor, inlineType);
  } else {
    insertInline({
      editor,
      inlineType,
    });
  }
};

export const createToggleInline = (inlineType: string) => (
  { editor }:createToggleInlineOptions,
) => (
  toggleInline({
    editor,
    inlineType,
  })
);
