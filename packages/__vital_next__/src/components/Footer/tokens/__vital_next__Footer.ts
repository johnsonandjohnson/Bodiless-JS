import { asFooterToken } from '@bodiless/vital-layout';
import { vitalFooterBase } from '@bodiless/vital-layout/lib/base';
import { addProps } from '@bodiless/fclasses';

// Setup the vital package to use the Rewards by default.
const Default = asFooterToken(vitalFooterBase.Default, {
  ...vitalFooterBase.WithRewardsExpanding2XL,
  Behavior: {
    Container: addProps({ 'data-shadowed-by': '__vital__Footer' }),
  },
});

export default {
  ...vitalFooterBase,
  Default,
};
