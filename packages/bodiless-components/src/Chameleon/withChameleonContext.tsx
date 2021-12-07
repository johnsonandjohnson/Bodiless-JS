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
  createContext, useContext, FC
} from 'react';
import { WithNodeKeyProps, withSidecarNodes, withBodilessData } from '@bodiless/core';
import {
  applyDesign, ComponentOrTag, Designable, DesignableProps, extendDesignable, Fragment,
  flowIf
} from '@bodiless/fclasses';
import type { Token, Design } from '@bodiless/fclasses';
import omit from 'lodash/omit';
import type {
  ChameleonState, ChameleonData, ChameleonButtonProps, ChameleonComponents,
} from './types';

const ChameleonContext = createContext<ChameleonState|undefined>(undefined);

export const DEFAULT_KEY = '_default';

const getSelectableDesigns = (props: ChameleonButtonProps): Design => {
  const { design = {}, components = {}} = props;
  // @ts-ignore @TODO need to add metadata to component type
  if (components[DEFAULT_KEY]?.title) return design;
  return omit(design, DEFAULT_KEY);
};

const getActiveComponent = (props: ChameleonButtonProps) => {
  const { componentData: { component } } = props;
  return component || DEFAULT_KEY;
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

/**
 * @returns true if number of designs <= 2.
 * Then we will need to apply the default design in order to check if
 * it has a title in its metadata, and based on that decide
 * whether to show 'toggle' or 'swap' form.
 */
const useIsChameleonToggleable = (props: DesignableProps) => {
  const { design = {} } = props;
  if (Object.keys(design).length <= 2) {
    return true;
  }
  return false;
};

const withChameleonContext = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  RootComponent: ComponentOrTag<any> = Fragment,
): Token => Component => {
  const WithChameleonContext: FC<any> = props => {
    return (
      <ChameleonContext.Provider value={{
        isOn: getIsOn(props),
        activeComponent: getActiveComponent(props),
        components: props.components,
        design: props.design,
        selectableDesigns: getSelectableDesigns(props),
        setActiveComponent: (component: string|null) => props.setComponentData({ component }),
      }}
      >
        <Component
          {...omit(props, 'componentData', 'components', 'setComponentData') as any}
        />
      </ChameleonContext.Provider>
    );
  };

  return withSidecarNodes(
    flowIf(useIsChameleonToggleable)(
      applyChameleonDesign(RootComponent),
    ),
    withBodilessData(nodeKeys, defaultData),
  )(WithChameleonContext);
};

export default withChameleonContext;
export { useChameleonContext };
