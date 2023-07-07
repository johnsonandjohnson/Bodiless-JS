import { asDividerToken } from '../DividerClean';
import type { VitalDividers } from '../types';
import { vitalColor } from '@bodiless/vital-elements';
import { as } from '@bodiless/fclasses';


const Default = asDividerToken({
  Core: {
    // Essential behavior or styling added by this token which are very unlikely to be
    // overridden.
    // ...
  },
  // Components: {
  //   // When the design elements of a complex component are themselves complex components,
  //   // it is generally best practice to define tokens which apply to the sub-components as a
  //   // whole, and apply them in the Components domain of the enclosing component.
  //   // ...
  // },
  // A11y: {
  //   // Behavior or props related to accessibility; e.g. an `aria-labeledby' prop.
  //   // ...
  // },
  // Analytics: {
  //   // Behavior or props related to analytics; e.g., pushing events to a data layer.
  //   // ...
  // },
  // SEO: {
  //   // Behavior or props related to search engine optimization, e.g., adding schema.org markup.
  //   // ...
  // },
  // Layout: {
  //   // Tokens which define the visual structure of a component, and are thus unlikely to be
  //   // overridden; e.g., those which define the orientation of a card.
  //   // ...
  // },
  // Spacing: {
  //   // Tokens which sit somewhere between Theme and Layout; e.g., padding, margin,
  //   // line-spacing, etc.
  //   // ...
  // },
  // Theme: {
  //   // Tokens which apply styling which is very likely to be overridden; e.g., colors,
  //   // typography, sizing such as width and height, etc.
  //   // ...
  // },
  // A11yContent: {
  //   // Tokens which provide default, localized content related to accessibility.
  //   // ...
  // },
  // Content: {
  //   // Tokens which provide default content or other fixed props. Any hardcoded,
  //   // translatable strings belong in this domain.
  //   // ...
  // },
  // Behavior: {
  //   // Tokens which define or add behaviors to a component; e.g., the expanding and contracting
  //   // of an accordion.
  //   // ...
  // },
  // Schema: {
  //   // Tokens which define how a component's data are organized; e.g., node keys.
  //   Slot1: withChildNode('slot-1'),
  //   Slot2: withChildNode('slot-2),
  //   // ...
  // },
});


const BorderDividerLight = asDividerToken(Default, {
  Theme: {
    Divider: as(vitalColor.BorderLight, 'border-solid border-1')
  }
});

const BorderDividerDark = asDividerToken(Default, {
  Theme: {
    Divider: as(vitalColor.BorderDark, 'border-solid border-1')
  }
});

const SpacingDividerPadding = asDividerToken(Default, {
  Theme: {
    Divider: as('p-x-sm')
  }
});


// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for DividerClean
 *
 * @category Token Collection
 * @see [[VitalDividers]]
 * @see [[DividerClean]]
 */
const vitalDividers: VitalDividers = {
  Default,
  BorderDividerLight,
  BorderDividerDark,
  SpacingDividerPadding
};

export default vitalDividers;
