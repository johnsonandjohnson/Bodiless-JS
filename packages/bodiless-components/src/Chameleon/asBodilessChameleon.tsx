/**
 * Copyright © 2020 Johnson & Johnson
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

import React, { FC } from 'react';
import pick from 'lodash/pick';
import {
  ifEditable,
  useNode,
  ifReadOnly,
  withBodilessData,
} from '@bodiless/core';
import type {
  WithNodeKeyProps, UseBodilessOverrides,
} from '@bodiless/core';
import {
  Token, asToken, Enhancer, HOC,
} from '@bodiless/fclasses';
import { ComponentSelectorOptions } from '@bodiless/layouts';
import { ChameleonData } from './types';
import withChameleonButton, { withoutChameleonButtonProps } from './withChameleonButton';
import applyChameleon from './applyChameleon';
import withChameleonContext from './withChameleonContext';

/**
 * Ensures that sublist data is purged when sublists are removed.
 *
 * @param nodeKey Location of the child node that will be purged.
 */
const withDeleteNodeOnUnwrap = (
  nodeKey?: WithNodeKeyProps,
): Token => Component => {
  const WithDeleteOnUnwrap: FC<any> = props => {
    const { node } = useNode();
    const { unwrap, ...rest } = props;
    if (!unwrap) return <Component {...props} />;
    const unwrap$ = () => {
      const node$ = nodeKey
        ? node.child(typeof nodeKey === 'string' ? nodeKey : nodeKey.nodeKey!)
        : node;
      node$.delete();
      if (unwrap) unwrap();
    };
    return <Component {...rest} unwrap={unwrap$} />;
  };
  return WithDeleteOnUnwrap;
};

export const withPrunedDesign: HOC = Component => {
  const WithPrunedDesign: FC<any> = props => {
    const { design } = props;
    const newDesign = pick(design, 'Wrapper', 'ComponentWrapper');
    return <Component {...props} design={newDesign} />;
  };
  return WithPrunedDesign;
};

export const withSplitDesign: HOC = Component => {
  const WithSplitDesign: FC<any> = (props: any) => {
    console.log('withSplitDesign_props', props);
    // const { node: { data: { component = '_default' }} } = useNode();
    const { componentData: { component }} = props;
    console.log('withSplitDesign_component', JSON.stringify(component));
    const { design, ...rest } = props;
    const newDesign = pick(design, 'Wrapper', 'ComponentWrapper', component);
    console.log('withSplitDesign_design', design);
    console.log('withSplitDesign_newDesign', newDesign);
    rest.children = <div>{component}</div>;
    return <Component {...rest} design={newDesign} csDesign={design} />;
  };
  return WithSplitDesign;
};

/**
 * Transforms the wrapped component into a "chameleon".  The chameleon accepts a design and
 * applies one of the design elements to itself depending on the chameleon state, which
 * is stored as bodiless data. A menu option is provided on the local context menu which
 * renders a form allowing the user to select one of the design element alternatives.
 *
 * @param nodeKeys Location where the chameleon state data should be stored.
 * @param defaultData Default chameleon state.
 * @param useOverrides Hook returning overrides for the menu button.
 */
const asBodilessChameleon = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  useOverrides?: UseBodilessOverrides,
): Enhancer<ComponentSelectorOptions> => Component => {
  const hoc = asToken(
    applyChameleon,
    ifEditable(
      withChameleonButton(useOverrides),
    ),
    ifReadOnly(
      withoutChameleonButtonProps,
    ),
    withChameleonContext(nodeKeys, defaultData, Component),
    // withPrunedDesign,
    // withBodilessData(nodeKeys, defaultData),
  ) as Enhancer<ComponentSelectorOptions>;
  return hoc(Component);
};

export default asBodilessChameleon;

export { withDeleteNodeOnUnwrap };
