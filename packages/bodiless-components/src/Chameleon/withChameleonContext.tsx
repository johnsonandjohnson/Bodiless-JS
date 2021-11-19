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
  createContext, useContext, FC, ComponentType, useRef, useMemo,
} from 'react';
import { WithNodeKeyProps, withSidecarNodes, withBodilessData } from '@bodiless/core';
import {
  applyDesign, ComponentOrTag, Token, Fragment, DesignableComponents,
} from '@bodiless/fclasses';
import type { Design } from '@bodiless/fclasses';
import { omit, pick, identity } from 'lodash';
import type {
  ChameleonState, ChameleonData, ChameleonButtonProps,
} from './types';

const ChameleonContext = createContext<ChameleonState|undefined>(undefined);

export const DEFAULT_KEY = '_default';

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
 * Creates a components object which appies the specified design for a component
 * only when it is needed.
 *
 * @param design
 * The design used to create all components.
 *
 * @param defaultComponent
 * The default component to apply 
 */
const useComponentsProxy = (
  design: Design,
  defaultComponent: ComponentOrTag<any> = Fragment,
): DesignableComponents => {
  const components = useRef<DesignableComponents>({});
  return new Proxy(design, {
    get: (target, prop: string) => {
      if (!components.current[prop] && target[prop]) {
        const cDesign = pick(target, prop);
        const c: DesignableComponents = applyDesign({}, defaultComponent as ComponentType<any>)(cDesign);
        components.current[prop] = c[prop];
      }
      return components.current[prop];
    },
  }) as any as DesignableComponents;
};

/**
 * @private
 * Wraps a second proxy around the list of components which excludds the default key if
 * it does not have a title.
 *
 * @param components 
 */
const getSelectableComponentsProxy = (components: DesignableComponents) => {
  // The default key is selectable if the associated component has a title.
  // @ts-ignore @TODO need to add metadata to component type
  const defaultSelectable = components[DEFAULT_KEY].title ? components[DEFAULT_KEY] : undefined;
  return new Proxy(components, {
    get: (target, prop: string) => (
      prop === DEFAULT_KEY ? defaultSelectable : target[prop]
    ),
    ownKeys: target => (
      defaultSelectable 
        ? Object.keys(target)
        : Object.keys(target).filter(k => k !== DEFAULT_KEY)
    ),
  });
};

/**
 * @private
 * Provides a memoized value for the Chameleon context.
 *
 * @param props 
 * @param RootComponent 
 */
const useValue = (props: ChameleonButtonProps, RootComponent: ComponentOrTag<any>) => {
  const {
    design = { [DEFAULT_KEY]: identity },
    componentData: { component },
  } = props;
  return useMemo(() => {
    const components = useComponentsProxy(design, RootComponent);
    const selectableComponents = getSelectableComponentsProxy(components);
    const activeComponent = component && Object.keys(components).includes(component)
      ? component : DEFAULT_KEY;
    const isOn = activeComponent !== DEFAULT_KEY;
    return {
      isOn,
      components,
      selectableComponents,
      activeComponent,
      setActiveComponent: (component: string|null) => props.setComponentData({ component }),
    };
  }, [component, design, RootComponent]);
};

const withChameleonContext = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  /** */
  RootComponent: ComponentOrTag<any> = Fragment,
): Token => Component => {
  const WithChameleonContext: FC<any> = props => {
    const value = useValue(props, RootComponent);
    return (
      <ChameleonContext.Provider value={value}>
        <Component
          {...omit(props, 'componentData', 'components', 'setComponentData') as any}
        />
      </ChameleonContext.Provider>
    );
  };

  return withSidecarNodes(
    withBodilessData(nodeKeys, defaultData),
  )(WithChameleonContext);
};

export default withChameleonContext;
export { useChameleonContext };
