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
  ComponentType,
  FC,
  useEffect,
  useState,
} from 'react';
import {
  omit,
  pick,
  mergeWith,
} from 'lodash';
import type { HOC, AsToken } from './types';
import { asToken } from './Tokens';

export type Condition<P = any> = (props: P) => boolean;

/**
 * Applies a set of HOC's if a condition is true.
 *
 * @param useCondition
 * A custom react hook which returns true if the HOC's should be applied.  Will receive
 * the components props as an argument.
 *
 * @returns
 * A function which accepts a list of HOC's and returns a new HOC which will be applied
 * to the target component only if the specified condition evaluates to true.
 */
export const flowIf = <P extends object>(condition: Condition<P>): AsToken<P> => (
  (...tokens) => Component => {
    const WrappedComponent = asToken(...tokens)(Component);
    const FlowIf: FC<any> = props => (
      condition(props) ? <WrappedComponent {...props} /> : <Component {...props} />
    );
    return FlowIf;
  }
);

export type FlowIfFunc<A> = (props:A) => boolean;

export const and = <A extends object> (...funcs:FlowIfFunc<A>[]) => (props:A) => (
  funcs.every(f => f(props))
);
export const or = <A extends object> (...funcs:FlowIfFunc<A>[]) => (props:A) => (
  !funcs.every(f => !f(props))
);
export const not = <A extends object> (...funcs:FlowIfFunc<A>[]) => (props:A) => (
  funcs.every(f => !f(props))
);

/**
 * Removes the specified props before rendering the wrapped component.
 *
 * @param
 * ...keys The names of the props to remove.
 *
 * @return
 * An HOC which accepts a component and returns another which accepts the
 * specified props and removes them before rendering.
 *
 * Note this expects a type parameter specifying the props which will be
 * removed. For example
 * ```
 * type Foo = {
 *   A: string,
 * };
 * type Bar = {
 *   B: string,
 *   C: String,
 * };
 * const F:FC<Foo> = () => <></>;
 * const G = withoutProps('B', 'C')(F);
 *   // ComponentWithMeta<Pick<Foo, "A"> & Partial<{ B: any } & { C: any }>>
 * const H = withoutProps<Bar>('B', 'C')(F); // ComponentWithMeta<Pick<Foo, "A"> & Bar>
 * const I = withoutProps<Bar>('B', 'D')(F); // expected type error: D not in keyof Bar)
 * const J = withoutProps<Bar>('X')(F); // expected type error (X not in keyof Bar)
 * ```
 */
export const withoutProps = <A extends object>(
  keys: (keyof A)|(keyof A)[], ...restKeys: (keyof A)[]
):HOC<{}, Partial<A>> => Component => {
    const keys$ = typeof keys === 'string' ? [keys, ...restKeys] : keys;
    const WithoutProps = (props: any) => <Component {...omit(props, keys$) as any} />;
    return WithoutProps;
  };

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
 * is an HOC that will attach a displayName to an object
 * @param name the name of the displayName.
 */
export const withDisplayName = <P extends Object> (name: string) => (
  Component: ComponentType<P>,
) => {
  const WithDisplayName = (props: P) => <Component {...props} />;
  const newMeta = mergeWith({}, Component, { displayName: name });
  return Object.assign(WithDisplayName, newMeta);
};

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
