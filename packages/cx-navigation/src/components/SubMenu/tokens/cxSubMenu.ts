import {
  // addClassesIf,
  addProps,
  as,
  flowHoc,
  // not,
  on,
  removeClassesIf,
} from '@bodiless/fclasses';
import { cxColor, cxTextDecoration } from '@bodiless/cx-elements';
import {
  // isMenuContextActive,
  // useIsMenuOpen,
  useIsSubmenuExpanded,
} from '@bodiless/navigation';
import { asSubMenuToken } from '../SubMenuClean';
import { cxMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { withAnalyticsAttr } from '../../../util';

const Base = asSubMenuToken({
  A11y: {
    Wrapper: addProps({ role: 'menu' }),
    Item: addProps({ role: 'menuitem' }),
  },
  Analytics: {
    Title: withAnalyticsAttr,
  },
  Components: {
    Title: on(MenuTitleClean)(cxMenuTitle.Default),
  },
});

const Footer = asSubMenuToken(Base, {
  Theme: {
    Title: as(
      cxTextDecoration.Uppercase,
      cxColor.TextPrimaryFooterCopy,
      'text-base',
      // @todo why is this not an available token in cxFontSize?
      'font-medium md:text-sm lg:text-xs',
    ),
    Item: 'leading-none',
  },
  Spacing: {
    Item: 'mt-5 lg:mt-3',
  },
});

// @TODO: Keep it opened as user is editing it.
const TopNavList = asSubMenuToken({
  ...Base,
  // @TODO: Improve theme, layout, and spacing.
  Layout: {
    Wrapper: flowHoc(
      as('absolute w-40 left-0 top-full hidden group-hover:flex flex-col'),
      removeClassesIf(useIsSubmenuExpanded)('hidden'),
    ),
    Item: 'relative flex',
    _: flowHoc(
      as('relative group'),
      // addClassesIf(not(useIsMenuOpen))('hover:static'),
      // removeClassesIf(isMenuContextActive)('relative'),
    ),
  },
  Spacing: {
    Item: 'px-6 py-2',
  },
  Theme: {
    Wrapper: as(cxColor.BgPrimaryCard),
  },
});

export default {
  Base,
  Footer,
  TopNavList,
};
