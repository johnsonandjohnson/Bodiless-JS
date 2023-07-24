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

import { asTokenGroup } from '../../../util';
import { ColorMeta } from '../meta';

export default asTokenGroup(ColorMeta)({
  BgPrimaryBrand: 'bg-vital-primary-brand',
  TextPrimaryBrand: 'text-vital-primary-brand',
  BgPrimaryCard: 'bg-vital-primary-card-bg',
  BgPrimaryPage: 'bg-vital-primary-page-bg',
  BgPrimaryInteractive: 'bg-vital-primary-interactive',
  BorderPrimaryInteractive: 'border-vital-primary-interactive',
  TextPrimaryInteractive: 'text-vital-primary-interactive hover:opacity-70 active:text-vital-primary-interactive-active',
  TextPrimaryInteractiveNoHover: 'text-vital-primary-interactive active:text-vital-primary-interactive-active',
  TextPrimaryInteractiveHover: 'hover:text-vital-primary-interactive',
  WithTextPrimaryInteractiveDisabled: 'text-opacity-60',
  BgPrimaryDivider: 'bg-vital-primary-divider',
  TextPrimaryDivider: 'text-vital-primary-divider',
  TextPrimaryBodyCopy: 'text-vital-primary-body-copy',
  TextPrimaryHeaderCopy: 'text-vital-primary-header-copy',
  BgSecondaryFooter: 'bg-vital-secondary-footer-bg',
  TextPrimaryFooterCopy: 'text-vital-primary-footer-copy',
  TextSecondaryEyebrow: 'text-vital-secondary-eyebrow',
  BgSecondaryTable: 'bg-vital-secondary-table',
  BgSecondaryTableRowColumn: 'bg-vital-secondary-table-interactive',
  BgSecondaryTableInteractive: 'hover:bg-vital-secondary-table-interactive',
  BorderGrid: 'border-vital-secondary-table',
  BorderSecondarySeparator: 'border-vital-secondary-separator',
  BorderSecondarySearch: 'border-vital-secondary-search',
  BgWhite: 'bg-white',
  TextWhite: 'text-white',
  TextButtonSelected: 'text-vital-secondary-button-selected',
  BgButtonSelected: 'bg-vital-secondary-button-selected',
  BorderButtonSelected: 'border-vital-secondary-button-selected',

  /**
   * Vital 2.0 Colors coming from Figma Tokens. Colors above will be deprecated.
   */

  // Icon Color Tokens
  IconLight: 'neutral-100',
  IconDark: 'neutral-800',

  // Signal Color Tokens
  SignalError: 'error-700',
  SignalWarning: 'warning-300',
  SignalSuccess: 'success-400',
  SignalInformational: 'informational-500',

  // Background Color Tokens
  BackgroundBase: 'bg-kenvue-neutrals-white',
  BackgroundAlt1: 'bg-kenvue-green-tint-20',
  BackgroundAlt2: 'bg-kenvue-purple-purple',
  BackgroundAlt3: 'bg-kenvue-yellow-yellow',
  BackgroundAlt4: 'bg-kenvue-red-red',
  BackgroundAlt5: 'bg-kenvue-neutrals-black',
  BackgroundAlt6: 'bg-kenvue-neutrals-lightest-grey',
  BackgroundAlt7: 'bg-kenvue-green-shade-40',
  BackgroundAlt8: 'bg-kenvue-neutrals-darkest-grey',

  // Border Color Tokens
  BorderLightThemeBase: 'border-kenvue-neutrals-light-grey',
  BorderDarkThemeBase: 'border-kenvue-neutrals-white',
  // BorderDarkThemeAlt1: 'border---no-value--',
  BorderLightThemeAlt1: 'border-kenvue-neutrals-grey',

  // Interactive Color Tokens for background
  BackgroundInteractiveLightThemeIdle: 'bg-kenvue-green-green',
  BackgroundInteractiveLightThemeHover: 'hover:bg-kenvue-green-shade-80',
  BackgroundInteractiveLightThemeFocus: 'focus:bg-kenvue-green-shade-80',
  BackgroundInteractiveLightThemePressed: 'active:bg-kenvue-green-shade-60',
  BackgroundInteractiveLightThemeDisabled: 'bg-kenvue-neutrals-grey',

  BackgroundInteractiveDarkThemeIdle: 'bg-kenvue-green-tint-40',
  BackgroundInteractiveDarkThemeHover: 'hover:bg-kenvue-green-tint-60',
  BackgroundInteractiveDarkThemeDisabled: 'bg-kenvue-neutrals-light-grey',
  BackgroundInteractiveDarkThemePressed: 'active:bg-kenvue-green-tint-20',
  BackgroundInteractiveDarkThemeFocus: 'focus:bg-kenvue-green-tint-60',

  // Interactive Color Tokens for scrollbar
  ScrollbarInteractiveDarkThemeIdle: 'scrollbar-kenvue-green-tint-40',
  ScrollbarInteractiveDarkThemeHover: 'scrollbar-kenvue-green-tint-60',
  ScrollbarInteractiveDarkThemeFocus: 'scrollbar-kenvue-green-tint-60',
  ScrollbarInteractiveDarkThemePressed: 'scrollbar-kenvue-green-tint-20',
  ScrollbarInteractiveDarkThemeDisabled: 'scrollbar-kenvue-neutrals-light-grey',

  ScrollbarInteractiveLightThemeIdle: 'scrollbar-kenvue-green-green',
  ScrollbarInteractiveLightThemeHover: 'scrollbar-kenvue-green-shade-80',
  ScrollbarInteractiveLightThemeFocus: 'scrollbar-kenvue-green-shade-80',
  ScrollbarInteractiveLightThemePressed: 'scrollbar-kenvue-green-shade-60',
  ScrollbarInteractiveLightThemeDisabled: 'scrollbar-kenvue-neutrals-grey',

  // Interactive Color Tokens for border
  BorderInteractiveLightThemeIdle: 'border-kenvue-green-green',
  BorderInteractiveLightThemeHover: 'hover:border-kenvue-green-shade-80',
  BorderInteractiveLightThemeFocus: 'focus:border-kenvue-green-shade-80',
  BorderInteractiveLightThemePressed: 'active:border-kenvue-green-shade-60',
  BorderInteractiveLightThemeDisabled: 'border-kenvue-neutrals-grey',

  BorderInteractiveDarkThemeIdle: 'border-kenvue-green-tint-40',
  BorderInteractiveDarkThemeHover: 'border-kenvue-green-tint-60',
  BorderInteractiveDarkThemeFocus: 'border-kenvue-green-tint-60',
  BorderInteractiveDarkThemePressed: 'border-kenvue-green-tint-20',
  BorderInteractiveDarkThemeDisabled: 'border-kenvue-neutrals-light-grey',

  // Text Color Tokens
  TextLightThemeBase: 'text-kenvue-neutrals-black',
  TextLightThemeAlt1: 'text-kenvue-neutrals-darkest-grey',
  TextLightThemeAlt2: 'text-kenvue-neutrals-dark-grey',
  TextDarkThemeBase: 'text-kenvue-neutrals-white',
  TextDarkThemeAlt1: 'text-kenvue-neutrals-lightest-grey',
  TextDarkThemeAlt2: 'text---no-value--',

  // Interactive Color Tokens for text
  TextInteractiveLightThemeIdle: 'text-kenvue-green-green',
  TextInteractiveLightThemeHover: 'hover:text-kenvue-green-shade-80',
  TextInteractiveLightThemeFocus: 'focus:text-kenvue-green-shade-80',
  TextInteractiveLightThemePressed: 'active:text-kenvue-green-shade-60',
  TextInteractiveLightThemeDisabled: 'text-kenvue-neutrals-grey',

  TextInteractiveDarkThemeIdle: 'text-kenvue-green-tint-40',
  TextInteractiveDarkThemeHover: 'text-kenvue-green-tint-60',
  TextInteractiveDarkThemeFocus: 'text-kenvue-green-tint-60',
  TextInteractiveDarkThemePressed: 'text-kenvue-green-tint-20',
  TextInteractiveDarkThemeDisabled: 'text-kenvue-neutrals-light-grey',

});
