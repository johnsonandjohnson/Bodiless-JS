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
import pick from 'lodash/pick';
import {
  H1,
  H2,
  H3,
  Sup,
  B,
  Em,
  A,
  Div,
  Span,
  applyDesign,
  extendDesign,
  Design,
  DesignableComponents,
} from '@bodiless/fclasses';

import {
  withBoldMeta,
  withSuperScriptMeta,
  withItalicMeta,
  withUnderlineMeta,
  withLinkMeta,
  withAlignLeftMeta,
  withAlignRightMeta,
  withAlignCenterMeta,
  withAlignJustifyMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
} from './meta/index.bl-edit';

const defaults = {
  SuperScript: Sup,
  Bold: B,
  Italic: Em,
  Underline: Span,
  Link: A,
  AlignLeft: Div,
  AlignRight: Div,
  AlignCenter: Div,
  AlignJustify: Div,
  H1,
  H2,
  H3,
} as DesignableComponents;
const lastDesign = {
  SuperScript: withSuperScriptMeta,
  Bold: withBoldMeta,
  Italic: withItalicMeta,
  Underline: withUnderlineMeta,
  Link: withLinkMeta,
  AlignLeft: withAlignLeftMeta,
  AlignRight: withAlignRightMeta,
  AlignCenter: withAlignCenterMeta,
  AlignJustify: withAlignJustifyMeta,
  H1: withHeader1Meta,
  H2: withHeader2Meta,
  H3: withHeader3Meta,
};
// Build an apply function that will only use components where we have a shared key in the design
// as well as only apply the finalDesign on items that are already in the design.
const applyRichTextDesign = (design: Design<DesignableComponents>) => {
  // We want to add our meta data if the keys are present.
  const start = Object.getOwnPropertyNames(design)
    .reduce(
      (acc, key) => (
        {
          ...acc,
          [key]: Object.prototype.hasOwnProperty.call(defaults, key)
            ? defaults[key]
            : Span,
        }
      ),
      {},
    );
  const finalDesign = pick(lastDesign, Object.getOwnPropertyNames(design));
  return applyDesign(start)(extendDesign(design, finalDesign));
};

export default applyRichTextDesign;
