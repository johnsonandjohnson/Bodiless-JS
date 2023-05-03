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
import ResizeObserver from 'resize-observer-polyfill';

import React, {
  ComponentType as CT,
  useEffect,
  useRef,
  useState,
} from 'react';
import { HOC } from '@bodiless/fclasses';
import { observer } from './mobx.bl-edit';
import { useContextActivator } from './hooks';
import LocalContextMenu from './components/LocalContextMenu.bl-edit';
import { withClickOutside, withExtendHandler, withOnlyProps } from './hoc.static';
import type { resizeDetectorProps, ClickOutsideProps } from './hoc.static';

/**
 * Creates an HOC which provides the base component event handler which activates the current
 * context.
 *
 * @param event
 * The event which should trigger the context activation.
 *
 * @returns
 * An HOC which injects the event handler.
 */
export const withContextActivator = (
  event: string = 'onClick',
): HOC => Component => observer((props: any) => {
  const activator = useContextActivator(event, props[event]);
  return <Component {...props} {...activator} />;
});

/**
 * HOC which attaches a local context menu to the base component.
 * A component with a local context menu will display a hovering
 * toolbar with context menu options when it is the innermost such
 * component in an active context.
 *
 * @param Component
 * The base component.
 *
 * @returns
 * A component with local context menu attached.
 */
export const withLocalContextMenu: HOC = Component => {
  const WithLocalContextMenu = (props: any) => (
    // @ts-ignore
    <LocalContextMenu>
      <Component {...props} />
    </LocalContextMenu>
  );
  return WithLocalContextMenu;
};

/**
 * Utility hoc to add resize detector to the original component.
 * Optionally a callback can be provided by the component.
 * If the callback is not provided, as default the component is rendered at resize.
 *
 * @return An HOC which will detect resize.
 */
export const withResizeDetector = <P extends object>(Component: CT<P> | string) => {
  const WithResizeDetector = (props: P & resizeDetectorProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });
    const defaultOnResizeObserver = () => {
      if (ref.current) {
        const { width, height } = ref.current.getBoundingClientRect();
        if (width !== size.width || height !== size.height) {
          setSize({ width, height });
        }
      }
    };

    const { onResizeObserver = defaultOnResizeObserver } = props;

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      onResizeObserver(ref, entries);
    });

    useEffect(() => {
      if (ref.current) {
        resizeObserver.observe(ref.current);
      }
    }, [Component]);

    return (
      <div ref={ref}>
        <Component dimensions={size} {...props} />
      </div>
    );
  };

  return WithResizeDetector;
};

export {
  withOnlyProps,
  withExtendHandler,
  withClickOutside,
};

export type {
  ClickOutsideProps,
  resizeDetectorProps,
};
