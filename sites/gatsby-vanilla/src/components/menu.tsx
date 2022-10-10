/* This is not the most elegant way to add external designed menu, it works but should refined. */

import {
  as, withDesign, addProps, startWith, withAppendChild,
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
      withAppendChild(AddMenuItem2, 'MenuItem2'),
      withAppendChild(AddMenuItem3, 'MenuItem3'),
    ),
  }),
);

const ExternalBurgerMenu = as(
  vitalMenuCore.Burger,
  withDesign({
    Title: as(
      StyledListItem,
      vitalMenuCore.Burger,
      withDesign({
        Title: startWith(MenuItem1),
      }),
    ),
    Wrapper: as(
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.Burger,
        withDesign({
          Title: startWith(MenuItem3),
        }),
      )(ListItem), 'MenuItem3'),
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.Burger,
        withDesign({
          Title: startWith(MenuItem2),
        }),
      )(ListItem), 'MenuItem2'),
    ),
  }),
)(MenuCleanNonEditable);

const FooterMenu = as(
  vitalMenuCore.Footer,
  withDesign({
    Title: startWith(as(
      vitalMenuTitleCore.Default,
      withDesign({
        Title: startWith(MenuItem1),
        // TO DO: Need to add sublists.
      }),
    )(MenuTitleClean)),
    Wrapper: as(
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.Footer,
        withDesign({
          Title: startWith(MenuItem3),
        }),
      )(ListItem), 'MenuItem3'),
      withAppendChild(as(
        StyledListItem,
        vitalMenuCore.Footer,
        withDesign({
          Title: startWith(MenuItem2),
        }),
      )(ListItem), 'MenuItem2'),
    ),
  }),
);

export { ExternalMenu, ExternalBurgerMenu, FooterMenu };
