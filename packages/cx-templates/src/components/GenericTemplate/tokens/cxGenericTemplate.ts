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
  Img,
  addProps,
} from '@bodiless/fclasses';
import { cxImage } from '@bodiless/cx-image';
import { LayoutClean, cxLayout } from '@bodiless/cx-layout';
import { cxFlowContainer } from '@bodiless/cx-flowcontainer';
import { withNodeKey } from '@bodiless/core';
import { cxSpacing, cxTypography } from '@bodiless/cx-elements';
import { asGenericTemplateToken } from '../GenericTemplateClean';
import { GenericTemplateNodeKeys } from '../constants';

const Default = asGenericTemplateToken({
  Components: {
    PageWrapper: on(LayoutClean)(cxLayout.Default),
    // @todo breadcrumb placeholder
    Breadcrumb: addProps({ children: 'Breadcrumb Placeholder', }),
    // @todo in Hero ticket is change this to chameleon.
    TopContent: on(Img)(cxImage.Default, cxImage.WithLandscapePlaceholder),
    Content: as(cxFlowContainer.Default),
    BottomContent: as(cxFlowContainer.Default),
  },
  Schema: {
    TopContent: withNodeKey(GenericTemplateNodeKeys.TopContent),
    Content: withNodeKey(GenericTemplateNodeKeys.Content),
    BottomContent: withNodeKey(GenericTemplateNodeKeys.BottomContent),
  },
  Spacing: {
    TopContent: cxSpacing.WithSiteXLConstraint,
    BreadcrumbWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint,
      'my-2.5',
    ),
    // @todo move styling of breadcrumb to breadcrumb component when it exists.
    Breadcrumb: cxTypography.Rest,
    ContentWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
    BottomWrapper: as(
      cxSpacing.WithSiteMargin,
      cxSpacing.WithSiteXLConstraint
    ),
  },
});

export default {
  Default,
};
