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
} from 'react';
import ReactDOM from 'react-dom';
import { useEditContext } from '@bodiless/core';
import { useSlateContext } from './SlateEditorContext';
import { EditorContext } from '../Type';

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
function updateMenu(menu: HTMLElement | null, editorContext: EditorContext) {
  const native = window.getSelection();

  if (!menu || !editorContext || !native) return;
  const { value } = editorContext;
  const { fragment, selection } = value;

  /**
   * According to https://github.com/ianstormtaylor/slate/issues/2432
   * we need to detect if the active editor looses the focus (isBlurred equal to true)
   */
  if (selection.isBlurred || selection.isCollapsed || fragment.text === '') {
    menu.removeAttribute('style');
    return;
  }
  const range = native.getRangeAt(0);
  const rect = range.getBoundingClientRect();
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
  const editorContext: EditorContext = useSlateContext();

  const { ui } = props;
  const { Menu } = getUI(ui);

  const { children, className, ...rest } = props;
  const root = typeof window !== 'undefined' ? window.document.body : null;
  const elementID = `hover-menu-${Math.random().toString(16).slice(2)}`;

  useEffect(() => {
    const element = document.getElementById(elementID);
    updateMenu(element, editorContext);
    return () => {};
  });
  return (
    root
    && isEditMode
    && ReactDOM.createPortal(
      <Menu {...rest} id={elementID} className={className}>
        {children}
      </Menu>,
      root,
    )
  );
};

HoverMenu.displayName = 'HoverMenu';

export default HoverMenu;
