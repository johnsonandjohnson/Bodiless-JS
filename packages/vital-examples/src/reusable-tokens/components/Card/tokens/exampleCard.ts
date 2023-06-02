import { as } from '@bodiless/fclasses';
import { asCardToken } from '@bodiless/vital-card';
import { vitalCardBase } from '@bodiless/vital-card/lib/base';
import { exampleRadius } from '../../Radius';

/*
 * Here we extend the `Default` card token using the merge pattern by supplying
 * multiple arguments to `asCardToken`. Our radius token will be merged with
 * other tokens applied to the ContentWrapper in the Theme domain.
 */

const Default = asCardToken(vitalCardBase.Default, {
  Theme: {
    ContentWrapper: as(
      exampleRadius.Simple,
      // Padding and bg color are added here to make the rounded corner visible.
      'bg-vital-secondary-footer-bg p-4',
    ),
  },
  Layout: {
    Image: 'w-full',
  },
});

/*
 * Here we extend the Vital 'Hero` card token using the override pattern.
 * In this case, we use the spread operator to pull in all tokens applied to
 * the vital 'Hero' card.
 *
 * We then use the spread operator again to pull in all tokens applied to items in
 * the 'Theme' domain of the Vital 'Hero' card and replace the 'Image' component's tokens
 * with our own.
 */
const Hero = asCardToken({
  // This will spread all existing 'Hero' card functionality across all domains.
  ...vitalCardBase.Hero,
  Theme: {
    // This will spread all existing 'Hero' card tokens present in the 'Theme' domain.
    ...vitalCardBase.Hero.Theme,
    // Normally, after spreading in a domain's tokens as we have at the top of
    // this token, setting new tokens as we have below will effectively clear that
    // component's tokens, and replace them with the ones we've specified.

    // In this case, because we're restoring the vital Hero card's 'Image' tokens in the first
    // argument (a step that must be taken when using the override pattern if we wish to modify a
    // component while retaining it's original tokens), this application is effectively the same
    // as writing: 'Image: exampleRadius.Fancy', in the same way that we have in the 'Default'
    // token example above.
    //
    // Both options are perfectly acceptable, but as you can see, the Default example
    // is much more concise.
    Image: as(vitalCardBase.Hero.Theme.Image, exampleRadius.Fancy),
  },
});

export default {
  ...vitalCardBase,
  Default,
  Hero,
};
