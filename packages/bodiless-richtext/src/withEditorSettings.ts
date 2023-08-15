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
import { Editor } from 'slate';
import {
  getInlineButtons,
} from './RichTextItemGetters.bl-edit';
import type {
  RichTextComponents,
} from './Type';

const withEditorSettings = (components: RichTextComponents) => (editor: Editor) => {
  const { isInline } = editor;
  const inlineTypes = getInlineButtons(components)
    .map(Component => Component.id);
  // eslint-disable-next-line no-param-reassign
  editor.isInline = (
    element,
  ) => (inlineTypes.includes(element.type as string) ? true : isInline(element));
  return editor;
};

export default withEditorSettings;
