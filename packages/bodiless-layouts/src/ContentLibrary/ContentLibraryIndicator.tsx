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

import React, { ComponentType, FC } from 'react';
import { withPrependChild } from '@bodiless/core';
import {
  A,
  Div,
  Span,
  asToken,
  addProps,
  addClasses,
  withDesign,
  designable,
  DesignableComponentsProps,
} from '@bodiless/fclasses';

/**
 * Type for the Designable LibraryItemIndicator Components.
 */
export type LibraryItemIndicatorComponentsType = {
  Wrapper: ComponentType<any>,
  Icon: ComponentType<any>,
  Label: ComponentType<any>,
  InfoIcon: ComponentType<any>,
};

type LibraryIndicatorProps = DesignableComponentsProps<LibraryItemIndicatorComponentsType>;

const LibraryItemIndicatorComponents: LibraryItemIndicatorComponentsType = {
  Wrapper: Div,
  Icon: Span,
  Label: Span,
  InfoIcon: A,
};

const LibraryIndicatorBase: FC<LibraryIndicatorProps> = ({ components: C, ...rest }) => (
  <C.Wrapper {...rest}>
    <C.Icon />
    <C.Label />
    <C.InfoIcon />
  </C.Wrapper>
);

/**
 * Clean Library Item Indicator component.
 * It has Library `Icon`, `Label` and `InfoIcon` designable components.
 */
export const LibraryItemIndicatorClean = designable(LibraryItemIndicatorComponents, 'LibraryItemIndicator')(LibraryIndicatorBase);

const asDefaultLibraryItemIndicator = withDesign({
  Wrapper: addClasses('hidden group-hover:flex bl-text-white bl-bg-gray-900 absolute bl-px-2 bl-py-1 md:-mt-5 md:-ml-5 bl-z-10'),
  Icon: asToken(
    addClasses('material-icons bl-mr-2'),
    addProps({ children: 'account_balance' }),
  ),
  Label: addProps({ children: 'Library Item' }),
  InfoIcon: asToken(
    addClasses('material-icons bl-ml-3'),
    addProps({ children: 'info', href: '/___docs/#/ContentEditorUserGuide/?id=content-library', target: '_blank' }),
  ),
});

/**
 * HOC that may be applied to a `ComponentWrapper` component of a Flow Container.
 * It Prepends a designable `LibraryItemIndicator` child component that appears on the `ComponentWrapper` hover.
 */
export const withLibraryItemIndicator = asToken(
  addClasses('group'),
  withPrependChild(LibraryItemIndicatorClean, 'LibraryItemIndicator'),
  withDesign({
    LibraryItemIndicator: asDefaultLibraryItemIndicator,
  }),
);
