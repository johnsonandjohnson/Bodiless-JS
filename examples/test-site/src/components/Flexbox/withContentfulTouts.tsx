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
import {
  withTitle,
  withDesc,
} from '@bodiless/layouts';
import {
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { asToutDefaultStyle, asToutHorizontal } from '../Tout/token';
import { withType } from './Categories';
import { WantToLearnMore, GivingBackToCommunity } from '../Contentful/Tout';

const contentfulTouts = {
  GivingBackToCommunity: flow(
    replaceWith(GivingBackToCommunity),
    asToutDefaultStyle,
    asToutHorizontal,
    withTitle('Giving Back To Community'),
    withDesc('Giving Back To Community'),
    withType('Contentful')(),
    withType('Tout')(),
  ),
  WantToLearnMore: flow(
    replaceWith(WantToLearnMore),
    asToutDefaultStyle,
    asToutHorizontal,
    withTitle('Want to learn more?'),
    withDesc('Want to learn more?'),
    withType('Contentful')(),
    withType('Tout')(),
  ),
};

export default withDesign(contentfulTouts);
