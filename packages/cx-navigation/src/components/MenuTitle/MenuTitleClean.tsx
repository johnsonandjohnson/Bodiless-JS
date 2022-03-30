import { EditorPlainClean } from '@bodiless/cx-editors';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { LinkClean } from '@bodiless/cx-link';
import { replaceable, replaceWith, withDesign } from '@bodiless/fclasses';
import type { MenuTitleComponents } from '@bodiless/navigation';
import { MenuTitle } from '@bodiless/navigation';

const MenuTitleClean = withDesign({
  Link: replaceWith(LinkClean),
  Title: replaceWith(replaceable(EditorPlainClean)),
})(MenuTitle);

export default MenuTitleClean;

export const asMenuTitleToken = asCxTokenSpec<MenuTitleComponents>();
