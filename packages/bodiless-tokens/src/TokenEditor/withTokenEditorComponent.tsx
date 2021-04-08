import { createHash } from 'crypto';
import {
  addClasses, withDesign, HOC,
  addProps, asToken, startWith, Token, Design,
} from '@bodiless/fclasses';
import {
  withDefaultContent, useNode, withContextActivator, withActivatorWrapper,
} from '@bodiless/core';
import flow from 'lodash/flow';
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
 * Creates an HOC which adds a component to a token editor.
 *
 * @param def
 * The definition of the component to be added.
 *
 * @param panelDesign
 * Optional design to apply to the token panel for this component.
 */
const withTokenEditorComponent = (
  def: TokenEditorComponentDef,
  panelDesign: Design<TokenPanelComponents> = {},
) => {
  const { Component, tokens, name = 'Demo' } = def;
  const design = {
    [name]: asToken(
      startWith(Component) as HOC,
      withActivatorWrapper('onClick', 'div') as HOC,
      withContextActivator('onClick') as HOC,
      withTokensFromProps as HOC,
      withTokenPanelPane(),
      addProps({ availableTokens: tokens }) as HOC,
      withTokenPanelButton({ panelDesign }) as HOC,
    ),
  };
  return flow(
    withDesign({
      Container: withDesign(design),
    }) as HOC,
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
      startWith(TokenEditor) as HOC,
      withTokenEditorComponent(def, panelDesign),
      ifComponentSelector(
        withDesign({
          // Counteract the white text of the context menu form.
          // @todo move this to bodiless layouts ui
          Wrapper: addClasses('text-black'),
        }),
      ) as Token,
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
