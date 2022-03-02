import React, { FC } from 'react';
import { FlowHoc, Condition } from './types';
import { flowHoc } from './flowHoc';
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

export const flowIf = <P extends object>(condition: Condition<P>): FlowHoc<P> => (
  (...tokens) => Component => {
    const WrappedComponent = flowHoc(...tokens)(Component);
    const FlowIf: FC<any> = props => (
      condition(props) ? <WrappedComponent {...props} /> : <Component {...props} />
    );
    return FlowIf;
  }
);

export type FlowIfFunc<A> = (props: A) => boolean;

export const and = <A extends object>(...funcs: FlowIfFunc<A>[]) => (props: A) => (
  funcs.every(f => f(props))
);
export const or = <A extends object>(...funcs: FlowIfFunc<A>[]) => (props: A) => (
  !funcs.every(f => !f(props))
);

export const not = <A extends object>(...funcs: FlowIfFunc<A>[]) => (props: A) => (
  funcs.every(f => !f(props))
);

export const hasProp = (name: string) => (
  ({ [name]: prop }: { [name: string]: any; }) => Boolean(prop)
);
