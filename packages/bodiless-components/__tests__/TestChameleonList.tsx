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
