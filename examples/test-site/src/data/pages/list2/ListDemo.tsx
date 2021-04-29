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
  withDesign, addClasses, removeClasses, asToken,
} from '@bodiless/fclasses';
import {
  asSubList, withDeleteNodeOnUnwrap, asBodilessList,
  withSubListDesign, withSubLists,
} from '@bodiless/components';
import { ComponentType } from 'react';
import { withItemMargin, withSimpleTitle } from './SimpleListDemo';

/**
 * Defines the all sublists
 */
export const asToggledSubList = asToken(
  asSubList(),
  withDeleteNodeOnUnwrap('sublist'),
);

const ListDemo = asToken(
  asBodilessList(),
  withSimpleTitle,
  withSubLists(2)(asToggledSubList),
  withSubListDesign(3)(asToken(
    withSimpleTitle,
    withItemMargin,
  )),
)('ul') as ComponentType<any>;

const withLessItemMargin = withDesign({
  Item: asToken(removeClasses('ml-5'), addClasses('ml-2')),
});

const withLessMarginOnInnerList = withDesign({
  Item: withDesign({ // This item is a chameleon component
    SubList: withDesign({ // It's "SubList" state design is the actual sublist.
      Item: withDesign({
        SubList: withLessItemMargin,
      }),
    }),
  }),
});

export default withLessMarginOnInnerList(ListDemo);
