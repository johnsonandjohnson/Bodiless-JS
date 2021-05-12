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
  addClasses,
  addProps,
  withDesign,
  addClassesIf,
  addPropsIf,
  replaceWith,
  removeClasses,
  removeClassesIf,
  asToken,
} from '@bodiless/fclasses';
import {
  ifEditable,
  withExtendHandler,
} from '@bodiless/core';
import {
  isAccordionExpanded,
  isAccordionContracted,
  isAccordionFocusedOut,
} from './AccordionContext';

/**
 * withDisableExpandOnClick stops accordion behavior on edit mode
 */
const withDisableExpandOnClick = asToken(
  ifEditable(
    withExtendHandler('onClick', () => (e: MouseEvent) => e.stopPropagation()),
  ),
);

/**
 * asAccordionDefaultBorder provides basic border style
 */
const asAccordionDefaultBorder = asToken(
  addClasses('border border-solid border-black'),
);

/**
 * asAccordionDefaultExpanded provides expanded property
 */
const asAccordionDefaultExpanded = asToken(
  addProps({ expanded: 'true' }),
);

/**
 * asAccordionIcon provides basic icon style for accordion title,
 * as well as accessibility label support
 */
const asAccordionIcon = asToken(
  addClasses('material-icons cursor-pointer right-0'),
  addProps({ 'data-accordion-element': 'accordion-icon' }),
  addPropsIf(isAccordionContracted)({ 'aria-label': 'Expand Accordion' }),
  addPropsIf(isAccordionExpanded)({ 'aria-label': 'Collapse Accordion' }),
);

/**
 * asAccordionTitleWrapper positions accordion title wrapper
 */
const asAccordionTitleWrapper = asToken(
  addClasses('flex items-center justify-between relative'),
);

/**
 * asAccordionLabel makes title label full
 */
const asAccordionLabel = asToken(
  addClasses('w-full'),
);

/**
 * asAccordionBodyWrapper controls accordion body visibility according to
 * expand/collapse behavior
 */
const asAccordionBodyWrapper = asToken(
  addClassesIf(isAccordionExpanded)('block'),
  addClassesIf(isAccordionContracted)('hidden'),
);

/**
 * asAccordionBodyContent truncates accordion body content
 */
const asAccordionBodyContent = asToken(
  addClasses('truncate'),
);

/**
 * asAccordionBorder borders accordion title
 */
const asAccordionBorder = asToken(
  withDesign({
    Title: withDesign({
      Wrapper: asToken(
        asAccordionDefaultBorder,
      ),
    }),
  }),
);

/**
 * asAccordionFocus adds border around the accordion component on focus event
 */
const asAccordionFocus = asToken(
  withDesign({
    // Title must be full bordered in case accordion is contracted,
    // but no need for bottom border when accordion is expanded
    Title: withDesign({
      Wrapper: asToken(
        asAccordionDefaultBorder,
        addClassesIf(isAccordionExpanded)('border-b-0'),
        removeClassesIf(isAccordionFocusedOut)('border'),
      ),
    }),
    // Body complements title bordering look when accordion is expanded
    Body: withDesign({
      Wrapper: asToken(
        asAccordionDefaultBorder,
        addClasses('border-t-0'),
        removeClassesIf(isAccordionFocusedOut)('border'),
      ),
    }),
  }),
);

/**
 * asNonExpandingAccordion provides default expanded accordion and
 * prevents users from collapsing it
 */
const asNonExpandingAccordion = asToken(
  withDesign({
    Wrapper: asToken(
      asAccordionDefaultExpanded,
      addClasses('pointer-events-none'),
      addPropsIf(isAccordionExpanded)({ 'aria-disabled': 'true' }),
      // Pointer events none blocks user to perform any interations on
      // the component, so it must be removed from edit mode
      ifEditable(
        removeClasses('pointer-events-none'),
      ),
    ),
    // Removes icon wrapper from accordion title
    Title: withDesign({
      Icon: asToken(
        // Using replaceWith instead of remove because the last
        // only pulls out the span tag, but keeps the text currently inside
        replaceWith(() => null),
      ),
    }),
  }),
);

export {
  withDisableExpandOnClick,
  asAccordionDefaultExpanded,
  asAccordionIcon,
  asAccordionTitleWrapper,
  asAccordionLabel,
  asAccordionBodyWrapper,
  asAccordionBodyContent,
  asAccordionBorder,
  asAccordionFocus,
  asNonExpandingAccordion,
};
