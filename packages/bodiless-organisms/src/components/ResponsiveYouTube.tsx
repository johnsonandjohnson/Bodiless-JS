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

import { flowRight } from 'lodash';
import {
  asBodilessComponent,
  ifEditable,
} from '@bodiless/core';
import {
  withDesign,
  addClasses,
  replaceWith,
  Div,
  Iframe,
} from '@bodiless/fclasses';
import {
  withoutPointerEvents,
  useIframeBodilessOptions,
  withYouTubeFormHeader,
  withYouTubeFormSrcSnippet,
  withYouTubePlayerTransformer,
} from '@bodiless/components';

const ActivatorWrapper = addClasses('absolute w-full h-full inset-0')(Div);
const asBodilessYouTube = asBodilessComponent({
  ...useIframeBodilessOptions(),
  groupLabel: 'YouTube',
  Wrapper: ActivatorWrapper,
});

const asBaseResponsiveYouTube = withDesign({
  Item: flowRight(
    replaceWith(
      flowRight(
        ifEditable(withoutPointerEvents),
        asBodilessYouTube(),
      )(Iframe),
    ),
  ),
});

const asResponsiveYouTube = withDesign({
  Item: flowRight(
    replaceWith(
      flowRight(
        ifEditable(withoutPointerEvents),
        asBodilessYouTube(),
        withYouTubeFormHeader,
        withYouTubeFormSrcSnippet,
        withYouTubePlayerTransformer,
      )(Iframe),
    ),
  ),
});

export {
  asBaseResponsiveYouTube,
  asResponsiveYouTube,
};
