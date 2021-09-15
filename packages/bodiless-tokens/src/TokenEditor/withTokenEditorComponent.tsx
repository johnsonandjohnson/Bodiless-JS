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

import { createHash } from 'crypto';
import {
  addClasses, withDesign, HOC,
  addProps, asToken, startWith, Design,
} from '@bodiless/fclasses';
import {
  withDefaultContent, useNode, withContextActivator, withActivatorWrapper,
} from '@bodiless/core';
import { ifComponentSelector } from '@bodiless/layouts';
import withTokensFromProps from '../withTokensFromProps';
import { withTokenPanelPane } from '../TokenPanelPane';
import withTokenPanelButton from '../withTokenPanelButton';
import type { TokenPanelComponents } from '../TokenPanel';
import TokenEditor, { DEMO_NODE_KEY } from './TokenEditor';
import { TokenEditorComponentDef } from './types';

/**
 * @private
 *
 * Obtains a hash of the current nodeKey. Used to create a unique id for the target
 * component.
 */
const useNodeKeyHash = () => {
  const { node } = useNode();
  return createHash('md5').update(node.path.join('$')).digest('hex');
};

/**
 * Creates an HOC which sets the target component for a token editor.
 * This is the component to which the tokens in the editor will apply.
 *
 * @param def
 * The definition of the component to be added.
 *
 * @param panelDesign
 * Optional design to apply to the token panel for this component.
 *
 * @returns
 * An HOC which adds the specifie component
 */
const withTokenEditorComponent = (
  def: TokenEditorComponentDef,
  panelDesign: Design<TokenPanelComponents> = {},
): HOC => {
  const { Component, tokens, name = 'Demo' } = def;
  const design = {
    [name]: asToken(
      startWith(Component),
      withActivatorWrapper('onClick', 'div'),
      withContextActivator('onClick'),
      withTokensFromProps,
      withTokenPanelPane(),
      addProps({ availableTokens: tokens }),
      withTokenPanelButton({ panelDesign }),
    ),
  };
  return asToken(
    withDesign({
      Container: withDesign(design),
    }),
    withDefaultContent(() => ({
      [DEMO_NODE_KEY]: {
        items: [
          {
            // We need a unique id bc this is used to create the context id for the item
            // and we might have more than one on the page. The id must also be persistent
            // so we don't lose data.  The node meets both these constraints.
            uuid: `${name}-${useNodeKeyHash()}`,
            wrapperProps: {
              className: 'w-full',
            },
            type: name,
          },
        ],
      },
    })),
  );
};

/**
 * Creates an HOC which can be used to add a token editor to a flow container.
 *
 * @param def
 * The definition of the component to be added.
 *
 * @param panelDesign
 * Optional design to apply to the token panel for this component.
 *
 * @return
 * HOC which should be applied to a flow container to add the token editor
 * as an available component.
 *
 * @example
 * ```
 * const withMyTokenEditorVariation = withTokenEditorVariation({
 *   name: 'My Component',
 *   component: MyComponent,
 *   tokens: mapOfTokensAvailableForMyComponent,
 * });
 *
 * const flowContainerWithEditor = withMyTokenEditorVariation(FlowContainer);
 * ```
 */
const withTokenEditorFlowContainerItem = (
  def: TokenEditorComponentDef,
  panelDesign?: Design<TokenPanelComponents>,
) => {
  const { name = 'Demo' } = def;
  return withDesign({
    [name]: asToken(
      startWith(TokenEditor),
      withTokenEditorComponent(def, panelDesign),
      ifComponentSelector(
        withDesign({
          // Counteract the white text of the context menu form.
          // @todo move this to bodiless layouts ui
          Wrapper: addClasses('text-black'),
        }),
      ),
      {
        categories: {
          Type: ['Token Browser'],
        },
        title: `"${name}" Token Browser`,
      },
    ),
  });
};

export { withTokenEditorFlowContainerItem, withTokenEditorComponent };
