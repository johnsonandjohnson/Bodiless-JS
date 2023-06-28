import { withDefaultContent, withNodeKey } from '@bodiless/data';
import { asFluidToken, vitalTypography } from '@bodiless/vital-elements';
import {
  AccordionClean, vitalAccordion, asAccordionToken, vitalAccordionTitle,
} from '@bodiless/vital-accordion';
import {
  addProps, as, flowIf, on, removeClasses, startWith, varyDesigns, withDesign
} from '@bodiless/fclasses';
import { asSectionToken } from '@bodiless/vital-section';

import {
  FAQListClean, ElementsListClean, asFAQListToken,
} from '../../ElementsList';
import vitalElementsList from '../../ElementsList/tokens';
import {
  useAccordionContent, useFAQContent, useHasFAQData, useHasMoreToKnowData, withHiddenIfNoData,
} from './vitalPDPContent';
import { AddIcon, RemoveIcon } from '../../../assets';

const vitalAccordion = asAccordionToken({
  ...vitalAccordion.Default,
  Components: {
    ...vitalAccordion.Default.Components,
    Title: as(
      vitalAccordionTitle.Default,
      // We have to replace accordion icons since the original ones have
      // `fill` hardcaded into the path of inner svg components
      // making it hard to overwrite with css classes.
      withDesign({
        Icon: 'fill-interactive-primary-active',
        CloseIcon: startWith(RemoveIcon),
        OpenIcon: startWith(AddIcon),
      }),
    )
  },
  Theme: {
    Wrapper: as(
      'bg-primary-card-bg border-b-2 border-slate-400 last:border-0',
    ),
    Title: withDesign({
      Icon: 'text-interactive-primary-active'
    })
  },
  Spacing: {
    Wrapper: 'p-2'
  },
});

const vitalFAQAccordion = asAccordionToken(vitalAccordion, {
  Theme: {
    Title: withDesign({
      Wrapper: as(
        removeClasses('lg:text-xl text-m-xl font-medium'),
        // 'font-gotham', // It is making it bold, but per design this font is not bold.
      )
    }),
  }
});

const FAQList = asFAQListToken({
  Components: {
    FAQComponent: as(vitalFAQAccordion),
  }
});

const AccordionVariations = {
  Ingredients: '',
  Directions: '',
  Warnings: '',
  AdditionalInfo: ''
};

const vitalAccordionFlowContainer = asFluidToken({
  Components: {
    ...varyDesigns(
      { '': on(AccordionClean)(vitalAccordion) },
      AccordionVariations,
    )
  },
});

const Default = asSectionToken({
  Components: {
    Title: vitalTypography.H2,
  },
  Theme: {
    Title: 'uppercase',
    Wrapper: 'border-t-2 border-slate-400'
  },
  Spacing: {
    Wrapper: 'mt-10 pt-8',
    Title: 'mb-4'
  }
});

const MoreToKnow = asSectionToken(Default, {
  Flow: flowIf(useHasMoreToKnowData(Object.keys(AccordionVariations))),
  Core: {
    Content: as(
      ...Object.entries(AccordionVariations).map(([key]) => withHiddenIfNoData(key)),
    )
  },
  Components: {
    Content: on(ElementsListClean)(
      vitalAccordionFlowContainer,
      vitalElementsList.Default
    ),
  },
  Schema: {
    Content: withNodeKey('section-content'),
  },
  Content: {
    Title: addProps({ children: 'More To Know' }),
    Content: withDefaultContent(useAccordionContent),
  },
});

const Faq = asSectionToken(Default, {
  Flow: flowIf(useHasFAQData),
  Components: {
    Content: on(FAQListClean)(FAQList),
  },
  Schema: {
    Content: withNodeKey('section-faq'),
  },
  Content: {
    Title: addProps({ children: 'Frequently Asked Questions' }),
    Content: addProps(useFAQContent)
  }
});

export default {
  Default,
  MoreToKnow,
  Faq,
};
