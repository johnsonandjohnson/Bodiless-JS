/**
 * Copyright © 2022 Johnson & Johnson
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

import { useNode } from '@bodiless/core';
import { ComponentOrTag } from '@bodiless/fclasses';
import React, {
  useState, useRef, useLayoutEffect, FC
} from 'react';
import {
  WithoutHydrationFunction,
  WithoutHydrationProps
} from './types';

const DEFAULT_WRAPPER = 'div';

export const isStaticClientSide = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
  && process.env.NODE_ENV === 'production'
);

const getDisplayName = (WrappedComponent: ComponentOrTag<any>) => (typeof WrappedComponent !== 'string' && (WrappedComponent.displayName || WrappedComponent.name)) || 'Component';

const useWrapperId = (props: any) => {
  const { path } = useNode().node;
  const { nodeKey = '' } = props;
  return `${path.join('-')}-${nodeKey}`;
};

const withoutHydrationServerSide: WithoutHydrationFunction = (
  { WrapperElement = DEFAULT_WRAPPER } = {}
) => WrappedComponent => props => {
  const id = useWrapperId(props);
  return (
    <WrapperElement data-no-hydrate id={id}>
      <WrappedComponent {...props} />
    </WrapperElement>
  );
};

const withoutHydrationClientSide: WithoutHydrationFunction = ({
  onUpdate = null,
  disableFallback = false,
  WrapperElement = DEFAULT_WRAPPER,
} = {}) => <P,>(WrappedComponent: ComponentOrTag<P>) => {
  const WithoutHydration: FC<P & WithoutHydrationProps> = (props) => {
    const { forceHydration = false } = props;
    const rootRef = useRef<HTMLDivElement&HTMLSpanElement>(null);
    const [shouldHydrate, setShouldHydrate] = useState<boolean | undefined>(undefined);

    const id = useWrapperId(props);
    const tempId = `temp-${id}`;
    const markup = document.getElementById(tempId)?.innerHTML || '';

    useLayoutEffect(() => {
      if (shouldHydrate) return;
      const wasRenderedServerSide = !!rootRef.current?.getAttribute(
        'data-no-hydrate'
      );

      setShouldHydrate(
        (!wasRenderedServerSide && !disableFallback) || forceHydration
      );
    });

    useLayoutEffect(() => {
      if (shouldHydrate || shouldHydrate === undefined || !onUpdate) return;
      onUpdate(props, rootRef.current);
    });

    // When a non-hydrated component is re-mounted in the browser (eg due to a parent
    // component's dom manipulation), it renders the empty inner html.  Here, we grab
    // the server-rendered html and stash it in a hidden div so we can restore it if/when the
    // component re-mounts.
    useLayoutEffect(() => {
      const tempDiv = document.getElementById(tempId) || document.createElement('div');
      tempDiv.id = tempId;
      tempDiv.style.display = 'none';
      tempDiv.innerHTML = document.getElementById(id)?.innerHTML || '';
      document.body.append(tempDiv);
    }, []);

    if (!shouldHydrate) {
      return (
        <WrapperElement
          data-no-hydrate
          id={id}
          ref={rootRef}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: markup }}
          suppressHydrationWarning
        />
      );
    }

    return (
      <WrappedComponent {...props} />
    );
  };

  WithoutHydration.displayName = `WithoutHydration(${getDisplayName(WrappedComponent)})`;

  return WithoutHydration;
};

/**
 * Makes React skip hydration of the given component on the browser in production. The given
 * component will still hydrate and behave normally on the Edit site (because it runs in a
 * development environment) and on Server Side Rendering.
 *
 * This allows developers to create optimized "static" versions of their components, which are
 * interactive on Edit sites, but static on browsers in production. For instance, a rich-text
 * editor may have a static version with all interactive functions stripped out, since these are
 * not used by end users on production sites.
 *
 * Components can still have interactivity if needed. For instance, an accordion component still
 * needs to be expandable by end users. To do this, you can pass an `onUpdate` function in the
 * options object to receive all props passed to the component, and its HTMLElement after it
 * renders. Using the component HTMLElement, you can update it however you want, but be aware that
 * this element will be out of React's scope, so hooks won't work inside the `onUpdate` function.
 *
 * You can also pass `disableFallback` as `true` in the options object to make this component
 * not render on the server side. While it will also not hydrate on the client side, you can use
 * `onUpdate` to access its props and modify its element afterwards.
 *
 * The given component will be wrapped in an HTML element that tells React whether to hydrate it
 * or not. By default, the given component will be wrapped in a `div`. You can change the wrapper
 * element by passing the `WrapperElement` option. Possible values are 'div' and 'span'. You can
 * also use `withoutHydrationInline` instead of this function, which defaults to a `span`.
 *
 * Finally, the given component will also be able to receive a new prop: `forceHydration`. If you
 * set it to `true`, your component will hydrate on both the server and client side, regardless of
 * the current environment.
 *
 * @param options
 * An optional configuration object for the hydration wrapper.
 *
 * @returns
 * A HOC which places the given component inside a no-hydration wrapper. The components inside
 * this wrapper won't hydrate on the client side in production environments.
 */
export const withoutHydration: WithoutHydrationFunction = (options) => {
  if (isStaticClientSide) return withoutHydrationClientSide(options);

  return withoutHydrationServerSide(options);
};

export const withoutHydrationInline: WithoutHydrationFunction = options => withoutHydration({
  ...options,
  WrapperElement: 'span',
});
