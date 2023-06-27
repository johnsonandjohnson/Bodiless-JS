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
import identity from 'lodash/identity';
import flow from 'lodash/flow';
import React, {
  ComponentType, Fragment, FC,
} from 'react';
import mergeWith from 'lodash/mergeWith';
import type {
  HOC, Design, DesignableComponents, DesignableProps,
  DesignableComponentsProps, HOD, Designable,
} from './types';
import { addPropsIf } from './addProps';
import { useShowDesignKeys, useDesignKeysAttribute } from './withShowDesignKeys';
import { replaceable } from './replaceable';
import { withHocDesign } from './withHocDesign';
import { withTransformer } from './Transformer';
import { as, extendDesign } from './tokenSpec';

/**
 * Creates an HOC that will attach a displayName to an object.
 *
 * @param name
 * The displayName to add.
 *
 * @returns
 * HOC which attaches the display name.
 *
 * @category HOC Utility
 */
export const withDisplayName = <P extends Object> (name: string) => (
  Component: ComponentType<P>,
) => {
  const WithDisplayName = (props: P) => <Component {...props} />;
  const newMeta = mergeWith({}, Component, { displayName: name });
  return Object.assign(WithDisplayName, newMeta);
};

/**
 * Given a set of starting components and a default component,
 * returns an function which applies a design to those components.
 *
 * @param components
 * A set of components to which the design should be applied.
 * @param DefaultComponent
 * The default component to use for any key in the design which
 * is not in the set of components.
 *
 * @returns
 * A function which accepts a design and applies each key in the
 * design to the set of starting components (or to the default component
 * if the key does not exist in the starting components).
 *
 * @category Design API
 */
export const applyDesign = <C extends DesignableComponents> (
  components: C,
  DefaultComponent: ComponentType<any> = Fragment,
) => (
    (design?: Design<C>) => {
      const incomingDesign = design || {} as Design<C>;
      const keysToApply = Object.keys(incomingDesign);
      const appliedDesign = keysToApply.reduce(
        (acc, key) => (
          {
            ...acc,
            // We are using a the Default Component  if they Design<C> has a key that is not
            // explicitly in C We feel safe casting this to C[string] because DesignableComponents
            // defines it as ComponentType<any>
            // We are wrapping the result in replaceable so one of the HoC could replace it.
            [key]: as(incomingDesign[key]!)(
              replaceable(components[key] || DefaultComponent),
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
 * all other designes.
 *
 * @category Design API
 */
export const withFinalDesign = <C extends DesignableComponents>(
  design: Design<C>,
): HOC<DesignableProps<C>> => Component => {
    const WithFinalDesign: FC<any> = (props: DesignableProps<C>) => {
      const { design: designFromProps } = props;
      const { _final: finalFromProps } = designFromProps || {} as Design<C>;
      // eslint-disable-next-line no-underscore-dangle
      const _final = finalFromProps ? extendDesign(design, finalFromProps) : design;
      const finalDesign = { ...designFromProps, _final };
      return <Component {...props as any} design={finalDesign} />;
    };
    return WithFinalDesign;
  };

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
 *
 * @category Design API
 */
export const extendDesignable = (transformDesign: TransformDesign = identity) => (
  <C extends DesignableComponents> (
    start: C | Function, namespace: string = '?',
  ): Designable<C> => (
    Component => {
      const designKeys = typeof start !== 'function'
        ? Object.keys(start).reduce((keys, key) => ({
          ...keys,
          [key]: addPropsIf(useShowDesignKeys)(
            () => ({
              [`data-${useDesignKeysAttribute()}`]: `${namespace}:${key}`,
            }),
          ),
        }), {})
        : undefined;
      const transformFixed = (props:DesignableProps<C>) => {
        const { design } = props;
        const { _final, ...restDesign } = design || {};
        // eslint-disable-next-line no-underscore-dangle
        const design$ = _final
          ? extendDesign(restDesign as Design<C>, _final) : restDesign as Design<C>;
        // if (typeof start !== 'function') throw new Error('Fix me!');
        const apply = typeof start === 'function' ? start : applyDesign(start);
        return { components: apply(design$, props) } as DesignableComponentsProps<C>;
      };
      const transformPassthrough = (props:DesignableProps<C>) => {
        const { design, ...rest } = props;
        const newDesign = transformDesign(design);
        return (newDesign ? { ...rest, design: newDesign } : rest);
      };
      // const transformPassthrough = (props:DesignableProps<C>&P) => omit(props, ['design']) as P;
      const Designable: ComponentType<any> = flow(
        withTransformer({ transformFixed, transformPassthrough }),
        designKeys ? withHocDesign(designKeys) : identity,
      )(Component);

      Designable.displayName = `extendDesignable(${namespace})`;

      return Designable;
    }
  )
);

/**
 * Makes a component "designable". A designable component defines a set of constituent
 * sub-components which can be modified by applying one or more HOCs.  You specify the
 * HOCs to apply to each sub-component via the `withDesign` HOC.
 *
 * @param startComponents
 * An object defining the set of constituent subcomponents. Each key
 *   is a string which identifies the component. Each value is the component itself, which
 *   will be modified by any HOCs provided by withDesign.
 *
 * @return
 * A HOC which yields a designable version of the component to which it is applied.
 *
 * @category Design API
 */
export const designable = extendDesignable(() => undefined);

const varyDesign$ = <C extends DesignableComponents> (design:Design<C>):HOD<C> => (
  (baseDesign:Design<any> = {}) => (
    Object.getOwnPropertyNames(baseDesign).length === 0
      ? design
      : Object.getOwnPropertyNames(baseDesign).reduce(
        (acc, baseKey) => (
          Object.getOwnPropertyNames(design).reduce(
            (innerAcc, key) => (
              // We know this keys exist be cause we are iterating them
              {
                ...innerAcc,
                [baseKey + key]: as(
                  baseDesign[baseKey]!,
                  design[key]!,
                ),
              }
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
  (...designs: DesignOrHod<C>[]) => (baseDesign: Design<C> = {} as any) => (
    flow(
      ...designs
        .filter(design => Object.getOwnPropertyNames(design).length > 0)
        .map(design => (typeof design === 'function' ? func(design()) : func(design))),
    )(baseDesign)
  )
);

/**
 * @deprecated
 * @hidden
 */
export const varyDesign = flowDesignsWith(varyDesign$);

/**
 * Creates a new design which consists of all possible combinations of the
 * design keys of the specified designs.
 *
 * @param designs
 * The designs which should be varied together.
 *
 * @returns
 * A design.
 *
 * @category Design API
 */
export const varyDesigns = <C extends DesignableComponents = DesignableComponents>(
  ...designs: DesignOrHod<C>[]
) => varyDesign(...designs)();

/**
 * Creates a new design which is a union of all design keys of the specified
 * designs. If the same key exists in more than one design, the resulting
 * design will compose the tokens for that key from all matching designs.
 *
 * @param designs
 * The designs to be combined.
 *
 * @returns
 * The combined designs.
 *
 * @category Design API
 */
export const extendDesigns = extendDesign;
