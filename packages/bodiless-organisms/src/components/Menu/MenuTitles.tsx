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

import { flow, identity } from 'lodash';
import {
  withNode, withNodeKey, withSidecarNodes,
} from '@bodiless/core';
import {
  replaceWith, HOC, stylable, Span, A,
} from '@bodiless/fclasses';
import {
  asBodilessLink, withBodilessLinkToggle, useBreadcrumbContext,
} from '@bodiless/components';
import { ToutClean } from '../Touts';

export const asMenuTout = (withToutEditors: any) => flow(
  replaceWith(ToutClean),
  withToutEditors,
  withNode,
  withNodeKey('title'),
);

/**
 * Hook which can be used to determine if a menu item is part of
 * the current active breadcrumb trail.
 *
 * This hook is only accurate if
 * - The menu is inside a BreadcrumbStoreProvider.
 * - The menu item has been wrapped in asBreadcrumb
 *
 * @return true if the item is in the active trail, false otherwise.
 */
export const useIsActiveTrail = () => useBreadcrumbContext()?.isActive();

export const asMenuLink = (asEditable: HOC, asOff: HOC = replaceWith(Span)) => flow(
  replaceWith(A),
  withSidecarNodes(
    withBodilessLinkToggle(asBodilessLink, asOff)('link'),
  ),
  stylable,
  asEditable,
  withNode,
  withNodeKey('title'),
) as HOC;

export const asDefaultMenuLink = asMenuLink(identity);

export const asDefaultMenuTout = asMenuTout(identity);
