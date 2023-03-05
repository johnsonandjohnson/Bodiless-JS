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
  flowHoc, startWith, as, on
} from '@bodiless/fclasses';
import { LinkClean, vitalLink } from '@bodiless/vital-link';
import { withEditorPlain, withEditorRich } from '@bodiless/vital-editors';
import { asListToken } from '../ListClean';
import { TitleInfographicClean, vitalTitleInfographic } from '../../TitleInfographic';

const WithPlainTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Plain Text'),
  Schema: {
    Title: withEditorPlain('title', 'Item'),
  },
});

const WithInfographicTitle = asListToken({
  Components: {
    Title: on(TitleInfographicClean)(vitalTitleInfographic.Default),
  },
  Spacing: {
    Wrapper: 'space-y-4',
  },
  Meta: flowHoc.meta.term('Title')('Infographic'),
});

const WithLinkedTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Links'),
  Schema: {
    Title: as(
      startWith(LinkClean),
      withEditorPlain('title', 'Link'),
      vitalLink.Sidecar,
    ),
  },
});

const WithRichTitle = asListToken({
  Meta: flowHoc.meta.term('Title')('Rich Text'),
  Schema: {
    Title: withEditorRich('title', 'Item'),
  },
});

const WithIndent = asListToken({
  Spacing: {
    Wrapper: 'pl-10 ltr:pl-10 rtl:pr-10',
  },
});

const WithBullets = asListToken({
  Meta: flowHoc.meta.term('Decoration')('Bullets'),
  Layout: {
    Wrapper: 'list-disc',
  },
  Spacing: {
    Wrapper: 'pl-5 ltr:pl-5 rtl:pr-5',
  },
});

const WithNumbers = asListToken({
  Meta: flowHoc.meta.term('Decoration')('Numbers'),
  Layout: {
    Wrapper: 'list-decimal',
  },
  Spacing: {
    Wrapper: 'pl-5 ltr:pl-5 rtl:pr-5',
  },
});

const Default = asListToken({
  Meta: flowHoc.meta.term('Type')('List'),
});

const DefaultWithRichTitle = asListToken({
  ...Default,
  ...WithRichTitle,
});
export default {
  Default,
  DefaultWithRichTitle,
  WithIndent,
  WithBullets,
  WithRichTitle,
  WithInfographicTitle,
  WithLinkedTitle,
  WithNumbers,
  WithPlainTitle,
};
