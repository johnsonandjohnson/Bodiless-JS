import { on } from '@bodiless/fclasses';
import { asFluidToken } from '@bodiless/vital-elements';
import { FlowContainerClean } from '@bodiless/vital-flowcontainer';
import { vitalFlowContainerBase } from '@bodiless/vital-flowcontainer/lib/base';
import { vitalImageFlowContainer } from '@bodiless/vital-image';
import {vitalEditorsFlowContainer } from '@bodiless/vital-editors';
import { vitalYouTubeFlowContainer } from '@bodiless/vital-youtube';
import { vitalListFlowContainer } from '@bodiless/vital-list';
import { vitalCardFlowContainer } from '@bodiless/vital-card';
import { vitalTableFlowContainer } from '@bodiless/vital-table';
import { vitalAccordionFlowContainer } from '@bodiless/vital-accordion';
import { vitalButtonFlowContainer } from '@bodiless/vital-button';

/**
 * A Composable token that collects all the different Vital DS components.
 * @todo Remove those you are not using!
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

/**
 * Add variations to the content region.
 */
const ContentRegion = asFluidToken(
  vitalFlowContainerBase.ContentRegion,
  WithBaseVariations,
);

/**
 * A composable token that adds a content region
 */
const WithContentRegionVariations = asFluidToken({
  Components: {
    ContentRegion: on(FlowContainerClean)(ContentRegion),
  }
});

/**
 * Overide the vital default flow container to add component variations.
 * These will be availalbe for content editors to choose when editing
 * a page.
 */
const Default = asFluidToken(
  vitalFlowContainerBase.Default,
  WithBaseVariations,
  WithContentRegionVariations,
);

/**
 * Add varitions to the Hero flow container.
 */
const Hero = asFluidToken(
  vitalFlowContainerBase.Hero,
  WithBaseVariations,
);

export default {
  ...vitalFlowContainerBase,
  Default,
  Hero,
  ContentRegion,
};
