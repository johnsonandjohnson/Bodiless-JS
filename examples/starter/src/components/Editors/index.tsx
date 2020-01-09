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

import React, { ComponentType } from 'react';
import { flow } from 'lodash';
import { RichText } from '@bodiless/richtext-ui';
import {
  withComponent,
  withBoldMeta,
  withItalicMeta,
  withUnderlineMeta,
  withAlignRightMeta,
  withAlignCenterMeta,
  withAlignJustifyMeta,
  withAlignLeftMeta,
  withHeader2Meta,
  withHeader1Meta,
  withSuperScriptMeta,
  withLinkMeta,
} from '@bodiless/richtext';
import {
  H2,
  Div,
  Strong,
  Em,
  H1,
  Sup,
  Span,
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
  asHeader2,
  asHeader1,
  asSuperScript,
  asEditableLink,
} from '../Elements.token';
import asEditor from './asEditor';

const withItems = (items: any[]) => <P extends object> (Component:ComponentType<P>) => (
  (props:P) => (
    <Component items={items} {...props} />
  )
);
const itemsSimple = [
  flow(withComponent(asSuperScript(Sup)), withSuperScriptMeta),
];
const itemsBasic = [
  flow(withComponent(asBold(Strong)), withBoldMeta),
  flow(withComponent(asItalic(Em)), withItalicMeta),
  flow(withComponent(asUnderline(Span)), withUnderlineMeta),
  flow(withComponent(asEditableLink()(asLink(A))), withLinkMeta),
  ...itemsSimple,
  flow(withComponent(asAlignLeft(Div)), withAlignLeftMeta),
  flow(withComponent(asAlignRight(Div)), withAlignRightMeta),
  flow(withComponent(asAlignCenter(Div)), withAlignCenterMeta),
  flow(withComponent(asAlignJustify(Div)), withAlignJustifyMeta),
];

const itemsFullFeatured = [
  ...itemsBasic,
  flow(withComponent(asHeader1(H1)), withHeader1Meta),
  flow(withComponent(asHeader2(H2)), withHeader2Meta),
];
const EditorSimple = withItems(itemsSimple)(RichText);
const EditorBasic = withItems(itemsBasic)(RichText);
const EditorFullFeatured = withItems(itemsFullFeatured)(RichText);
const asEditorBasic = asEditor(EditorBasic);
const asEditorSimple = asEditor(EditorSimple);
const asEditorFullFeatured = asEditor(EditorFullFeatured);
export {
  EditorBasic,
  EditorFullFeatured,
  asEditorBasic,
  asEditorFullFeatured,
  EditorSimple,
  asEditorSimple,
};
