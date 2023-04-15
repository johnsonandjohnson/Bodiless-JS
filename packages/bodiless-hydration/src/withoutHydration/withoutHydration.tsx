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

import { ComponentOrTag } from '@bodiless/fclasses';
import MD5 from 'crypto-js/md5';
import { useNode } from '@bodiless/core';
import React, { FC, useRef, useLayoutEffect } from 'react';
import memoize from 'lodash/memoize';
import {
  WithoutHydrationFunction,
  WithoutHydrationWrapperFunction,
  WithoutHydrationOptions,
} from './types';

const DEFAULT_OPTIONS: WithoutHydrationOptions = {
  WrapperElement: 'div',
  WrapperStyle: { display: 'contents' },
};

export const isStaticClientSide = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
  && process.env.NODE_ENV === 'production'
);

export const isEditClientSide = !!(
  typeof window !== 'undefined'
  && window.document
  && window.document.createElement
  && process.env.NODE_ENV === 'development'
);

/**
 * InnerHtml is memoized to allow retrieving it on component remount.
 */
const getInnerHTML = memoize(
  (element: HTMLDivElement&HTMLSpanElement | null) => element?.innerHTML || '',
  (element) => element?.id
);

const getDisplayName = (WrappedComponent: ComponentOrTag<any>) => (typeof WrappedComponent !== 'string' && (WrappedComponent.displayName || WrappedComponent.name)) || 'Component';

const useWrapperId = (nodeKey?: string | undefined) => {
  const { node: { path = []}} = useNode();
  return MD5([...path, nodeKey].filter(Boolean).join('$')).toString();
};

const withoutHydrationClientSideEdit: WithoutHydrationFunction = (
) => WrappedComponent => props => (
  <WrappedComponent {...props} />
);

const withoutHydrationServerSide: WithoutHydrationFunction = ({
  WrapperElement,
  WrapperStyle
}) => WrappedComponent => (props: any) => {
  const { nodeKey = undefined } = props;
  return (
    <WrapperElement data-no-hydrate style={WrapperStyle} id={useWrapperId(nodeKey)}>
      <WrappedComponent {...props} />
    </WrapperElement>
  );
};

const withoutHydrationClientSide: WithoutHydrationFunction = ({
  onUpdate,
  WrapperElement,
  WrapperStyle,
}) => <P,>(WrappedComponent: ComponentOrTag<P>) => {
  const WithoutHydration: FC<P> = (props: any) => {
    const BrowserVersion$ = () => {
      const rootRef = useRef<HTMLDivElement&HTMLSpanElement>(null);
      const { nodeKey = undefined } = props;
      const id = useWrapperId(nodeKey);
      const staticElement = document.getElementById(id);

      const markup = staticElement
        ? getInnerHTML(staticElement as HTMLDivElement&HTMLSpanElement) : '';

      // When a non-hydrated component is re-mounted in the browser (eg due to a parent
      // component's dom manipulation), it renders the empty inner html.  Here, we grab
      // the server-rendered html and stash it in a hidden div so we can restore it if/when the
      // component re-mounts.
      useLayoutEffect(() => {
        // Component did mount.
        if (rootRef.current) {
          if (onUpdate) {
            onUpdate(props, rootRef.current);
          }
          if (rootRef.current.innerHTML === '') {
            rootRef.current.innerHTML = getInnerHTML(rootRef.current);
          }
        }
        // Component did unmount.
        return () => {
          // Memoize the innerHTML
          getInnerHTML(rootRef.current);
        };
      }, []);

      return (
        <WrapperElement
          data-no-hydrate
          ref={rootRef}
          style={WrapperStyle}
          id={id}
          suppressHydrationWarning
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: markup }}
        />
      );
    };
    const BrowserVersion = React.memo(BrowserVersion$, () => true);

    return <BrowserVersion />;
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
 * The given component will be wrapped in an HTML element that tells React whether to hydrate it
 * or not. By default, the given component will be wrapped in a `div`. You can change the wrapper
 * element by passing the `WrapperElement` option. Possible values are 'div' and 'span'.
 * By default the WrapperElement has the style property display set to `contents` to prevent
 * interfering with the component style.
 * Anyway, is some cases the WrapperElement could impact the look of given component even having
 * display set to `contents`. E.g. if the component has a child with position absolute.
 * To handle these cases, the property `WrapperStyle` override the default Wrapper style.
 * You can also use `withoutHydrationInline` instead of this function, which defaults to a `span`.
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
export const withoutHydration: WithoutHydrationWrapperFunction = (options) => {
  const optionsWithDefault: WithoutHydrationOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  if (isStaticClientSide) return withoutHydrationClientSide(optionsWithDefault);

  if (isEditClientSide) return withoutHydrationClientSideEdit(optionsWithDefault);

  return withoutHydrationServerSide(optionsWithDefault);
};

export default withoutHydration;
export const withoutHydrationInline = () => withoutHydration({
  WrapperElement: 'span',
});
