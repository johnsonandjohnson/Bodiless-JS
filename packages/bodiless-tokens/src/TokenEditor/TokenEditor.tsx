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

import React, { FC, ComponentType } from 'react';
import {
  Div, H2, designable, H3, asToken,
  withDesign, addProps, flowIf, replaceWith, Token,
} from '@bodiless/fclasses';
import { FlowContainer } from '@bodiless/layouts-ui';
import {
  useNode, WithNodeKeyProps, withNodeKey, withNodeDataHandlers, withNode, WithNodeProps,
} from '@bodiless/core';
import { flow } from 'lodash';
import TokenPrinter, { TokenPrinterProps } from '../TokenPrinter';
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
const withFlowContainerFirstItemNode = (
  nodeKey: string,
):Token<{}, Partial<WithNodeProps>> => Component => {
  const ComponentWithNode = withNode(Component);
  const WithFlowContainerFirstItemNode = (props: any) => {
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
  )(WithFlowContainerFirstItemNode) as ComponentType<any>;
};

/**
 * @private
 *
 * Connects a token editor to token data.
 */
const withTokenEditorData = (nodeKey?: WithNodeKeyProps) => asToken(
  withDesign({
    Container: asToken(
      addProps({ maxComponents: 1, minComponents: 1 }),
      withNodeKey(DEMO_NODE_KEY),
    ),
    Printer: asToken(
      flowIf<TokenPrinterProps>(({ tokens = [] }) => tokens.length === 0)(
        replaceWith(() => <>No tokens selected.</>),
      ),
      withTokenNamesFromData,
      withNodeDataHandlers(),
      withFlowContainerFirstItemNode(DEMO_NODE_KEY),
    ),
  }),
  withNode,
  withNodeKey(nodeKey),
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
