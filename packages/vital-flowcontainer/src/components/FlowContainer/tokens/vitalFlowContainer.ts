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
  withMandatoryCategories,
  withAllTitlesFromTerms,
  ifComponentSelector,
  withLibraryComponents,
} from '@bodiless/layouts';
import { asFluidToken, vitalSpacing } from '@bodiless/vital-elements';
import type { FluidToken } from '@bodiless/vital-elements';
import { vitalImageFlowContainer } from '@bodiless/vital-image';
import { vitalEditorsFlowContainer } from '@bodiless/vital-editors';
import { vitalYouTubeFlowContainer } from '@bodiless/vital-youtube';
import { vitalListFlowContainer } from '@bodiless/vital-list';
import { vitalCardFlowContainer } from '@bodiless/vital-card';
import { vitalTableFlowContainer } from '@bodiless/vital-table';
import { vitalAccordionFlowContainer } from '@bodiless/vital-accordion';
import { vitalButtonFlowContainer } from '@bodiless/vital-buttons';

import FlowContainerClean, { FlowContainerPreview } from '../FlowContainerClean';

const blacklistCategories = ['Group'];
const mandatoryCategories = ['Type'];

const Base = asFluidToken({
  Core: {
    _: as(
      withAllTitlesFromTerms({ blacklistCategories }),
      withMandatoryCategories(mandatoryCategories),
      addProps({ blacklistCategories }),
    ),
    // @todo restore tools and component id badge
    // ComponentWrapper: flowIf(() => useInfoContext().enabled)(withComponentId),
  },
});

// Useful if you are creating a custom defined flow container.
const Empty = asFluidToken(Base);

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

const WithFullWidthConstraint = asFluidToken({
  Core: {
    _: addProps({ snapData }),
  },
});

const WithSingleConstraint = asFluidToken({
  Core: {
    _: addProps({ maxComponents: 1, minComponents: 1 }),
  },
});

const WithTabletOneThirdConstraint = asFluidToken({
  Layout: {
    Wrapper: 'w-full',
    ComponentWrapper: 'w-full md:w-1/3',
  },
});

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

/**
 * @private
 * A Composable token that collects all the different Vital DS components.
 */
const WithBaseVariations = asFluidToken(
  vitalImageFlowContainer.WithImageVariations,
  vitalEditorsFlowContainer.WithEditorVariations,
  vitalYouTubeFlowContainer.WithYouTubeVariations,
  vitalListFlowContainer.WithListVariations,
  vitalCardFlowContainer.WithCardVariations,
  vitalTableFlowContainer.WithTableVariations,
  vitalAccordionFlowContainer.WithAccordionVariations,
  vitalButtonFlowContainer.WithButtonVariations,
);

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

const WithContentLibrary = asFluidToken(
  {
    Core: {
      _: withLibraryComponents()
    },
  },
);

/**
 * Tokens for the vital flow container
 *
 * @category Token Collection
 * @see [[FlowContainerClean]]
 */
export interface VitalFlowContainer {
  /**
   *
   * Token which creates the VitalDS Default Base for a Flow Container
   * with no compoents or theme. This only applies the mandatory categories
   * to category and is using in composing new tokens and not a functional FlowContainer.
   */
  Empty: FluidToken,
  /**
   * Defines the default flow container for the Vital DS.
   * - Core domain defines constraints on categories.
   * - Spacing domain defines gutters
   * - Components domain adds the following basic Vital components:
   *   - Images, Editors, Lists, Content Region (nested flow container).
   *
   * #### Customizing:
   *
   * @example Add a custom component to Vital's Default Flow Container via shadowing
   * ```js
   * import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalFlowContainerBase.Default, {
   *   Components: {
   *     MyComponent: on(MyComponentClean)(myComponent.Default),
   *   }
   * });
   * ```
   *
   * @example Modifying the Vital's Default Flow Container component spacing via shadowing
   * ```js
   * import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
   *
   * const Default = asFluidToken(vitalFlowContainerBase.Default, {
   *   Spacing: {
   *     ComponentWrapper: 'my-8',
   *   },
   * });
   * ```
   *
   *  @example Add a Content Library to Vital's Default Flow Container via shadowing
   * ```js
   * import { asFluidToken } from '@bodiless/vital-elements';
   * import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer';
   * import { addProps } from '@bodiless/fclasses';
   *
   * const Default = asFluidToken(
   *   vitalFlowContainerBase.Default,
   *   vitalFlowContainerBase.WithContentLibrary,
   * );
   *
   * export default {
   *   ...vitalFlowContainerBase,
   *   Default,
   * };
   * ```
   */
  Default: FluidToken,
  /**
   * @deprecated
   * Flow container which can be used in the Hero slot.
   */
  Hero: FluidToken,
  /**
   * Defines a flow container which is to be used as a content region (that is,
   * nested within another flow container). This contains all components
   * defined in the `Default` flow container with the exception of
   * the Content Region itself (i.e. you can't have double nesting).
   *
   * @example change the components which are available in a content region via shadowing
   * ```js
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
  /**
   * Composable token which enables a flow container to be nested inside another.
   */
  AsFlowContainerItem: FluidToken,
  /**
   * Composable token which constrains all items to full width.
   */
  WithFullWidthConstraint: FluidToken,
  /**
   * Composable token which constrains all items to 1/3 width on tablet.
   */
  WithTabletOneThirdConstraint: FluidToken,
  /**
   * Allows only a single item in the flow container.
   */
  WithSingleConstraint: FluidToken,
  /**
   * Composable token which adds content library functionality.
   */
  WithContentLibrary: FluidToken,
}

/**
 * Tokens for flow containers.
 *
 * @category Token Collection
 * @see [[VitalFlowContainer]]
 * @see [[FlowContainerClean]]
 */
const vitalFlowContainer: VitalFlowContainer = {
  Default,
  Empty,
  Hero,
  ContentRegion,
  AsFlowContainerItem,
  WithFullWidthConstraint,
  WithTabletOneThirdConstraint,
  WithSingleConstraint,
  WithContentLibrary,
};

export default vitalFlowContainer;
