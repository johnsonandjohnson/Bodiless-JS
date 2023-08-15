import { asTokenGroup, SpacingMeta } from '@bodiless/vital-elements';
import { vitalSpacingBase } from '@bodiless/vital-elements/src/base';

// Here we use `asTokenGroup` to share the SpacingMeta among all tokens exported.
export default asTokenGroup(SpacingMeta)({
  ...vitalSpacingBase,
  // You can find more about this special tokens on the vital-element package.
  WithSiteMargin: 'mx-2 xl:mx-6 xxl:px-20',
  WithSiteXLConstraint: 'xxl:container xxl:mx-auto',
});
