import {
  addProps,
  as,
  on,
} from '@bodiless/fclasses';
import {
  withMenuDesign,
  withListSubMenu,
} from '@bodiless/navigation';
import { cxColor, cxTextDecoration } from '@bodiless/cx-elements';
import { asMenuToken } from '../MenuClean';
import { cxMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { cxSubMenu } from '../../SubMenu';
import { cxSeparator } from '../../Separator';

/**
 * Token which produces the Base CanvasX Menu. Can be customized and
 * extended to produce TopNav, Burger, Footer, etc...
 */
const Base = asMenuToken({
  // @todo do we need this?
  // Analytics: {
  //   _: withMenuTitleAnalytics,
  // }
  // @TODO: Why A11y domain is not working properly?
  A11y: {
    Nav: addProps({ role: 'navigation' }),
    Wrapper: addProps({ role: 'menubar' }),
    Item: addProps({ role: 'menuitem' }),
  },
  Components: {
    Title: on(MenuTitleClean)(cxMenuTitle.Default),
  },
});

const Default = asMenuToken({
  ...Base,
});

/**
 * Token which produces the CanvasX Footer Menu.
 */
const Footer = asMenuToken({
  ...Base,
  Core: {
    _: withListSubMenu(),
  },
  A11yContent: {
    Nav: addProps({ 'aria-label': 'Footer Navigation Menu' }),
    Wrapper: addProps({ 'aria-label': 'Navigation Menu' }),
  },
  Components: {
    ...Base.Components,
    _: withMenuDesign('List')(as(cxSubMenu.Footer)),
  },
  Layout: {
    Nav: 'w-full lg:h-full',
    Wrapper: 'w-full md:flex md:justify-between md:flex-grow lg:h-full',
    Item: 'md:min-w-1/4 md:w-full',
  },
  Spacing: {
    Wrapper: 'lg:mb-12',
  },
  Theme: {
    // @todo this 'as' is needed only because of a bug and should be removed when it is fixed.
    // See https://github.com/johnsonandjohnson/Bodiless-JS/issues/1455
    Item: as(cxSeparator.FooterMenu),
    Title: as(
      cxColor.TextPrimaryFooterCopy,
      cxTextDecoration.Bold,
      // @todo should we use tokens here?
      'text-m-xl md:text-m-lg lg:text-base',
    ),
  },
});

/**
 * Token which produces the CanvasX Top Navigation Menu.
 */
const TopNav = asMenuToken({
  ...Base,
  Core: {
    _: withListSubMenu(),
  },
  Components: {
    ...Base.Components,
    _: withMenuDesign('List')(as(cxSubMenu.TopNavList)),
  },
  // @TODO: Improve theme, layout, and spacing.
  Theme: {
    Wrapper: 'flex',
    Title: 'px-6',
  },
});

/**
 * Token which produces the CanvasX Utility Menu.
 */
const Utility = asMenuToken({
  ...Base,
  A11y: {
    Nav: addProps({ role: 'tablist' }),
  },
  A11yContent: {
    Nav: addProps({ 'aria-label': 'Utility Menu' }),
  },
  Theme: {
    Wrapper: 'flex',
    Title: as(cxSeparator.UtilityMenu),
  },
});

export default {
  Base,
  Default,
  Footer,
  TopNav,
  Utility,
};
