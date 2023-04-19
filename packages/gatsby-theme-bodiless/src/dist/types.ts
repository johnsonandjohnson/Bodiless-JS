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

import { ComponentType } from 'react';
import {
  ContextWrapperProps,
} from '@bodiless/core';
import type { GitContextProviderProps } from '@bodiless/git';
import {
  PageDataContextProviderProps,
} from '@bodiless/page';
import GatsbyNodeProvider from './GatsbyNodeProvider.bl-edit';

export type FinalUI = {
  ContextWrapper: ComponentType<ContextWrapperProps>;
  PageEditor: ComponentType;
};

export type UI = Partial<FinalUI>;

type PageProviderProps = PageDataContextProviderProps & GitContextProviderProps;

export type PageProps = {
  ui?: UI,
} & React.ComponentProps<typeof GatsbyNodeProvider> & PageProviderProps;
