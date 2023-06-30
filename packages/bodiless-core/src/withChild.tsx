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
  Fragment, ComponentType as CT, PropsWithChildren, FC, ComponentType
} from 'react';
import { extendDesignable } from '@bodiless/fclasses';
import type { DesignableComponentsProps, HOC } from '@bodiless/fclasses';
import omit from 'lodash/omit';

type InsertChildOptions = {
  designKey: string,
  componentName: string,
  mode?: 'append' | 'prepend',
};

/**
 * @private
 * Utility function to add (append or prepend) a Child to the given component
 * so that the Child can be altered using Design API.
 *
 * @param Child - Component to add as a child
 * @param options - A Design key to reach the Child and an optional mode ('append' | 'prepend').
 *
 * @return A HOC which will append the Child to the given Component.
 */
const insertChild = (Child: CT, options: InsertChildOptions): HOC => (
  Component = Fragment,
) => {
  type Components = { [Child: string]: CT };
  const { designKey, componentName, mode } = options;
  const startComponents: Components = { [designKey]: Child };
  const WithChild: FC<any> = (props: PropsWithChildren<DesignableComponentsProps<Components>>) => {
    const { components, ...rest } = props;
    const { children, ...restWithoutChildren } = rest;
    const { [designKey]: ChildComponent } = components;
    switch (mode) {
      case 'append':
        return (
          <Component {...restWithoutChildren as any}>
            {children}
            <ChildComponent />
          </Component>
        );
      case 'prepend':
        return (
          <Component {...restWithoutChildren as any}>
            <ChildComponent />
            {children}
          </Component>
        );
      default:
        return (
          <Component {...rest as any}>
            <ChildComponent />
          </Component>
        );
    }
  };
  const applyDesign = extendDesignable(design => omit(design, [designKey]));
  return applyDesign(startComponents, componentName)(WithChild) as ComponentType<any>;
};

/**
 * Utility function to add a Child to the given Parent component
 * so that the Child can be altered using Design API.
 *
 * @param Child - Component to add as a child
 * @param designKey - Design key to reach the Child component using Design API.
 * @param componentName - Optional component namespace for design key data attribute.
 *
 * @return A HOC which will add the Child to the given Parent.
 *
 * @example Example of adding 'span' as a child to 'div'.
 * Then customizing the span leveraging design API.
 * ```
 * const Parent = props => <div {...props} />;
 * const Child = props => <span {...props} />;
 * const ParentWithChild = flow(
 *   withoutProps(['design']),
 *   withChild(Child),
 *   withDesign({
 *     Child: addProps({
 *       className: 'test-span-class'
 *     }),
 *   }),
 * )(Parent);
 * ```
 */
const withChild = <P extends object>(
  Child: CT<any>,
  designKey: string = 'Child',
  componentName: string = 'Component',
): HOC<P> => insertChild(Child, { designKey, componentName });

/**
 * Utility function to append a Child to the given component
 * so that the Child can be altered using Design API.
 *
 * @param Child - Component to add as a child
 * @param designKey - Design key to reach the Child component using Design API.
 * @param componentName - Optional component namespace for design key data attribute.
 *
 * @return A HOC which will append the Child to the given Component.
 */
const withAppendChild = <P extends object>(
  Child: CT<any>,
  designKey: string,
  componentName: string = 'Component',
): HOC<P> => insertChild(Child, { designKey, componentName, mode: 'append' });

/**
 * Utility function to prepend a Child to the given component
 * so that the Child can be altered using Design API.
 *
 * @param Child - Component to add as a child
 * @param designKey - Design key to reach the Child component using Design API.
 * @param componentName - Optional component namespace for design key data attribute.
 *
 * @return A HOC which will prepend the Child to the given Component.
 */
const withPrependChild = <P extends object>(
  Child: CT<any>,
  designKey: string,
  componentName: string = 'Component',
): HOC<P> => insertChild(Child, { designKey, componentName, mode: 'prepend' });

export default withChild;
export {
  withAppendChild,
  withPrependChild,
};
