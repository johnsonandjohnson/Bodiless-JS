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
import { addClasses } from '@bodiless/fclasses';
import {
  asBodilessImage,
  asBodilessLink,
  Editable,
  withPlaceholder,
} from '@bodiless/components';
import { withChild, withNodeKey } from '@bodiless/core';
import {
  asAlignCenter,
  asAlignRight,
  asAlignLeft,
  asUnderline,
  asAlignJustify,
} from './ElementDefault.token';

/* Page Structure */
const asBlockItem = addClasses('p-1 w-full');
const asPageContainer = addClasses('container mx-auto');
const asVerticalMargin = addClasses('my-2');
const asHorizontalMargin = addClasses('mx-2');

/* Primary coloring */
const asPrimaryColorBackground = addClasses('bg-gray-200');
const asTextColorPrimary = addClasses('text-blue');

/* Typography */
const asBold = addClasses('');
const asItalic = addClasses('');
const asLink = addClasses('text-blue-700 underline');
const asStrikeThrough = addClasses('');
const asSuperScript = addClasses('');

const asHeader1 = flow(addClasses('text-3xl'), asTextColorPrimary);
const asHeader2 = addClasses('text-2xl');
const asHeader3 = addClasses('text-xl');

/* BlockQuote */
const asBlockQuote = addClasses('block mx-4');

/* Image component */
const asImage = addClasses('');
const asEditableImage = asBodilessImage;

/* Link component */
const asEditableLink = asBodilessLink;

/* Edit component */
const asEditable = (nodeKey?: string, placeholder?: string) => withChild(
  flow(
    withNodeKey(nodeKey),
    withPlaceholder(placeholder),
  )(Editable),
);

export {
  asBold,
  asItalic,
  asUnderline,
  asLink,
  asStrikeThrough,
  asAlignLeft,
  asAlignRight,
  asAlignCenter,
  asAlignJustify,
  asHeader1,
  asHeader2,
  asHeader3,
  asBlockItem,
  asPageContainer,
  asPrimaryColorBackground,
  asImage,
  asEditableImage,
  asEditableLink,
  asEditable,
  asSuperScript,
  asTextColorPrimary,
  asVerticalMargin,
  asHorizontalMargin,
  asBlockQuote,
};
