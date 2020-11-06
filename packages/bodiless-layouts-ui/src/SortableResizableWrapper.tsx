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
import { SortableElementProps } from 'react-sortable-hoc';
import {
  SortableResizableWrapper as CleanWrapper,
  SortableResizableUI,
  SortableResizableProps,
} from '@bodiless/layouts';
import { ResizeHandle } from '@bodiless/ui';
import Reresizable from './Reresizable';
import DragHandle from './DragHandle';

const ui: SortableResizableUI = {
  Reresizable,
  ResizeHandle,
  DragHandle,
};

const Wrapper: FC<SortableResizableProps & SortableElementProps> = ({ className, ...rest }) => {
  const className$ = `${className} bl-relative`;
  return <CleanWrapper ui={ui} className={className$} {...rest} />;
};

export default Wrapper;
