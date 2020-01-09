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

import React, { useState, useEffect, useLayoutEffect } from 'react';
import throttle from 'lodash/throttle';
import { ResizeCallback } from 're-resizable';
import { useEditContext } from '@bodiless/core';
import SlateSortableResizable, { UI as SortableResizableUI } from '../SlateSortableResizable';
import {
  defaultSnapData, SnapData,
} from './utils/appendTailwindWidthClass';
import { FlexboxItem, FlexboxItemProps } from './types';

const RESIZE_THROTTLE_INTERVAL: number = 100;
const createThrottledOnResizeStop = (onResizeStop: ResizeCallback) => (
  throttle(onResizeStop, RESIZE_THROTTLE_INTERVAL)
);
const FALLBACK_SNAP_CLASSNAME = 'w-full';

type SortableChildProps = {
  flexboxItem: FlexboxItem;
  onResizeStop(props: FlexboxItemProps): void;
  onDelete(): void;
  index: number;
  children: React.ReactNode;
  ui?: SortableResizableUI;
  snapData?: SnapData;
  defaultSize?: { width: (number | string), height: (number | string) };
};

const SortableChild = (props: SortableChildProps) => {
  const {
    onResizeStop, flexboxItem, onDelete, snapData: snapRaw, ...restProps
  } = props;
  const snap = snapRaw || defaultSnapData;
  const {
    width: minWidth,
    className: passedSnapClassName,
  } = snap({
    width: 0,
    className: '',
  });
  // local classname is used to store intermidiary classname state,
  // so className is stored only onResizeStop
  const [snapClassName, setSnapClassName] = useState(
    (flexboxItem.wrapperProps && flexboxItem.wrapperProps.className)
      || passedSnapClassName
      || FALLBACK_SNAP_CLASSNAME,
  );

  // Store what with aligns with the current class
  const [snapWidth, setSnapWidth] = useState('');
  // Store what size is being used we set the width so that re-sizeable uses percent when resizeing
  // we default the size to what the current class width is.
  // we can not set this to auto becaus then it resizes in pixels and not percent.
  const [size, setSize] = useState({
    height: '',
    width: `${snap({ className: snapClassName }).width}%`,
  });
  // Set the current size to by the stored width
  const updateSizeWithWidth = () => {
    setSize({
      height: '',
      width: snapWidth,
    });
  };
  const onResize: ResizeCallback = (e, direction, ref) => {
    const { className, width } = snap({
      className: snapClassName,
      width: ref.style.width ? parseInt(ref.style.width, 10) : 100,
    });
    setSnapWidth(`${width}%`);
    // Set the class in are state
    setSnapClassName(className);
  };
  const context = useEditContext();
  const onDeleteWrapper = () => {
    onDelete();
    // Activate the current context after the delete (this context is the flexbox)
    context.activate();
  };
  useEffect(() => (
    // Call resize handler on component's unmount
    // to make sure the correct wrapper classname is set
    // even if the component was never be resized manually.
    onResizeStop({
      className: snapClassName,
    })
  ), []);
  useLayoutEffect(() => {
    const elm: HTMLElement | null = document.querySelector(`[uuid='${flexboxItem.uuid}']`);
    // we have to remove the style width when we have arrived at our correct size
    // This has to be done because the re-resizeable component set the width from the
    // size prop and you can not set the size prop width to a non value (only auto or a size)
    setTimeout(
      () => {
        if (elm && elm.style.width === snapWidth) {
          elm.style.width = '';
          elm.style.height = '';
        }
      },
      1,
    );
  });
  return (
    <SlateSortableResizable
      uuid={flexboxItem.uuid}
      onResize={onResize}
      onResizeStop={createThrottledOnResizeStop(() => {
        onResizeStop({
          className: snapClassName,
        });
        updateSizeWithWidth();
      })}
      size={size}
      minWidth={`${minWidth * 0.99}%`}
      className={snapClassName}
      getMenuOptions={() => [
        {
          name: 'delete',
          icon: 'delete',
          handler: onDeleteWrapper,
        },
      ]}
      {...restProps}
    />
  );
};

SortableChild.displayName = 'SortableChild';

SortableChild.defaultProps = {
  onResizeStop: () => {},
};

export default SortableChild;
