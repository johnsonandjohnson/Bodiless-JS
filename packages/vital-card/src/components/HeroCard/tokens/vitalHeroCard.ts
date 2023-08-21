// import { vitalHeroCardBase } from '@bodiless/vital-card/lib/base';
// import { asHeroCardToken } from '@bodiless/vital-card';
import { withPlaceholder } from '@bodiless/components';
import {
  as, Div, flowHoc, H4, on, replaceWith, TokenCollection
} from '@bodiless/fclasses';
import { asButtonToken, ButtonClean, vitalButton } from '@bodiless/vital-button';
import { EditorPlainClean, vitalEditorPlain } from '@bodiless/vital-editors';
import {
  DefaultDomains, vitalHeroBannerElement, vitalSpacing, vitalTypography
} from '@bodiless/vital-elements';
import { CardComponents, CardToken } from 'src/components/Card/CardClean';
import Base, {
  WithHorizontalLeftOrientation,
  WithHorizontalOrientationBase,
  WithHorizontalContentCentered,
  WithHorizontalRightOrientation,
  WithVerticalOrientation,
} from '../../Card/tokens/Base';
import { asHeroCardToken } from '../HeroCardClean';

/**
 * Primary Hero Card Button.
 * Plain vital button with `WithPrimaryStyle` token and `READ MORE` placeholder.
 */
const PrimaryHeroCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithPrimaryStyle,
  {
    Content: {
      Body: withPlaceholder('BUTTON'),
    },
  }
);

/**
 * Secondary Hero Card Button.
 * Plain vital button with `WithSecondaryStyle` token and `READ MORE` placeholder.
 */
const SecondaryHeroCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithSecondaryStyle,
  {
    Content: {
      Body: withPlaceholder('BUTTON'),
    },
  }
);

/**
 * Tertiary Hero Card Button.
 * Plain vital button with `WithTertiaryStyle` token and `READ MORE` placeholder.
 */
const TertiaryHeroCardButton = asButtonToken(
  vitalButton.Plain,
  vitalButton.WithTertiaryStyle,
  {
    Content: {
      Body: withPlaceholder('BUTTON'),
    },
  }
);

const DefaultHeroCardButton = as(TertiaryHeroCardButton);

const Default = asHeroCardToken(
  {
    ...Base,
    Components: {
      ...Base.Components,
      EyebrowWrapper: undefined,
      Eyebrow: undefined,
      CTAWrapper: undefined,
      CTALink: on(ButtonClean)(DefaultHeroCardButton),
    },
    Theme: {
      TitleWrapper: vitalTypography.HeadlineXXLarge,
      DescriptionWrapper: vitalTypography.BodyRegular,
    },
    Spacing: {
      TitleWrapper: vitalSpacing.MarginYXSmall,
      ImageWrapper: vitalSpacing.MarginBottomLarge,
      CTAWrapper: as('flex', vitalSpacing.MarginTopMedium),
    }
  }
);

const WithHorizontalOrientation = asHeroCardToken({
  ...WithHorizontalOrientationBase,
  Layout: {
    Wrapper: 'sm:gap-16px md:gap-24px',
  },
  Spacing: {
    ContentWrapper: 'px-16px',
    ImageWrapper: 'px-16px md:px-0px',
  },
});
const HorizontalWithImageLeft = asHeroCardToken(
  WithHorizontalOrientation,
  WithHorizontalLeftOrientation,
  WithHorizontalContentCentered,
);

const HorizontalWithImageRight = asHeroCardToken(
  WithHorizontalOrientation,
  WithHorizontalRightOrientation,
  WithHorizontalContentCentered,
);

/**
 * Token that adds an Eyebrow slot to the Product Card.
 * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Text Editor.
 *
 * Note: This token is meant to be layered on top of the `Product` token.
 */
const WithEyebrow = asHeroCardToken({
  Components: {
    EyebrowWrapper: replaceWith(Div),
    Eyebrow: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Eyebrow: withPlaceholder('Eyebrow'),
  },
  Theme: {
    EyebrowWrapper: as(
      vitalTypography.EyebrowBold,
      vitalHeroBannerElement.TextLightThemeEyebrow,
    ),
  }
});

/**
 * Token that adds a Line Clamping to the Product Card Title.
 * Ensures that the Title doesn't span on more than 4 lines.
 *
 * Note: This token is meant to be layered on top of the `Default` token.
 *
 * @TODO: Consider making this more generic. A function that accepts (lines: number) as an
 * argument since line clamping is different based on card placement / page. Will need to tweak
 * types of `TokenCollection` to allow functions that returns token.
 */
