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
import {
  DesignableComponentsProps,
  DesignableComponents,
} from '@bodiless/fclasses';

export type ChameleonData = {
  component?: string | null;
};

export type ChameleonComponents = DesignableComponents;

export type ChameleonState = {
  isOn: boolean,
  activeComponent: string,
  setActiveComponent: (key: string|null) => void,
  selectableComponents: Partial<ChameleonComponents>,
};

export type ChameleonProps =
  EditButtonProps<ChameleonData> & DesignableComponentsProps<ChameleonComponents>;
export type ChameleonButtonProps = ChameleonProps & EditButtonProps<ChameleonData>;
