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

import type {
  TokenCollection,
} from '@bodiless/fclasses';
import type { Meta } from '@storybook/react';

/**
 * Defines how token examples should be generated.
 */
export type TokenDemoSpec<D extends object = {}> = Meta & {
  tokens: TokenCollection<any, D>,
  /** Tokens which should be applied by default to all stories and not be toggled */
  defaultTokens?: string[],
  /** The exported name that is passed to `tokens` */
  tokensExportName: string,
  /** The exported name that is passed to `component` */
  componentExportName: string,
  /** Slots used, keys are slot names */
  // slots: Partial<
  // Record<
  // keyof C,
  // {
  //   title: string;
  //   description?: string;
  //   /**
  //    * to restrict which patterns can be used in this slot, supply an array
  //    * of patternIds. If empty, NO patterns are allowed, if `null`,
  //    * all patterns are allowed.
  //    */
  //   allowedPatternIds?: string[];
  // }
  // >
  // >;
};