const WithDescriptionLineClamp = asHeroCardToken({
  Theme: {
    Title: 'line-clamp-3',
  },
});

const WithPrimaryButton = asHeroCardToken({
  Components: {
    CTALink: as(
      replaceWith(ButtonClean),
      on(ButtonClean)(PrimaryHeroCardButton)
    ),
  }
});

const WithSecondaryButton = asHeroCardToken({
  Components: {
    CTALink: as(
      replaceWith(ButtonClean),
      on(ButtonClean)(SecondaryHeroCardButton)
    ),
  }
});

const WithTertiaryButton = asHeroCardToken({
  Components: {
    CTALink: as(
      replaceWith(ButtonClean),
      on(ButtonClean)(TertiaryHeroCardButton)
    ),
  }
});

const WithSubtitle = asHeroCardToken({
  Components: {
    SubtitleWrapper: replaceWith(H4),
    Subtitle: on(EditorPlainClean)(vitalEditorPlain.Default),
  },
  Content: {
    Subtitle: withPlaceholder('Subheadline'),
  },
  Theme: {
    SubtitleWrapper: vitalTypography.HeadlineMedium,
  },
  Spacing: {
    SubtitleWrapper: vitalSpacing.MarginBottomSmall,
  }
});

const WithNoSubtitle = asHeroCardToken({
  Components: {
    TitleWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Subtitle'),
});

const WithNoHeroImage = asHeroCardToken({
  Components: {
    ImageWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Image'),
});

/**
 * WithNoDescription removes the description from the card and adjusts title.
 *
 *  where
 *     Title - adds grow because description will not exist
 */
const WithNoDescription = asHeroCardToken({
  Components: {
    DescriptionWrapper: replaceWith(() => null),
  },
  Layout: {
    Title: 'flex-grow',
  },
  Meta: flowHoc.meta.term('Features')('No Description'),
});

const WithNoEyebrow = asHeroCardToken({
  Components: {
    EyebrowWrapper: replaceWith(() => null),
  },
  Meta: flowHoc.meta.term('Features')('No Eyebrow'),
});
export interface VitalHeroCard extends TokenCollection<CardComponents, DefaultDomains> {
  /**
   * Defines the default Article card for the Vital DS.
   * - Extends the Base card.
   */
  Default: CardToken,
  /**
   * Token that adds an Eyebrow to the Article Card.
   * Adds the `EyebrowWrapper` slot as a `Div` and the `Eyebrow` slot as default Plain Editor.
   *
   * Note: This token is meant to be layered on top of the `Article` token.
   */
  HorizontalWithImageLeft: CardToken,
  /**
   * Token that adds the Description slot to the Article Card.
   * Adds the `DescriptionWrapper` slot as `P` element and the `Description` slot
   * as default Plain Text Editor.
   *
  eslint-disable-next-line max-len
   * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
   */
  HorizontalWithImageRight: CardToken,
  // /**
  //  * Token that sets Vertical Orientation for the Article Card.
  //  * Re-Exported directly unchanged from the `vitalCard`.
  //  *
  // eslint-disable-next-line max-len
  //  * Note: This token is meant to be layered on top of the `vitalArticleCard.Default` Article token.
  //  */
  // WithVerticalOrientation: CardToken,

  WithEyebrow: CardToken,
  WithSubtitle: CardToken,
  WithNoEyebrow: CardToken,
  WithNoDescription: CardToken,
  WithNoSubtitle: CardToken,
  WithNoHeroImage: CardToken,
  WithDescriptionLineClamp: CardToken,
  // VerticalOrientation: CardToken,
}

/**
 * Tokens for HeroCardClean
 * This token collection extends vitalHeroCard
 *
 * @category Token Collection
 * @see vitalHeroCard
 */
const vitalHeroCard: VitalHeroCard = {
  Default,
  HorizontalWithImageLeft,
  HorizontalWithImageRight,
  WithVerticalOrientation,
  WithEyebrow,
  WithPrimaryButton,
  WithSecondaryButton,
  WithTertiaryButton,
  WithSubtitle,
  WithNoDescription,
  WithNoEyebrow,
  WithNoSubtitle,
  WithNoHeroImage,
  WithDescriptionLineClamp
  // VerticalOrientation
  // ...
};

export default vitalHeroCard;
