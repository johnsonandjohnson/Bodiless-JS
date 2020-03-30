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
import { withContent } from '@bodiless/core';
import { withDesign } from '@bodiless/fclasses';
import Tout from '../../../Tout';
// ToDo: consider if we want to have asToutHorizontal here
import { asToutHorizontal, asToutDefaultStyle } from '../../../Tout/token';
import asContentfulTout from '../../asContenfulTout';
import title from './title';
import body from './body';
import image from './image';
import cta from './cta';

// ToDo: a key should be injected to withContentfulContextMenu in order to have ability
// to revert subcomponent by subcomponent
// ToDo: there is a concern that reverting link text reverts the href value as well
const WantToLearnMore = flow(
  asToutDefaultStyle,
  asToutHorizontal,
  asContentfulTout,
  withDesign({
    Image: withContent(image),
    Title: withContent(title),
    // ToDo: bug. page refresh is required in order to get reverted changes.
    Body: withContent(body),
    // ToDo: validate if it is an acceptable way to specify default value for the link
    // ToDo: link text is not displayed in taco cta
    Link: withContent(cta),
  }),
)(Tout);

export default WantToLearnMore;
