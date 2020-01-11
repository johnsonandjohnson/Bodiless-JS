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

// eslint-disable-next-line import/no-extraneous-dependencies
import {
  intersection, flowRight, flow, mergeWith, omit,
} from 'lodash';
import React, { ComponentType, Fragment } from 'react';

export type DesignElement<P> = (c: ComponentType<P> | string) => ComponentType<P>;

/**
 * This is the type to use for the components prop of a component with a fluid design.
 */
export type DesignableComponents = {
  [key: string]: ComponentType<any>,
};

/**
 * This is the type of a design which can be applied to a component which accepts
 * a components prop of type "C".
 */
export type Design<C extends DesignableComponents> = {
  [Key in keyof C]?: (component: C[Key]) => C[Key]
};

/**
 * This is the type of the props for a designable whose underlying component
 * accepts a components prop of type "C".
 */
export type DesignableProps<C extends DesignableComponents> = {
  design?: Design<C>;
};

export type DesignableComponentsProps<C extends DesignableComponents> = {
  components: C,
};

/**
 * This is the type of a  Higher order design which can be applied to a component which accepts
 * a components prop of type "C".
 */
export type HOD<C extends DesignableComponents> = (design?:Design<C>) => Design<C>;

/**
 * This is a GOD that accepts any DesignableComponents
 */
export type FluidHOD = HOD<DesignableComponents>;
export type FluidDesign = Design<DesignableComponents>;

/**
 * Converts a react HTML element to a component. This is a generic, and the type
 * of the props of the resulting component should be specified, eg:
 * ```
 * const Div = asComponent<JSX.IntrinsicElements['div']>('div');
 * ```
 * @param Tag A valid HTML element.
 */
export const asComponent = <P extends object>(Tag: keyof JSX.IntrinsicElements) => (
  (props: P) => <Tag {...props} />
);

/**
 * is an HOC that will attach a displayName to an object
 * @param name the name of the displayName.
 */
const withDisplayName = <P extends Object> (name: string) => (Component: ComponentType<P>) => {
  const WithDisplayName = (props: P) => <Component {...props} />;
  const newMeta = mergeWith({}, Component, { displayName: name });
  return Object.assign(WithDisplayName, newMeta);
};
export const applyDesign = <C extends DesignableComponents> (components: C) => (
  (design?: Design<C>) => {
    const incomingDesign = design || {} as Design<C>;
    // const keysToApply = intersection(Object.keys(components), Object.keys(incomingDesign));
    const keysToApply = Object.keys(incomingDesign);
    const appliedDesign = keysToApply.reduce(
      (acc, key) => (
        {
          ...acc,
          // We are using a Fragment if they Design<C> has a key that is not explicitly in C
          // We feel safe casting this to C[string] because DesignableComponents defines it as
          // ComponentType<any>
          [key]: incomingDesign[key]!((components[key] || Fragment) as any as C[string]),
        } as C
      ),
      {} as C,
    );
    const unNamedComponents = { ...components, ...appliedDesign } as C;
    // Lets wrap the object so that we can name it after the key.
    if (!design) return { ...components } as C;
    return Object.keys(unNamedComponents).reduce(
      (acc, name) => (
        { ...acc, [name]: withDisplayName(name)(unNamedComponents[name] as ComponentType) }
      ),
      {},
    );
  }
);
export const withDesign = <C extends DesignableComponents>(design: Design<C>) => (
  <P extends DesignableProps<C>>(Component: ComponentType<P>) => {
    const WithDesign = (props: P) => {
      const { design: designFromProps } = props;
      let finalDesign = design;
      if (designFromProps) {
        const keysToWrap = intersection(Object.keys(designFromProps), Object.keys(design));
        const wrappedDesign = keysToWrap.reduce(
          (acc, key) => (
            { ...acc, [key]: flowRight(designFromProps[key]!, design[key]!) }
          ),
          {} as Design<C>,
        );
        finalDesign = { ...design, ...designFromProps, ...wrappedDesign } as Design<C>;
      }
      return <Component {...props} design={finalDesign} />;
    };
    return WithDesign;
  }
);

