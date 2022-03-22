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
  withUnderlineMeta,
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
  asCxTokenSpec, cxTextDecorationStatic, cxTypographyStatic,
} from '@bodiless/cx-elements';
import { LinkClean, cxLink } from '@bodiless/cx-link';

const withLinkDeserializer = withHtmlDeserializer(
  createLinkDeserializer({
    normalizeHref: ((href: string) => (
      new DefaultNormalHref(href).toString()
    )) as any,
  }),
) as HOC;

const AsFlowContainerItem = asCxTokenSpec()({
  Core: {
    _: as(
      ifComponentSelector(asPreview),
    ),
  },
  Meta: flowHoc.meta.term('Type')('Text Editor'),
});

const Default = asCxTokenSpec()({
  Core: {
    paragraph: as(replaceWith(P), asBlock as HOC),
    Bold: withBoldMeta,
    Underline: withUnderlineMeta,
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
    _: addProps({ placeholder: 'Placeholder' }),
  },
  Components: {
    paragraph: cxTypographyStatic.Body,
    Bold: cxTextDecorationStatic.Bold,
    Underline: cxTextDecorationStatic.Underline,
    SuperScript: cxTextDecorationStatic.Superscript,
    H1: cxTypographyStatic.H1,
    H2: cxTypographyStatic.H2,
    H3: cxTypographyStatic.H3,
    H4: cxTypographyStatic.H4,
    H5: cxTypographyStatic.H5,
    Link: cxLink.Default,
  },
  Behavior: {
    Link: withLinkDeserializer,
  },
  Compose: {
    AsFlowContainerItem,
  },
});

export default { Default, AsFlowContainerItem };
