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

import React,
{
  useEffect, ComponentType, HTMLProps,
  useCallback, FocusEvent,
} from 'react';
import ReactDOM from 'react-dom';
import { Range, Editor } from 'slate';
import { ReactEditor, useSlate } from 'slate-react';
import { useEditContext } from '@bodiless/core';
import { getReturnFocusedItem } from '../withReturnFocusBack';

const defaultUI = {
  Menu: 'div',
};

export type UI = {
  Menu?: ComponentType<HTMLProps<HTMLDivElement>> | string;
};

export const getUI = (ui: UI = {}) => ({
  ...defaultUI,
  ...ui,
});

/**
 * Update the menu's absolute position.
 */
function updateMenu(menu: HTMLElement | null, editor: ReactEditor) {
  const { selection } = editor;

  if (!menu) {
    return;
  }

  if (
    !selection
    || !ReactEditor.isFocused(editor)
    || Range.isCollapsed(selection)
    || Editor.string(editor, selection) === ''
  ) {
    menu.removeAttribute('style');
    return;
  }

  const domSelection = window.getSelection();
  if (!domSelection) return;
  const domRange = domSelection.getRangeAt(0);
  const rect = domRange.getBoundingClientRect();
  const offsetLeft = rect.left + window.pageXOffset - menu.offsetWidth / 2 + rect.width / 2;

  const { style } = menu;
  style.opacity = '1';
  style.visibility = 'visible';
  style.top = `${rect.top + window.pageYOffset - menu.offsetHeight}px`;
  style.left = `${offsetLeft < 0 ? 15 : offsetLeft}px`;
}

export type HoverMenuProps = {
  children?: any;
  className?: string;
  ui?: UI;
};

const HoverMenu = (props: HoverMenuProps) => {
  const isEditMode = useEditContext().isEdit || null;

  const { ui } = props;
  const { Menu } = getUI(ui);

  const { children, className, ...rest } = props;
  const root = typeof window !== 'undefined' ? window.document.body : null;
  const elementID = `hover-menu-${Math.random().toString(16).slice(2)}`;
  const editor = useSlate();

  const onBlur = useCallback((ev: FocusEvent<HTMLDivElement>) => {
    if (getReturnFocusedItem() !== null) return;
    const { activeElement } = document;
    const { currentTarget } = ev;
    const relatedTarget = ev.relatedTarget as HTMLElement;

    if (!currentTarget) return;

    // Prevent hiding menu when focus is moved to a button within menu.
    if (relatedTarget && relatedTarget.nodeName === 'BUTTON') {
      const parentNode = relatedTarget.parentNode as HTMLElement;
      if (parentNode && parentNode.id === currentTarget.id) {
        return;
      }
    }

    if (!activeElement || activeElement.id !== currentTarget.id) {
      ReactEditor.deselect(editor);
      currentTarget.removeAttribute('style');
    }
  }, []);

  useEffect(() => {
    const element = document.getElementById(elementID);
    updateMenu(element, editor);
    return () => {};
  });
  return (
    root
    && isEditMode
    && ReactDOM.createPortal(
      <Menu {...rest} id={elementID} className={className} onBlur={onBlur}>
        {children}
      </Menu>,
      root,
    )
  );
};

HoverMenu.displayName = 'HoverMenu';

export default HoverMenu;
