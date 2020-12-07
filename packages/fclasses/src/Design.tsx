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
  intersection, flowRight, flow, mergeWith, identity,
} from 'lodash';
import React, { ComponentType, Fragment, useContext } from 'react';
import { HOC } from './FClasses';
import { addPropsIf } from './addProps';
import { useShowDesignKeys } from './Context';

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
} & { _final?: Design<Omit<C, '_final'>> };

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
export const asComponent = <P extends object>(
  Tag: ComponentType<P> | (keyof JSX.IntrinsicElements),
) => {
  if (typeof Tag !== 'string') return Tag;
  const AsComponent = (props: P) => <Tag {...props} />;
  return AsComponent;
};

/**
 * is an HOC that will attach a displayName to an object
 * @param name the name of the displayName.
 */
const withDisplayName = <P extends Object> (name: string) => (Component: ComponentType<P>) => {
  const WithDisplayName = (props: P) => <Component {...props} />;
  const newMeta = mergeWith({}, Component, { displayName: name });
  return Object.assign(WithDisplayName, newMeta);
};
const designContextDefault = undefined as undefined | ComponentType<any>;
const DesignContext = React.createContext(designContextDefault);
export const replaceable = <P extends object> (Component:ComponentType<P>) => {
  const Replaceable = (props:P) => {
    const UpstreamComponent = useContext(DesignContext);
    const FinalComponent = UpstreamComponent || Component;
    return <FinalComponent {...props} />;
  };
  return Replaceable;
};
export const startWith = <P extends object>(ReplacementComponent: ComponentType<P>) => (
  (Component: ComponentType<P>) => (props:P) => {
    const UpstreamComponent = useContext(DesignContext);
    return UpstreamComponent
      ? <Component {...props} />
      : (
        <DesignContext.Provider value={ReplacementComponent}>
          <Component {...props} />
        </DesignContext.Provider>
      );
  }
);
export const applyDesign = <C extends DesignableComponents> (
  components: C,
  DefaultComponent: ComponentType<any> = Fragment,
) => (
    (design?: Design<C>) => {
      const incomingDesign = design || {} as Design<C>;
      // const keysToApply = intersection(Object.keys(components), Object.keys(incomingDesign));
      const keysToApply = Object.keys(incomingDesign);
      const appliedDesign = keysToApply.reduce(
        (acc, key) => (
          {
            ...acc,
            // We are using a the Default Component  if they Design<C> has a key that is not
            // explicitly in C We feel safe casting this to C[string] because DesignableComponents
            // defines it as ComponentType<any>
            // We are wrapping the result in replaceable so one of the HoC could replace it.
            [key]: incomingDesign[key]!(
              replaceable(components[key] || DefaultComponent) as any as C[string],
            ),
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

/**
 * Creates an HOC which applies a specified design to the wrapped component.
 *
 * A design is a keyed set of HOC's which should be applied to constituant elements
 * of the wrapped component. The wrapped component itself should accept a components
 * prop, and be wrapped in the `designable` HOC to define a set of base components
 * to which the HOC's should apply.
 *
 * @param design
 * The design to apply
 *
 * @return
 * HOC which applies the design to the wrapped component.
 *
 */
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

export const replaceWith = <P extends object>(Component: ComponentType<P>) => (
  (() => Component) as HOC
);
export const remove = <P extends React.HTMLAttributes<HTMLBaseElement>> () => (props:P) => {
  const { children } = props;
  return <>{children}</>;
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

/**
 * @private
 *
 * Takes a design and returns a hOD which extends a base design (flows the HOC's for each key
 * in the new design to each key in the base design, adding keys if they do not exist.
 *
 * @param design The design which will extend the base design.
 *
 * @return HOD which extends a base design with the provided design.
 */
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

/**
 * Specifies a design which should be applied to a component "finally" (ie after
 * all normal designs have been applied). This is useful if you want to be sure
 * that your design will take effect even if a normal design uses `replaceWith`
 * to replace a component.
 *
 * Note that just like `withDesign`, this may be called more than once on the
 * same component, and the final designs will be applied "outside-in", just
 * like normal designs.
 *
 * @param design
 * The design to apply
 *
 * @return
 * An HOC which applies the speciried design to the wrapped component after
 * all other designes
 */
export const withFinalDesign = <C extends DesignableComponents>(design: Design<C>) => (
  <P extends DesignableProps<C>>(Component: ComponentType<P>) => {
    const WithFinalDesign = (props: P) => {
      const { design: designFromProps } = props;
      const { _final: finalFromProps } = designFromProps || {};
      // eslint-disable-next-line no-underscore-dangle
      const _final = finalFromProps ? extendDesign$(finalFromProps)(design) : design;
      const finalDesign = { ...designFromProps, _final };
      return <Component {...props} design={finalDesign} />;
    };
    return WithFinalDesign;
  }
);

type TransformDesign = (design?: Design<any>) => Design<any>|undefined;

/**
 * May be used to extend the design specification of an underlying designable component.
 * This allows you to add constituent sub-components to the design, and pass the original
 * design on to the underlying component.
 *
 * @param transformDesign An optional transformer function which can be used to alter the
 *   design of the original component (for example to remove irrelevant entries).  If this
 *   function returns `undefined`, the design will be removed from the underlying component.
 *
 * @return A function with the same signature as `designable`.
 */
export const extendDesignable = (transformDesign: TransformDesign = identity) => (
  <C extends DesignableComponents> (start: C | Function, namespace: string = '?') => (
    <P extends object>(Component: ComponentType<P & DesignableComponentsProps<C>>) => {
      const designKeys = typeof start !== 'function'
        ? Object.keys(start).reduce((keys, key) => ({
          ...keys,
          [key]: addPropsIf(useShowDesignKeys)({ 'data-bl-design-key': `${namespace}:${key}` }),
        }), {})
        : undefined;
      const transformFixed = (props:DesignableProps<C> & P) => {
        const { design } = props;
        const { _final, ...restDesign } = design || {};
        // eslint-disable-next-line no-underscore-dangle
        const design$ = _final
          ? extendDesign$(_final!)(restDesign as Design<C>)
          : restDesign as Design<C>;
        const apply = typeof start === 'function' ? start : applyDesign(start);
        return { components: apply(design$) } as DesignableComponentsProps<C>;
      };
      const transformPassthrough = (props:DesignableProps<C> & P) => {
        const { design, ...rest } = props;
        const newDesign = transformDesign(design);
        return (newDesign ? { ...rest, design: newDesign } : rest) as P;
      };
      // const transformPassthrough = (props:DesignableProps<C>&P) => omit(props, ['design']) as P;
      const Designable = flow(
        withTransformer({ transformFixed, transformPassthrough }),
        designKeys ? withDesign(designKeys) : identity,
      )(Component);
      return Designable as ComponentType<DesignableProps<C> & P>;
    }
  )
);

/**
 * Makes a component "designable". A designable component defines a set of constituent
 * sub-components which can be modified by applying one or more HOC's.  You specify the
 * HOC's to apply to each sub-component via the `withDesign` HOC.
 *
 * @param startComponents An object defining the set of constituent subcomponents. Each key
 *   is a string which identifies the component. Each value is the component itself, which
 *   will be modified by any HOC's provided by withDesign.
 *
 * @return An HOC which yields a designable version of the component to which it is applied.
 */
export const designable = extendDesignable(() => undefined);

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
