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

import { DefaultNormalHref } from '@bodiless/components';
import {
  asBlock,
  withButton,
  withStrikeThroughMeta,
  createLinkDeserializer,
  withHtmlDeserializer,
} from '@bodiless/richtext';
import { RichText } from '@bodiless/richtext-ui';
import {
  withDesign,
  Blockquote,
  replaceWith,
  startWith,
  Div,
  Design,
  flowHoc,
  A,
} from '@bodiless/fclasses';
import {
  asBold,
  asItalic,
  asLink,
  asUnderline,
  asAlignLeft,
  asAlignRight,
  asAlignCenter,
  asAlignJustify,
  asHeader3,
  asHeader2,
  asHeader1,
  asSuperScript,
  asStrikeThrough,
  asEditableLink,
  asBlockQuote,
} from '../Elements.token';
import withEditor from './withEditor';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: (href: string) => (new DefaultNormalHref(href).toString()),
  }),
);

const simpleDesign = {
  SuperScript: asSuperScript,
};
const basicDesign = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  Link: flowHoc(asEditableLink(), asLink, withLinkDeserializer, startWith(A)),
  ...simpleDesign,
  AlignLeft: asAlignLeft,
  AlignRight: asAlignRight,
  AlignJustify: asAlignJustify,
  AlignCenter: asAlignCenter,
};

export const withQuoteBlockMeta = flowHoc(
  asBlock,
  withButton('format_quote'),
);

const fullFeaturedDesign: Design = {
  Bold: asBold,
  Italic: asItalic,
  Underline: asUnderline,
  StrikeThrough: flowHoc(asStrikeThrough, withStrikeThroughMeta),
  Link: flowHoc(asEditableLink(), asLink, withLinkDeserializer, startWith(A)),
  SuperScript: asSuperScript,
  AlignLeft: asAlignLeft,
  AlignRight: asAlignRight,
  AlignJustify: asAlignJustify,
  AlignCenter: asAlignCenter,
  H1: asHeader1,
  H2: asHeader2,
  H3: asHeader3,
  BlockQuote: flowHoc(replaceWith(Blockquote), asBlockQuote, withQuoteBlockMeta),
  CenterItalicHeader: flowHoc(replaceWith(Div), asBlock, asHeader1, asAlignCenter, asItalic),
  UnderlineRightHeader: flowHoc(replaceWith(Div), asBlock, asHeader1, asAlignRight, asUnderline),
};

const EditorSimple = withDesign(simpleDesign)(RichText);
const EditorBasic = withDesign(basicDesign)(RichText);
const EditorFullFeatured = withDesign(fullFeaturedDesign)(RichText);
const withEditorBasic = withEditor(EditorBasic);
const withEditorSimple = withEditor(EditorSimple);
const withEditorFullFeatured = withEditor(EditorFullFeatured);
export {
  EditorBasic,
  EditorFullFeatured,
  EditorSimple,
  withEditorBasic,
  withEditorSimple,
  withEditorFullFeatured,
};
