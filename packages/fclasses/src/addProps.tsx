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
import React, { ComponentType } from 'react';
import type { Token, Injector } from './types';
import { Condition } from './hoc-util';

type NotAFunction = { [key: string]: any, bind?: never, call?: never };

/**
 * Creates an HOC that injects the specified props to the base component.
 *
 * Any props passed to the resulting component will take precedence
 * over those specified here.
 *
 * @param propsToAdd
 * Object containing props and values which will be passed to the base component.
 *
 * @return
 * A component which renders the base component with the added props.
 */
const addProps = <P extends object>(propsToAdd: P): Injector<Partial<P>> => Component => {
  const AddProps = (props: any) => <Component {...propsToAdd} {...props} />;
  return AddProps;
};

/**
 * HOC that adds props conditionally based on value returned by hook.
 *
 * @param conditionHook
 * A hook which will be invoked to determine whether the props should be added.
 *
 * @returns
 * A function with the same signature as `addProps`
 *
 * @see addProps
 */
export const addPropsIf = <A extends object>(
  conditionHook: Condition<A>,
) => <I extends NotAFunction>(
    propsToAdd: I | ((props: A) => I),
  ): Token<I, A, I> => Component => {
      const AddPropsIf: ComponentType<any> = (props: A) => {
        if (!conditionHook(props)) return <Component {...props as any} />;
        const propsToAdd$ = typeof propsToAdd === 'function' ? propsToAdd(props) : propsToAdd;
        const finalProps: any = { ...propsToAdd$, ...props };
        return <Component {...finalProps} />;
      };
      return AddPropsIf;
    };

export default addProps;
