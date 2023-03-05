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

import omit from 'lodash/omit';
import { vitalSpacing, vitalTypography } from '@bodiless/vital-elements';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText
} from '@bodiless/vital-editors';
import { withNodeKey } from '@bodiless/core';
import {
  on, replaceWith, Fragment, as
} from '@bodiless/fclasses';
import { vitalLayout, LayoutClean } from '@bodiless/vital-layout';
import { asStyleGuideTemplateToken } from '../StyleGuideTemplateClean';

const Default = asStyleGuideTemplateToken({
  Components: {
    Wrapper: on(LayoutClean)(vitalLayout.Default),
  },
  Editors: {
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Description: on(RichTextClean)(vitalRichText.Default),
  },
  Schema: {
    Title: withNodeKey('title'),
    Description: withNodeKey('description'),
    Examples: withNodeKey('examples'),
  },
  Meta: {
    title: 'Default',
  },
  Theme: {
    TitleWrapper: vitalTypography.H1,
    Container: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
  },
});

const NoLayout = asStyleGuideTemplateToken(omit(Default, 'Components'), {
  Components: {
    ...Default.Components,
    Wrapper: replaceWith(Fragment),
  },
  Layout: {
    TitleWrapper: 'container mx-auto',
    DescriptionWrapper: 'container mx-auto',
  },
});

export default {
  Default,
  NoLayout,
};
