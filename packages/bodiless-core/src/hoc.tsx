/**
 * Copyright © 2019 Johnson & Johnson
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

import { observer } from 'mobx-react-lite';
import React, { ComponentType as CT, FC } from 'react';
import { flowRight, omit, pick } from 'lodash';
import { useContextActivator } from './hooks';
import { useNodeDataHandlers } from './NodeProvider';
import withNode from './withNode';
import LocalContextMenu from './components/LocalContextMenu';

/**
 * Removes the specified props from the wrapped component.
 * @param ...keys The names of the props to remove.
 */
export const withoutProps = <Q extends object>(keys: string|string[], ...restKeys: string[]) => (
  <P extends object>(Component: CT<P> | string) => {
    const keys$ = typeof keys === 'string' ? [keys, ...restKeys] : keys;
    const WithoutProps = (props: P & Q) => <Component {...omit(props, keys$) as P} />;
    return WithoutProps;
  }
);

/**
 * Creates an HOC which strips all but the specified props.
 *
 * @param keys A list of the prop-names to keep.
 *
 * @return An HOC which will strip all but the specified props.
 */
export const withOnlyProps = <Q extends object>(...keys: string[]) => (
  <P extends object>(Component: CT<P> | string) => {
    const WithOnlyProps: FC<P & Q> = props => <Component {...pick(props, keys) as P} />;
    return WithOnlyProps;
  }
);

export const withContextActivator = (
  event: string,
) => (Component: CT<any>) => observer((props: any) => {
  const activator = useContextActivator(event, props[event]);
  return <Component {...props} {...activator} />;
});

export const withLocalContextMenu = (Component: CT<any> | string) => {
  const name = typeof Component === 'string'
    ? Component
    : Component.displayName || Component.name || 'Component';
  const WithLocalContextMenu = (props: any) => (
    <LocalContextMenu>
      <Component {...props} />
    </LocalContextMenu>
  );
  WithLocalContextMenu.displayName = `${name}WithLocalContextMenu`;
  return WithLocalContextMenu;
};

// @TODO: Combine withNode and withNodeDataHandlers and fix types
export const withNodeDataHandlers = (defaultData?: any) => (
  Component: CT<any>,
) => observer((props: any) => {
  const enhancedDefaultData = {
    ...defaultData,
    ...(defaultData ? pick(props, Object.keys(defaultData)) : {}),
  };
  return (<Component {...props} {...useNodeDataHandlers(undefined, enhancedDefaultData)} />);
});

export const withNodeAndHandlers = (defaultData?: any) => flowRight(
  // @ts-ignore
  withNode,
  withNodeDataHandlers(defaultData),
);
