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

import React, {
  ComponentType, FC, useEffect, useState,
} from 'react';
import { flow, omit, pick } from 'lodash';

export type Condition<P> = (props: P) => boolean;

// export const flowRightIf = <P extends object>(condition: Condition<P>) => (
//   <H extends Function>(...hocs: Function[]) => (
//     (Component: ComponentType<P> | string) => (
//       // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
//       (props: P) => (condition(props) ? flowRight(...hocs)(Component) : Component)
//     )
//   )
// );

export const flowIf = (condition: (args: any) => boolean) => (
  <H extends Function>(...hocs: Function[]) => (
    <P extends object>(Component: ComponentType<P> | string) => {
      // @ts-ignore Expected at least 1 arguments, but got 0 or more.ts(2557)
      const WrappedComponent = flow(...hocs)(Component) as ComponentType;
      return (props: P) => (
        condition(props) ? <WrappedComponent {...props} /> : <Component {...props} />
      );
    }
  )
);

/**
 * Removes the specified props from the wrapped component.
 * @param ...keys The names of the props to remove.
 */
export const withoutProps = <Q extends object>(keys: string|string[], ...restKeys: string[]) => (
  <P extends object>(Component: ComponentType<P> | string) => {
    const keys$ = typeof keys === 'string' ? [keys, ...restKeys] : keys;
    const WithoutProps = (props: P & Q) => <Component {...omit(props, keys$) as P} />;
    return WithoutProps;
  }
);

/*
 * Creates an HOC which strips all but the specified props.
 *
 * @param keys A list of the prop-names to keep.
 *
 * @return An HOC which will strip all but the specified props.
 */
export const withOnlyProps = <Q extends object>(...keys: string[]) => (
  <P extends object>(Component: ComponentType<P> | string) => {
    const WithOnlyProps: FC<P & Q> = props => <Component {...pick(props, keys) as P} />;
    return WithOnlyProps;
  }
);

export const hasProp = (name: string) => (
  ({ [name]: prop }: { [name: string]: any }) => Boolean(prop)
);

/**
 * Like replaceWith, but performs the repacement on effect. Useful when you need to
 * ensure that both versions of a component are rendered during SSR, but want to
 * remove one when displayed in the browser (eg for responsive design).
 *
 * @param Replacement The component to replace with.
 */
export const replaceOnEffect = <P extends object>(
  Replacement: ComponentType<P>,
) => (
    Component: ComponentType<P>,
  ) => {
    const ReplaceOnEffect = (props: P) => {
      const [replaced, setReplaced] = useState(false);
      useEffect(() => setReplaced(true), []);
      return replaced ? <Replacement {...props} /> : <Component {...props} />;
    };
    return ReplaceOnEffect;
  };
