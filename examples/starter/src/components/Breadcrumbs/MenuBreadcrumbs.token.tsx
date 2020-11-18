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
} from '@bodiless/core';
import {
  withBreadcrumbStartingTrail,
  withBreadcrumbFinalTrail,
  withoutBreadcrumbFinalTrail,
} from '@bodiless/components';
import {
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  A,
  Span,
  Fragment,
} from '@bodiless/fclasses';

import {
  asBold,
  asEditable,
  asEditableLink,
  asLink,
} from '../Elements.token';

const withEditableStartingTrail = (
  nodeKeys?: WithNodeKeyProps,
  placeholder?: string,
) => flow(
  withBreadcrumbStartingTrail,
  withDesign({
    StartingTrail: replaceWith(
      flow(
        asEditable('text', placeholder),
        addProps({
          children: 'Home',
        }),
        withSidecarNodes(
          asEditableLink('link'),
        ),
        addProps({
          href: '/',
        }),
        asLink,
        withNode,
        withNodeKey(nodeKeys),
      )(A),
    ),
  }),
);

const withStartingTrailIcon = (
  nodeKeys?: WithNodeKeyProps,
) => flow(
  withBreadcrumbStartingTrail,
  withDesign({
    StartingTrail: replaceWith(
      flow(
        withChild(
          flow(
            addProps({
              children: 'home',
            }),
            addClasses('material-icons'),
          )(Span),
        ),
        addClasses('material-icons'),
        withSidecarNodes(
          asEditableLink('link'),
        ),
        addProps({
          href: '/',
        }),
        withNode,
        withNodeKey(nodeKeys),
      )(A),
    ),
  }),
);

const withNonLinkableItems = withDesign({
  BreadcrumbLink: replaceWith(Fragment),
});

const withEditableFinalTrail = (
  nodeKeys?: WithNodeKeyProps,
  placeholder?: string,
) => flow(
  withDesign({
    FinalTrail: flow(
      replaceWith(Span),
      asEditable(nodeKeys, placeholder),
    ),
  }),
  withBreadcrumbFinalTrail,
);

const withBoldedFinalTrail = withDesign({
  BreadcrumbItem: ifToggledOn(({ isCurrentPage }: any) => isCurrentPage)(asBold),
  FinalTrail: asBold,
});

const withHiddenCurrentPageItem = flow(
  withDesign({
    BreadcrumbItem: ifToggledOn(
      ({ isCurrentPage }: any) => isCurrentPage,
    )(replaceWith(() => <></>)),
  }),
  withoutBreadcrumbFinalTrail,
);

export const withSeparator = (separator: string) => addProps({
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

export {
  withEditableStartingTrail,
  withStartingTrailIcon,
  withNonLinkableItems,
  withEditableFinalTrail,
  withBoldedFinalTrail,
  withArrowSeparator,
  withVerticalBarSeparator,
  withSlashSeparator,
  withHiddenCurrentPageItem,
};
