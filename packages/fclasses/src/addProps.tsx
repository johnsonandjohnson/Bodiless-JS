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

import React, { ComponentType, FC, Fragment as BaseFragment } from 'react';
import pick from 'lodash/pick';
import omit from 'lodash/omit';
import type { HOC, Condition, Injector } from './types';

type NotAFunction = { [key: string]: any, bind?: never, call?: never };

/**
 * HOC that adds props conditionally based on value returned by hook.
 *
 * @param conditionHook
 * A custom React hook which will be invoked to determine whether the props should be added.
 *
 * @returns
 * A function with the same signature as `addProps`.
 *
 * @see addProps
 *
 * @category HOC Utility
 */
export const addPropsIf = <B extends object>(
  conditionHook: Condition<B>,
) => <I extends NotAFunction>(
    propsToAdd: I | ((props: B) => I),
  ): Injector<I, B> => Component => {
      const AddPropsIf: ComponentType<any> = (props: B) => {
        if (!conditionHook(props)) return <Component {...props as any} />;
        const propsToAdd$ = typeof propsToAdd === 'function' ? propsToAdd(props) : propsToAdd;
        const finalProps: any = { ...propsToAdd$, ...props };
        return <Component {...finalProps} />;
      };
      return AddPropsIf;
    };

/**
 * Creates a HOC that injects the specified props to the base component.
 *
 * Any props passed to the resulting component will take precedence
 * over those specified here.
 *
 * @param propsToAdd
 * Object containing props and values which will be passed to the base component,
 * or a function which receives the original props and returns such an object.
 *
 * @return
 * A component which renders the base component with the added props.
 *
 * @example
 * ```
 * const DivWithId = addProps({ id: 'Foo' })('div');
 * ```
 *
 * @category HOC Utility
 */
export const addProps = <B extends object, I extends NotAFunction>(
  propsToAdd: I | ((props: B) => I)
) => addPropsIf<B>(() => true)<I>(propsToAdd);

/**
 * Creates a HOC which strips all but the specified props.
 *
 * @param keys A list of the prop-names to keep.
 *
 * @return A HOC which will strip all but the specified props.
 *
 * @category HOC Utility
 */
export const withOnlyProps = <Q extends object>(...keys: string[]) => (
  <P extends object>(Component: ComponentType<P> | string) => {
    const WithOnlyProps: FC<P & Q> = props => <Component {...pick(props, keys) as P} />;
    return WithOnlyProps;
  }
);

/**
 * Alias for [[removeProps]].
 *
 * @category HOC Utility
 */
export const withoutProps = <A extends object>(
  keys: (keyof A)|(keyof A)[], ...restKeys: (keyof A)[]
):HOC<{}, Partial<A>> => Component => {
    const keys$ = typeof keys === 'string' ? [keys, ...restKeys] : keys;
    const WithoutProps = (props: any) => <Component {...omit(props, keys$) as any} />;
    return WithoutProps;
  };

/**
 * Removes the specified props before rendering the wrapped component.
 *
 * @param
 * ...keys The names of the props to remove.
 *
 * @return
 * A HOC which accepts a component and returns another which accepts the
 * specified props and removes them before rendering.
 *
 * Note this expects a type parameter specifying the props which will be
 * removed. For example:
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
 *
 * @category HOC Utility
 */
export const removeProps = withoutProps;

/**
 * Alias for [[addProps]].
 *
 * @category HOC Utility
 */
export const withProps = addProps;

/**
 * Alias for [[addPropsIf]].
 *
 * @category HOC Utility
 */
export const withPropsIf = addPropsIf;

/**
 * A React `Fragment` which ensures that all invalid props are removed.
 * This is useful in conjunction with [[replaceWith]], [[startWith]]
 * or [[remove]], so that any props added by other HOCs will be discarded.
 *
 * @example
 * ```
 * const Foo = as(
 *   replaceable,
 *   addClasses('flex flex-row'),
 * )(Div);
 *
 * const MyComponent = withDesign({
 *   Wrapper: addClasses('flex flex-row'),
 * });
 *
 * const CustomComponent = withDesign({
 *   Wrapper: startWith(Fragment),
 * });
 * ```
 * In this example, the `className` prop defined in the original
 * component design will be passed to the `Fragment`.  Using this
 * version of the `Fragment` ensures this doesn't trigger a React
 * warning.
 *
 * @category HOC Utility
 */
export const Fragment = withOnlyProps('key', 'children')(BaseFragment);
