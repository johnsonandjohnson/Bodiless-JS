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

import React, { ComponentType, PropsWithChildren } from 'react';
// type TransformerFunction = (a:object) => object;
type WithTransformerProps<P, Q, X> = {
  transformFixed: (p: P) => X;
  transformPassthrough: (p: P) => Q;
};
type TransformerProps<P, Q, X> = WithTransformerProps<P, Q, X> & {
  Component: ComponentType<PropsWithChildren<X & Q>>;
  passedProps: P;
};
class Transformer<P, Q, X> extends React.Component<TransformerProps<P, Q, X>> {
  fixedProps;

  constructor(props: TransformerProps<P, Q, X>) {
    super(props);
    const { transformFixed, passedProps } = props;
    this.fixedProps = transformFixed(passedProps) as X;
  }

  render() {
    const { Component, transformPassthrough, passedProps } = this.props;
    const props = {...this.fixedProps as X, ...transformPassthrough(passedProps) };
    // @ts-ignore
    return <Component {...props} />;
  }
}

export const withTransformer = <P, Q, X extends Object>(funcs: WithTransformerProps<P, Q, X>) => (
  (Component: ComponentType<PropsWithChildren<Q & X>>) => (props: P) => {
    const {
      transformFixed,
      transformPassthrough,
    } = funcs;
    const tprops = {
      Component,
      transformFixed,
      transformPassthrough,
      passedProps: props,
    };
    return <Transformer {...tprops} />;
  }
);
