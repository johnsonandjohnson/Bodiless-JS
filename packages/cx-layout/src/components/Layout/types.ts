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

import { HTMLProps } from 'react';
import { ComponentOrTag, DesignableComponentsProps } from '@bodiless/fclasses';

export type LayoutComponents = {
  OuterContainer: ComponentOrTag<any>,
  SkipToMainContent: ComponentOrTag<any>,
  Helmet: ComponentOrTag<any>,
  Header: ComponentOrTag<any>,
  HeaderWrapper: ComponentOrTag<any>,
  Footer: ComponentOrTag<any>,
  FooterWrapper: ComponentOrTag<any>,
  Container: ComponentOrTag<any>,
  ContainerWrapper: ComponentOrTag<any>,
  PageTopper: ComponentOrTag<any>,
  PageCloser: ComponentOrTag<any>,
};

export type LayoutProps = DesignableComponentsProps<LayoutComponents> & HTMLProps<HTMLElement>;
