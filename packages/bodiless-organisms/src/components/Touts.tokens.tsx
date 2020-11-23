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

import { flow } from 'lodash';
import {
  addClasses,
  removeClasses,
  withDesign,
  remove,
} from '@bodiless/fclasses';

/**
 * asToutVertical removes unessesary wrappers from the Tout
 */
const asToutVertical = withDesign({
  Wrapper: addClasses('w-full flex h-full flex-col'),
  ContentWrapper: remove,
  Image: addClasses('w-full'),
  ImageWrapper: remove,
  Body: addClasses('flex-grow'),
});

/**
 * asToutHorizontal splits the tout in half with the image on the left
 */
const asToutHorizontal = withDesign({
  Wrapper: addClasses('md:flex-row w-full flex flex-col'),
  ImageWrapper: addClasses('md:w-1/2'),
  Image: addClasses('w-full'),
  ContentWrapper: addClasses('md:w-1/2 flex flex-col'),
  Body: addClasses('flex-grow'),
});
const asToutNoTitle = withDesign({
  Title: remove,
});
const asToutNoBody = withDesign({
  Title: addClasses('flex-grow'), // Add grow here because body will not exist
  Body: remove,
});
const asToutNoBodyNoTitle = flow(
  asToutNoBody,
  asToutNoTitle,
  withDesign({ ImageLink: addClasses('flex-grow') }),
);
const asToutNoCta = withDesign({
  Link: remove,
});
const asToutOverlayTitle = withDesign({
  Title: addClasses('absolute top-0 m-8'),
  Wrapper: addClasses('relative'),
});
const asToutOverlayCta = withDesign({
  Link: flow(
    addClasses('absolute bottom-0 right-0 m-8 px-8'),
    removeClasses('w-full'),
  ),
  Wrapper: addClasses('relative'),
});
export {
  asToutVertical,
  asToutHorizontal,
  asToutNoTitle,
  asToutNoBody,
  asToutNoCta,
  asToutOverlayTitle,
  asToutOverlayCta,
  asToutNoBodyNoTitle,
};
