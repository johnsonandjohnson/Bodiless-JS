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

import React from 'react';
import { getUI as getFormUI } from '../contextMenuForm';
import { IContextMenuProps as IProps, UI } from '../Types/ContextMenuTypes';
import { TMenuOption } from '../PageEditContext/types';
import ContextMenuItem from './ContextMenuItem';

const defaultUI = {
  Toolbar: 'div',
  ToolbarDivider: 'hr',
};

const getDivider = (index: Number): TMenuOption => ({
  name: `__divider-${index}`,
  icon: '',
  isActive: () => false,
  handler: () => undefined,
});

export const getUI = (ui: UI = {}) => ({
  ...defaultUI,
  ...getFormUI(),
  ...ui,
});

const ContextMenu = (props: IProps) => {
  if (typeof window === 'undefined') {
    return <React.Fragment />;
  }

  const { options } = props;
  const { ui } = props;
  const { Toolbar } = getUI(ui);

  const elements = options
    // Inject dividers
    .reduce(
      (acc: TMenuOption[], op: TMenuOption, currentIndex: Number) => (
        acc.length && acc[acc.length - 1].group
          !== op.group
          ? [...acc, getDivider(currentIndex), op]
          : [...acc, op]),
      [] as TMenuOption[],
    )
    .map(
      (option, index) => (
        <ContextMenuItem
          option={option}
          index={index}
          key={option.name}
          aria-label={option.name}
          ui={ui}
        />
      ),
    );

  if (elements.length > 0) {
    return (
      <Toolbar onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        {elements}
      </Toolbar>
    );
  }

  return null;
};

export default ContextMenu;
