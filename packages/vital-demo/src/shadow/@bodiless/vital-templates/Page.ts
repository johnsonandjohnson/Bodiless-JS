import { vitalPageBase } from '@bodiless/vital-templates/lib/base';
import { on, as } from '@bodiless/fclasses';
import { vitalContentListingTemplate } from '@bodiless/vital-content-listing';
import { withLanguages } from '@bodiless/i18n';
import { asFluidToken } from '@bodiless/vital-elements';
import { GenericTemplateClean } from '@bodiless/vital-templates';
import { vitalPDPTemplate, PDPTemplateClean } from '@bodiless/vital-product';

import { withBurgerMenuProvider } from '@bodiless/navigation';
import { withIslandsHydrator } from '@bodiless/hydration';

const WithLanguage = withLanguages([
  {
    name: 'en',
    label: 'English',
    isDefault: true,
  },
  {
    name: 'es',
    label: 'Español',
  },
]);

const Default = asFluidToken(vitalPageBase.Default, {
  Core: {
    _: as(WithLanguage)
  },
  Island: {
    _: as(
      withIslandsHydrator({}),
      WithLanguage,
      withBurgerMenuProvider,
    )
  },
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
  Default,
};
