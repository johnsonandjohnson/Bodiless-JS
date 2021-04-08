import { WithNodeKeyProps } from '@bodiless/core';
import { addProps, Token } from '@bodiless/fclasses';
import { flow } from 'lodash';
import React, { ComponentType } from 'react';
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
  asBold: withCategory('Style')(asBold as Token),
  asItalic: withCategory('Style')(asItalic as Token),
  asUnderline: withCategory('Style')(asUnderline as Token),
  asLink: withCategory('Style')(asLink as Token),
  asStrikeThrough: withCategory('Style')(asStrikeThrough as Token),
  asHeader1: withCategory('Headers')(asHeader1 as Token),
  asHeader2: withCategory('Headers')(asHeader2 as Token),
  asHeader3: withCategory('Headers')(asHeader3 as Token),
  asCta: withCategory('Style')(asCta as Token),
  asPrimaryColorBackground: withCategory('Color')(asPrimaryColorBackground as Token),
  asSuperScript: withCategory('Style')(asSuperScript as Token),
  asTextColorPrimary: withCategory('Color')(asTextColorPrimary as Token),
  // asTextWhite: asToken('Clor')(addClasses('text-white') as Token),
};

const withDataTokens = (target: string) => <P extends object>(
  Component: ComponentType<P & TokenSelectorProps>,
) => {
  const WithDataTokens = (props: P & TokenSelectorProps) => {
    const dataTokens = useTokenLibrary(target);
    const { availableTokens: propTokens, ...rest } = props;
    return (
      <Component
        {...rest as P}
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
// ) => flow(
//   withTokensFromProps,
//   withTokenSelector(nodeKey, defaultData, useOverrides),
//   withDataTokens('typography'),
//   addProps({ availableTokens }),
// );

// eslint-disable-next-line import/prefer-default-export
export const withTypographyTokenPanel = (
  nodeKey: WithNodeKeyProps,
  defaultData?: any,
) => flow(
  withTokensFromProps,
  withTokenPanelPane(nodeKey, defaultData),
  withDataTokens('typography'),
  addProps({ availableTokens }),
);

// export default withTypographySelector;
