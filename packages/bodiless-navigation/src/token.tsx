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

import { addClasses } from '@bodiless/fclasses';

export const asFlex = addClasses('flex');
export const asRelative = addClasses('relative');
export const asAbsolute = addClasses('absolute');
export const asFixed = addClasses('fixed');
export const asOverflowHidden = addClasses('overflow-hidden');
export const withVisibleOnHoverStyles = addClasses('hover:overflow-visible');
export const withStaticOnHoverStyles = addClasses('hover:static');
export const asPositionedLeft = addClasses('left-0');
export const withNoInsetStyles = addClasses('inset-0');
export const withFullZIndex = addClasses('z-full');
export const withFullWidthStyles = addClasses('w-full');
export const withFullHeightStyles = addClasses('h-full');
export const withColumnDirectionStyles = addClasses('flex-col');
export const withLightGrayBg = addClasses('bg-gray-200');
export const withTransformStyles = addClasses('transform');
export const withSlideInTranslateStyles = addClasses('-translate-x-full');
export const withMaterialIconsFont = addClasses('material-icons');
export const withPointerCursorStyles = addClasses('cursor-pointer');
export const asDisabled = addClasses('pointer-events-none');
