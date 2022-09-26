import { as } from '@bodiless/fclasses';
import { withNode, withNodeKey } from '@bodiless/core';
import { asBodilessImage, asBodilessLink, withPlaceholder } from '@bodiless/components';
import { mysiteRichText } from '../../RichText';
import { mysiteGallery } from '../../Gallery';
import { mysiteElement } from '../../Element';
import { mysiteFooter } from '../../Footer';
import { asPageToken } from '../PageClean';

const Base = asPageToken({
  Editors: {
    HeroLink: asBodilessLink('hero-link'),
    HeroImage: asBodilessImage('hero-image', {
      src: 'https://via.placeholder.com/6000x1200.png?text=HERO+IMAGE',
      alt: 'Hero Image',
      title: 'Hero Image',
    }),
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Body'),
      withNodeKey('body'),
    ),
    Gallery: as(
      mysiteGallery.Base,
      withNode,
      withNodeKey('gallery-content'),
    ),
    Footer: as(mysiteFooter.Base),
  },
  Theme: {
    Container: 'container mx-auto my-2',
    PrimaryHeader: mysiteElement.H1,
  },
});

export default {
  Base,
};
