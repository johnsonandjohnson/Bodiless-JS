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

import React, { useState, useEffect, useCallback } from 'react';
import throttle from 'lodash/throttle';
import { ResizeCallback } from 're-resizable';
import { observer } from 'mobx-react-lite';
import SlateSortableResizable, { getUI } from '../SlateSortableResizable';
import { defaultSnapData } from './utils/appendTailwindWidthClass';
import { SortableChildProps } from './types';

const RESIZE_THROTTLE_INTERVAL: number = 100;
export const FALLBACK_SNAP_CLASSNAME = 'w-full';

/**
 * This is the component which wraps all items in the flow container. You probably
 * only need to use it directly if you are customizing the Admin UI.
 */
const SortableChild = observer((props: SortableChildProps) => {
  const {
    flowContainerItem,
    onResizeStop: onResizeStopProp = () => undefined,
    snapData = defaultSnapData,
    getDefaultWidth = () => FALLBACK_SNAP_CLASSNAME,
    className: classNameProp = '',
    ui,
    children,
    ...restProps
  } = props;

  // These are the classes which control width when not resizing. The come from
  // the flow container item, or from the default width callback.
  const widthClasses = flowContainerItem.wrapperProps?.className || getDefaultWidth(snapData);

  // We need the starting width so we can set defaultSize on the re-resizeable.
  // This ensures that we get back % during resize (otherwise we get pixels).
  const { width: startingWidth } = snapData({ className: widthClasses });

  // Track the snap width during resize so we can display it.
  const [snapWidth, setSnapWidth] = useState<number|undefined>(undefined);
  const onResize: ResizeCallback = useCallback((e, dir, ref) => {
    const { width } = snapData({
      className: widthClasses,
      width: ref.style.width ? parseInt(ref.style.width, 10) : startingWidth,
    });
    setSnapWidth(width);
  }, [widthClasses, startingWidth]);

  // When resizing is complete, clear the snap width and notify the flow container
  // of the selected classes.
  const onResizeStop: ResizeCallback = useCallback((e, dir, ref) => {
    setSnapWidth(undefined);
    const { className } = snapData({
      className: widthClasses,
      width: ref.style.width ? parseInt(ref.style.width, 10) : startingWidth,
    });
    if (onResizeStopProp) onResizeStopProp({ className });
  }, [widthClasses, startingWidth, onResizeStopProp]);

  // we have to remove the width style when we are done resizing so that our responsive
  // classes will control width. Otherwise the width will be fixed at all breakpoints.
  // We need to do this onEffect bc we have to find the actual dom element.
  const resizing = snapWidth !== undefined;
  useEffect(() => {
    if (resizing) return;
    const elm: HTMLElement | null = document.querySelector(`[uuid='${flowContainerItem.uuid}']`);
    if (elm) {
      elm.style.height = '';
      elm.style.width = '';
    }
  }, [resizing]);

  const { width: minWidth } = snapData({ width: 0, className: '' });
  const className = [...widthClasses.split(' '), ...(classNameProp).split(' ')].join(' ');
  const { SnapIndicator } = getUI(ui);
  return (
    <SlateSortableResizable
      uuid={flowContainerItem.uuid}
      onResize={onResize}
      onResizeStop={throttle(onResizeStop, RESIZE_THROTTLE_INTERVAL)}
      // Set min width a bit smaller to ensure user can drag there, and provide snap back effect.
      minWidth={`${minWidth * 0.9}%`}
      // Set default size to starting width so we get sizes in %.
      defaultSize={{
        width: `${startingWidth}%`,
        height: 'auto',
      }}
      className={className}
      ui={ui}
      {...restProps}
    >
      {resizing && (
        // Show a label indicating where we'll snap to.
        <SnapIndicator>
          {`${Math.round(snapWidth!)}%`}
        </SnapIndicator>
      )}
      {children}
    </SlateSortableResizable>
  );
});

export default SortableChild;
