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

import React, { Fragment, ComponentType, useMemo } from 'react';
import {
  TMenuOption, withMenuOptions, withOnlyProps, observer
} from '@bodiless/core';
import { useNode } from '@bodiless/data';
import { ComponentOrTag, HOC } from '@bodiless/fclasses';

type Data = {
  on: boolean,
};

const useAccessors = () => {
  const { node } = useNode<Data>();
  return {
    isOn: () => node.data.on || false,
    setOn: (on: boolean) => {
      node.setData({ ...node.data, on });
    },
  };
};

const withToggleTo = (OffComp: ComponentOrTag<any>): HOC => OnComp => observer(
  (props: any) => {
    const { isOn, setOn } = useAccessors();
    const unwrap = () => setOn(false);
    const wrap = () => setOn(true);
    return isOn()
      ? <OnComp {...props} unwrap={unwrap} nodeKey="component" />
      : <OffComp {...props} wrap={wrap} nodeKey="component" />;
  },
);

const withToggle = withToggleTo(withOnlyProps('key', 'children')(Fragment));

type ToggleMenuOptions = {
  icon? : string;
  label?: string,
};

const withToggleButton = (options? : ToggleMenuOptions) => {
  const useMenuOptions = (): TMenuOption[] => {
    const icon = options ? options.icon : false;
    const label = options ? options.label : undefined;
    const { setOn, isOn } = useAccessors();

    // We can return an invariant set of menu options bc state only depends
    // on the mobx data store.
    const menuOptions = useMemo((): TMenuOption[] => [
      {
        icon: icon || 'toggle_off',
        name: 'Toggle',
        label,
        isHidden: () => isOn(),
        handler: () => setOn(true),
        global: false,
        local: true,
        group: 'toggle-group',
      },
      {
        name: 'toggle-group',
        label,
        isHidden: () => isOn(),
        global: false,
        local: true,
        Component: 'group',
      },
    ], []);
    return menuOptions;
  };

  return withMenuOptions({ useMenuOptions, name: 'toggle' });
};

export const withToggleOnSubmit = <P extends object>(Component: ComponentType<P>) => (
  (props: P) => {
    const { setOn } = useAccessors();
    return <Component nodekey="component" onSubmit={() => setOn(true)} {...props} />;
  }
);

type OnSubmitProps = {
  onSubmit?: (values: any) => void;
};

type Props<P> = {
  wrap: (values: any) => void;
} & Omit<P, keyof OnSubmitProps>;

const withWrapOnSubmit = <P extends object>(Component: ComponentType<P & OnSubmitProps>) => (
  ({ wrap, ...rest }: Props<P>) => <Component {...rest as P} onSubmit={wrap} />
);

export {
  withToggleTo,
  withToggle,
  withToggleButton,
  withWrapOnSubmit,
};
