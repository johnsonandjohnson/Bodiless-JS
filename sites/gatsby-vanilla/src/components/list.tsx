/* Declared List Item so can add individual list items to a list */

import React, { FC } from 'react';
import {
  DesignableComponentsProps, Fragment, ComponentOrTag, Li, designable, as,
} from '@bodiless/fclasses';
import { asVitalTokenSpec } from '@bodiless/vital-elements/';

type ListItemComponents = {
  Item: ComponentOrTag<any>,
  Title: ComponentOrTag<any>
};

const listItemComponentStart: ListItemComponents = {
  Item: Li,
  Title: Fragment,
};

type ListItemComponentProps = DesignableComponentsProps<ListItemComponents>;

const ListItemComponentBase: FC<ListItemComponentProps> = ({
  children, components, ...rest
}) => {
  const { Item, Title } = components;
  return (
    <Item>
      <Title />
    </Item>
  );
};

const ListItem = as(
  designable(listItemComponentStart, 'ListItem'),
)(ListItemComponentBase);

export const asStyledListItemToken = asVitalTokenSpec<ListItemComponents>();

const StyledListItem = asStyledListItemToken({
  Components: {
    // Item: TBD
    // Title: TBD
  },
});

export { StyledListItem, ListItem };
