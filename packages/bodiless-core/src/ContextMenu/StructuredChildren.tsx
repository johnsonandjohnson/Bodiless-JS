/**
 * Copyright © 2020 Johnson & Johnson
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
  FC, ReactElement, ReactNode, ComponentType,
} from 'react';
import { flow } from 'lodash';
import type { IContextMenuItemProps } from '../Types/ContextMenuTypes';

type GroupTree = {
  [name: string]: {
    element: ReactElement,
    members: GroupTree,
  }
};

export const asElementArray = (children: ReactNode): ReactElement[] => React.Children
  .toArray(children)
  .filter(React.isValidElement);

export const addMissingGroups = (GroupComponent: ComponentType<IContextMenuItemProps>) => (
  (elements: ReactElement[]): ReactElement[] => elements.reduce(
    (acc: ReactElement[], el: ReactElement) => {
      if (el.props.group && !acc.find(el$ => el$.props.name === el.props.group)) {
        return [...acc, <GroupComponent name={el.props.group} />];
      }
      return acc;
    },
    elements,
  )
);

export const buildGroupTree = (elements: ReactElement[], groupName: string = '_default'): GroupTree => elements
  .filter(el => (el.props.group || '_default') === groupName)
  .reduce((acc, child) => ({
    ...acc,
    [child.props.name]: {
      element: child,
      members: buildGroupTree(elements, child.props.name),
    },
  }), {});

export const cloneChildren = (props: any = {}) => (tree: GroupTree): ReactElement[] => Object
  .getOwnPropertyNames(tree)
  .reduce((acc: ReactElement[], name: string) => {
    const entry = tree[name];
    const newElement = React.cloneElement(entry.element, {
      ...props,
      key: entry.element.props.name,
      children: cloneChildren(props)(entry.members),
    });
    return [...acc, newElement];
  }, []);

const buildChildren = (
  DefaultGroupComponent: ComponentType<IContextMenuItemProps> = React.Fragment,
  props: any = {},
) => flow(
  asElementArray,
  addMissingGroups(DefaultGroupComponent),
  buildGroupTree,
  cloneChildren(props),
);

type GroupedChildrenProps = {
  components: {
    Group: ComponentType<IContextMenuItemProps>,
  },
  [prop: string]: any,
};

const StructuredChildren: FC<GroupedChildrenProps> = ({ components, children, ...rest }) => (
  <>{buildChildren(components.Group, rest)(children)}</>
);

export default StructuredChildren;
