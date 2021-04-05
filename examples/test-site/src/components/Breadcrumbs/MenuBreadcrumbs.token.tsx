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

import React from 'react';
import { flow } from 'lodash';
import {
  WithNodeKeyProps,
  withSidecarNodes,
  withNode,
  withNodeKey,
  withChild,
  ifToggledOn,
  asReadOnly,
} from '@bodiless/core';
import {
  withBreadcrumbStartingTrail,
  withoutBreadcrumbFinalTrail,
} from '@bodiless/navigation';
import {
  asToken,
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  startWith,
  Span,
  remove,
} from '@bodiless/fclasses';
import { GatsbyLink } from '@bodiless/gatsby-theme-bodiless';

import {
  asBold,
  asEditableLink,
  asLink,
  asEditable,
} from '../Elements.token';

const HomeBreadcrumbIcon = asToken(
  addProps({ children: 'home' }),
  addClasses('material-icons'),
)(Span);

const withFinalTrailEditors = withDesign({
  // We only need an Editable for the Title and no Link for the FinalTrail.
  Title: flow(
    startWith(Span),
    asEditable('text', 'Breadcrumb Final Trail'),
  ),
});

const withStartingTrailIcon = (
  nodeKeys?: WithNodeKeyProps,
) => flow(
  withBreadcrumbStartingTrail,
  withDesign({
    StartingTrail: replaceWith(
      flow(
        withChild(HomeBreadcrumbIcon),
        withSidecarNodes(
          asEditableLink('link'),
        ),
        addProps({ href: '/' }),
        withNode,
        withNodeKey(nodeKeys),
      )(GatsbyLink),
    ),
  }),
);

const withoutLink = withDesign({
  Link: remove,
});

const withNonLinkableItems = withDesign({
  Title: withoutLink,
});

const withReadOnlyStartingTrail = withDesign({
  StartingTrail: asReadOnly,
});

const withBoldedFinalTrail = withDesign({
  Item: ifToggledOn(({ isCurrentPage }: any) => isCurrentPage)(asBold),
  FinalTrail: asBold,
});

const withHiddenCurrentPageItem = flow(
  withDesign({
    Item: ifToggledOn(
      ({ isCurrentPage }: any) => isCurrentPage,
    )(replaceWith(() => <></>)),
  }),
  withoutBreadcrumbFinalTrail,
);

const withSeparator = (separator: string) => addProps({
  children: separator,
});

const withArrowSeparator = withDesign({
  Separator: withSeparator('>'),
});

const withVerticalBarSeparator = withDesign({
  Separator: withSeparator('|'),
});

const withSlashSeparator = withDesign({
  Separator: withSeparator('/'),
});

// Only apply asLink to the Link component and not the _default one. ( LinkToggle )
const withLinkToggleStyles = withDesign({
  Link: withDesign({
    Link: asLink,
  }),
});

const withStartingTrailLinkStyles = withDesign({
  StartingTrail: withLinkToggleStyles,
});

const $withBreadcrumbStyles = asToken(
  withDesign({
    Separator: addClasses('mx-1'),
    Wrapper: addClasses('inline-flex'),
    Title: withLinkToggleStyles,
  }),
  withStartingTrailLinkStyles,
  withArrowSeparator,
);

export {
  $withBreadcrumbStyles,
  withStartingTrailIcon,
  withNonLinkableItems,
  withBoldedFinalTrail,
  withVerticalBarSeparator,
  withSlashSeparator,
  withHiddenCurrentPageItem,
  withStartingTrailLinkStyles,
  withReadOnlyStartingTrail,
  withFinalTrailEditors,
};
