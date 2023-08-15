/**
 * Copyright © 2019 Johnson & Johnson
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
// @ts-nocheck
import flowRight from 'lodash/flowRight';
import {
  ifEditable, ifReadOnly, withOnlyProps,
} from '@bodiless/core';
import {
  withNode,
} from '@bodiless/data';
import {
  replaceWith, addProps, stylable,
} from '@bodiless/fclasses';
import { Fragment } from 'react';
import asBodilessLink from './Link/asBodilessLink';
import { withToggleTo, withWrapOnSubmit } from './Toggle';

const EmptyToggle = flowRight(
  ifEditable(
    withWrapOnSubmit,
    asBodilessLink(),
    replaceWith('span'),
  ),
  ifReadOnly(
    withNode,
  ),
  withOnlyProps('key', 'children'),
)(Fragment);

/**
 * @deprecated
 */
const withLinkToggle = flowRight(
  stylable,
  ifEditable(
    addProps({ 'aria-label': 'Link Toggle' }),
  ),
  withNode,
  withToggleTo(EmptyToggle),
);

export default withLinkToggle;
