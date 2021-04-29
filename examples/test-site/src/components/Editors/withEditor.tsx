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

import { ComponentType } from 'react';
import { withChild, withNodeKey } from '@bodiless/core';
import {
  addClasses, withoutProps, asToken, addProps, Token,
} from '@bodiless/fclasses';

const withPlaceholder = (
  placeholder?: string,
): Token|undefined => (placeholder === undefined ? undefined : addProps({ placeholder }));

const withEditor = (Editor:ComponentType<any>) => (nodeKey?: string, placeholder?: string) => (
  asToken(
    addClasses('overflow-hidden'),
    withChild(asToken(
      withPlaceholder(placeholder),
      withNodeKey(nodeKey),
      withoutProps(['design']),
    )(Editor), 'Editor'),
  )
);
export default withEditor;
export { withPlaceholder };
