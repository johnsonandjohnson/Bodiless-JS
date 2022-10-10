import * as React from 'react';
import {
  as, withDesign, startWith, replaceWith, on, removeClasses,
} from '@bodiless/fclasses';
import { MenuCleanNonEditable } from '@bodiless/vital-navigation-core';
import {
  vitalHeader, asHeaderToken,
} from '@bodiless/vital-layout-core';
import { ExternalMenu, ExternalBurgerMenu } from './menu';

const Logo = () => (
  <a href="\" className="flex flex-row items-center">
    <img
      className="h-16 m-0"
      alt="LOGO"
      src="/images/logo.webp"
    />
    <span className="ml-4 font-bold text-4xl">without Editable Features</span>
  </a>
);

export const asVanillaHeader = asHeaderToken(vitalHeader.Default, {
  Layout: {
    // Using removeclasses as its just a quick way to swap justify-between & justify-end
    MenuContainer: as(
      'justify-end',
      removeClasses('justify-between'),
    ),
  },
  Components: {
    Logo: startWith(Logo),
    Menu: on(MenuCleanNonEditable)(ExternalMenu),
    BurgerMenu: withDesign({
      Menu: replaceWith(ExternalBurgerMenu),
    }),
    WhereToBuy: replaceWith(() => null),
  },
});
