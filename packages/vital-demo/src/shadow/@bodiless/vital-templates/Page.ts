import { vitalPageBase } from '@bodiless/vital-templates/lib/base';
import { on, as } from '@bodiless/fclasses';
// import { vitalContentListingTemplate } from '@bodiless/vital-content-listing';
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import { GenericTemplateStatic, vitalGenericTemplateStatic } from '@bodiless/vital-templates';
/*
import {
  PDPTemplateClean, vitalPDPTemplate, GenericTemplateClean,
} from '@bodiless/vital-templates';
import {
  vitalSearchGenericTemplate, withSearchMenuProvider, withSearchResult
} from '@bodiless/vital-search';
*/

import { withSearchMenuProvider, withSearchResult } from '@bodiless/vital-search';

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
    _default: on(GenericTemplateStatic)(vitalGenericTemplateStatic.Default),
    // PDP: on(PDPTemplateClean)(vitalPDPTemplate.Default),
    // Search: on(GenericTemplateClean)(vitalSearchGenericTemplate.Search),
    // ContentListing: on(GenericTemplateClean)(vitalContentListingTemplate.Default),
  },
  Compose: {
    ...vitalPageBase.Default.Compose,
    WithSearchContext: as(withSearchMenuProvider, withSearchResult),
  },
});

export default {
  ...vitalPageBase,
  Default,
};
