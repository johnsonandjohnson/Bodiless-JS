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
import { Div } from '@bodiless/ui';
import { addClasses, withoutProps } from '@bodiless/fclasses';
import { HoverMenu } from '@bodiless/richtext';
import type { HoverMenuProps } from '@bodiless/richtext';
import { flow } from 'lodash';

const Menu = flow(
  withoutProps<HoverMenuProps>(['ui']),
  addClasses(`
    bl-border bl-border-transparent bl-absolute bl-bg-gray-900
    bl-rounded bl-opacity-0 bl-px-grid-1 bl-py-grid-1 bl-text-gray-400 bl--mt-2
    bl-transition-opacity bl-z-50 bl-invisible
  `),
)(Div);

const ui = {
  Menu,
};

const StyledHoverMenu: FC<HoverMenuProps> = (props: HoverMenuProps) => (
  <HoverMenu {...props} ui={ui} />
);

export default StyledHoverMenu;
