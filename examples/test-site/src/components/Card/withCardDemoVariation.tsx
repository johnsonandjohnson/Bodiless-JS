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

import { withTokenEditorFlowContainerItem } from '@bodiless/tokens';
import type { TokenEditorComponentDef } from '@bodiless/tokens';

import {
  withDesign, addProps, Token, asToken,
} from '@bodiless/fclasses';
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
  tokens: tokens as { [key: string]: Token },
  name: 'Card',
};

// @ts-ignore
export default asToken(
  withTokenEditorFlowContainerItem(def, tokenPanelStyles),
  withDesign({
    Card: withTokenEditorStyles,
  }),
);
