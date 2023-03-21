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

import {
  on,
  as,
  flowIf,
  addProps,
  withDesign,
  Img,
  Fragment,
  replaceWith,
} from '@bodiless/fclasses';
import { asBodilessChameleon } from '@bodiless/components';
import { vitalLayout } from '@bodiless/vital-layout';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { ContentListingClean, vitalContentListing } from '@bodiless/vital-content-listing';
import { withNode, withNodeKey, useNode } from '@bodiless/core';
import { vitalSpacing } from '@bodiless/vital-elements';
import { SearchLayoutClean, vitalSearchLayout } from '@bodiless/vital-search';
import { vitalBreadcrumbs } from '@bodiless/vital-navigation';
import { vitalImage } from '@bodiless/vital-image';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { CardStatic, vitalCardStatic } from '@bodiless/vital-card';
import { asGenericTemplateToken } from '../GenericTemplateClean';
import { TemplateNodeKeys } from '../../TemplatesNodeKeys';

const heroDefaultData = {
  component: 'Image',
};

const heroUseOverrides = () => ({
  groupLabel: 'Hero'
});

const isHomePage = () => useNode().node.pagePath === '/';

const WithNoBreadcrumbsOnHomePage = asGenericTemplateToken({
  Flow: flowIf(isHomePage),
  Components: {
    BreadcrumbWrapper: replaceWith(Fragment),
    Breadcrumb: replaceWith(Fragment),
  },
});

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: vitalLayout.Default,
    Breadcrumb: as(vitalBreadcrumbs.Default),
    TopContent: as(
      asBodilessChameleon('component', heroDefaultData, heroUseOverrides),
      withDesign({
        Image: on(Img)(vitalImage.Hero),
        Video: on(YouTubeClean)(vitalYouTube.Hero),
        HeroCard: on(CardStatic)(vitalCardStatic.HeroLeftImageContentCentered),
      }),
    ),
    Content: as(vitalFlowContainer.Default),
    BottomContent: as(vitalFlowContainer.Default),
  },
  Schema: {
    TopContent: as(withNode, withNodeKey(TemplateNodeKeys.TopContent)),
    Content: withNodeKey(TemplateNodeKeys.Content),
    BottomContent: withNodeKey(TemplateNodeKeys.BottomContent),
  },
  Spacing: {
    BreadcrumbWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'my-2.5',
    ),
    TopWrapper: as(
      vitalSpacing.GutterBottom,
      vitalSpacing.WithSiteXLConstraint
    ),
    ContentWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
  },
  Compose: {
    WithNoBreadcrumbsOnHomePage,
  },
  Meta: {
    title: 'Default',
  },
});

const ContentListing = asGenericTemplateToken({
  ...Default,
  Meta: {
    title: 'Content Listing',
  },
  Components: {
    ...Default.Components,
    Content: on(ContentListingClean)(vitalContentListing.Default),
  },
  Schema: {
    ...Default.Schema,
    Content: as(
      withNodeKey({ nodeKey: 'content-listing', nodeCollection: 'site' }),
      withNode,
      Default.Schema.Content,
    ),
  }
});

// Holding here for backward compabitility document as deprecated.
const Generic = asGenericTemplateToken({
  ...Default,
  Meta: {
    title: 'Generic',
  },
});

const Search = asGenericTemplateToken({
  ...Default,
  Meta: {
    title: 'Search',
  },
  Components: {
    ...Default.Components,
    Breadcrumb: as(Default.Components.Breadcrumb, addProps({ children: 'Search', })),
    TopContent: replaceWith(Fragment),
    Content: on(SearchLayoutClean)(vitalSearchLayout.Default),
    BottomContent: replaceWith(Fragment),
  }
});

export default {
  Default,
  Generic,
  ContentListing,
  WithNoBreadcrumbsOnHomePage,
  Search,
};
