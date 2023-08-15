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

import {
  addClasses, withDesign, HOC, replaceWith, stylable, flowHoc, A,
} from '@bodiless/fclasses';
import {
  asBodilessList,
  withSubListDesign, withSubLists, asBodilessChameleon, asEditable,
} from '@bodiless/components';
import { withNode } from '@bodiless/data';
import { asLink, asEditableLink } from '../../../components/Elements.token';
import { asToggledSubList } from './ListDemo';
import { withItemMargin } from './SimpleListDemo';

/**
 * Defines the title for all list items.
 */
export const withLinkTitle = withDesign({
  Title: flowHoc(
    replaceWith(A),
    asLink,
    asEditableLink('link'),
    asEditable('text', 'List Item'),
  ),
});

const asBulletedList = withDesign({
  Item: flowHoc(stylable, addClasses('list-disc')),
});

const asNumberedList = withDesign({
  Item: flowHoc(stylable, addClasses('list-decimal')),
});

const subLists = {
  Bulleted: flowHoc(
    asToggledSubList,
    asBulletedList,
  ),
  Numbered: flowHoc(
    asToggledSubList,
    asNumberedList,
  ),
};

const withSubListDesigns = (withDesign$: HOC) => withSubListDesign(2)({
  Bulleted: withDesign$,
  Numbered: withDesign$,
});

const List = flowHoc(
  asBodilessList(),
  withLinkTitle,
  withSubLists(2)(subLists),
  withSubListDesigns(flowHoc(
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
