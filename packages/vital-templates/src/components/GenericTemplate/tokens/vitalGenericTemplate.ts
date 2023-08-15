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
  as,
  flowIf,
  Fragment,
  replaceWith,
  TokenCollection,
} from '@bodiless/fclasses';
import { vitalLayout } from '@bodiless/vital-layout';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { withNode, withNodeKey, useNode } from '@bodiless/data';
import { vitalSpacing } from '@bodiless/vital-elements';
import { vitalBreadcrumbs } from '@bodiless/vital-navigation';
import { asGenericTemplateToken, GenericTemplateToken } from '../GenericTemplateClean';
import { TemplateNodeKeys } from '../../TemplatesNodeKeys';
import { vitalHero } from '../../Hero';
import { GenericTemplateComponents } from '../types';

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
    TopContent: vitalHero.Default,
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

const Generic = asGenericTemplateToken({
  ...Default,
  Meta: {
    title: 'Generic',
  },
});

interface VitalGenericTemplate extends TokenCollection<GenericTemplateComponents, {}> {
  Default: GenericTemplateToken,
  Generic: GenericTemplateToken,
  WithNoBreadcrumbsOnHomePage: GenericTemplateToken,
}

const vitalGenericTemplate: VitalGenericTemplate = {
  Default,
  Generic,
  WithNoBreadcrumbsOnHomePage,
};

export default vitalGenericTemplate;
