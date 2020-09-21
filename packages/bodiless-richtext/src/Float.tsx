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

import React, { ComponentType, useMemo } from 'react';
import { flowRight } from 'lodash';
import {
  withContextActivator,
  withLocalContextMenu,
  ifEditable,
  useNode,
  withMenuOptions,
} from '@bodiless/core';
import { observer } from 'mobx-react-lite';

type Data = {
  float: string,
};

const withFloatWrapper = <P extends object> (Component:ComponentType<P>) => observer((props:P) => {
  const { node } = useNode<Data>();
  // @ts-ignore
  const className = {
    left: 'float-left relative z-10',
    right: 'float-right relative z-10',
    justify: 'flex justify-center',
  }[node.data.float || 'justify'];
  return <div className={className}><Component {...props as P} /></div>;
});

const useMenuOptions = () => {
  const { node } = useNode<Data>();
  const menuOptions = useMemo(() => ([
    {
      icon: 'format_align_left',
      name: 'Float Left',
      handler: () => node.setData({ float: 'left' }),
      local: true,
      global: true,
    },
    {
      icon: 'format_align_justify',
      name: 'Center',
      handler: () => node.setData({ float: 'justify' }),
      local: true,
      global: true,
    },
    {
      icon: 'format_align_right',
      name: 'Float Right',
      handler: () => node.setData({ float: 'right' }),
      local: true,
      global: true,
    },
  ]), []);
  return menuOptions;
};
const asFloat = flowRight(
  withFloatWrapper,
  ifEditable(
    withMenuOptions({ useMenuOptions, name: 'float' }),
    withLocalContextMenu,
    withContextActivator('onClick'),
  ),
);
export default asFloat;
