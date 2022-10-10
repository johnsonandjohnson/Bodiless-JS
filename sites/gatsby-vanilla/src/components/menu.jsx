/* This is not the most elegant way to add external designed menu, it works but should refined. */

import * as React from 'react';
import {
  as, withDesign, addProps, startWith, replaceWith, withAppendChild,
} from '@bodiless/fclasses';
import {
  MenuCleanNonEditable, vitalMenuCore, MenuTitleClean, vitalMenuTitleCore,
} from '@bodiless/vital-navigation-core';
import { ListItem, StyledListItem } from './list';

const MenuItem1 = as(
  vitalMenuTitleCore.Default,
  withDesign({
    Link: addProps({href: '/styleguide/card'}),
    Title: addProps({children: 'Menu item 1'}),
  }),
)(MenuTitleClean);

const MenuItem2 = as(
  vitalMenuTitleCore.Default,
  withDesign({
    Link: addProps({href: '/styleguide/card'}),
    Title: addProps({children: 'Menu item 2'}),
  }),
)(MenuTitleClean);

const MenuItem3 = as(
  vitalMenuTitleCore.Default,
  withDesign({
    Link: addProps({href: '/styleguide/card'}),
    Title: addProps({children: 'Menu item 3'}),
  }),
)(MenuTitleClean);

const AddMenuItem2 = as(
  StyledListItem,
  vitalMenuCore.TopNav,
  withDesign({
    Title: startWith(MenuItem2),
  }),
)(ListItem);

const AddMenuItem3 = as(
  StyledListItem,
  vitalMenuCore.TopNav,
  withDesign({
    Title: startWith(MenuItem3),
  }),
)(ListItem);

const ExternalMenu = as(
  vitalMenuCore.TopNav,
  withDesign({
    Title: startWith(MenuItem1),
    Wrapper: as(
      withAppendChild(AddMenuItem2),
      withAppendChild(AddMenuItem3),
    ),
  }),
);

const ExternalBurgerMenu = as(
  vitalMenuCore.BurgerMenu,
  withDesign({
    Title: replaceWith(MenuItem1),
    Wrapper: as(
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.BurgerMenu,
        withDesign({
          Title: startWith(MenuItem3),
        }),
      )(ListItem)),
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.BurgerMenu,
        withDesign({
          Title: startWith(MenuItem2),
        }),
      )(ListItem)),
    ),
  }),
)(MenuCleanNonEditable);

export { ExternalMenu, ExternalBurgerMenu };
