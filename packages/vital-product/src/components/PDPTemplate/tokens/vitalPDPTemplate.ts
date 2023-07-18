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
import { vitalButtons, asButtonToken } from '@bodiless/vital-buttons';
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
    ...vitalButtons.WhereToBuyWithoutIcon,
    Spacing: {
      ...vitalButtons.WhereToBuyWithoutIcon.Spacing,
      Wrapper: 'p-3',
    },
    Theme: {
      ...vitalButtons.WhereToBuyWithoutIcon.Theme,
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

const Default = asPDPTemplateToken(vitalGenericTemplate.Default, {
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
    // ...vitalGenericTemplate.Default.Components,
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
      src: '//svgshare.com/i/sTg.svg',
      alt: 'Stars with 4.1 rating, out of 5 max.',
      title: 'Rating stars',
    })),
    ProductWTBButtonWrapper: on(Div)('mb-4'),
    ProductWTBButton: vitalProductButtons.WhereToBuy,
  },
  Layout: {
    ContentWrapper: 'flex flex-wrap',
    ProductImageWrapper: 'flex justify-center w-full lg:w-1/2',
    // ProductImageWrapper: 'w-full lg:w-1/2',
    ProductDetailWrapper: 'w-full lg:w-1/2 lg:grow',
    // JumpLinksWrapper: 'w-full lg:w-screen'
  },
  Spacing: {
    ...vitalGenericTemplate.Default.Spacing,
    JumpLinksWrapper: 'lg:px-36 py-2 mt-10 lg:-ml-36',
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
