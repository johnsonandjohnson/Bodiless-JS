/**
 * Copyright © 2020 Johnson & Johnson
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
  BreadcrumbsClean,
  asBreadcrumbs,
  withEditableStartingTrail,
  withEditableFinalTrail,
  withBreadcrumbEditors as withDefaultBreadcrumbEditors,
} from '@bodiless/navigation';
import { asToken } from '@bodiless/fclasses';

import { withBreadcrumbStyles } from './MenuBreadcrumbs.token';

const withBreadcrumbEditors = asToken(
  withDefaultBreadcrumbEditors,
  withEditableStartingTrail({ nodeCollection: 'site' }),
  withEditableFinalTrail(),
);

const Breadcrumbs = asToken(
  asBreadcrumbs,
  withBreadcrumbEditors,
  withBreadcrumbStyles,
)(BreadcrumbsClean);

export default Breadcrumbs;
