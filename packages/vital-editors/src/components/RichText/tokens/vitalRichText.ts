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
  replaceWith,
  P,
  HOC,
  flowHoc,
  as,
  addProps,
  H4,
  H5,
  startWith,
} from '@bodiless/fclasses';
import {
  asBlock,
  createLinkDeserializer,
  withHtmlDeserializer,
  asPreview,
  withBoldMeta,
  withSuperScriptMeta,
  withHeader1Meta,
  withHeader2Meta,
  withHeader3Meta,
  withHeader4Meta,
  withHeader5Meta,
} from '@bodiless/richtext';
import {
  DefaultNormalHref,
} from '@bodiless/components';
import { ifComponentSelector } from '@bodiless/layouts';
import {
  asVitalTokenSpec,
  vitalTextDecoration,
  vitalTypography,
} from '@bodiless/vital-elements';
import { LinkClean, vitalLink } from '@bodiless/vital-link';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: ((href: string) => (
      new DefaultNormalHref(href).toString()
    )) as any,
  }),
) as HOC;

const AsFlowContainerItem = asVitalTokenSpec()({
  Core: {
    _: as(
      ifComponentSelector(asPreview),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Text Editor'),
});

const Default = asVitalTokenSpec()({
  Core: {
    paragraph: as(replaceWith(P), asBlock as HOC),
    Bold: withBoldMeta,
    Link: replaceWith(LinkClean),
    SuperScript: withSuperScriptMeta,
    H1: withHeader1Meta,
    H2: withHeader2Meta,
    H3: withHeader3Meta,
    H4: as(
      startWith(H4),
      withHeader4Meta,
    ),
    H5: as(
      startWith(H5),
      withHeader5Meta,
    ),
  },
  Content: {
    _: addProps({ placeholder: 'Text Area' }),
  },
  Theme: {
    paragraph: vitalTypography.Body,
    Bold: vitalTextDecoration.Bold,
    SuperScript: vitalTextDecoration.Superscript,
    H1: vitalTypography.H1,
    H2: vitalTypography.H2,
    H3: vitalTypography.H3,
    H4: vitalTypography.H4,
    H5: vitalTypography.H5,
    Link: vitalLink.Default,
  },
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    AsFlowContainerItem,
  },
});

const Basic = asVitalTokenSpec()({
  ...Default,
  Core: pick(Default.Core, 'paragraph', 'Bold', 'Link', 'SuperScript'),
  Theme: pick(Default.Theme, 'paragraph', 'Bold', 'Link', 'SuperScript'),
});

const BasicNoLink = asVitalTokenSpec()({
  ...Basic,
  Core: pick(Basic.Core, 'paragraph', 'Bold', 'SuperScript'),
  Theme: pick(Basic.Theme, 'paragraph', 'Bold', 'SuperScript'),
  Behavior: {},
});

export default {
  Default,
  Basic,
  BasicNoLink,
  AsFlowContainerItem,
};
