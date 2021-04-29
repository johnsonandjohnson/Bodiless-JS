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
import { withDesign, addClasses, asToken } from '@bodiless/fclasses';
import { ifViewportIsNot } from '@bodiless/components';
import {
  asAccordionWrapper,
  asAccordionBody,
  asAccordionTitle,
} from '@bodiless/accordion';

const asResponsiveAccordionTitle = asToken(
  asAccordionTitle,
  withDesign({
    Icon: addClasses('lg:hidden'),
  }),
);

const asExpandedOnDesktopBody = asToken(
  asAccordionBody,
  withDesign({
    Wrapper: addClasses('lg:block'),
  }),
);

const asResponsiveFilterByGroup = flow(
  ifViewportIsNot(['lg', 'xl', 'xxl'])(
    withDesign({
      FilterWrapper: asAccordionWrapper,
      FilterTitle: asResponsiveAccordionTitle,
      Filter: asExpandedOnDesktopBody,
      ResetButton: asExpandedOnDesktopBody,
    }),
  ),
);

export {
  asExpandedOnDesktopBody,
  asResponsiveFilterByGroup,
};
