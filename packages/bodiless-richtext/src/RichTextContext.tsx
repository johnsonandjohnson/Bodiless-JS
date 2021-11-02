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

import { ComponentOrTag } from '@bodiless/fclasses';
import React,
{
  ComponentType, HTMLProps, createContext, useContext,
} from 'react';

const defaultUI: Required<UI & PreviewUI> = {
  // This is to differentiate unstyled HoverMenu in tests.
  HoverMenu: () => (<div />),
  Button: 'button',
  Overlay: 'div',
  CloseButton: 'span',
  ClickableWrapper: 'button',
  PreviewWrapper: 'div',
  TextSelectorWrapper: 'div',
};

export type UI = {
  HoverMenu?: ComponentOrTag<HTMLProps<HTMLDivElement>>;
  Button?: ComponentOrTag<HTMLProps<HTMLButtonElement>>;
  Overlay?: ComponentOrTag<HTMLProps<HTMLDivElement>>;
  CloseButton?: ComponentOrTag<HTMLProps<HTMLSpanElement>>;
  ClickableWrapper?: ComponentOrTag<HTMLProps<HTMLButtonElement>>;
  TextSelectorWrapper?: ComponentOrTag<HTMLProps<HTMLDivElement>>;
};

export type PreviewUI = {
  PreviewWrapper?: ComponentType<HTMLProps<HTMLDivElement>> | string;
};

export const getUI = (ui: UI & PreviewUI = {}) => ({
  ...defaultUI,
  ...ui,
});

export const uiContext = createContext<Required<UI>>(defaultUI);
export const useUI = () => useContext(uiContext);
