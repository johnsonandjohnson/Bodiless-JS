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

import { withDesign } from '@bodiless/fclasses';
import { flow } from 'lodash';
import { withToggleButton } from '../Toggle';
import { ListDesignableComponents, WithSublistToggle } from './types';
import asBasicSublist from './asBasicSublist';
import withDeleteSublistOnUnwrap from './withDeleteSublistOnUnwrap';

/**
 * Takes a sublist toggle HOC and returns another HOC which, when applied to a list,
 * applies the sublist toggle HOC to each item in the list
 * adds a toggle button to context menu
 *
 * @param withSublistToggle The sublist toggle HOC to apply to each list item.
 */
const withSublist = (withSublistToggle: WithSublistToggle) => withDesign<ListDesignableComponents>({
  ItemMenuOptionsProvider: withToggleButton({ icon: 'playlist_add' }),
  Item: withSublistToggle,
});

const withBasicSublist = flow(
  withDeleteSublistOnUnwrap,
  asBasicSublist,
  withSublist,
);

export default withSublist;
export { withBasicSublist };
