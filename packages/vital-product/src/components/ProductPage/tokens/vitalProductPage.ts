import { replaceWith } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  vitalPage,
} from '@bodiless/vital-templates';

import { PDPTemplateClean, vitalPDPTemplate } from '../../PDPTemplate';

const Default = asFluidToken({
  ...vitalPage.Default,
  Core: {
    _: replaceWith(PDPTemplateClean),
  },
  Components: {
    _: vitalPDPTemplate.Default,
  },
});

export default {
  Default,
};
