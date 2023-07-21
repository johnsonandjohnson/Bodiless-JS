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

import { asReadOnly } from '@bodiless/core';
import { withNodeKey } from '@bodiless/data';
import { withoutLinkWhenLinkDataEmpty } from '@bodiless/components';
import {
  withDesign,
  stylable,
  flowHoc,
  as,
  replaceWith,
} from '@bodiless/fclasses';
import {
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import { vitalColor, vitalTextDecoration, vitalTypography } from '@bodiless/vital-elements';
import { asBreadcrumbsToken } from '../BreadcrumbsClean';

/**
  * Token which produces the Base Vital Breadcrumbs.
  */
const Base = asBreadcrumbsToken({
  Core: {
    _: asBreadcrumbs,
    NavWrapper: stylable,
    Separator: replaceWith(() => null),
    FinalTrail: withDesign({
      Link: withoutLinkWhenLinkDataEmpty,
    }),
  },
  A11y: {
    Wrapper: 'space-x-2 divide-x-2 divide-black-300'
  },
  Schema: {
    _: flowHoc(
      withNodeKey({ nodeCollection: 'site' }),
      withMenuTitleEditors(undefined, asReadOnly),
      withEditableStartingTrail(undefined, { nodeCollection: 'site' }),
      withEditableFinalTrail(),
    ),
  },
  Layout: {
    Wrapper: 'inline-flex',
  },
  Spacing: {
    Wrapper: 'my-3',
    Item: 'ps-2',
  },
  Theme: {
    Wrapper: as(
      vitalTextDecoration.Uppercase,
      vitalTypography.Rest,
    ),
    StartingTrail: vitalColor.TextPrimaryInteractiveHover,
    Title: vitalColor.TextPrimaryInteractiveHover,
    Item: 'last:font-bold',
  },
});

/**
  * Token which produces the Default Vital Breadcrumbs.
  */
const Default = asBreadcrumbsToken(
  {
    ...Base,
  },
);

/**
  * Breadcrumbs Token Definition Object.
  * Contains Token variations that can be used to transform BreadcrumbsClean.
  */
export default {
  Base,
  Default,
};
