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

import React, { ReactNode } from 'react';
import {
  WithNodeKeyProps,
  withSidecarNodes,
  withNode,
  withNodeKey,
  withChild,
  asReadOnly,
  ifToggledOn,
} from '@bodiless/core';
import { withoutLinkWhenLinkDataEmpty } from '@bodiless/components';
import {
  withBreadcrumbStartingTrail,
  withoutBreadcrumbFinalTrail,
  asAccessibleBreadcrumbs as asBaseAccessibleBreadcrumbs,
  useIsBreadcrumbItemCurrentPage,
  useIsLastBreadcrumbItemRenderedAsALink,
} from '@bodiless/navigation';
import {
  flowIf,
  asToken,
  addClasses,
  addProps,
  withDesign,
  replaceWith,
  Span,
  remove,
} from '@bodiless/fclasses';
import { GatsbyLink } from '@bodiless/gatsby-theme-bodiless';

import {
  asBold,
  asEditableLink,
  asLink,
} from '../Elements.token';

const BREADCRUMB_ARIA_LABEL = 'Breadcrumb';

const HomeBreadcrumbIcon = asToken(
  addProps({ children: 'home' as ReactNode }),
  addClasses('material-icons'),
)(Span);

const withStartingTrailIcon = (
  nodeKeys?: WithNodeKeyProps,
) => asToken(
  withBreadcrumbStartingTrail,
  withDesign({
    StartingTrail: replaceWith(
      asToken(
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
  Item: flowIf(({ isCurrentPage }: any) => isCurrentPage)(asBold),
});

const withHiddenCurrentPageItem = asToken(
  withDesign({
    Item: flowIf(useIsBreadcrumbItemCurrentPage)(replaceWith(() => <></>)),
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

const withAccessibleSeparator = withDesign({
  Separator: asToken(
    addClasses('border-black border-r-2 h-4 mx-1.5 rotate-12 self-center transform'),
    withSeparator(''),
  ),
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

const withFinalTrailLinkStyles = withDesign({
  FinalTrail: withDesign({
    Link: withoutLinkWhenLinkDataEmpty,
  }),
});

const $withBreadcrumbStyles = asToken(
  withDesign({
    Separator: addClasses('mx-1'),
    Wrapper: addClasses('inline-flex'),
    Title: withLinkToggleStyles,
  }),
  withStartingTrailLinkStyles,
  withFinalTrailLinkStyles,
  withArrowSeparator,
);

const asAccessibleBreadcrumbs = asToken(
  asBaseAccessibleBreadcrumbs,
  withDesign({
    NavWrapper: addProps({
      'aria-label': BREADCRUMB_ARIA_LABEL,
    }),
  }),
  ifToggledOn(useIsLastBreadcrumbItemRenderedAsALink)(
    withDesign({
      Title: ifToggledOn(useIsBreadcrumbItemCurrentPage)(
        withDesign({
          Link: addProps({
            'aria-current': 'page',
          }),
        }),
      ),
    }),
  ),
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
  asAccessibleBreadcrumbs,
  withAccessibleSeparator,
};
