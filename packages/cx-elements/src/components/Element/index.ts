/**
 * Copyright © 2022 Johnson & Johnson
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

import { cxColor, cxColorStatic } from './Color';
import { cxFontSize, cxFontSizeStatic } from './FontSize';
import { cxTextDecoration, cxTextDecorationStatic } from './TextDecoration';
import { cxTypography, cxTypographyStatic } from './Typography';

const cxElement = {
  ...cxColor,
  ...cxFontSize,
  ...cxTextDecoration,
  ...cxTypography,
};

const cxElementStatic = {
  ...cxColorStatic,
  ...cxFontSizeStatic,
  ...cxTextDecorationStatic,
  ...cxTypographyStatic,
};

export {
  cxElement, cxElementStatic,
  cxFontSize, cxFontSizeStatic,
  cxColor, cxColorStatic,
  cxTextDecoration, cxTextDecorationStatic,
};
