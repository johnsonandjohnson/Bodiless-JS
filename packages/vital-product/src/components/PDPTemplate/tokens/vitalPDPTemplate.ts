/**
 * Copyright © 2022 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import omit from 'lodash/omit';
import { withNodeKey, withDefaultContent } from '@bodiless/data';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import {
  as, replaceWith, Fragment, flowIf, not, on, Img, addProps, Div, withDesign, removeClasses,
} from '@bodiless/fclasses';
import { asSchemaSource, WithProductSchema } from '@bodiless/schema-org';
import { vitalGenericTemplate, TemplateNodeKeys } from '@bodiless/vital-templates';
import { vitalEditorPlain, withAutoSuperscript } from '@bodiless/vital-editors';
import { vitalButton, asButtonToken } from '@bodiless/vital-button';
import { vitalImage } from '@bodiless/vital-image';
import {
  vitalColor, vitalTextDecoration, vitalTypography, vitalFontSize,
} from '@bodiless/vital-elements';
import { asBreadcrumbsToken } from '@bodiless/vital-navigation';
import { vitalLayout } from '@bodiless/vital-layout';

import { asPDPTemplateToken } from '../PDPTemplateClean';
import { withPDPContextProvider } from '../PDPTemplateContext';
import vitalSection from './vitalPDPSection';
import { vitalJumpLinks } from '../../JumpLinks';
import {
  useProductTitleContent,
  useProductDescriptionContent,
  useProductImageContent,
  useHasDescription,
} from './vitalPDPContent';

const vitalPDPBreadcrumbs = asBreadcrumbsToken({
  Theme: {
    Item: 'font-gotham',
  }
});

const vitalProductButtons = {
  WhereToBuy: asButtonToken({
    ...vitalButton.WhereToBuyWithoutIcon,
    Spacing: {
      ...vitalButton.WhereToBuyWithoutIcon.Spacing,
      Wrapper: 'p-3',
    },
    Theme: {
      ...vitalButton.WhereToBuyWithoutIcon.Theme,
      Wrapper: as(
        'bg-interactive-primary-active hover:bg-interactive-primary-hover rounded',
        vitalColor.TextWhite,
        vitalTextDecoration.Bold,
        vitalTextDecoration.Uppercase,
        vitalFontSize.Base,
      ),
      Body: removeClasses('xl:hidden'),
    }
  })
};

const Default = asPDPTemplateToken({
  ...vitalGenericTemplate.Default,
  Core: {
    PageWrapper: withPDPContextProvider,
    ProductTitle: withAutoSuperscript('®™©', 'align-baseline'),
  },
  Meta: {
    title: 'Product Detail Listing',
  },
  Behavior: {
    ProductDescription: flowIf(not(useHasDescription))(
      as('hidden'),
    ),
  },
  Components: {
    ...vitalGenericTemplate.Default.Components,
    PageWrapper: vitalLayout.Default,
    TopContent: replaceWith(Fragment),
    ProductImage: vitalImage.Plain,
    ProductDescription: vitalFlowContainer.Default,
    ProductTitle: vitalEditorPlain.Default,
    JumpLinks: vitalJumpLinks.PDPJumpLinks,
    ProductEyebrow: vitalEditorPlain.Default,
    MoreToKnowSection: vitalSection.MoreToKnow,
    FAQSection: vitalSection.Faq,
    ProductRatingsWrapper: on(Div)('mb-4'),
    ProductRatings: on(Img)(addProps({
      src: 'data:image/png;base64,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',
      alt: 'Stars with 4.1 rating, out of 5 max.',
      title: 'Rating stars',
    })),
    ProductWTBButtonWrapper: on(Div)('mb-4'),
    ProductWTBButton: vitalProductButtons.WhereToBuy,
  },
  Layout: {
    ContentWrapper: 'flex flex-wrap',
    ProductImageWrapper: 'flex justify-center w-full lg:w-1/2',
    ProductDetailWrapper: 'w-full lg:w-1/2 lg:grow',
    JumpLinksWrapper: 'w-full',
  },
  Spacing: {
    ...vitalGenericTemplate.Default.Spacing,
    JumpLinksWrapper: 'py-2 mt-10',
    ProductImageWrapper: 'lg:pr-2',
    ProductDetailWrapper: 'lg:pl-2 pt-4 lg:pt-0',
    ProductTitleWrapper: 'mb-4',
    PageWrapper: withDesign({
      ContainerWrapper: 'pb-10 -mb-10'
    }),
  },
  Theme: {
    Breadcrumb: vitalPDPBreadcrumbs,
    PageWrapper: withDesign({
      ContainerWrapper: 'bg-primary-page-bg'
    }),
    JumpLinksWrapper: vitalColor.BgPrimaryCard,
    ProductTitleWrapper: omit(vitalTypography.H1, 'Spacing'),
    ProductDescription: omit(vitalTypography.Body, 'Spacing'),
    ProductEyebrowWrapper: omit(vitalTypography.Eyebrow, 'Spacing'),
  },
  Schema: {
    ...vitalGenericTemplate.Default.Schema,
    ProductImage: withNodeKey(TemplateNodeKeys.Image),
    ProductDescription: withNodeKey(TemplateNodeKeys.Description),
    ProductTitle: withNodeKey(TemplateNodeKeys.Title),
    ProductEyebrow: withNodeKey(TemplateNodeKeys.Eyebrow),
  },
  SEO: {
    ContentWrapper: WithProductSchema,
    ProductImage: asSchemaSource('product-image'),
    ProductTitleWrapper: asSchemaSource('product-name'),
    ProductDescriptionWrapper: asSchemaSource('product-description'),
  },
  Content: {
    ProductImage: withDefaultContent(useProductImageContent),
    ProductTitle: withDefaultContent(useProductTitleContent),
    ProductDescription: withDefaultContent(useProductDescriptionContent),
  }
});

export default {
  Default,
};
