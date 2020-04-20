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
import React, { ComponentType as CT } from 'react';
import { flowRight, omit } from 'lodash';
import { useContextActivator, useEditContext, EventConfig } from './hooks';
import { useNodeDataHandlers } from './NodeProvider';
import withNode from './withNode';
import LocalContextMenu from './components/LocalContextMenu';
import PageContextProvider from './PageContextProvider';
import { PageEditContextInterface } from './PageEditContext/types';
import { TMenuOptionGetter } from './Types/PageContextProviderTypes';

// Helper hoc function to strip props.
export const withoutProps = <Q extends object>(keys: string[]) => (
  <P extends object>(Component: CT<P> | string) => (
    (props: P & Q) => <Component {...omit(props, keys) as P} />
  )
);

export const withContextActivator = (
  event: string,
  eventConfig?: EventConfig,
) => (Component: CT<any>) => observer((props: any) => {
  const activator = useContextActivator(event, props[event], eventConfig);
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
) => observer((props: any) => (
  <Component {...props} {...useNodeDataHandlers(undefined, defaultData)} />
));

export const withNodeAndHandlers = (defaultData?: any) => flowRight(
  // @ts-ignore
  withNode,
  withNodeDataHandlers(defaultData),
);

export type UseGetMenuOptions<P> = (
  props: P,
  context: PageEditContextInterface,
) => TMenuOptionGetter | undefined;

type Options<P> = {
  useGetMenuOptions?: UseGetMenuOptions<P>;
  name?: string;
  id?: string;
};

export const withPageContext = <P extends object>({
  useGetMenuOptions,
  name,
  id,
}: Options<P>) => (Component: CT<P> | string) => (props: P) => {
    const getMenuOptions = useGetMenuOptions
      ? useGetMenuOptions(props, useEditContext())
      : undefined;
    return (
      <PageContextProvider getMenuOptions={getMenuOptions} name={name} id={id}>
        <Component {...props} />
      </PageContextProvider>
    );
  };
