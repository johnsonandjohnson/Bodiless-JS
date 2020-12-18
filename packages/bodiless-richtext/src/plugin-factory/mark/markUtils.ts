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

import { Editor } from 'slate';

const isMarkActive = (editor: Editor, format: string) => {
  const marks = Editor.marks(editor);
  return marks ? marks[format] === true : false;
};

export const createIsActive = (format: string) => (editor: Editor) => isMarkActive(editor, format);

export type CreateToggleMark = {
  editor: Editor,
};
export const createToggleMark = (format: string) => ({ editor }: CreateToggleMark) => {
  const isActive = isMarkActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
};

export type ToggleMarkOptions = {
  editor: Editor,
  markType: string;
};
export const toggleMark = ({ markType, editor } : ToggleMarkOptions) => (
  createToggleMark(markType)({ editor })
);

export const hasMark = (format: string, editor: Editor) => isMarkActive(editor, format);
