/**
 * Copyright © 2019 Johnson & Johnson
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

import { ComponentType as CT, PropsWithChildren } from 'react';
import { withDesign } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { withToggleButton, withToggleTo } from '../Toggle';
import {
  FinalProps as ListProps,
  ListDesignableComponents,
  UseItemWithSublist,
} from './types';
import asBasicSublist from './asBasicSublist';
import withDeleteSublistOnUnwrap from './withDeleteSublistOnUnwrap';


const withSublistToggle = (useItemWithSublist: UseItemWithSublist) => (
  (Sublist: CT<ListProps>) => (
    (Item: CT<PropsWithChildren<{}>>) => {
      const { ItemWithoutSublist, ItemWithSublist } = useItemWithSublist(Sublist)(Item);
      return withToggleTo(ItemWithoutSublist)(ItemWithSublist);
    }
  )
);

/**
 * Takes a sublist component and returns a HOC which, when applied to a list,
 * adds a toggled version of the sublist to each item in the list.
 *
 * @param Sublist The sublist component to add to each item.
 */
// eslint-disable-next-line
const withSublist = (useItemWithSublist: UseItemWithSublist) => (Sublist: CT<ListProps>) => withDesign<ListDesignableComponents>({
  ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
  Item: withSublistToggle(useItemWithSublist)(Sublist),
});

const withBasicSublist = flow(
  withDeleteSublistOnUnwrap,
  withSublist(asBasicSublist),
);

export default withSublist;
export { withBasicSublist };
