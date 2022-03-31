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

import { flowHoc, addClasses } from '@bodiless/fclasses';

export const asBox = flowHoc(
  addClasses('w-full h-36'),
  flowHoc.meta.term('Component')('Box'),
  flowHoc.meta.term('Attribute')('Styles'),
  flowHoc.meta.term('Type')('Box'),
);

export const withBlueBorder = flowHoc(
  addClasses('border-blue-800 border-8'),
  flowHoc.meta.term('Color')('Blue-Border'),
  flowHoc.meta.term('Attribute')('border'),
);

export const withTealBorder = flowHoc(
  addClasses('border-teal-800 border-8'),
  flowHoc.meta.term('Color')('Teal-Border'),
  flowHoc.meta.term('Attribute')('border'),
);

export const asRounded = flowHoc(
  addClasses('rounded-2xl'),
  flowHoc.meta.term('Border')('Rounded'),
  flowHoc.meta.term('Attribute')('border-radius'),
);

export const asSquare = flowHoc(
  flowHoc.meta.term('Border')('Square'),
);

export const asBlue = flowHoc(
  addClasses('bg-blue-800'),
  flowHoc.meta.term('Color')('Blue'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
export const asOrange = flowHoc(
  addClasses('bg-orange-800'),
  flowHoc.meta.term('Color')('Orange'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
export const asTeal = flowHoc(
  addClasses('bg-teal-800'),
  flowHoc.meta.term('Color')('Teal'),
  flowHoc.meta.term('Attribute')('bg-color'),
);
