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
  BgPrimaryInteractive: 'bg-vital-primary-interactive disabled:bg-vital-primary-button-disabled',
  BorderPrimaryInteractive: 'border-vital-primary-interactive',
  TextPrimaryInteractive: 'text-vital-primary-interactive hover:opacity-70 active:text-vital-primary-interactive-active',
  TextSecondaryInteractive: 'text-vital-secondary-interactive active:text-vital-primary-interactive-active',
  TextPrimaryInteractiveNoHover: 'text-vital-primary-interactive active:text-vital-primary-interactive-active',
  TextPrimaryInteractiveHover: 'hover:text-vital-primary-interactive',
  TextSecondaryInteractiveHover: 'hover:text-vital-secondary-interactive',
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
  TextSecondaryButtonSelected: 'text-vital-secondary-button-hovered',
  BgButtonPrimarySelected: 'bg-vital-primary-button-selected',
  BgSecondaryButtonInteractive: 'bg-vital-secondary-button-selected disabled:bg-transparent disabled:text-vital-primary-button-disabled disabled:border-vital-primary-button-disabled',
  SecondaryButtonInteractive: 'hover:bg-vital-secondary-button-hovered disabled:bg-transparent disabled:text-vital-primary-button-disabled disabled:border-vital-primary-button-disabled',
  BorderSecondaryButtonInteractive: 'hover:border-vital-secondary-button-hovered',
  BgButtonSecondarySelected: 'bg-vital-secondary-button-selected',
  BorderSecondaryButton: 'hover:border-vital-secondary-button-hovered border-vital-secondary-border-button-selected',
  BgButtonSelected: 'bg-vital-secondary-button-selected',
  BorderButtonSelected: 'border-vital-secondary-button-selected',

  /**
   * Vital 2.0 Colors coming from Figma Tokens. Colors above will be deprecated.
   */

  // Background Color Tokens
  BackgroundBase: 'bg-neutral-100',
  BackgroundLayer1: 'bg-neutral-100',
  BackgroundLayer2: 'bg-quintenary-200',
  BackgroundLayer3: 'bg-tertiary-100',
  BackgroundLayer4: 'bg-quintenary-100',
  BackgroundLayer5: 'bg-secondary-200',
  BackgroundLayer6: 'bg-primary-100',
  BackgroundInverse: 'bg-neutral-900',

  // Text Color Tokens
  TextDark1: 'text-neutral-900',
  TextDark2: 'text-neutral-700',
  TextDark3: 'text-neutral-600',
  TextLight1: 'text-neutral-100',
  TextLight2: 'text-neutral-100',
  TextLight3: 'text-neutral-300',

  // Interactive Color Tokens
  InteractiveDarkDefault: 'primary-500',
  InteractiveDarkHover: 'hoverprimary-600',
  InteractiveDarkFocus: 'focus:primary-600',
  InteractiveDarkPressed: 'activeprimary-800',
  InteractiveDarkDisabled: 'neutral-600',

  // Interactive Color Tokens for text
  InteractiveDarkTextDefault: 'text-primary-500',
  InteractiveDarkTextHover: 'hover:text-primary-600',
  InteractiveDarkTextFocus: 'focus:text-primary-600',
  InteractiveDarkTextPressed: 'active:text-primary-800',
  InteractiveDarkTextDisabled: 'text-neutral-600',

  // Interactive Color Tokens for background
  InteractiveDarkBackgroundDefault: 'bg-primary-500',
  InteractiveDarkBackgroundHover: 'hover:bg-primary-100',
  InteractiveDarkBackgroundFocus: 'focus:bg-primary-100',
  InteractiveDarkBackgroundPressed: 'active:bg-primary-200',
  InteractiveDarkBackgroundDisabled: 'bg-neutral-600',

  // Interactive Color Tokens for border
  InteractiveDarkBorderDefault: 'border-primary-500',
  InteractiveDarkBorderHover: 'hover:border-primary-600',
  InteractiveDarkBorderFocus: 'focus:border-primary-600',
  InteractiveDarkBorderPressed: 'active:border-primary-800',
  InteractiveDarkBorderDisabled: 'border-neutral-600',

  // Border Color Tokens
  BorderLight: 'neutral-200',
  BorderDark: 'neutral-600',

  // Icon Color Tokens
  IconLight: 'neutral-100',
  IconDark: 'neutral-800',

  // Signal Color Tokens
  SignalError: 'error-700',
  SignalWarning: 'warning-300',
  SignalSuccess: 'success-400',
  SignalInformational: 'informational-500',
});
