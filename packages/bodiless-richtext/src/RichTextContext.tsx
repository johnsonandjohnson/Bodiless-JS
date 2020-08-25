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
  ComponentType, HTMLProps, createContext, useContext,
} from 'react';

const defaultUI = {
  // This is to differentiate unstyled HoverMenu in tests.
  HoverMenu: () => (<div />),
  Button: 'button',
  Overlay: 'div',
  CloseButton: 'span',
  ClickableWrapper: 'button',
  PreviewWrapper: 'div',
};

export type UI = {
  HoverMenu?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  Button?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
  Overlay?: ComponentType<HTMLProps<HTMLDivElement>> | string;
  CloseButton?: ComponentType<HTMLProps<HTMLSpanElement>> | string;
  ClickableWrapper?: ComponentType<HTMLProps<HTMLButtonElement>> | string;
};

export type PreviewUI = {
  PreviewWrapper?: ComponentType<HTMLProps<HTMLDivElement>> | string;
};

export const getUI = (ui: UI & PreviewUI = {}) => ({
  ...defaultUI,
  ...ui,
});

export const uiContext = createContext<UI>(defaultUI);
export const useUI = () => useContext(uiContext);
