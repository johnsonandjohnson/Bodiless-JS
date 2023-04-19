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
/* eslint-disable no-underscore-dangle */

import React, {
  createContext, useContext, FC, useRef,
} from 'react';
import { WithNodeKeyProps, withSidecarNodes, withBodilessData } from '@bodiless/data';
import {
  ComponentOrTag, Fragment, DesignableComponents, Design, HOC, flowHoc, replaceWith, as,
  replaceable,
} from '@bodiless/fclasses';
import { SelectorComponents, SelectorComponentsProps } from '@bodiless/layouts';

import omit from 'lodash/omit';
import identity from 'lodash/identity';
import type {
  ChameleonState, ChameleonData, ChameleonProps,
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

type ChameleonContextValueProps =
  SelectorComponentsProps & Omit<ChameleonState, 'isToggle'|'selectableComponents'|'components'>;

class ChameleonContextValue extends SelectorComponents implements ChameleonState {
  isOn: boolean = false;

  apply: HOC = identity;

  activeComponent: string = '_default';

  setActiveComponent: (key: string | null) => void = () => undefined;

  static createProps(
    props: ChameleonProps,
    DefaultComponent: ComponentOrTag<any>
  ): ChameleonContextValueProps {
    const {
      design = {}, startComponents, componentData: { component }, setComponentData
    } = props;
    const defaultDesign: Design<DesignableComponents> = {
      [DEFAULT_KEY]: identity,
    };
    const activeComponent = component || DEFAULT_KEY;
    const apply = design[activeComponent]
      ? as(replaceable, design[activeComponent])
      : identity;
    return {
      DefaultComponent,
      selectedComponents: component ? [component, DEFAULT_KEY] : [DEFAULT_KEY],
      startComponents,
      design: {
        ...defaultDesign,
        ...design,
      },
      activeComponent,
      isOn: activeComponent !== DEFAULT_KEY,
      setActiveComponent: (component: string|null) => setComponentData({ component }),
      apply: startComponents?.[activeComponent]
        ? flowHoc(replaceWith(startComponents[activeComponent]), apply) : apply,
    };
  }

  constructor(props: ChameleonContextValueProps) {
    super(props);
    this.activeComponent = props.activeComponent;
    this.isOn = props.isOn;
    this.setActiveComponent = props.setActiveComponent;
    this.apply = props.apply;
  }

  spawn(props: ChameleonContextValueProps) {
    const offspring = new ChameleonContextValue(props);
    offspring._components = this._components;
    return offspring;
  }

  getSelectableComponents() {
    const components = super.getSelectableComponents();
    // @ts-ignore Add metadata to DesignableCompoennts type
    return components[DEFAULT_KEY]?.title ? components : omit(components, DEFAULT_KEY);
  }

  get isToggle() {
    const { design, startComponents } = this.props;
    const keys = startComponents ? Object.keys(startComponents) : Object.keys(design);
    if (keys.length > 2) return false;
    if (!keys.includes(DEFAULT_KEY)) return false;
    if (!design[DEFAULT_KEY]) return true;
    const def = as(design[DEFAULT_KEY]!)(Fragment);
    return def.title === undefined;
  }
}

const useChameleonContextValue = (props: ChameleonProps, DefaultComponent: ComponentOrTag<any>) => {
  const cvProps = ChameleonContextValue.createProps(props, DefaultComponent);
  const ref = useRef<ChameleonContextValue>();
  ref.current = ref.current ? ref.current.spawn(cvProps) : new ChameleonContextValue(cvProps);
  return ref.current;
};

const withChameleonContext = (
  nodeKeys: WithNodeKeyProps,
  defaultData?: ChameleonData,
  /** */
  RootComponent: ComponentOrTag<any> = Fragment,
): HOC => Component => {
  const WithChameleonContext: FC<any> = props => (
    <ChameleonContext.Provider value={useChameleonContextValue(props, RootComponent)}>
      <Component
        {...omit(
          props,
          'componentData', 'components', 'setComponentData', 'startComponents',
        ) as any}
      />
    </ChameleonContext.Provider>
  );

  return withSidecarNodes(
    withBodilessData(nodeKeys, defaultData),
  )(WithChameleonContext);
};

export default withChameleonContext;
export { useChameleonContext };
