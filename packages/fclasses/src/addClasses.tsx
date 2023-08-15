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

import React, { FC, ReactNode } from 'react';
import union from 'lodash/union';
import difference from 'lodash/difference';
import capitalize from 'lodash/capitalize';
import type {
  ComponentOrTag, Enhancer, Condition, DesignableProps
} from './types';

/**
 * A single CSS class string or an array of them.
 *
 * @category FClasses API
 */
export type Classes = string|string[];

/**
 * Type of the className aggregator prop received by [[stylable]] component.
 *
 * An `FClasses` object is an operation to be performed on the `className`
 * prop. Each contains refers to the previous operation. When applied, the
 * chain will be traversed and operations performed for each.
 *
 * @category FClasses API
 */
export type FClasses = {
  /**
   * Whether classes should be added or removed.
   */
  operation?: 'add' | 'remove',
  /**
   * The classes to be added or removed.
   */
  classes?: Classes,
  /**
   * The previous operation, if one exists.
   */
  parentFClasses?: FClasses,
};

/**
 * Type of the props created by [[stylable]].
 * @category FClasses API
 */
export type StylableProps = {
  /**
   * The accumulated classes which should be added to the component.
   */
  fClasses?: FClasses;
  children?: ReactNode;
};

type Classable = {
  className?: string,
};

const alwaysTrueCondition = () => true;

/**
 * The basic functionality for all class manipulation.
 */
const modifyClassesIf = (operation: 'add' | 'remove') => <A extends object>(
  condition: Condition<A>,
) => (classes?: Classes) => {
    const hoc: Enhancer<A> = Component => {
      const ModifyClasses: FC<any> = props => {
        const { fClasses, ...rest } = props;
        const newFClasses = condition(props) ? {
          parentFClasses: fClasses,
          operation,
          classes,
        } : fClasses;
        return (
          <Component fClasses={newFClasses} {...rest as any} />
        );
      };
      ModifyClasses.displayName = `${capitalize(operation)}Classes`;
      return ModifyClasses;
    };
    return hoc;
  };

/**
 * Add classes to a component conditionally.
 *
 * @param
 * A custom condition hook which will be evaluated at render time
 * to determine whether the classes should be added. You may use
 * React hooks.
 *
 * @returns
 * A HOC factory function with the same signature as [[addClasses]].
 *
 * @cateogry FClasses API
 *
 * @param condition A function that is evaluated to determine whether classes should be added.
 * @returns HOC that can be used for adding classes to a component
 * @category FClasses API
 */
const addClassesIf = modifyClassesIf('add');

/**
 * HOC factory which specifies that a list of classes should be added to the
 * wrapped component's className.
 *
 * @param classes
 * A string or array of classes to add.
 *
 * @returns
 * A HOC which adds the specified classes to a [[stylable]] component.
 *
 * @category FClasses API
 */
const addClasses = addClassesIf(alwaysTrueCondition);

/**
 * Remove classes from a stylable component conditionally.
 *
 * @param condition A function that is evaluated to determine whether classes should be removed.
 * @returns HOC that can be used for removing classes from a component
 *
 * @category FClasses API
 */
const removeClassesIf = modifyClassesIf('remove');

/**
 * Remove classes from a stylable component.
 *
 * @param classes
 * A string or array of classes to remove. If not specified, then *all* classes will
 * be removed.
 *
 * @returns
 * HOC which removes the specified classes.
 *
 * @category FClasses API
 */
const removeClasses = removeClassesIf(alwaysTrueCondition);

const asArray = (classes: Classes = []) => (Array.isArray(classes) ? classes : classes.split(' '));
const asClassName = (classes: Classes) => {
  const asString = (Array.isArray(classes) ? classes.join(' ') : classes);
  return asString || undefined;
};
const asFClasses = (classes: Classes): FClasses => ({
  operation: 'add',
  classes,
});

const apply = (
  { operation, classes, parentFClasses }: FClasses = {},
  className: Classes = [],
): Classes => {
  let newClasses;
  switch (operation) {
    case 'add': newClasses = union(asArray(classes), asArray(className)); break;
    case 'remove': newClasses = classes ? difference(asArray(className), asArray(classes)) : []; break;
    default: newClasses = className;
  }
  return parentFClasses ? apply(parentFClasses, newClasses) : newClasses;
};

type ForwardRefProps = {
  forwardRef?: React.Ref<any>;
};

/**
 * HOC which makes any component or intrinsic element stylable using FClasses.
 * When the component is * wrapped by `addClasses()` or `removeClasses()`, the
 * specified operations will be applied in reverse order up the component tree,
 * so that the outermost operations take precedence.
 *
 * Adds [[StylableProps]] to the component.
 *
 * > When making a plain HTML tag stylable, use a type parameter to ensure
 * > the resulting component has the correct prop types.
 *
 * @example ** Create a stylable `div` and apply some classes **
 * ```ts
 * const Div = stylable<HTMLProps<HTMLDivElement>>('div');
 * const StyledDiv = addClasses('bg-black text-white')(Div);
 * const BlueDiv = flowHoc(removeClasses('bg-black'), addClasses('bg-blue')(StyledDiv);
 * ```
 *
 * @category FClasses API
 */
const stylable: Enhancer<StylableProps> = (Component: ComponentOrTag<any>) => {
  const Stylable = (props: StylableProps & ForwardRefProps & Classable & DesignableProps) => {
    const {
      fClasses,
      className,
      forwardRef,
      ...rest
    } = props;
    const classes = apply(fClasses);
    const newClassName = asClassName(className ? apply(asFClasses(className), classes) : classes);

    if (rest.design && !Object.keys(rest.design).length) {
      // This prevents empty design objects from being rendered to the DOM.
      delete rest.design;
    }

    return <Component {...rest as any} className={newClassName} ref={forwardRef} />;
  };
  Stylable.displayName = 'Stylable';
  return Stylable;
};

export {
  addClasses,
  addClassesIf,
  removeClasses,
  removeClassesIf,
  stylable,
};
