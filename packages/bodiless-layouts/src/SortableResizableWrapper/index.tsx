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

import { SortableElement, SortableHandle } from 'react-sortable-hoc';
import React, { ComponentType, HTMLProps } from 'react';
import CleanReresizable, { ResizeCallback, ResizableProps } from 're-resizable';
import { SnapData } from '../FlowContainer/utils/appendTailwindWidthClass';

const ENABLED_DRAG_SIDES = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};
const DISABLED_DRAG_SIDES = {
  top: false,
  right: false,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

type FinalUI = {
  DragHandle: ComponentType<HTMLProps<HTMLSpanElement>> | string,
  ResizeHandle: ComponentType<HTMLProps<HTMLSpanElement>> | string,
  Reresizable: ComponentType<ResizableProps & { isEnabled?: boolean }>,
};

export type UI = Partial<FinalUI>;

const defaultUI: FinalUI = {
  DragHandle: 'span',
  ResizeHandle: 'span',
  Reresizable: CleanReresizable,
};

const getUI = (ui: UI = {}) => ({ ...defaultUI, ...ui });

export type Props = {
  isEnabled: boolean;
  children: React.ReactNode;
  className: string;
  snapData?: SnapData;
  onClick?: React.MouseEventHandler;
  onResize?: ResizeCallback;
  defaultSize?: {
    width?: string | number | undefined;
    height?: string | number | undefined;
  };
  onResizeStop?: ResizeCallback;
  ui?: UI;
};

const Handle = SortableHandle(({ component: Component, ...rest }: any) => (
  <Component {...rest} />
));

const SortableResizableWrapper = SortableElement((props: Props) => {
  const {
    isEnabled, children, className, ui, ...resizableProps
  } = props;

  const { DragHandle, ResizeHandle, Reresizable } = getUI(ui);

  const childrenWithDragHandle = (
    <React.Fragment>
      <Handle
        component={DragHandle}
        style={{
          display: isEnabled ? 'block' : 'none',
        }}
      />
      {children}
    </React.Fragment>
  );

  return (
    <Reresizable
      enable={isEnabled ? ENABLED_DRAG_SIDES : DISABLED_DRAG_SIDES}
      isEnabled={isEnabled}
      scale={1}
      className={className}
      handleComponent={{
        right: ResizeHandle,
      }}
      {...resizableProps}
    >
      {childrenWithDragHandle}
    </Reresizable>
  );
});

SortableResizableWrapper.defaultProps = {
  className: '',
  onClick: () => {},
  onResize: () => {},
  defaultSize: {
    width: '',
    height: '',
  },
  isEnabled: true,
};

export default SortableResizableWrapper;
