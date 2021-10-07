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

import React from 'react';
import {
  ContextMenuFormProps, ContextMenuForm, withMenuOptions, TMenuOptionGetter,
} from '@bodiless/core';
import { Design, withDesign } from '@bodiless/fclasses';
import TokenPanelClean, { TokenPanelComponents } from './TokenPanel';

export type TokenPanelButtonDefinition = {
  panelDesign?: Design<TokenPanelComponents>,
  root?: boolean,
};

/**
 * Creates an HOC which adds a toolbar or context menu button to a component. This will
 * bring up a token panel which will allow editing tokens for any component in the active
 * context trail which has beenwrapped by `withTokenPanelPane`.
 *
 * @param def
 * Options definition for the button and the token panel it creates.
 */
const withTokenBanelButton = (def: TokenPanelButtonDefinition) => {
  const { panelDesign, root = false } = def;
  const TokenPanel = panelDesign ? withDesign(panelDesign)(TokenPanelClean) : TokenPanelClean;

  const form = (props: ContextMenuFormProps) => (
    <ContextMenuForm {...props} hasSubmit={false}>
      <TokenPanel />
    </ContextMenuForm>
  );

  const useMenuOptions: TMenuOptionGetter = () => [{
    icon: 'palette',
    name: 'token-panel',
    label: root ? 'Tokens' : 'Select',
    handler: () => form,
    activateContext: false,
  }];
  return withMenuOptions({ useMenuOptions, name: 'Tokens', root });
};

export default withTokenBanelButton;
