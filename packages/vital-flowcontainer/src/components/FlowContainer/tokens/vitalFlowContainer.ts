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
import { vitalListFlowContainer } from '@bodiless/vital-list';
import { vitalTableFlowContainer } from '@bodiless/vital-table';

import FlowContainerClean, { FlowContainerPreview } from '../FlowContainerClean';

const fluidToken = asFluidToken();
type FluidToken = typeof fluidToken;

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
  vitalListFlowContainer.WithListVariations,
  vitalTableFlowContainer.WithTableVariations,
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

/**
 * Tokens for the vital flow container
 *
 * @category Token Collection
 * @see [[FlowContainerClean]]
 */
export interface VitalFlowContainer {
  Base: FluidToken,
  /**
   * Defines the default flow container for the Vital DS.
   * - Core domain defines constraints on categories.
   * - Spacing domain defines gutters
   * - Components domain adds the following basic Vital components:
   *   - Images, Editors, Lists, Content Region (nested flow container).
   *
   * #### Customizing:
   *
   * @example Add a component
   * ```js
   * import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalFlowContainerBase.Default, {
   *   Components: {
   *     MyComponent: on(MyComponentClean)(myComponent.Default),
   *   }
   * });
   * ```
   */
  Default: FluidToken,
  Hero: FluidToken,
  /**
   * Defins a flow container which is to be used as a content region (that is,
   * nested within another flow container). This contains all components
   * defined in the `Default` flow container with the exception of
   * the Content Region itself (i.e. you can't have double nesting).
   *
   * You can shadow this token to change the components which are available
   * in a content region.  For example:
   * ```ts
   * const ContentRegion = asFluidToken({
   *    ...vitalContentRegionBase.ContentRegion,
   *    Components: {
   *      ...vitalContentRegionBase.ContentRegion.Components,
   *      SomethingNew: on(MyComponentClean)(myComponent.Default),
   *   },
   * });
   * ```
   */
  ContentRegion: FluidToken,
  AsFlowContainerItem: FluidToken,
  WithFullWidthConstraint: FluidToken,
  WithTabletOneThirdConstraint: FluidToken,
  WithSingleConstraint: FluidToken,
}

/**
 * Tokens for flow containers.
 *
 * @category Token Collection
 * @see [[VitalFlowContainer]]
 * @see [[FlowContainerClean]]
 */
const vitalFlowContainer: VitalFlowContainer = {
  Base,
  Default,
  Hero,
  ContentRegion,
  AsFlowContainerItem,
  WithFullWidthConstraint,
  WithTabletOneThirdConstraint,
  WithSingleConstraint,
};

export default vitalFlowContainer;
