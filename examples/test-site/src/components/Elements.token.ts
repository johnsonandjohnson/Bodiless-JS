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
  asBodilessLink,
  asEditable as asEditableCore,
} from '@bodiless/components';
import { asBodilessImage } from '@bodiless/components-ui';
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
const asXMargin = addClasses('mx-2');
const asYMargin = addClasses('my-2');
const asNegXMargin = addClasses('-mx-1');
const asNegYMargin = addClasses('-my-1');
const withPadding5 = addClasses('p-5');

/* Responsive design */
const asMobileOnly = addClasses('block lg:hidden');
const asExceptMobile = addClasses('hidden lg:block');

/* Primary coloring */
const asPrimaryColorBackground = addClasses('bg-gray-200');
const asTextColorPrimary = addClasses('text-black');

/* Typography */
const asBold = addClasses('font-bold');
const asItalic = addClasses('italic');
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
const asImageRounded = addClasses('rounded-lg');

/* Link component */
const asEditableLink = asBodilessLink;

/* Edit component */
const asEditable = asEditableCore;

// Tout Components
const asCta = addClasses('bg-orange-700 hover:bg-orange-600 text-center text-white p-2 rounded');

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
  asExceptMobile,
  asHeader1,
  asHeader2,
  asHeader3,
  asCta,
  asBlockItem,
  asPageContainer,
  asPrimaryColorBackground,
  asImage,
  asEditableImage,
  asEditableLink,
  asEditable,
  asImageRounded,
  asMobileOnly,
  asSuperScript,
  asTextColorPrimary,
  asXMargin,
  asYMargin,
  asNegXMargin,
  asNegYMargin,
  asBlockQuote,
  withPadding5,
};
