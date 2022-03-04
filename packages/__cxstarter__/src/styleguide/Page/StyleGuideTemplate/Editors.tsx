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

import React from 'react';
import { withNodeKey } from '@bodiless/core';
import {
  EditorPlainClean, cxEditorPlain, RichTextClean, cxRichText
} from '@bodiless/cx-editors';
import { asStyleGuideTemplateToken, cxStyleGuideTemplate } from '@bodiless/cx-templates';
import {
  as, flowHoc, replaceWith,
  H3, Section, Pre, Div,
} from '@bodiless/fclasses';
import { cxColor, cxElement } from '@bodiless/cx-elements';

const C = {
  H3: as(cxElement.H3)(H3),
  Example: as('pt-12')(Section),
  Demo: as('p-2 border border-1')(Div),
  Code: as(
    'p-2 mt-2',
    cxColor.BgPrimaryDivider,
    cxColor.TextPrimaryHeaderCopy,
  )(Pre),
};

// @todo auto-generate examples from token collection entries
const Default = as(
  cxEditorPlain.Default,
  withNodeKey('plain-default'),
)(EditorPlainClean);

const WithAutoSuperscript = as(
  cxEditorPlain.Default,
  cxEditorPlain.WithAutoSuperscript,
  withNodeKey('plain-with-super'),
)(EditorPlainClean);

const RichText = as(
  cxRichText.Default,
  withNodeKey('rich-text-default'),
)(RichTextClean);

const Examples = () => (
  <>
    <C.Example>
      <C.H3>Default Plain Text Editor</C.H3>
      <C.Demo>
        <Default />
      </C.Demo>
      <C.Code>
        as(cxEditorPlain.Default)(EditorPlainClean);
      </C.Code>
    </C.Example>
    <C.Example>
      <C.H3>Plain Text Editor with Auto Superscript</C.H3>
      <C.Demo>
        <WithAutoSuperscript />
      </C.Demo>
      <C.Code>
        as(cxEditorPlain.WithAutoSuperscript)(EditorPlainClean);
      </C.Code>
    </C.Example>
    <C.Example>
      <C.H3>Default Rich Text Editor</C.H3>
      <C.Demo>
        <RichText />
      </C.Demo>
      <C.Code>
        as(cxRichText.Default)(RichTextClean);
      </C.Code>
    </C.Example>
  </>
);

export const Editors = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Editors'),
  Content: {
    Title: replaceWith(() => <>Text Editors</>),
    Examples: replaceWith(Examples),
  },
});

const MonoFont = {
  Wrapper: as('font-mono')(Div),
};

const ExamplesMonoFont = () => (
  <>
    <MonoFont.Wrapper>
      <Examples />
    </MonoFont.Wrapper>
  </>
);

export const EditorsMonoFont = asStyleGuideTemplateToken(cxStyleGuideTemplate.Default, {
  Meta: flowHoc.meta.term('Token')('Editors'),
  Content: {
    Title: replaceWith(() => <>Text Editors</>),
    Examples: replaceWith(ExamplesMonoFont),
  },
});
