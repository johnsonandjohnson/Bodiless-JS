import { vitalPageBase } from '@bodiless/vital-templates/lib/base';
import { on } from '@bodiless/fclasses';
import { vitalContentListingTemplate } from '@bodiless/vital-content-listing';
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import {
  PDPTemplateClean, vitalPDPTemplate, GenericTemplateClean,
} from '@bodiless/vital-templates';

const Base = asFluidToken(vitalPageBase.Default, {
  Core: {
    _: withLanguages([
      {
        name: 'en',
        label: 'English',
        isDefault: true,
      },
      {
        name: 'es',
        label: 'Español',
      },
    ]),
  }
});

const Default = asFluidToken({
  ...Base,
  Components: {
    ...vitalPageBase.Default.Components,
    PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
    ContentListing: on(GenericTemplateClean)(vitalContentListingTemplate.Default),
  },
  Compose: {
    ...vitalPageBase.Default.Compose,
  },
});

export default {
  ...vitalPageBase,
  Default,
};
