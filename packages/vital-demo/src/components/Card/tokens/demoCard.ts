import { vitalCardBase } from '@bodiless/vital-card/lib/base';
import { asCardToken } from '@bodiless/vital-card';

const Default = asCardToken({
  ...vitalCardBase.Default,
  // Core: {
  //   // Essential behavior or styling added by this token which are very unlikely to be
  //   // overridden.
  //   ...vitalCardBase.Default.Core,
  //   // ...
  // },
  // Components: {
  //   // When the design elements of a complex component are themselves complex components,
  //   // it is generally best practice to define tokens which apply to the sub-components as a
  //   // whole, and apply them in the Components domain of the enclosing component.
  //   ...vitalCardBase.Default.Components,
  //   // ...
  // },
  // A11y: {
  //   // Behavior or props related to accessibility; e.g. an `aria-labeledby' prop.
  //   ...vitalCardBase.Default.A11y,
  //   // ...
  // },
  // Analytics: {
  //   // Behavior or props related to analytics; e.g., pushing events to a data layer.
  //   ...vitalCardBase.Default.Analytics,
  //   // ...
  // },
  // SEO: {
  //   // Behavior or props related to search engine optimization, e.g., adding schema.org markup.
  //   ...vitalCardBase.Default.SEO,
  //   // ...
  // },
  // Layout: {
  //   // Tokens which define the visual structure of a component, and are thus unlikely to be
  //   // overridden; e.g., those which define the orientation of a card.
  //   ...vitalCardBase.Default.Layout,
  //   // ...
  // },
  // Spacing: {
  //   // Tokens which sit somewhere between Theme and Layout; e.g., padding, margin,
  //   // line-spacing, etc.
  //   ...vitalCardBase.Default.Spacing,
  //   // ...
  // },
  // Theme: {
  //   // Tokens which apply styling which is very likely to be overridden; e.g., colors,
  //   // typography, sizing such as width and height, etc.
  //   ...vitalCardBase.Default.Theme,
  //   // ...
  // },
  // A11yContent: {
  //   // Tokens which provide default content related to accessibility.
  //   ...vitalCardBase.Default.A11yContent,
  //   // ...
  // },
  // Content: {
  //   // Tokens which provide default content or other fixed props. Any hardcoded,
  //   // translatable strings belong in this domain.
  //   ...vitalCardBase.Default.Content,
  //   // ...
  // },
  // Behavior: {
  //   // Tokens which define or add behaviors to a component; e.g., the expanding and contracting
  //   // of an accordion.
  //   ...vitalCardBase.Default.Behavior,
  //   // ...
  // },
  // Schema: {
  //   // Tokens which define how a component's data are organized; e.g., node keys.
  //   ...vitalCardBase.Default.Schema,
  //   // ...
  // },
});

// Add additional variant tokens or variators here.
// ...

/**
 * Tokens for CardClean
 * This token collection extends vitalCard
 *
 * @category Token Collection
 * @see vitalCard
 */
const demoCard = {
  ...vitalCardBase,
  Default,
  // ...
};

export default demoCard;
