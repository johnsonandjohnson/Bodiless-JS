import { on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalPageBase, GenericTemplateClean, vitalGenericTemplate } from '@bodiless/vital-templates';
import { WithNoTopContent } from './GenericTemplate';

const Default = asFluidToken(
  vitalPageBase.Base,
  {
    Components: {
      NoTopContent: on(GenericTemplateClean)(vitalGenericTemplate.Base, WithNoTopContent),
    },
  }
);

export default {
  ...vitalPageBase,
  Default,
};
