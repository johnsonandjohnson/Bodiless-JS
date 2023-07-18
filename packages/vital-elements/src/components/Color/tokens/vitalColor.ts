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

// Semantic Theme to Brand
// Not sure where this would live.. but a brand would have to change all of these.
const vitalSemanticBrand = asTokenGroup(ColorMeta)({
  SemanticColorTextDarkThemeBase: 'ColorKenvueNeutralsWhite',
  SemanticColorInteractiveLightThemeIdle: 'ColorKenvueGreenGreen',
  SemanticColorInteractiveLightThemeHover: 'ColorKenvueGreenShade80',
  SemanticColorInteractiveLightThemeFocus: 'focus:ColorKenvueGreenShade80',
  SemanticColorInteractiveLightThemePressed: 'active:ColorKenvueGreenShade60',
  SemanticColorInteractiveLightThemeDisabled: 'ColorKenvueNeutralsGray',
});

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

  // Semantic Component to Semantic Theme
  // Not sure we can preface a token color with text/border/ but pretending we can.
  ColorButtonPrimaryTextDarkThemeText: 'text' + vitalSemanticBrand.SemanticColorTextDarkThemeBase,

  // Interactive Color Tokens for text
  SemanticColorSecondaryTextLightThemeDefault: 'text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeIdle,
  SemanticColorSecondaryTextLightThemeHover: 'hover:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeIdle,
  SemanticColorSecondaryTextLightThemeFocus: 'focus:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeFocus,
  SemanticColorSecondaryTextLightThemePressed: 'active:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemePressed,
  SemanticColorSecondaryTextLightThemeDisabled: 'text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeDisabled,
  SemanticColorTertiaryTextLightThemeIdle: 'text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeIdle,
  SemanticColorTertiaryTextLightThemeHover: 'hover:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeHover,
  SemanticColorTertiaryTextLightThemeFocus: 'focus:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeFocus,
  SemanticColorTertiaryTextLightThemePressed: 'active:text' + vitalSemanticBrand.SemanticColorInteractiveLightThemePressed,
  SemanticColorTertiaryTextLightThemeDisabled: 'text' + vitalSemanticBrand.SemanticColorInteractiveLightThemeDisabled,

  // Interactive Color Tokens for background
  SemanticColorPrimaryBackgroundLightThemeIdle: 'background' + vitalSemanticBrand.SemanticColorInteractiveLightThemeIdle,
  SemanticColorPrimaryBackgroundLightThemeHover: 'background' + vitalSemanticBrand.SemanticColorInteractiveLightThemeHover,
  SemanticColorPrimaryBackgroundLightThemeFocus: 'background' + vitalSemanticBrand.SemanticColorInteractiveLightThemeFocus,
  SemanticColorPrimaryBackgroundLightThemePressed: 'background' + vitalSemanticBrand.SemanticColorInteractiveLightThemePressed,
  SemanticColorPrimaryBackgroundLightThemeDisabled: 'background' + vitalSemanticBrand.SemanticColorInteractiveLightThemeDisabled,

  // Interactive Color Tokens for border
  SemanticColorSecondaryBorderLightThemeDefault: 'border' + vitalSemanticBrand.SemanticColorInteractiveLightThemeIdle,
  SemanticColorSecondaryBorderLightThemeHover: 'hover:border' + vitalSemanticBrand.SemanticColorInteractiveLightThemeHover,
  SemanticColorSecondaryBorderLightThemeFocus: 'focus:border' + vitalSemanticBrand.SemanticColorInteractiveLightThemeFocus,
  SemanticColorSecondaryBorderLightThemePressed: 'active:border' + vitalSemanticBrand.SemanticColorInteractiveLightThemePressed,
  SemanticColorSecondaryBorderLightThemeDisabled: 'border'+ vitalSemanticBrand.SemanticColorInteractiveLightThemeDisabled,

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
