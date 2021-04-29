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
  addClasses,
  removeClasses,
  withDesign,
  remove,
  asToken,
} from '@bodiless/fclasses';

/**
 * asCardVertical removes unnecessary wrappers from the card
 */
const asCardVertical = withDesign({
  Wrapper: addClasses('w-full flex h-full flex-col'),
  ContentWrapper: remove,
  Image: addClasses('w-full'),
  ImageWrapper: remove,
  Body: addClasses('flex-grow'),
});

/**
 * asCardHorizontal splits the card in half with the image on the left
 */
const asCardHorizontal = withDesign({
  Wrapper: addClasses('md:flex-row w-full flex flex-col'),
  ImageWrapper: addClasses('md:w-1/2'),
  Image: addClasses('w-full'),
  ContentWrapper: addClasses('md:w-1/2 flex flex-col'),
  Body: addClasses('flex-grow'),
});

/**
 * asCardNoTitle removes title from the card
 */
const asCardNoTitle = withDesign({
  Title: remove,
});

/**
 * asCardNoBody removes the body from the card and adjust title
 */
const asCardNoBody = withDesign({
  Title: addClasses('flex-grow'), // Adds grow here because body will not exist
  Body: remove,
});

/**
 * asCardNoBodyNoTitle removes both body and title from the card and adjusts image link
 */
const asCardNoBodyNoTitle = asToken(
  asCardNoBody,
  asCardNoTitle,
  withDesign({ ImageLink: addClasses('flex-grow') }),
);

/**
 * asCardNoCta removes link from the card
 */
const asCardNoCta = withDesign({
  Link: remove,
});

/**
 * asCardOverlayTitle puts the title over the card image top
 */
const asCardOverlayTitle = withDesign({
  Title: addClasses('absolute left-0 right-0 top-0 m-8 w-auto'),
  Wrapper: addClasses('relative'),
});

/**
 * asCardOverlayCta puts the link over the card image bottom
 */
const asCardOverlayCta = withDesign({
  Link: asToken(
    addClasses('absolute bottom-0 right-0 m-8 px-8'),
    removeClasses('w-full'),
  ),
  Wrapper: addClasses('relative'),
});

export {
  asCardVertical,
  asCardHorizontal,
  asCardNoTitle,
  asCardNoBody,
  asCardNoBodyNoTitle,
  asCardNoCta,
  asCardOverlayTitle,
  asCardOverlayCta,
};
