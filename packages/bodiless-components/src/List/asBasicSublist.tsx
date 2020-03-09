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

import React, { ComponentType as CT, PropsWithChildren } from 'react';
import { FinalProps as ListProps } from './types';

const asBasicSublist = (Sublist: CT<ListProps>) => (
  (Item: CT<PropsWithChildren<{}>> | string) => {
    const ItemWithSublist: CT<ListProps> = ({ children, ...rest }) => (
      <Item>
        {children}
        <Sublist {...rest} />
      </Item>
    );
    const ItemWithoutSublist: CT<ListProps> = ({ wrap, nodeKey, ...rest }) => (
      <Item {...rest} />
    );
    return {
      ItemWithSublist,
      ItemWithoutSublist,
    };
  }
);

export default asBasicSublist;
