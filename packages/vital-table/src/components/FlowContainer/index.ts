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

import { asFluidToken } from '@bodiless/vital-elements';
import { on, varyDesigns, flowHoc, } from '@bodiless/fclasses';
import {
  asTableToken, TableClean, vitalTable,
} from '../Table';

const BaseVariation = {
  Table: on(TableClean)(vitalTable.Default),
};

const TableVariations = {
  Stripes: vitalTable.WithStripes,
  Hoverable: vitalTable.WithHoverable,
  LightHeaderFooter: vitalTable.WithLightHeaderFooter,
  ScrollingTable: vitalTable.WithScrollingTable,
};

const BorderDecorationVariations = {
  Borders: vitalTable.WithBorders,
  BottomBorders: vitalTable.WithBorders,
  None: asTableToken({
    Meta: flowHoc.meta.term('BorderDecoration')('None'),
  }),
};

/**
 * Token which adds image variations to a flow container.
 */
const WithTableVariations = asFluidToken({
  Components: {
    ...varyDesigns(
      BaseVariation,
      TableVariations,
      BorderDecorationVariations,
    ),
  }
});

export const vitalTableFlowContainer = { WithTableVariations };
