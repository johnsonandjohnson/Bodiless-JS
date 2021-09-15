/**
 * Copyright © 2021 Johnson & Johnson
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
import { Token, DesignableComponentsProps } from '@bodiless/fclasses';

/**
 * Defines a component which can be added to a Token Editor
 */
export type TokenEditorComponentDef = {
  /**
   * The name of the component. Used to create the design key of the component
   * within the editor, and for various titles.
   */
  name?: string;
  /**
   * The component to add.
   */
  Component: ComponentType<any>;
  /**
   * An object listing the tokens which will be available to apply to the component.
   * The keys are token names (used to generate checkboxes and to produce code
   * snippets).  The values are the tokens themselvs.
   */
  tokens: { [key: string]: Token; };
};

export type TokenEditorComponents = {
  Wrapper: ComponentType<any>,
  Title: ComponentType<any>,
  Container: ComponentType<any>,
  DetailsWrapper: ComponentType<any>,
  DetailsTitle: ComponentType<any>,
  DetailsBody: ComponentType<any>
  Printer: ComponentType<any>,
};

export type TokenEditorProps = DesignableComponentsProps<TokenEditorComponents>;
