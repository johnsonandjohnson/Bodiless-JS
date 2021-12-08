/**
 * Copyright © 2020 Johnson & Johnson
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
import type { EditButtonProps } from '@bodiless/core';
import type {
  DesignableComponents,
  DesignableProps,
  DesignableComponentsProps,
  Token,
  ComponentOrTag,
} from '@bodiless/fclasses';
import type { ComponentSelectorOptions } from '@bodiless/layouts';

export type ChameleonData = {
  component?: string | null;
};

export type ChameleonComponents = DesignableComponents;

export type ChameleonState = {
  RootComponent: ComponentOrTag<any>,
  isOn: boolean,
  activeComponent: string,
  setActiveComponent: (key: string|null) => void,
  design: {
    [key: string]: Token
  },
};

export type ChameleonProps =
  EditButtonProps<ChameleonData> & DesignableProps<ChameleonComponents> & 
  DesignableComponentsProps<ChameleonComponents>;
export type ChameleonButtonProps =
  ChameleonProps & EditButtonProps<ChameleonData> & ComponentSelectorOptions;
