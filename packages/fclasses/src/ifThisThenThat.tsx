import React, { ComponentType } from 'react';
import { HOC } from './FClasses';

export type IfThis<A> = (props:A) => boolean;
export type IfThisThanThatProps<A> = {
  passed: A,
  hoc: HOC,
  Component: ComponentType<A>,
  func:IfThis<A>,
};
class IfThisThenThat <A extends object> extends React.Component<IfThisThanThatProps<A>> {
  fixedProps: A;

  Component: ComponentType<A>;

  constructor(props: IfThisThanThatProps<A>) {
    super(props);
    const {
      hoc,
      func,
      Component,
      passed,
      ...rest
    } = props;
    this.fixedProps = { ...passed, ...rest };
    this.Component = func({ ...passed }) ? hoc(Component) : Component;
  }

  render() {
    const { Component, fixedProps } = this;
    return <Component {...fixedProps} />;
  }
}
const ifThisThenThat = <A extends object>(func:IfThis<A>) => (hoc:HOC) => (
  (Component:ComponentType<A>) => (props:A) => (
    <IfThisThenThat
      hoc={hoc}
      func={func}
      passed={props}
      Component={Component}
    />
  ));
const ifTTT = ifThisThenThat;
export default ifTTT;
