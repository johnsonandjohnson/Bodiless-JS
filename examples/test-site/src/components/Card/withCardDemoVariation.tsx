import { withTokenEditorFlowContainerItem } from '@bodiless/tokens';
import type { TokenEditorComponentDef } from '@bodiless/tokens';
import flow from 'lodash/flow';

import { withDesign, addProps, Token } from '@bodiless/fclasses';
import { CardComponents, CardClean } from '@bodiless/card';
import { asEditableCard } from '.';
import * as styleTokens from './token';

import { tokenPanelStyles, withTokenEditorStyles } from '../TokenEditor';

const tokens: TokenEditorComponentDef['tokens'] = {
  ...styleTokens,
  asEditableCard,
};

const withDemoContent = withDesign<CardComponents>({
  Image: addProps({ src: 'https://via.placeholder.com/150' }),
  Title: addProps({ children: 'Title' }),
  Body: addProps({ children: 'Body' }),
  Link: addProps({ children: 'CTA' }),
});

const Component = withDemoContent(CardClean);

const def = {
  Component,
  tokens: tokens as { [key: string]: Token<any> },
  name: 'Card',
};

// @ts-ignore
export default flow(
  withTokenEditorFlowContainerItem(def, tokenPanelStyles),
  withDesign({
    Card: withTokenEditorStyles,
  }),
);
