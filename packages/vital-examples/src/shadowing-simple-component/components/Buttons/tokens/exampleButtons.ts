import { as } from '@bodiless/fclasses';
import { asButtonToken } from '@bodiless/vital-button';
import { vitalButtonBase } from '@bodiless/vital-button/src/base';
import {
  vitalColor,
  vitalFontSize,
  vitalTextDecoration,
} from '@bodiless/vital-elements';

/// [WithPrimary]
/**
 * Here we spread the Vital primary button to inherit the tokens that won't be
 * replaced.
 * Note that the order is essential, since — as we are working with JavaScript
 * objects at the end of the day — the keys that come later in the object's
 * definition overwrite the ones we inherit from `vitalButtonBase.Primary`.
 *
 * The `asButtonToken` function helps us with the tokens convention, creating
 * the auto-complete for the `ButtonClean` component.
 */
const WithPrimary = asButtonToken({
  ...vitalButtonBase.WithPrimaryStyle,
  Theme: {
    // Spreading `Theme` here prevents unwanted changes,
    // keeping all tokens other than the wrappers.
    ...vitalButtonBase.WithPrimaryStyle.Theme,
    Wrapper: as(
      // vital-elements tokens
      vitalColor.BgPrimaryBrand,
      vitalColor.TextWhite,
      vitalTextDecoration.Bold,
      vitalTextDecoration.Uppercase,
      vitalFontSize.Base,
      // For the sake of example/simplicity, we have provided some example
      // classes to modify the button style. The best practice would be to use
      // tokens for any reusable classes.
      'rounded hover:bg-vital-primary-interactive transition-colors duration-400',
    ),
  },
});
/// [WithPrimary]

/// [WithBigButton]
/**
 * Here we follow the same logic, but, this time, we'll create a new variation
 * of button: a big button with extra padding.
 *
 * The `asButtonToken` function helps us with the tokens convention, creating
 * the auto-complete for the `ButtonClean` component.
 */
const WithBigButton = asButtonToken({
  ...vitalButtonBase.Plain,
  Spacing: {
    ...vitalButtonBase.Plain.Spacing,
    Wrapper: 'px-12 py-6',
  },
});
/// [WithBigButton]

/// [export-default]
/**
 * Exporting the `vitalButtonBase` with our custom Primary with hover, and
 * our new big variation.
 */
export default {
  ...vitalButtonBase,
  WithPrimary,
  WithBigButton,
};
/// [export-default]
