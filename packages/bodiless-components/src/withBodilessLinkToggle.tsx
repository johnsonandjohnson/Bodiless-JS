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

import { Fragment } from 'react';
import {
  withSidecarNodes,
  ifReadOnly, ifEditable, withOnlyProps,
} from '@bodiless/core';
import { flowRight, identity } from 'lodash';
import { replaceWith, withoutProps, withDesign } from '@bodiless/fclasses';
import type { HOC } from '@bodiless/fclasses';
import { withChameleonComponentFormControls, applyChameleon, withChameleonContext } from './Chameleon';

const SafeFragment = withOnlyProps('key', 'children')(Fragment);
const Span = withoutProps('')('span');

const withBodilessLinkToggle = (asEditableLink: HOC) => flowRight(
  withDesign({
    _default: flowRight(
      ifEditable(replaceWith(Span)),
      ifReadOnly(replaceWith(SafeFragment)),
    ),
    Link: identity,
  }),
  withChameleonContext('link-toggle'),
  withChameleonComponentFormControls,
  withSidecarNodes(
    asEditableLink,
  ),
  applyChameleon,
);

export default withBodilessLinkToggle;
