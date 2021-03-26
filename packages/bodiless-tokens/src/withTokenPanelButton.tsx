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
