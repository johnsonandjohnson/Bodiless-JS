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
  withDesign,
  Img,
} from '@bodiless/fclasses';
import { asBodilessChameleon } from '@bodiless/components';
import { LayoutClean, vitalLayout } from '@bodiless/vital-layout';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { withNode, withNodeKey } from '@bodiless/core';
import { vitalSpacing, vitalTypography } from '@bodiless/vital-elements';
import { vitalBreadcrumbs } from '@bodiless/vital-navigation';
import { vitalImage } from '@bodiless/vital-image';
import { YouTubeClean, vitalYouTube } from '@bodiless/vital-youtube';
import { CardClean, vitalCard } from '@bodiless/vital-card';
import { asGenericTemplateToken } from '../GenericTemplateClean';
import { GenericTemplateNodeKeys } from '../constants';

const heroDefaultData = {
  component: 'Image',
};

const heroUseOverrides = () => ({
  groupLabel: 'Hero'
});

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(vitalLayout.Default),
    Breadcrumb: as(vitalBreadcrumbs.Default),
    TopContent: as(
      asBodilessChameleon('component', heroDefaultData, heroUseOverrides),
      withDesign({
        Image: on(Img)(vitalImage.Hero),
        Video: on(YouTubeClean)(vitalYouTube.Hero),
        HeroCard: on(CardClean)(vitalCard.Hero),
      }),
    ),
    Content: as(vitalFlowContainer.Default),
    BottomContent: as(vitalFlowContainer.Default),
  },
  Schema: {
    TopContent: as(withNode, withNodeKey(GenericTemplateNodeKeys.TopContent)),
    Content: withNodeKey(GenericTemplateNodeKeys.Content),
    BottomContent: withNodeKey(GenericTemplateNodeKeys.BottomContent),
  },
  Spacing: {
    BreadcrumbWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint,
      'my-2.5',
    ),
    // @todo move styling of breadcrumb to breadcrumb component when it exists.
    Breadcrumb: vitalTypography.Rest,
    ContentWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      vitalSpacing.WithSiteMargin,
      vitalSpacing.WithSiteXLConstraint
    ),
  },
});

export default {
  Default,
};
