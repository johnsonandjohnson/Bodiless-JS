import { flow } from 'lodash';
import {
  addClasses, withDesign, HOC, replaceWith, A, stylable,
} from '@bodiless/fclasses';
import {
  asBodilessList,
  withSubListDesign, withSubLists, asBodilessChameleon, asEditable,
} from '@bodiless/components';
import { withNode } from '@bodiless/core';
import { asLink, asEditableLink } from '../../../components/Elements.token';
import { asToggledSubList } from './ListDemo';
import { withItemMargin } from './SimpleListDemo';

/**
 * Defines the title for all list items.
 */
export const withLinkTitle = withDesign({
  Title: flow(
    replaceWith(A),
    asLink,
    asEditableLink('link'),
    asEditable('text', 'List Item'),
  ),
});

const asBulletedList = withDesign({
  Item: flow(stylable, addClasses('list-disc')),
});

const asNumberedList = withDesign({
  Item: flow(stylable, addClasses('list-decimal')),
});

const subLists = {
  Bulleted: flow(
    asToggledSubList,
    asBulletedList,
  ),
  Numbered: flow(
    asToggledSubList,
    asNumberedList,
  ),
};

const withSubListDesigns = (withDesign$: HOC) => withSubListDesign(2)({
  Bulleted: withDesign$,
  Numbered: withDesign$,
});

const List = flow(
  asBodilessList(),
  withLinkTitle,
  withSubLists(2)(subLists),
  withSubListDesigns(flow(
    withItemMargin,
    withLinkTitle,
  )),
  asBodilessChameleon('cham-list', { component: 'Bulleted' },
    () => ({ groupLabel: 'List', label: 'Format' })),
  withDesign({
    Bulleted: asBulletedList,
    Numbered: asNumberedList,
  }),
  withNode,
)('ul');

export default List;
