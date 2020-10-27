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
import { withDesign, addClasses } from '@bodiless/fclasses';
import {
  ifEditable,
} from '@bodiless/core';
import {
  asTextColorPrimary,
  asPrimaryColorBackground,
} from '../Elements.token';

/**
 * Base Menu Styles
 * ===========================================
 */
const withBaseMenuStyles = withDesign({
  Wrapper: flow(
    asTextColorPrimary,
    addClasses('w-full'),
  ),
  Item: flow(
    addClasses('leading-normal text-base'),
    // Set to handle bug https://jira.jnj.com/browse/AESQ-2231
    ifEditable(addClasses('min-w-100')),
  ),
  Title: flow(
    addClasses('block w-full py-3 px-5'),
    withDesign({
      Link: withDesign({
        ActiveLink: flow(
          addClasses('border-b-4 border-blue-700'),
        ),
      }),
    }),
  ),
});

/**
 * Base Sub Menu Styles
 * ===========================================
 */
const withBaseSubMenuStyles = withDesign({
  Wrapper: withDesign({
    List: flow(
      asTextColorPrimary,
      asPrimaryColorBackground,
      addClasses('z-10 max-w-xs'),
    ),
  }),
  Item: flow(
    addClasses('leading-normal text-sm'),
    // Set to handle bug https://jira.jnj.com/browse/AESQ-2231
    ifEditable(addClasses('min-w-100')),
  ),
  Title: flow(
    addClasses('block w-full py-2 px-4'),
    withDesign({
      Link: withDesign({
        ActiveLink: addClasses('bg-blue-700 text-white'),
      }),
    }),
  ),
});

/**
 * Simple Sub Menu Styles
 * ===========================================
 */
const asSimpleSubMenu = flow(
  withBaseSubMenuStyles,
);

const asSimpleSubMenuStyles = withDesign({
  SubMenu: asSimpleSubMenu,
});

/**
 * Simple Menu Styles
 * ===========================================
 */
const withSimpleMenuStyles = flow(
  withDesign({
    Item: asSimpleSubMenuStyles,
  }),
  withBaseMenuStyles,
);

export default withSimpleMenuStyles;
export {
  asSimpleSubMenu,
  withBaseMenuStyles,
  withBaseSubMenuStyles,
};
