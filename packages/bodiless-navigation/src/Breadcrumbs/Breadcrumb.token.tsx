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

import { ifToggledOn } from '@bodiless/core';
import negate from 'lodash/negate';
import {
  stylable,
  withDesign,
  asToken,
  addProps,
} from '@bodiless/fclasses';
import type { TokenDef } from '@bodiless/fclasses';
import {
  useIsBreadcrumbItemCurrentPage,
  useIsLastBreadcrumbItemRenderedAsALink,
} from './hooks';

/**
 * Makes all Breadcrumb design components stylable.
 */
export const asStylableBreadcrumbs = withDesign({
  StartingTrail: stylable,
  Separator: stylable,
  Wrapper: stylable,
  BreadcrumbItem: stylable,
  Title: stylable,
  FinalTrail: stylable,
  Item: stylable,
});

/**
 * Applies supplied tokenDefs to all breadcrumb items.
 *
 * @returns Token - a token that applies provided tokenDefs to all breadcrumb items.
 */
export const withBreadcrumbItemToken = (...tokenDefs: TokenDef[]) => withDesign({
  // dummy arg is needed bc of ts bug, see https://github.com/microsoft/TypeScript/issues/28010
  StartingTrail: asToken({}, ...tokenDefs),
  FinalTrail: asToken({}, ...tokenDefs),
  Title: asToken({}, ...tokenDefs),
});

/**
 * Hoc to make breadcrumbs accessible
 */
export const asAccessibleBreadcrumbs = asToken(
  withDesign({
    NavWrapper: addProps({
      'aria-label': 'Breadcrumb',
    }),
  }),
  ifToggledOn(negate(useIsLastBreadcrumbItemRenderedAsALink))(
    withDesign({
      Item: ifToggledOn(useIsBreadcrumbItemCurrentPage)(
        addProps({
          'aria-current': 'page',
        }),
      ),
    }),
  ),
);
