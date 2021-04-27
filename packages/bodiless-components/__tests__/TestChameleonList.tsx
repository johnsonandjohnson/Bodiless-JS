/**
 * Copyright © 2021 Johnson & Johnson
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

import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import {
  withDesign, addProps,
} from '@bodiless/fclasses';
import {
  WithNodeKeyProps, withDefaultContent,
} from '@bodiless/core';
import asBodilessList, {
  asSubList,
} from '../src/List/asBodilessList';

import asChameleonSubList from '../src/List/asChameleonSubList';

const data = {
  'list3$default$cham-sublist': { component: 'Bullet' },
  // 'list3$default$sublist$default$cham-sublist': { component: null },
  'list3$default$sublist$default$cham-sublist': { component: 'Bullet' },
};

const withItemTitle = (title: string) => withDesign({
  Title: flow(
    () => (props: any) => <span {...props}>{title}</span>,
  ),
});

/**
 * Defines the all sublists
 */
const asSubList$ = (title: string, className: string) => flow(
  asSubList(),
  withDesign({
    Item: addProps({ className }),
  }),
  withItemTitle(title),
);
const asBulletedSubList = asSubList$('Bulleted', 'list-disc ml-5');
const asNumberedSubList = asSubList$('Numbered', 'list-decimal ml-5');

const withDemoSubLists = withDesign({
  Item: flow(
    asChameleonSubList(),
    withDesign({
      Bullet: flow(
        asBulletedSubList,
        withDesign({
          Item: flow(
            asChameleonSubList(),
            withDesign({
              Bullet: asNumberedSubList,
            }),
          ),
        }),
      ),
    }),
  ),
});

const asListDemo = (nodeKeys?: WithNodeKeyProps) => flow(
  asBodilessList(nodeKeys),
  withDemoSubLists,
);

const ListDemo = flow(
  asListDemo('list3'),
  withItemTitle('Top'),
  withDefaultContent(data),
)('ul') as ComponentType<any>;

export default ListDemo;
