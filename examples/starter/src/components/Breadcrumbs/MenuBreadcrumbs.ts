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

import { flow } from 'lodash';
import { withSidecarNodes, asReadOnly } from '@bodiless/core';
import {
  addClasses,
  withDesign,
  replaceWith,
  A,
  Span,
  Ul,
  stylable,
} from '@bodiless/fclasses';
import { withoutLinkWhenLinkDataEmpty } from '@bodiless/components';
import {
  asSimpleMenuBase,
  asSimpleMenuBreadcrumbs,
  asMegaMenuBreadcrumbs,
  asMegaMenuBase,
} from '@bodiless/organisms';

import { EditorSimple } from '../Editors';
import { asEditableLink, asLink } from '../Elements.token';

import {
  withArrowSeparator,
  withEditableStartingTrail,
  withEditableFinalTrail,
} from './MenuBreadcrumbs.token';

const DEFAULT_STARTING_TRAIL_NODE_KEY = 'startingTrail';
const DEFAULT_FINAL_TRAIL_NODE_KEY = 'finalTrail';

const withMenuBreadcrumbSchema = flow(
  withDesign({
    BreadcrumbLink: flow(
      replaceWith(
        flow(
          withoutLinkWhenLinkDataEmpty,
          withSidecarNodes(
            asEditableLink(),
          ),
        )(A),
      ),
      asReadOnly,
    ),
    BreadcrumbTitle: flow(
      replaceWith(EditorSimple),
      asReadOnly,
    ),
  }),
  withEditableStartingTrail({
    nodeKey: DEFAULT_STARTING_TRAIL_NODE_KEY,
    nodeCollection: 'site',
  }, 'Enter item'),
  withEditableFinalTrail(DEFAULT_FINAL_TRAIL_NODE_KEY, 'Enter item'),
);

const withMenuBreadcrumbsStyles = flow(
  withDesign({
    Separator: flow(
      replaceWith(Span),
      addClasses('mx-1'),
    ),
    BreadcrumbWrapper: flow(
      replaceWith(Ul),
      addClasses('inline-flex'),
    ),
    // if we want to do replaceWith
    // then we need to strip non-li (position, isCurrentPage) props ourself
    // otherwise we will get runtime warning
    // see @bodiless/components BreadcrumbStartComponents
    BreadcrumbItem: stylable,
    BreadcrumbLink: asLink,
  }),
  withArrowSeparator,
);

const Breadcrumbs = flow(
  asSimpleMenuBase(),
  asSimpleMenuBreadcrumbs({
    linkNodeKey: 'title$link',
    titleNodeKey: 'title$text',
  }),
  withMenuBreadcrumbSchema,
  withMenuBreadcrumbsStyles,
)('ul');

const MegaMenuBreadcrumbs = flow(
  asMegaMenuBase(),
  asMegaMenuBreadcrumbs({
    linkNodeKey: 'title$link',
    titleNodeKey: 'title$text',
  }),
  withMenuBreadcrumbSchema,
  withMenuBreadcrumbsStyles,
)('ul');

export default Breadcrumbs;
export {
  DEFAULT_STARTING_TRAIL_NODE_KEY,
  DEFAULT_FINAL_TRAIL_NODE_KEY,
  MegaMenuBreadcrumbs,
};
