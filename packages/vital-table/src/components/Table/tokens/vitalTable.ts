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

import {
  flowIf,
  and,
  flowHoc,
  on,
  as,
  replaceWith,
  addProps,
} from '@bodiless/fclasses';
import {
  asBodilessTable, useIsFirstColumn, useIsInBody, useIsOddRow, useIsSecondColumn, useIsThirdColumn,
} from '@bodiless/table';
import { vitalRichText, RichTextClean } from '@bodiless/vital-editors';
import { vitalColor } from '@bodiless/vital-elements';
import { ifComponentSelector } from '@bodiless/layouts';
import { asTableToken, TableCellPreview } from '../TableClean';

const WithFlowContainerPreview = asTableToken({
  Flow: ifComponentSelector,
  Core: {
    CellContent: replaceWith(TableCellPreview),
  },
});

/**
 * Token which produces a base VitalDS editable table with editable RTE cells
 * and with minimal styling
 */
const Default = asTableToken({
  Meta: flowHoc.meta.term('Type')('Table'),
  Schema: {
    _: asBodilessTable(),
  },
  Editors: {
    CellContent: on(RichTextClean)(vitalRichText.Default, addProps({ placeholder: 'Cell' })),
  },
  Theme: {
    Table: 'min-w-full',
    CellContent: 'text-left',
  },
  Spacing: {
    Cell: 'pt-6 px-6',
  },
});

/**
 * Token which adds header design to first column
 */
const WithFirstColumnHeader = asTableToken({
  Meta: flowHoc.meta.term('Header')('First Column as Header'),
  Theme: {
    Cell: flowIf(useIsFirstColumn)(as(vitalColor.BgSecondaryTable)),
  }
});

/**
 * Token which adds header design to second column
 */
const WithSecondColumnHighlighted = asTableToken({
  Meta: flowHoc.meta.term('Header')('Second Column highlighted'),
  Theme: {
    Cell: flowIf(useIsSecondColumn)(as(vitalColor.BgSecondaryTable)),
  }
});

/**
 * Token which adds header design to third column
 */
const WithThirdColumnHighlighted = asTableToken({
  Meta: flowHoc.meta.term('Header')('Third Column highlighted'),
  Theme: {
    Cell: flowIf(useIsThirdColumn)(as(vitalColor.BgSecondaryTable)),
  }
});

/**
 * Token which add alternating striped rows
 */
const WithRowStripes = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Stripes'),
  Theme: {
    Row: flowIf(and(useIsInBody, useIsOddRow))(as(vitalColor.BgSecondaryTableRowColumn)),
  }
});

/**
 * Token which add hoverable rows
 */
const WithHoverable = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Hoverable Rows'),
  Theme: {
    Row: vitalColor.BgSecondaryTableInteractive,
  }
});

/**
 * Token which add borders to all cells
 */
const WithBorders = asTableToken({
  Meta: flowHoc.meta.term('Border')('Bordered Cells'),
  Theme: {
    Row: 'border',
  }
});

/**
 * Token which add borders to bottom of the rows
 */
const WithBottomBorders = asTableToken({
  Meta: flowHoc.meta.term('Border')('Bottom Bordered'),
  Theme: {
    THead: 'border-b',
    Row: 'border-b',
  }
});

/**
 * Token which add header background to table.
 */
const WithLightHeaderFooter = asTableToken({
  Meta: flowHoc.meta.term('Header')('Light Header'),
  Theme: {
    THead: vitalColor.BgSecondaryTable,
    TFoot: vitalColor.BgSecondaryTable,
  }
});

/**
 * Token which add header background to table.
 */
const WithPrimaryHeaderFooter = asTableToken({
  Meta: flowHoc.meta.term('Header')('Primary Header'),
  Theme: {
    THead: vitalColor.BgPrimaryBrand,
    TFoot: vitalColor.BgPrimaryBrand,
  }
});

/**
 * Token which add scrollbar if becomes to wide for viewport.
 */
const WithScrolling = asTableToken({
  Meta: flowHoc.meta.term('Decoration')('Scrolling'),
  Theme: {
    Wrapper: 'overflow-x-auto',
  }
});

export default {
  Default,
  WithRowStripes,
  WithHoverable,
  WithBorders,
  WithBottomBorders,
  WithLightHeaderFooter,
  WithFirstColumnHeader,
  WithSecondColumnHighlighted,
  WithThirdColumnHighlighted,
  WithPrimaryHeaderFooter,
  WithScrolling,
  WithFlowContainerPreview,
};
