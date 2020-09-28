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
  withSidecarNodes,
  withNode,
  withNodeKey,
  withNodeDataHandlers,
  withEditFormSnippet as withBaseEditFormSnippet,
  withoutProps,
  withData,
} from '@bodiless/core';
import type {
  WithNodeKeyProps,
  EditFormSnippetOptions,
} from '@bodiless/core';
import { flowRight } from 'lodash';

const withEditFormSnippet = (
  nodeKeys?: WithNodeKeyProps,
  defaultData?: object,
  snippetOptions?: EditFormSnippetOptions
) => withSidecarNodes(
  flowRight(
    withNodeKey(nodeKeys),
    withNode,
    withNodeDataHandlers(defaultData),
    withBaseEditFormSnippet(snippetOptions),
    withoutProps('setComponentData'),
    withData,
  ),
);

export default withEditFormSnippet;