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

import omit from 'lodash/omit';
import React, { ComponentType, PropsWithChildren } from 'react';
import { HOC, DesignableComponentsProps, extendDesignable } from '@bodiless/fclasses';

/**
 * Utility function to add a Parent component to the given Child component
 * so that the Parent may be altered using the Design API.
 *
 * @param Parent - Component to add as a Parent
 * @param designKey - A Design key to reach the Parent. 'Parent' by default.
 * @param componentName - Optional component namespace for design key data attribute.
 *
 * @return A HOC which will wrap the given Child component with provided Parent.
 *
 * @example Example of adding 'div' as a parent to 'span'.
 * Then customizing the div leveraging the design API.
 * ```
 * const Parent = props => <div {...props} />;
 * const Child = props => <span {...props} />;
 * const ChildWithParent = flow(
 *   withoutProps(['design']),
 *   withParent(Parent),
 *   withDesign({
 *     Parent: addClasses('parent-classes'),
 *   }),
 * )(Child);
 * ```
 */
const withParent = (
  Parent: ComponentType,
  designKey: string = 'Parent',
  componentName: string = 'Component',
): HOC => (
  Component,
) => {
  type Components = { [Parent: string]: ComponentType<PropsWithChildren> };
  const startComponents: Components = { [designKey]: Parent };
  const WithParent = (props: PropsWithChildren<DesignableComponentsProps<Components>>) => {
    const { components, ...rest } = props;
    const { [designKey]: ParentComponent } = components;

    return (
      <ParentComponent>
        <Component {...rest as any} />
      </ParentComponent>
    );
  };
  const applyDesign = extendDesignable(design => omit(design, [designKey]));
  return applyDesign(startComponents, componentName)(WithParent) as ComponentType<any>;
};

export default withParent;
