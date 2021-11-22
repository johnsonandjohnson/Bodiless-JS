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

import React, {
  createContext, useContext, FC,
} from 'react';
import { WithNodeKeyProps, withSidecarNodes, withBodilessData } from '@bodiless/core';
import {
  applyDesign, extendDesignable, ComponentOrTag, Token, Fragment,
} from '@bodiless/fclasses';
import type { Designable, Design } from '@bodiless/fclasses';
import omit from 'lodash/omit';
import type {
  ChameleonState, ChameleonData, ChameleonButtonProps, ChameleonComponents,
} from './types';

const ChameleonContext = createContext<ChameleonState|undefined>(undefined);

export const DEFAULT_KEY = '_default';

const getSelectableComponents = (props: ChameleonButtonProps) => {
  const { components } = props;
  // @ts-ignore @TODO need to add metadata to component type
  if (components[DEFAULT_KEY].title) return components;
  return omit(components, DEFAULT_KEY);
};

const getActiveComponent = (props: ChameleonButtonProps) => {
  const { componentData: { component } } = props;
  const components = getSelectableComponents(props);
  return (component && components[component]) ? component : DEFAULT_KEY;
};

const getIsOn = (props: ChameleonButtonProps) => getActiveComponent(props) !== DEFAULT_KEY;

/**
 * Gets the current chameleon context value.
 *
 * @see withChameleonContext
 */
const useChameleonContext = (): ChameleonState => {
  const value = useContext(ChameleonContext);
  if (!value) throw new Error('No active chameleon context');
  return value;
};

/**
 * @private
 *
 * HOC makes the wrapped component designable using the wrapped component itself as the start
 * for every key in the design.
 *
 * @param Component
 */
const applyChameleonDesign = (Component: ComponentOrTag<any>): Designable => {
  const apply = (design: Design<ChameleonComponents> = {}) => {
    const start = Object.keys(design).reduce((acc, key) => ({
      ...acc,
      [key]: Component,
    }), { [DEFAULT_KEY]: Component });
    return applyDesign(start)(design);
  };
  return extendDesignable()(apply, 'Chameleon');
};

const withChameleonContext = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  /** */
  RootComponent: ComponentOrTag<any> = Fragment,
): Token => Component => {
  const WithChameleonContext: FC<any> = props => (
    <ChameleonContext.Provider value={{
      isOn: getIsOn(props),
      activeComponent: getActiveComponent(props),
      // eslint-disable-next-line react/destructuring-assignment
      components: props.components,
      selectableComponents: getSelectableComponents(props),
      setActiveComponent: (component: string|null) => props.setComponentData({ component }),
    }}
    >
      <Component
        {...omit(props, 'componentData', 'components', 'setComponentData') as any}
      />
    </ChameleonContext.Provider>
  );

  return withSidecarNodes(
    applyChameleonDesign(RootComponent),
    withBodilessData(nodeKeys, defaultData),
  )(WithChameleonContext);
};

export default withChameleonContext;
export { useChameleonContext, applyChameleonDesign };
