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

import isHotkey from 'is-hotkey';
import { ReactEditor } from 'slate-react';
import type { RichTextProps } from './Type';
import { RichTextItemType, RichTextComponent } from './Type';
import {
  createToggleBlock,
  createToggleMark,
  createToggleInline,
} from './plugin-factory';

const useKeyBoardShortcut = (Component: RichTextComponent) => {
  const {
    type,
    id,
    keyboardKey,
  } = Component;
  if (!keyboardKey) {
    throw Error('keyboardKey need to get ShortcutPlugin');
  }
  const toggle = {
    [RichTextItemType.block]: createToggleBlock(id),
    [RichTextItemType.mark]: createToggleMark(id),
    [RichTextItemType.inline]: createToggleInline(id),
  }[type];
  return {
    toggle,
    key: keyboardKey,
  };
};

type UseKeyBoardShortcuts = {
  components: RichTextProps['components'],
  editor: ReactEditor,
};

const useKeyBoardShortcuts = (props: UseKeyBoardShortcuts) => {
  const { editor, components } = props;
  const hotKeys = Object.values(components)
    // eslint-disable-next-line no-prototype-builtins
    .filter(Component => Component.hasOwnProperty('keyboardKey'))
    .map(Component => useKeyBoardShortcut(Component as RichTextComponent));
  return {
    onKeyDown: (event: KeyboardEvent) => {
      hotKeys.forEach(hotkey => {
        if (isHotkey(hotkey.key, event as any)) {
          event.preventDefault();
          hotkey.toggle({ editor });
        }
      });
    },
  };
};

export default useKeyBoardShortcuts;
