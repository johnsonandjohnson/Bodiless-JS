/**
 * Copyright © 2022 Johnson & Johnson
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
  vitalColor,
  vitalFontSize,
  vitalTextDecoration,
} from '@bodiless/vital-elements';
import {
  addProps,
  as,
  on,
  removeClasses,
  removeClassesIf,
  replaceWith,
  withDesign,
} from '@bodiless/fclasses';
import { useIsSubmenuExpanded } from '@bodiless/navigation';
import { withAnalyticsAttr } from '../../../util';
import { vitalMenuTitle, MenuTitleClean } from '../../MenuTitle';
import { asSubMenuToken } from '../SubMenuClean';

const Default = asSubMenuToken({
  A11y: {
    Wrapper: addProps({ role: 'menu' }),
    Item: addProps({ role: 'menuitem' }),
  },
  Analytics: {
    Title: withAnalyticsAttr,
  },
  Components: {
    Title: on(MenuTitleClean)(vitalMenuTitle.Default),
  },
});

const Footer = asSubMenuToken({
  ...Default,
  Theme: {
    Title: as(
      vitalTextDecoration.Uppercase,
      vitalColor.TextPrimaryFooterCopy,
      vitalFontSize.Base,
    ),
    Item: 'leading-none',
  },
  Spacing: {
    Wrapper: 'lg:mb-16 md:mr-5 lg:mr-6',
    Item: 'mt-6 first:mt-3 lg:mt-3 lg:first:mt-6',
    Title: 'my-3 lg:my-1.5',
  },
});

const TopNav = asSubMenuToken({
  ...Default,
  Components: {
    ...Default.Components,
    // Disables indicator icon per requirements.
    // @TODO: This can be removed to improve accessibility.
    SubmenuIndicator: replaceWith(() => null),
  },
  Layout: {
    Wrapper: as(
      'absolute w-auto min-w-max -left-10 -right-16 top-full hidden group-hover:flex flex-col',
      removeClasses('min-w-full'),
      removeClassesIf(useIsSubmenuExpanded)('hidden'),
    ),
    Title: 'flex',
  },
  Spacing: {
    Wrapper: 'py-3',
    Title: 'px-10 py-3',
  },
  Theme: {
    Wrapper: as(
      vitalColor.BgPrimaryCard,
      'z-20',
    ),
    Title: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalTextDecoration.Normal,
      vitalTextDecoration.Uppercase,
      // @TODO: Add to tokens?
      'text-m-base',
    ),
  },
});

const Burger = asSubMenuToken({
  ...Default,
  Components: {
    ...Default.Components,
    // Removes accordions icons.
    OuterWrapper: withDesign({
      Title: withDesign({
        Icon: replaceWith(() => null),
      }),
    }),
  },
  Spacing: {
    Item: 'mt-10',
  },
  Theme: {
    Title: as(
      vitalColor.TextPrimaryHeaderCopy,
      vitalFontSize.Base,
      vitalTextDecoration.Uppercase,
    ),
  },
});

export default {
  Default,
  Burger,
  Footer,
  TopNav,
};
