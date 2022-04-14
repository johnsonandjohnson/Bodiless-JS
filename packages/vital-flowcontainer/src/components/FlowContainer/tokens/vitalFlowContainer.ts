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
import {
  addProps, replaceWith, as, on, flowHoc,
} from '@bodiless/fclasses';
import {
  withMandatoryCategories, withAllTitlesFromTerms, ifComponentSelector,
} from '@bodiless/layouts';
import { asFluidToken, vitalSpacing } from '@bodiless/vital-elements';
import { vitalImageFlowContainer } from '@bodiless/vital-image';
import { vitalEditorsFlowContainer } from '@bodiless/vital-editors';

import FlowContainerClean, { FlowContainerPreview } from '../FlowContainerClean';

const blacklistCategories = ['Group'];
const mandatoryCateogries = ['Type'];

/**
 * Token which creates the VitalDS Default Base for a Flow Container
 */
const Base = asFluidToken({
  Core: {
    _: as(
      withAllTitlesFromTerms({ blacklistCategories }),
      withMandatoryCategories(mandatoryCateogries),
      addProps({ blacklistCategories }),
    ),
    // @todo restore tools and component id badge
    // ComponentWrapper: flowIf(() => useInfoContext().enabled)(withComponentId),
  },
});

/**
 * @private
 * SnapData function to use for a full width constrained flow container.
 */
const snapData = () => ({
  width: 100,
  className: 'w-full',
  currentMediaTuples: [{
    width: 100,
    className: 'w-full',
    media: '0px',
  }],
});

/**
 * Token which constrains a flow container to full width.
 */
const WithFullWidthConstraint = asFluidToken({
  Core: {
    _: addProps({ snapData }),
  },
});

/**
 * Token which constrains to a single component.
 */
const WithSingleConstraint = asFluidToken({
  Core: {
    _: addProps({ maxComponents: 1, minComponents: 1 }),
  },
});

/**
   * Token which constrains a flow container so that items are 1/3 width on tablet.
   */
const WithTabletOneThirdConstraint = asFluidToken({
  Core: {
    Wrapper: 'w-full',
    ComponentWrapper: 'w-full md:w-1/3',
  },
});

/**
   * Token which defines a "ContentRegion" (a default nested flow container).
   * another flow contaienr.
   */
const AsFlowContainerItem = asFluidToken({
  Meta: flowHoc.meta.term('Type')('Content Region'),
  Core: {
    _: as(
      addProps({ itemButtonGroupLabel: 'Content Block', buttonGroupLabel: 'Content Block' }),
      ifComponentSelector(
        replaceWith(FlowContainerPreview),
      ),
    ),
  },
});

const WithBaseVariations = asFluidToken(
  vitalImageFlowContainer.WithImageVariations,
  vitalEditorsFlowContainer.WithEditorVariations,
);

/**
 * A content region is a flow container designed to be nested
 * inside another flow container.
 */
const ContentRegion = asFluidToken(
  omit(Base, 'Spacing'),
  WithBaseVariations,
  {
    Compose: {
      AsFlowContainerItem,
    },
    Spacing: {
      Wrapper: vitalSpacing.GutterOffset,
      ComponentWrapper: vitalSpacing.Gutter,
    },
  },
);

/**
 * Adds a content region to a flow container.
 */
const WithContentRegionVariations = asFluidToken({
  Components: {
    ContentRegion: on(FlowContainerClean)(ContentRegion),
  },
});

const Default = asFluidToken(
  {
    ...Base,
    Spacing: {
      Wrapper: vitalSpacing.GutterOffset,
      ComponentWrapper: vitalSpacing.Gutter,
    },
  },
  WithBaseVariations,
  WithContentRegionVariations,
);

const Hero = asFluidToken(
  {
    ...Base,
    Compose: {
      WithFullWidthConstraint,
    },
  },
  WithBaseVariations,
);

export default {
  Base,
  Default,
  Hero,
  ContentRegion,
  WithContentRegionVariations,
  AsFlowContainerItem,
  WithFullWidthConstraint,
  WithTabletOneThirdConstraint,
  WithSingleConstraint,
};
