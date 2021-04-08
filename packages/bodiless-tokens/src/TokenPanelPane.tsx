import {
  ContentNode, WithNodeKeyProps, withNodeKey, withNode, withNodeDataHandlers,
  withMenuOptions, withContextActivator, useNode,
} from '@bodiless/core';
import React, {
  ComponentType, HTMLProps, FC, useCallback,
} from 'react';
import {
  DesignableComponentsProps, designable, Div, H4, H5,
  Label as StylableLabel, Input, withoutProps, DesignableProps,
} from '@bodiless/fclasses';
import { flow, flowRight } from 'lodash';
import { observer } from 'mobx-react-lite';
import { v4 } from 'uuid';
import {
  TokenSelectorProps, TokenSelectorData, withKeyFromData, withTokensFromData,
} from './withTokenSelector';
import TokenMap from './TokenMap';

const TOKEN_PANEL_CONTEXT_TYPE = 'token-panel';

export type TokenPanelPaneComponents = {
  Wrapper: ComponentType<any>,
  Body: ComponentType<any>,
  Title: ComponentType<any>,
  Category: ComponentType<any>,
  CategoryWrapper: ComponentType<any>,
  Label: ComponentType<HTMLProps<HTMLLabelElement>>,
  CheckBox: ComponentType<HTMLProps<HTMLInputElement>>,
};

const tokenPanelPaneComponents: TokenPanelPaneComponents = {
  Wrapper: Div,
  Body: Div,
  Title: H4,
  Category: H5,
  CategoryWrapper: Div,
  Label: StylableLabel,
  CheckBox: Input,
};

type TokenPanelPaneBaseProps = TokenSelectorProps & {
  node: ContentNode<TokenSelectorData>,
  title?: string,
} & DesignableComponentsProps<TokenPanelPaneComponents>;

export type TokenPanelPaneProps =
  Omit<TokenPanelPaneBaseProps, 'components'> & DesignableProps<TokenPanelPaneComponents>;

const TokenPanelPaneBase: FC<TokenPanelPaneBaseProps> = props => {
  const {
    node, availableTokens, components, title = 'Tokens',
  } = props;
  const map = new TokenMap<any>();
  map.add(availableTokens);
  const {
    Wrapper, Title, Label, Category, CheckBox, Body, CategoryWrapper,
  } = components;
  const { tokens = [] } = node.data;
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const tokenSet = new Set(node.data.tokens);
    if (e.target.checked) tokenSet.add(e.target.name);
    else tokenSet.delete(e.target.name);
    node.setData({ tokens: Array.from(tokenSet) });
  }, [node]);
  const checkboxes = map.groups.map(cat => (
    <CategoryWrapper key={cat}>
      <Category>{cat}</Category>
      {map.namesFor(cat).map(name => (
        <Label key={name}>
          <CheckBox type="checkbox" name={name} onChange={onChange} checked={tokens.includes(name)} />
          {name}
        </Label>
      ))}
    </CategoryWrapper>
  ));
  return (
    <Wrapper>
      <Title>{title}</Title>
      <Body>
        {checkboxes}
      </Body>
    </Wrapper>
  );
};

/**
 * A pane displaying a UI for selecting among available tokens for a component.
 * This pane is intended to be rendered in the context of a `TokenPanel`
 *
 * @see TokenPanel
 */
const TokenPanelPane = flow(
  observer,
  designable(tokenPanelPaneComponents, 'TokenPanelPane'),
)(TokenPanelPaneBase) as ComponentType<TokenPanelPaneProps>;

const useMenuOptions = (props: TokenSelectorProps & { tokenPaneTitle?: string }) => {
  const { node } = useNode();
  const { availableTokens, tokenPaneTitle: tokenPanelTitle } = props;
  const option = {
    name: `token-panel-activator-${v4()}`,
    label: tokenPanelTitle || 'Tokens',
    isHidden: true,
    isEnabled: false,
    handler: () => ({ node, availableTokens }),
  };
  return [option];
};

/**
 * Creates an HOC which enhances a component by supplying a UI for selecting
 * tokens to apply to that component.
 *
 * The component so enhanced is given an 'availableTokens' prop which is an
 * object listing the set of tokens which can be applied, keyed by the token
 * name.
 *
 * The selected tokens will be saved as bodiless data.
 *
 * @param nodeKey
 * Where to save the set of selected tokens.
 *
 * @param defaultData
 * A default set of tokens to apply.
 *
 * @return
 * HOC which adds the pane.
 */
const withTokenPanelPane = (
  nodeKey?: WithNodeKeyProps,
  defaultData?: TokenSelectorData,
) => flowRight(
  withNodeKey(nodeKey),
  withNode,
  withNodeDataHandlers(defaultData),
  withMenuOptions({ useMenuOptions, type: TOKEN_PANEL_CONTEXT_TYPE, name: 'Token Panel' }),
  withoutProps('setComponentData', 'tokenPanelTitle'),
  withContextActivator('onClick'),
  withKeyFromData,
  withTokensFromData,
);

export default TokenPanelPane;
export { TOKEN_PANEL_CONTEXT_TYPE, withTokenPanelPane };
