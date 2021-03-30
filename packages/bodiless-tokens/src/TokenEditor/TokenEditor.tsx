import React, { FC } from 'react';
import type { ComponentType } from 'react';
import {
  Div, H2, designable, H3, asToken,
  withDesign, addProps, HOC, flowIf, replaceWith, Token,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import {
  useNode, WithNodeKeyProps, withNodeKey, withNodeDataHandlers, withNode,
} from '@bodiless/core';
import flow from 'lodash/flow';
import TokenPrinter from '../TokenPrinter';
import { withTokenNamesFromData } from '../withTokenSelector';
import type { TokenEditorComponents, TokenEditorProps } from './types';

const DEMO_NODE_KEY = 'demo';

const tokenEditorComponents: TokenEditorComponents = {
  Wrapper: Div,
  Title: H2,
  Container: FlowContainer,
  DetailsWrapper: Div,
  DetailsTitle: H3,
  DetailsBody: Div,
  Printer: TokenPrinter,
};

const TokenEditorBase: FC<TokenEditorProps> = ({ components: C }) => (
  <C.Wrapper>
    <C.Title />
    <C.Container />
    <C.DetailsWrapper>
      <C.DetailsTitle />
      <C.DetailsBody>
        <C.Printer />
      </C.DetailsBody>
    </C.DetailsWrapper>
  </C.Wrapper>
);

const TokenEditorClean = designable<TokenEditorComponents>(
  tokenEditorComponents, 'TokenBrowser',
)(TokenEditorBase);

/**
 * @private
 *
 * Creates an HOC which wraps the target component with the node belonging to
 * the first item in the flow container whose data is located at the specified
 * node key.
 *
 * @param nodeKey
 * The nodeKey identifying where the flow container data is stored.
 */
const withFlowContainerFirstItemNode = (nodeKey: string) => <P extends object>(
  Component: ComponentType<P & WithNodeKeyProps>) => {
  const ComponentWithNode = withNode(Component);
  const WithFlowContainerFirstItemNode = (props: P) => {
    const { node } = useNode<any>();
    const { items } = node.data;
    const item = items && items[0];
    return item?.uuid
      ? <ComponentWithNode {...props} nodeKey={items[0].uuid} />
      : <Component {...props} />;
  };
  return flow(
    withNode,
    withNodeKey(nodeKey),
  )(WithFlowContainerFirstItemNode);
};

/**
 * @private
 *
 * Connects a token editor to token data.
 */
const withTokenEditorData = (nodeKey?: WithNodeKeyProps) => asToken(
  withDesign({
    Container: asToken(
      addProps({ maxComponents: 1, minComponents: 1 }) as HOC,
      withNodeKey(DEMO_NODE_KEY) as HOC,
    ),
    Printer: asToken(
      flowIf(({ tokens = [] }) => tokens.length === 0)(
        replaceWith(() => <>No tokens selected.</>),
      ) as Token,
      withTokenNamesFromData as Token,
      withNodeDataHandlers() as Token,
      withFlowContainerFirstItemNode(DEMO_NODE_KEY) as HOC,
    ),
  }) as HOC,
  withNode as Token,
  withNodeKey(nodeKey) as Token,
);

/**
 * A Token editor is a tool for displaying and selecting among thetokens
 * which are available for a component. Selected tokens are saved as data.
 */
const TokenEditor = withTokenEditorData()(TokenEditorClean);

export default TokenEditor;

export {
  DEMO_NODE_KEY,
};
