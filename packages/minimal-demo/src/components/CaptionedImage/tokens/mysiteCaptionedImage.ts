import {
  addProps, as, Div, startWith,
} from '@bodiless/fclasses';
import omit from 'lodash/omit';
import { asBodilessImage } from '@bodiless/components-ui';
import { withNodeKey } from '@bodiless/core';
import { withPlaceholder } from '@bodiless/components';
import { mysiteRichText } from '../../RichText';
import { asCaptionedImageToken } from '../CaptionedImageClean';

const Base = asCaptionedImageToken({
  Editors: {
    Image: as(
      asBodilessImage(),
      withNodeKey('image')
    ),
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Caption'),
      withNodeKey('caption'),
    ),
  },
  Layout: {
    Wrapper: 'mx-2 h-full flex flex-col',
    Image: 'w-full',
    BodyWrapper: 'p-2 flex-grow',
  },
  Theme: {
    BodyWrapper: 'text-white bg-black',
  },
  Meta: {
    categories: {
      Caption: ['Dark'],
      Source: ['Local'],
      Border: ['None'],
    },
  },
});

const LightCaption = asCaptionedImageToken(
  omit(Base, 'Theme'),
  {
    Meta: {
      categories: {
        Caption: ['Light'],
      },
    },
  }
);

const WithBlueBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-8 rounded-t-lg border-mysite-blue',
  },
  Meta: {
    categories: {
      Border: ['Blue'],
    },
  },
});

const WithTealBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-8 rounded-t-lg border-mysite-teal',
  },
  Meta: {
    categories: {
      Border: ['Teal'],
    },
  },
});

const WithOrangeBorder = asCaptionedImageToken({
  Core: {
    Wrapper: 'border-8 rounded-t-lg border-mysite-orange',
  },
  Meta: {
    categories: {
      Border: ['Orange'],
    },
  },
});

// Fetch content, eg using Gatsby useStaticQuery(), use dummy content for example.
const useContentFromCMS = () => ({
  caption: 'CMS_TITLE',
  imgSrc: 'https://via.placeholder.com/600?text=CMS_IMAGE',
  imgAlt: 'CMS_IMAGE_ALT',
});

const WithContentFromCMS = asCaptionedImageToken({
  Core: {
    // Replace the default RichText starting component.
    Body: startWith(Div),
  },
  Editors: {
    Body: addProps(() => ({
      children: useContentFromCMS().caption,
    })),
    Image: addProps({
      src: useContentFromCMS().imgSrc,
      alt: useContentFromCMS().imgAlt,
    }),
  },
  Meta: {
    categories: {
      Source: ['CMS'],
    },
  },
});

export default {
  Base,
  LightCaption,
  WithBlueBorder,
  WithOrangeBorder,
  WithTealBorder,
  WithContentFromCMS,
};
