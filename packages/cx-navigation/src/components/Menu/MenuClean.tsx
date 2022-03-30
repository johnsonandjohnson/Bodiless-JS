import { asBodilessMenu } from '@bodiless/navigation';
import type { ListComponents } from '@bodiless/components';
import {
  ComponentOrTag, flowHoc, Nav, Ul
} from '@bodiless/fclasses';
import { asCxTokenSpec } from '@bodiless/cx-elements';
import { withParent } from '@bodiless/core';

type MenuComponents = ListComponents & {
  Nav: ComponentOrTag<any>,
};

/**
 * A clean menu for use with all navigation elements.
 */
const MenuClean = flowHoc(
  asBodilessMenu(),
  withParent(Nav, 'Nav', 'Menu'),
)(Ul);

export const asMenuToken = asCxTokenSpec<MenuComponents>();

export default MenuClean;
