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

import {
  WithNodeKeyProps, withNodeKey, useNode, NodeProvider, WithNodeProps,
} from '@bodiless/core';
import React, { ComponentType, PropsWithChildren, FC } from 'react';
import { flow, identity } from 'lodash';
import {
  replaceWith, withDesign, asComponent, DesignableComponentsProps, designable, HOC,
  withoutProps,
} from '@bodiless/fclasses';

import withListButtons from './withListButtons';
import BodilessList from './List';

type ComponentOrTag<P> = ComponentType<P>|keyof JSX.IntrinsicElements;

export type TitledItemProps = PropsWithChildren<{
  title: JSX.Element,
}>;

const asTitledItem = <P extends TitledItemProps>(Item: ComponentType<P>) => {
  const TitledItem: ComponentType<P> = ({ children, ...rest }) => {
    // prepare and pass the submenu title as a prop according to rc-menu <SubMenu /> specification
    // wrap the title with current node,
    // otherwise the title will read data from incorrect node when it is rendered by <SubMenu />
    const { node } = useNode();
    const children$ = <NodeProvider node={node}>{children}</NodeProvider>;
    return (
      <Item title={children$} {...rest as any} />
    );
  };
  return TitledItem;
};

type SubListComponents = {
  WrapperItem: ComponentType<any>,
  List: ComponentType<any>,
};

const startComponents: SubListComponents = {
  WrapperItem: asComponent('li'),
  List: asComponent('ul'),
};

type SubListProps = TitledItemProps & DesignableComponentsProps<SubListComponents>;

const SubList$: FC<SubListProps> = ({
  title, children, components, ...rest
}) => {
  const { WrapperItem, List } = components;
  return (
    <WrapperItem {...rest}>
      {title}
      <List>
        {children}
      </List>
    </WrapperItem>
  );
};

const SubList = designable(startComponents)(SubList$);

/**
 * Converts a component or tag to a "bodiless" list. The component itself (usually
 * a variant of 'ul' or 'ol') will be used as the wrapper for the list, and the data
 * will be taken from bodiless data.
 *
 * @param nodeKeys
 */
const asBodilessList = (
  nodeKeys?: WithNodeKeyProps,
  // @TODO - Handle default data
  // defaultData?: Data,
) => <P extends object>(Component: ComponentOrTag<P>): ComponentType<P & WithNodeProps> => flow(
  replaceWith(BodilessList),
  withListButtons,
  withDesign({
    Wrapper: replaceWith(asComponent(Component)),
    Item: withoutProps(['addItem', 'deleteItem', 'canDelete']),
  }),
  withNodeKey(nodeKeys),
)(Component);

// This ensures that the original item is used as the sublist wrapper item.
const asSubListWrapper = (Component: any) => withDesign<SubListComponents>({
  WrapperItem: replaceWith(Component),
})(SubList);

/**
 * HOC which can be applied to a list item to convert it to a sublist.
 */
const asSubList = flow(
  asBodilessList('sublist'),
  withDesign({
    Wrapper: asSubListWrapper,
  }),
  asTitledItem,
);

const withSimpleSubListDesign = (depth: number) => (withDesign$: HOC): HOC => (
  depth === 0 ? identity
    : withDesign({
      Item: flow(
        withDesign$,
        withSimpleSubListDesign(depth - 1)(withDesign$),
      ),
    }) as HOC
);

export default asBodilessList;
export { asSubList, withSimpleSubListDesign };
