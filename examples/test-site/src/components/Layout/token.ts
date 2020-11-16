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
  addClasses,
  withDesign,
} from '@bodiless/fclasses';
import {
  asPageContainer,
  asPrimaryColorBackground,
} from '../Elements.token';

const asDefaultLogoStyle = withDesign({
  SiteReturn: addClasses('flex-shrink px-2'),
  SiteLogo: addClasses('h-16'),
  // Do not addClasses to SiteLink as by default its Gatsby Link and not designable.
});

const asSiteHeader = withDesign({
  Wrapper: flow(asPrimaryColorBackground, addClasses('')),
  Container: flow(asPageContainer, addClasses('flex justify-between min-h-16 items-center')),
  MenuContainer: asPageContainer,
  SiteLogoReturn: asDefaultLogoStyle,
});

const asSiteFooter = withDesign({
  Wrapper: asPrimaryColorBackground,
  Container: flow(asPageContainer, addClasses('py-3')),
});

export {
  asSiteHeader,
  asDefaultLogoStyle,
  asSiteFooter,
};
