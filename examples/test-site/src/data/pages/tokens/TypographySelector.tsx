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

import { WithNodeKeyProps } from '@bodiless/core';
import { addProps, asToken } from '@bodiless/fclasses';
import type { Token } from '@bodiless/fclasses';
import React, { FC } from 'react';
import {
  withTokenPanelPane, useTokenLibrary, withTokensFromProps,
} from '@bodiless/tokens';
import type { TokenSelectorProps } from '@bodiless/tokens';
import {
  asBold,
  asItalic,
  asUnderline,
  asLink,
  asStrikeThrough,
  asHeader1,
  asHeader2,
  asHeader3,
  asCta,
  asPrimaryColorBackground,
  asSuperScript,
  asTextColorPrimary,
  withCategory,
} from '../../../components/Elements.token';

const availableTokens = {
  asBold: withCategory('Style')(asBold),
  asItalic: withCategory('Style')(asItalic),
  asUnderline: withCategory('Style')(asUnderline),
  asLink: withCategory('Style')(asLink),
  asStrikeThrough: withCategory('Style')(asStrikeThrough),
  asHeader1: withCategory('Headers')(asHeader1),
  asHeader2: withCategory('Headers')(asHeader2),
  asHeader3: withCategory('Headers')(asHeader3),
  asCta: withCategory('Style')(asCta),
  asPrimaryColorBackground: withCategory('Color')(asPrimaryColorBackground),
  asSuperScript: withCategory('Style')(asSuperScript),
  asTextColorPrimary: withCategory('Color')(asTextColorPrimary),
  // asTextWhite: asToken('Clor')(addClasses('text-white')),
};

const withDataTokens = (target: string): Token => Component => {
  const WithDataTokens: FC<any> = props => {
    const dataTokens = useTokenLibrary(target);
    const { availableTokens: propTokens, ...rest } = props as TokenSelectorProps;
    return (
      <Component
        {...rest as any}
        availableTokens={{ ...propTokens, ...dataTokens }}
      />
    );
  };
  return WithDataTokens;
};

// const withTypographySelector = (
//   nodeKey: WithNodeKeyProps,
//   defaultData?: any,
//   useOverrides?: UseBodilessOverrides<any, any>,
// ) => asToken(
//   withTokensFromProps,
//   withTokenSelector(nodeKey, defaultData, useOverrides),
//   withDataTokens('typography'),
//   addProps({ availableTokens }),
// );

// eslint-disable-next-line import/prefer-default-export
export const withTypographyTokenPanel = (
  nodeKey: WithNodeKeyProps,
  defaultData?: any,
) => asToken(
  withTokensFromProps,
  withTokenPanelPane(nodeKey, defaultData),
  withDataTokens('typography'),
  addProps({ availableTokens }),
);

// export default withTypographySelector;
