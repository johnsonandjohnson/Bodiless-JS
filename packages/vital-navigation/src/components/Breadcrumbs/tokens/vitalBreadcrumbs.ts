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
import { withoutLinkWhenLinkDataEmpty } from '@bodiless/components';
import {
  withDesign,
  addProps,
  stylable,
  flowHoc,
} from '@bodiless/fclasses';
import {
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withMenuTitleEditors,
} from '@bodiless/navigation';
import { vitalTypography } from '@bodiless/vital-elements';
import { asBreadcrumbsToken } from '../BreadcrumbsClean';

/**
  * Token which produces the Base Vital Breadcrumbs.
  */
const Base = asBreadcrumbsToken({
  Core: {
    _: asBreadcrumbs,
    NavWrapper: stylable,
    Separator: addProps({ children: '·' }),
    FinalTrail: withDesign({
      Link: withoutLinkWhenLinkDataEmpty,
    }),
  },
  Schema: {
    _: flowHoc(
      withMenuTitleEditors(undefined, asReadOnly),
      withEditableStartingTrail(undefined, { nodeCollection: 'site' }),
      withEditableFinalTrail(),
    ),
  },
  Layout: {
    Wrapper: 'inline-flex',
    Separator: 'hidden lg:flex',
  },
  Spacing: {
    Separator: 'mx-1',
    Wrapper: 'my-3',
  },
  Theme: {
    StartingTrail: vitalTypography.Link,
    Title: vitalTypography.Link,
    Item: '',
    Separator: '',
  },
});

/**
  * Token which produces the Default Vital Breadcrumbs.
  * @todo We should add responive variants here.
  */
const Default = asBreadcrumbsToken({
  ...Base,
});

/**
  * Breadcrumbs Token Definition Object.
  * Contains Token variations that can be used to transform BreadcrumbsClean.
  */
export default {
  Base,
  Default,
};
