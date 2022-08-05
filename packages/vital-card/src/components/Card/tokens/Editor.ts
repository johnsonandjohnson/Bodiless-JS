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
import { withNodeKey } from '@bodiless/core';
import { on } from '@bodiless/fclasses';
import { withPlaceholder } from '@bodiless/components';
import { asBodilessLink } from '@bodiless/components-ui';
import { vitalImage } from '@bodiless/vital-image';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  EditorPlainClean, vitalEditorPlain, RichTextClean, vitalRichText,
} from '@bodiless/vital-editors';
import { asCardToken } from '../CardClean';
import type { CardToken } from '../CardClean';
import { CardNodeKeys } from './constants';

const RTENoTheme = asFluidToken(omit(vitalRichText.BasicNoLink, 'Theme'));

const WithBodilessEditor = asCardToken({
  Editors: {
    Wrapper: asBodilessLink(),
    Title: on(EditorPlainClean)(vitalEditorPlain.Default),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
    Description: on(RichTextClean)(RTENoTheme),
    CTAText: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Title: withPlaceholder('Card Title'),
    Eyebrow: withPlaceholder('Card Eyebrow'),
    Description: withPlaceholder('Card Description'),
    CTAText: withPlaceholder('Call To Action Link'),
  },
  Schema: {
    Title: withNodeKey(CardNodeKeys.Title),
    Eyebrow: withNodeKey(CardNodeKeys.Eyebrow),
    Description: withNodeKey(CardNodeKeys.Description),
    Image: withNodeKey(CardNodeKeys.Image),
    CTAText: withNodeKey(CardNodeKeys.CTA),
  },
  Components: {
    Image: vitalImage.Default,
  },
});

export interface VitalCardBodilessEditor {
  /**
   * Defines the Cards using BodilessJS editor
   */
  WithBodilessEditor: CardToken,
}

export default WithBodilessEditor;
