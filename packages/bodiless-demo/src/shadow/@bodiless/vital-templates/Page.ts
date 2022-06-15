import { on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalPageBase, GenericTemplateClean } from '@bodiless/vital-templates';
import { NoTopContent } from './GenericTemplate';

const Default = asFluidToken(
  vitalPageBase.Base,
  {
    Components: {
      NoTopContent: on(GenericTemplateClean)(NoTopContent),
    },
  }
);

export default {
  ...vitalPageBase,
  Default,
};
