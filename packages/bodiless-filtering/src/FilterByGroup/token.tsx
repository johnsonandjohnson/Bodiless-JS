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
  flowHoc,
  addProps,
  replaceWith,
  addPropsIf,
  withoutProps,
} from '@bodiless/fclasses';
import {
  asAccordionWrapper,
  asAccordionBody,
  asAccordionTitle,
  useAccordionContext,
} from '@bodiless/accordion';
import { BreakpointsType, withResponsiveVariants } from '@bodiless/components';
import {
  withAnyTag, withoutAnyTag,
} from './Filter.token';

const asResponsiveAccordionTitle = flowHoc(
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
const asAccordionBodyFilter = flowHoc(
  asAccordionBody,
  withDesign({
    Wrapper: withoutProps('tabIndex'),
  }),
);

const asExpandedOnDesktopBody = flowHoc(
  asAccordionBodyFilter,
  withDesign({
    Wrapper: addClasses('lg:block'),
  }),
);

const asExpandedOnDesktopResetButtonBody = flowHoc(
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

const asAccessibleFilterByGroup = flowHoc(
  withDesign({
    FilterWrapper: addProps({
      role: 'region',
      'aria-label': 'Product filters'
    })
  }),
);

export const withMultipleAllowedTags = flowHoc(
  addProps({
    multipleAllowedTags: true,
  }),
  withDesign({
    Filter: flowHoc(
      withoutAnyTag,
    ),
  }),
);

export const withSingleAllowedTag = flowHoc(
  addProps({
    multipleAllowedTags: false,
  }),
  withDesign({
    Filter: flowHoc(
      withAnyTag,
    ),
  }),
);

const asDesktopFilterByGroup = withDesign({
  RefineButton: replaceWith(() => null),
});

const asMobileFilterByGroup = withDesign({
  FilterWrapper: asAccordionWrapper,
  FilterTitle: asResponsiveAccordionTitle,
  FilterBody: asExpandedOnDesktopBody,
  ResetButton: asExpandedOnDesktopResetButtonBody,
  RefineButton: addPropsIf(() => true)(useRefineButtonProps),
});

const asResponsiveFilterByGroup = (breakpoints: BreakpointsType) => flowHoc(
  withResponsiveVariants({ breakpoints }),
  withDesign({
    _default: asMobileFilterByGroup,
    lg: asDesktopFilterByGroup,
  }),
);

export {
  asExpandedOnDesktopBody,
  asResponsiveFilterByGroup,
  asMobileFilterByGroup,
  asDesktopFilterByGroup,
  asAccessibleFilterByGroup,
};
