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

import React, { FC, HTMLProps } from 'react';
import { FlowContainer as FlowContainerClean, FlowContainerProps } from '@bodiless/layouts';
import { ui as componentSelectorUI } from './ComponentSelector';
import Wrapper from './SortableResizableWrapper';

const SnapIndicator:FC<HTMLProps<HTMLDivElement>> = props => (
  <div {...props} className="bl-bg-black bl-rounded bl-p-2 bl-text-white bl-rounded bl-absolute bl-z-100 bl-right-0" />
);

const ui = {
  ...componentSelectorUI,
  Wrapper,
  SnapIndicator,
};

/**
 * A FlowContainer is a component which allows a content editor to select and place
 * components.
 */
const FlowContainer: FC<FlowContainerProps> = props => (
  <FlowContainerClean ui={ui} {...props} />
);

export default FlowContainer;
