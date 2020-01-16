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

import { flow } from 'lodash';
import React, { ComponentType } from 'react';
import { withChild, withNodeKey } from '@bodiless/core';

type WithInitialValue = {
  placeholder: string;
};
const withPlaceholder = (placeholder: string) => (
  <P extends Object> (Component: ComponentType<P & WithInitialValue>) => (props:P) => (
    <Component placeholder={placeholder} {...props} />
  )
);
const asEditor = (Editor:ComponentType<any>) => (nodeKey?: string, placeholder?: string) => (
  withChild(flow(
    withPlaceholder(placeholder),
    withNodeKey(nodeKey),
  )(Editor))
);
export default asEditor;
