import { withNode } from '@bodiless/data';
import { asFluidToken } from '@bodiless/vital-elements';

const Default = asFluidToken({
  Schema: {
    _: withNode,
  }
});

export default { Default };
