import { flow } from 'lodash';
import {
  withDesign, addClasses, removeClasses,
} from '@bodiless/fclasses';
import {
  asSubList, withDeleteNodeOnUnwrap, asBodilessList,
  withSubListDesign, withSubLists,
} from '@bodiless/components';
import { ComponentType } from 'react';
import { withItemMargin, withSimpleTitle } from './SimpleListDemo';

/**
 * Defines the all sublists
 */
export const asToggledSubList = flow(
  asSubList(),
  withDeleteNodeOnUnwrap('sublist'),
);

const ListDemo = flow(
  asBodilessList(),
  withSimpleTitle,
  withSubLists(2)(asToggledSubList),
  withSubListDesign(3)(flow(
    withSimpleTitle,
    withItemMargin,
  )),
)('ul') as ComponentType<any>;

const withLessItemMargin = withDesign({
  Item: flow(removeClasses('ml-5'), addClasses('ml-2')),
});

const withLessMarginOnInnerList = withDesign({
  Item: withDesign({ // This item is a chameleon component
    SubList: withDesign({ // It's "SubList" state design is the actual sublist.
      Item: withDesign({
        SubList: withLessItemMargin,
      }),
    }),
  }),
});

export default withLessMarginOnInnerList(ListDemo);
