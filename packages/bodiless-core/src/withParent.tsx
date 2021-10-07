import omit from 'lodash/omit';
import React, { ComponentType, PropsWithChildren } from 'react';
import { Token, DesignableComponentsProps, extendDesignable } from '@bodiless/fclasses';

/**
 * Utility function to add a Parent component to the given Child component
 * so that the Parent may be altered using the Design API.
 *
 * @param Parent - Component to add as a Parent
 * @param designKey - A Design key to reach the Parent. 'Parent' by default.
 *
 * @return An HOC which will wrap the given Child component with provided Parent.
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
const withParent = (Parent: ComponentType, designKey: string = 'Parent'): Token => (
  Component,
) => {
  type Components = { [Parent: string]: ComponentType };
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
  return applyDesign(startComponents, designKey)(WithParent);
};

export default withParent;
