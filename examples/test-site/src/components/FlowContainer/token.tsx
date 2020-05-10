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

import { asFilterableByGroup } from '@bodiless/organisms';
import {
  addClasses,
  withDesign,
} from '@bodiless/fclasses';

const asFlowContainerWithMargins = withDesign({
  Wrapper: addClasses('md:-m-5 py-5'),
  ComponentWrapper: addClasses('p-5'),
});

const asFlowContainerFullWidth = withDesign({
  Wrapper: addClasses('w-full'),
  ComponentWrapper: addClasses('w-full md:w-1/3'),
});

const asFlowContainerFilterable = withDesign({
  ComponentWrapper: asFilterableByGroup,
});

export {
  asFlowContainerWithMargins,
  asFlowContainerFullWidth,
  asFlowContainerFilterable,
};
