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

import {
  withDesign,
  addClasses,
  asToken,
  addProps,
  replaceWith,
  addPropsIf,
  Span,
  withoutProps,
} from '@bodiless/fclasses';
import { ifViewportIsNot, ifViewportIs } from '@bodiless/components';
import {
  asAccordionWrapper,
  asAccordionBody,
  asAccordionTitle,
  useAccordionContext,
} from '@bodiless/accordion';
import {
  withAnyTag, withoutAnyTag,
} from './Filter.token';

const asResponsiveAccordionTitle = asToken(
  asAccordionTitle,
  withDesign({
    Icon: addClasses('lg:hidden'),
    OpenIcon: addClasses('fill-current'),
    CloseIcon: addClasses('fill-current'),
  }),
);

/**
 * asAccordionBodyFilter extends asAccordionBody to remove tabIndex prop
 * for accessibility purposes.
 */
const asAccordionBodyFilter = asToken(
  asAccordionBody,
  withDesign({
    Wrapper: withoutProps('tabIndex'),
  }),
);

const asExpandedOnDesktopBody = asToken(
  asAccordionBodyFilter,
  withDesign({
    Wrapper: addClasses('lg:block'),
  }),
);

const asExpandedOnDesktopResetButtonBody = asToken(
  asExpandedOnDesktopBody,
  withDesign({
    Wrapper: withoutProps(['role', 'aria-labelledby']),
  }),
);

const useRefineButtonProps = () => {
  const { setExpanded } = useAccordionContext();
  return {
    children: 'Refine',
    onClick: () => setExpanded(false),
  };
};

const asAccessibleFilterByGroup = asToken(
  withDesign({
    FilterWrapper: addProps({
      role: 'region',
      'aria-label': 'Product filters'
    })
  }),
);

const asResponsiveFilterByGroup = asToken(
  ifViewportIsNot(['lg', 'xl', '2xl'])(
    withDesign({
      FilterWrapper: asAccordionWrapper,
      FilterTitle: asResponsiveAccordionTitle,
      FilterBody: asExpandedOnDesktopBody,
      ResetButton: asExpandedOnDesktopResetButtonBody,
      RefineButton: addPropsIf(() => true)(useRefineButtonProps),
    }),
  ),
  ifViewportIs(['lg', 'xl', '2xl'])(
    withDesign({
      FilterBody: replaceWith(Span),
      RefineButton: replaceWith(() => null),
    }),
  ),
);

export const withMultipleAllowedTags = asToken(
  addProps({
    multipleAllowedTags: true,
  }),
  withDesign({
    Filter: asToken(
      withoutAnyTag,
    ),
  }),
);

export const withSingleAllowedTag = asToken(
  addProps({
    multipleAllowedTags: false,
  }),
  withDesign({
    Filter: asToken(
      withAnyTag,
    ),
  }),
);

export {
  asExpandedOnDesktopBody,
  asResponsiveFilterByGroup,
  asAccessibleFilterByGroup,
};
