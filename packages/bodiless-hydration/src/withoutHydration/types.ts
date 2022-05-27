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

import { HOC } from '@bodiless/fclasses';
import type { CSSProperties } from 'react';

export type WithoutHydrationOptions = {
  onUpdate?: (props: Record<string, any>, element: HTMLElement | null) => void
  WrapperStyle?: CSSProperties
  WrapperElement: 'div'|'span',
};

// eslint-disable-next-line max-len
export type WithoutHydrationFunction = (options: WithoutHydrationOptions) => HOC;

// eslint-disable-next-line max-len
export type WithoutHydrationWrapperFunction = (options?: Partial<WithoutHydrationOptions>) => HOC;
