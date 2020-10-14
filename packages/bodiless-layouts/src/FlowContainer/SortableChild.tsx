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
import SlateSortableResizable from '../SlateSortableResizable';
import { defaultSnapData } from './utils/appendTailwindWidthClass';
import { SortableChildProps } from './types';

const RESIZE_THROTTLE_INTERVAL: number = 100;
const createThrottledOnResizeStop = (onResizeStop: ResizeCallback) => (
  throttle(onResizeStop, RESIZE_THROTTLE_INTERVAL)
);
const FALLBACK_SNAP_CLASSNAME = 'w-full';

const SortableChild = (props: SortableChildProps) => {
  const {
    onResizeStop,
    flowContainerItem,
    snapData: snapRaw,
    defaultWidth,
    className: classNameRaw,
    ...restProps
  } = props;
  const snap = snapRaw || defaultSnapData;
  const {
    width: minWidth,
  } = snap({
    width: 0,
    className: '',
  });
  const passedSnapClassName = defaultWidth && defaultWidth(snap);
  // local classname is used to store intermidiary classname state,
  // so className is stored only onResizeStop
  // we are only getting a class from the default Width if we have a default width
  const [snapClassName, setSnapClassName] = useState(
    (flowContainerItem.wrapperProps && flowContainerItem.wrapperProps.className)
      || passedSnapClassName
      || FALLBACK_SNAP_CLASSNAME,
  );
  // Store what with aligns with the current class
  const [snapWidth, setSnapWidth] = useState('');
  // We start this off as not set so that the classes are used
  const [size, setSize] = useState({
    height: '',
    width: '',
    // width: `${snap({ className: snapClassName }).width}%`,
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
  useEffect(() => (
    // Call resize handler on component's unmount
    // to make sure the correct wrapper classname is set
    // even if the component was never be resized manually.
    onResizeStop({
      className: snapClassName,
    })
  ), []);
  useLayoutEffect(() => {
    const elm: HTMLElement | null = document.querySelector(`[uuid='${flowContainerItem.uuid}']`);
    // we have to remove the style width when we have arrived at our correct size
    // This has to be done because the re-resizeable component set the width from the
    // size prop and you can not set the size prop width to a non value (only auto or a size)
    setTimeout(
      () => {
        if (elm && elm.style.width === snapWidth) {
          elm.style.height = '';
          elm.style.width = '';
        }
      },
      1,
    );
  });
  const classNameOut = [...snapClassName.split(' '), ...(classNameRaw || '').split(' ')].join(' ');
  return (
    <SlateSortableResizable
      uuid={flowContainerItem.uuid}
      onResize={onResize}
      onResizeStop={createThrottledOnResizeStop(() => {
        onResizeStop({
          className: snapClassName,
        });
        updateSizeWithWidth();
      })}
      size={size}
      minWidth={`${minWidth * 0.99}%`}
      className={classNameOut}
      {...restProps}
    />
  );
};

SortableChild.displayName = 'SortableChild';

SortableChild.defaultProps = {
  onResizeStop: () => {},
};

export default SortableChild;
