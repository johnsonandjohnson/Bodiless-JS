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

import { ComponentType } from 'react';
import { Value, Editor, Operation } from 'slate';
import Immutable from 'immutable';
import {
  Editor as ReactEditor,
  BasicEditorProps,
  EditorProps,
} from 'slate-react';

export enum RichTextItemType {
  block = 'BLOCK',
  inline = 'INLINE',
  mark = 'MARK',
}

export type DataJSON = object;

export type FormProps = {
  data: DataJSON;
  setData(Data: DataJSON): void;
  closeForm(): void;
  unwrap(): void;
};

export type NodeEditForm = ComponentType<FormProps>;

export type EditorOnChange = BasicEditorProps['onChange'];

export type EditorContext = {
  editor: Editor;
  value: Value;
  editorProps: EditorProps;
  editorRef: React.RefObject<ReactEditor>;
} | null;

export type ToggleProps = {
  editor: Editor;
  value: Value;
};

export type EditorButtonProps = {
  children?: any;
  className?: string;
};

export type CustomComponentProps = {
  componentData: DataJSON;
  setComponentData(Data: DataJSON): void;
  unwrap(): void;
  children: any;
};

export type Change = {
  operations: Immutable.List<Operation>;
  value: Value;
};

export type RichTextComponent = ComponentType<any> & {
  isVoid?: boolean,
  type: RichTextItemType,
  id: string,
  keyboardKey?: string,
  globalButton?: {
    icon: string,
  },
  hoverButton?: {
    icon: string,
  };
  isAtomicBlock?: boolean,
};

export type RichTextComponents = {
  [key:string]: RichTextComponent,
};
