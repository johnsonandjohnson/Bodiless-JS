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

import React, { FC } from 'react';
import { flow } from 'lodash';
import {
  ContextWrapperProps, ContextWrapper as PlainContextWrapper,
} from '@bodiless/core';
import {
  addClasses,
  addClassesIf,
  withoutProps,
  hasProp,
  removeClassesIf,
} from '@bodiless/fclasses';
import { Div } from '@bodiless/ui';

type VariantProps = {
  isActive?: boolean;
};

const isActive = (props: any) => hasProp('isActive')(props);
const ContextWrapperDiv = flow(
  withoutProps<VariantProps>(['isActive']),
  addClasses('bl-border bl-border-transparent'),
  addClassesIf(isActive)('bl-border-red'),
  removeClassesIf(isActive)('bl-border-transparent'),
)(Div);

const ui = {
  ContextWrapper: ContextWrapperDiv,
};

const ContextWrapper: FC<ContextWrapperProps> = props => (
  <PlainContextWrapper {...props} ui={ui} />
);

export default ContextWrapper;
