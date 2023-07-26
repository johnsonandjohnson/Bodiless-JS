import { replaceWith, on, as } from '@bodiless/fclasses';
import { asCardToken, CardStatic, vitalCardStatic } from '@bodiless/vital-card';
import {
  vitalContentListingFlowContainer, asContentListingToken, vitalContentListing,
  vitalContentListingTemplate, ContentListingClean
} from '@bodiless/vital-content-listing';
import { asFluidToken } from '@bodiless/vital-elements';
import { vitalFlowContainer } from '@bodiless/vital-flowcontainer';
import { asGenericTemplateToken } from '@bodiless/vital-templates';

const WithNoImage = asCardToken({
  Components: {
    Image: replaceWith(() => null),
  },
});

const vitalContentListingFlowContainerRemoveImage = asFluidToken(
  {
    ...vitalContentListingFlowContainer.Default,
    Components: {
      ...vitalContentListingFlowContainer.Default.Components,
      FilterableContent: on(CardStatic)(
        vitalCardStatic.Default,
        vitalCardStatic.WithVerticalOrientation,
        vitalCardStatic.WithNoDescription,
        WithNoImage,
      ),
    },
  }
);

const ContentListingRemoveImage = asContentListingToken(
  {
    ...vitalContentListing.Default,
    Components: {
      ...vitalContentListing.Default.Components,
      Content: as(
        vitalContentListingFlowContainerRemoveImage,
        vitalFlowContainer.WithTabletOneThirdConstraint,
      ),
    },
  }
);

export const StyleGuideListing = asGenericTemplateToken({
  ...vitalContentListingTemplate.Default,
  Meta: {
    title: 'StyleGuide Listing',
  },
  Components: {
    ...vitalContentListingTemplate.Default.Components,
    Content: on(ContentListingClean)(ContentListingRemoveImage),
  },
});