export const replaceWith = <P extends object>(Component: ComponentType<P>) => () => Component;
export const startWith = replaceWith;
export const remove = <P extends React.HTMLAttributes<HTMLBaseElement>> () => (props:P) => {
  const { children } = props;
  return <React.Fragment>{children}</React.Fragment>;
};

// type TransformerFunction = (a:object) => object;
type WithTransformerProps<P, Q, X> = {
  transformFixed: (p:P) => X,
  transformPassthrough: (p:P) => Q,
};
type TransformerProps<P, Q, X> = WithTransformerProps<P, Q, X> & {
  Component: ComponentType<X & Q>,
  passedProps: P,
};

class Transformer<P, Q, X> extends React.Component<TransformerProps<P, Q, X>> {
  fixedProps: Object = {};

  constructor(props:TransformerProps<P, Q, X>) {
    super(props);
    const { transformFixed, passedProps } = props;
    this.fixedProps = transformFixed(passedProps) as X;
  }

  render() {
    const { Component, transformPassthrough, passedProps } = this.props;
    const props = { ...this.fixedProps as X, ...transformPassthrough(passedProps) };
    return <Component {...props} />;
  }
}

export const withTransformer = <P, Q, X extends Object> (funcs: WithTransformerProps<P, Q, X>) => (
  (Component: ComponentType<Q & X>) => (props:P) => {
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

export const designable = <C extends DesignableComponents> (start: C) => (
  <P extends object>(Component: ComponentType<P & DesignableComponentsProps<C>>) => {
    const transformFixed = (props:DesignableProps<C> & P) => {
      const { design } = props;
      return { components: applyDesign(start)(design) } as DesignableComponentsProps<C>;
    };
    const transformPassthrough = (props:DesignableProps<C> & P) => omit(props, ['design']) as P;
    const Designable = withTransformer({ transformFixed, transformPassthrough })(Component);
    return Designable as ComponentType<DesignableProps<C> & P>;
  }
);

const varyDesign$ = <C extends DesignableComponents> (design:Design<C>):HOD<C> => (
  (baseDesign:Design<C> = {}) => (
    Object.getOwnPropertyNames(baseDesign).length === 0
      ? design
      : Object.getOwnPropertyNames(baseDesign).reduce(
        (acc, baseKey) => (
          Object.getOwnPropertyNames(design).reduce(
            (innerAcc, key) => (
              // We know this keys exist be cause we are iterating them
              { ...innerAcc, [baseKey + key]: flow(baseDesign[baseKey]!, design[key]!) }
            ),
            (acc),
          )
        ),
        {},
      ) as Design<C>
  )
);

const extendDesign$ = <C extends DesignableComponents> (design: Design<C>) => (
  (baseDesign: Design<C> = {}) => (
    Object.getOwnPropertyNames(design).reduce(
      (acc, key) => (
        acc[key]
        // We just checked for key in acc and we are iterating design.
          ? { ...acc, [key]: flow(acc[key]!, design[key]!) } as Design<C>
          : { ...acc, [key]: design[key] } as Design<C>
      ),
      baseDesign,
    ) as Design<C>
  )
);
type DesignOrHod<C extends DesignableComponents> = Design<C> | HOD<C>;
const flowDesignsWith = <C extends DesignableComponents> (func: (d:Design<C>) => HOD<C>) => (
  (...designs: DesignOrHod<C>[]) => (baseDesign: Design<C> = {}) => (
    flow(
      ...designs.map(design => (
        (typeof design === 'function') ? func(design()) : func(design)
      )),
    )(baseDesign)
  )
);
export const varyDesign = flowDesignsWith(varyDesign$);
export const extendDesign = flowDesignsWith(extendDesign$);
