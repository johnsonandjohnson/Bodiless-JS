import { as } from '@bodiless/fclasses';
import { asTokenGroup, vitalColor, vitalTypography } from '@bodiless/vital-elements';

export const ButtonMeta = {
  categories: {
    Type: ['Component'],
    Group: ['Button'],
  },
};

// REFERENCE: https://github.com/dxp-prototype/vital-design-tokens/blob/tokens.json/components/buttons.json
/**
 * @TODO: What should be the name for these token groups with vital 2.0 component tokens?
 * It feels redundant to have `vitalProductCard.BorderProductCard` etc. We should either change
 * the collection name or discuss the options we have for changing the token names (in JSON file?).
 */
const vitalButtonElement = asTokenGroup(ButtonMeta)({
  // All button styles
  ButtonPrimaryBorderRadius: 'rounded-8',
  BorderPaddingButton: 'px-x-lg py-md',
  // TODO Needs work shouldn't have defined
  ShadowButtonFocus: 'focus:drop-shadow-button',
  TextButtonDefault: vitalTypography.BodyBold,
  // Primary
  ButtonPrimaryBackgroundLightThemeIdle: 'bg-SemanticColorInteractiveLightThemeIdle',
  ButtonPrimaryBackgroundLightThemeHover: 'hover:bg-SemanticColorInteractiveLightThemeHover',
  ButtonPrimaryBackgroundLightThemeFocus: 'focus:bg-SemanticColorInteractiveLightThemeFocus',
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemePressed: 'active;bg-SemanticColorInteractiveLightThemeHover,',
  // eslint-disable-next-line max-len
  ButtonPrimaryBackgroundLightThemeDisabled: 'bg-SemanticColorInteractiveLightThemeDisabled,',
  ButtonPrimaryTextLightThemeText: 'text-SemanticColorDarkThemeBaseText',
  // Secondary
  ButtonSecondaryTextLightThemeDefault: 'text-SemanticColorSecondaryLightThemeDefault',
  ButtonSecondaryTextLightThemeHover: 'hover:text-SemanticColorSecondaryLightThemeHover',
  ButtonSecondaryTextLightThemeFocus: 'focus:text-SemanticColorSecondaryLightThemeFocus',
  ButtonSecondaryTextLightThemePressed: 'active:text-SemanticColorSecondaryLightThemePressed',
  ButtonSecondaryTextLightThemeDisabled: 'text-SemanticColorSecondaryLightThemeDisabled',
  ButtonSecondaryBorderLightThemeDefault: as('border-SemanticColorSecondaryLightThemeDefault border-solid border-1'),
  ButtonSecondaryBorderLightThemeHover: as('hover:SemanticColorSecondaryLightThemeHover border-solid border-1'),
  ButtonSecondaryBorderLightThemeFocus: as('focus:SemanticColorSecondaryLightThemeFocus border-solid border-1'),
  ButtonSecondaryBorderLightThemePressed: as('active:SemanticColorSecondaryLightThemePressed border-solid border-1'),
  ButtonSecondaryBorderLightThemeDisabled: as('SemanticColorSecondaryLightThemeDisable border-solid border-1'),
  // Tertiary
  ButtonTertiaryTextLightThemeDefault: 'bg-SemanticColorInteractiveLightThemeIdle',
  ButtonTertiaryTextLightThemeHover: 'hover:bg-SemanticColorInteractiveLightThemeHover',
  ButtonTertiaryTextLightThemeFocus: 'focus:bg-SemanticColorInteractiveLightThemeFocus',
  // eslint-disable-next-line max-len
  ButtonTertiaryTextLightThemePressed: 'active;bg-SemanticColorInteractiveLightThemeHover,',
  // eslint-disable-next-line max-len
  ButtonTertiaryTextLightThemeDisabled: 'bg-SemanticColorInteractiveLightThemeDisabled,',

});

export default vitalButtonElement;
