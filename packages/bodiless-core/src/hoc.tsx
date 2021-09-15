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

import { observer } from 'mobx-react-lite';
import React, {
  ComponentType as CT, EventHandler, FC,
  useEffect,
  useRef,
  useState,
} from 'react';
import { flowRight, pick } from 'lodash';
import { HOC, Injector, Token } from '@bodiless/fclasses';
import { useContextActivator, useExtendHandler, useClickOutside } from './hooks';
import { useNodeDataHandlers, NodeDataHandlers } from './NodeProvider';
import withNode from './withNode';
import LocalContextMenu from './components/LocalContextMenu';

/**
 * Utility hoc to add an event handler which extends any handler passed to
 * the original component.
 *
 * Only adds the extension when in edit mode.
 *
 * @param event The name of the event whose handler is to be extended
 * @param useExtender Custom hook returning the handler to add. Will be invoked
 *        during render and receive the original props of the component.
 *
 * @return An HOC which will add the handler.
 */
export const withExtendHandler = <P extends object>(
  event: string,
  useExtender: (props: P) => EventHandler<any>,
): Token => Component => {
    const WithExtendHandler: FC<any> = props => (
      <Component
        {...props}
        {...useExtendHandler(event, useExtender(props), props)}
      />
    );
    return WithExtendHandler;
  };

/*
 * Creates an HOC which strips all but the specified props.
 *
 * @param keys A list of the prop-names to keep.
 *
 * @return An HOC which will strip all but the specified props.
 */
export const withOnlyProps = <Q extends object>(...keys: string[]) => (
  <P extends object>(Component: CT<P> | string) => {
    const WithOnlyProps: FC<P & Q> = props => <Component {...pick(props, keys) as P} />;
    return WithOnlyProps;
  }
);

/**
 * Creates an HOC which provides the base componejt event handler which activates the current
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
    <LocalContextMenu>
      <Component {...props} />
    </LocalContextMenu>
  );
  return WithLocalContextMenu;
};

// @TODO: Combine withNode and withNodeDataHandlers and fix types
/**
 * Creates an HOC which reads data from the current content node and injects two
 * props to the target component:
 * - `componentData`: The `data` property from the node.
 * - `setComponentData`: A function which calls the `setData` method
 *    on the node,
 *
 * @param defaultData
 * A default value for `componentData` when the node's `data` property is empty.
 *
 * @returns
 * A component which passes data handlers to the base component.
 */
export const withNodeDataHandlers = <D extends object>(
  defaultData?: D,
): Injector<NodeDataHandlers<D>> => Component => observer(
    (props: any) => {
      const enhancedDefaultData = {
        ...defaultData,
        ...(defaultData ? pick(props, Object.keys(defaultData)) : {}),
      };
      return (<Component {...props} {...useNodeDataHandlers(undefined, enhancedDefaultData)} />);
    },
  );

export const withNodeAndHandlers = (defaultData?: any) => flowRight(
  // @ts-ignore
  withNode,
  withNodeDataHandlers(defaultData),
);

export type ClickOutsideProps = {
  onClickOutside?: (e: KeyboardEvent | MouseEvent) => void;
};

/**
 * Utility hoc to add onClickOutside handler to the original component.
 * A callback will be executed on both click outside as well as on the `esc` keypress.
 *
 * @return An HOC which will add the handler.
 */
export const withClickOutside = <P extends object>(Component: CT<P> | string) => {
  const WithClickOutside = (props: P & ClickOutsideProps) => {
    const { onClickOutside } = props;
    const ref = useRef(null);

    // Only add listners if onClickOutside handler is defined
    if (typeof onClickOutside === 'function') {
      useClickOutside(ref, onClickOutside);
    }

    return (
      <div ref={ref}>
        <Component {...props} />
      </div>
    );
  };

  return WithClickOutside;
};

export type resizeDetectorProps = {
  onResizeObserver?: (
    ref:React.MutableRefObject<any>,
    entries: ResizeObserverEntry[],
  ) => void;
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
