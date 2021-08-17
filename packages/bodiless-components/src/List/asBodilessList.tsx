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
  WithNodeKeyProps, withNodeKey, useNode, NodeProvider, withOnlyProps,
} from '@bodiless/core';
import React, {
  Fragment, ComponentType, PropsWithChildren, FC,
} from 'react';
import { flow, identity } from 'lodash';
import {
  replaceWith, withDesign, asComponent, DesignableComponentsProps, designable, HOC,
  withoutProps, stylable, Design, asToken, Enhancer,
} from '@bodiless/fclasses';

import withListButtons from './withListButtons';
import BodilessList from './List';
import {
  ListData, UseListOverrides, ListProps, ListComponents,
} from './types';

export type TitledItemProps = PropsWithChildren<{
  title: JSX.Element,
}>;

const asTitledItem: Enhancer<TitledItemProps> = Item => {
  const TitledItem: FC<any> = ({ children, ...rest }) => {
    // prepare and pass the submenu title as a prop according to rc-menu <SubMenu /> specification
    // wrap the title with current node,
    // otherwise the title will read data from incorrect node when it is rendered by <SubMenu />
    const { node } = useNode();
    const children$ = <NodeProvider node={node}>{children}</NodeProvider>;
    return (
      <Item title={children$} {...rest} />
    );
  };
  return TitledItem;
};

type SubListWrapperComponents = {
  WrapperItem: ComponentType<any>,
  List: ComponentType<any>,
  Title: ComponentType<any>
};

const sublistWrapperComponents: SubListWrapperComponents = {
  WrapperItem: asComponent('li'),
  List: asComponent('ul'),
  Title: withOnlyProps('key', 'children')(Fragment),
};

type SubListWrapperProps =
  TitledItemProps & DesignableComponentsProps<SubListWrapperComponents>;

const SubListWrapper$: FC<SubListWrapperProps> = ({
  title, children, components, ...rest
}) => {
  const { WrapperItem, List, Title } = components;
  return (
    <WrapperItem {...rest}>
      <Title>{title}</Title>
      <List>
        {children}
      </List>
    </WrapperItem>
  );
};

const SubListWrapper = designable(sublistWrapperComponents, 'SubList')(SubListWrapper$);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultData?: ListData,
  useOverrides?: UseListOverrides,
): Enhancer<ListProps> => Component => flow(
  replaceWith(BodilessList),
  withListButtons(useOverrides),
  withDesign({
    Wrapper: replaceWith(asComponent(Component)),
    Item: withoutProps(['addItem', 'deleteItem', 'canDelete', 'unwrap']),
  }),
  withNodeKey(nodeKeys),
)(Component);

// This ensures that the original item is used as the sublist wrapper item.
const asSubListWrapper:HOC = Component => withDesign<SubListWrapperComponents>({
  WrapperItem: replaceWith(Component),
})(SubListWrapper as ComponentType<any>);

type SubListComponents = ListComponents & {
  OuterWrapper: ComponentType<any>,
};
type SubListProps = Omit<ListProps, 'design'> & { design: Design<SubListComponents> };

const passWrapperDesignToSubList = (SubList: ComponentType<SubListProps>) => {
  const PassWrapperDesignToSubList = (props: SubListProps) => {
    const { design = {}, ...rest } = props;
    const { Wrapper, OuterWrapper, ...restDesign } = design;

    const newDesign = {
      ...restDesign,
      Wrapper: asToken(
        OuterWrapper || identity,
        withDesign({
          List: Wrapper || identity,
        }),
      ),
    };
    return <SubList {...rest} design={newDesign} />;
  };
  return PassWrapperDesignToSubList;
};

/**
 * HOC which can be applied to a list item to convert it to a sublist.
 */
const asSubList = (useOverrides?: UseListOverrides) => flow(
  // First, replace with a bodiless list which sets the "Wrapper" to be
  // the original item.
  asBodilessList('sublist', undefined, useOverrides),
  // Next, replace that "Wrapper" with our SublistWrapper component which
  // now uses the original component as the "WrapperItem"
  withDesign({
    Wrapper: asSubListWrapper,
  }),
  // Finally, pass any design on "Wrapper" to the "List" design key within
  // the SubListWrapper. We add the "OuterWrapper" key to design the
  // "SugListWrapper" itself.
  passWrapperDesignToSubList,
  asTitledItem,
);

const withSimpleSubListDesign = (depth: number) => (withDesign$: HOC): HOC => (
  depth === 0 ? identity
    : withDesign({
      Item: asToken(
        withDesign$,
        withSimpleSubListDesign(depth - 1)(withDesign$),
      ),
    })
);

// @TODO: Should this be a part of asBodilessList?
const asStylableList = withDesign({
  Wrapper: stylable,
  Item: stylable,
  Title: stylable,
});

// @TODO: Should this be a part of asSubListWrapper?
const asStylableSubList = flow(
  stylable,
  withDesign({
    OuterWrapper: stylable,
    Wrapper: stylable,
    Item: stylable,
    Title: stylable,
  }),
);

export default asBodilessList;
export {
  asSubList, withSimpleSubListDesign, asStylableList, asStylableSubList,
};
