import { as } from '@bodiless/fclasses';
import { withNodeKey } from '@bodiless/core';
import { withPlaceholder } from '@bodiless/components';
import { mysiteRichText } from '../../RichText';
import { asFooterToken } from '../FooterClean';

const Base = asFooterToken({
  Editors: {
    Body: as(
      mysiteRichText.Simple,
      withPlaceholder('Footer text. Click to edit!'),
      withNodeKey({ nodeKey: 'footer', nodeCollection: 'site' }),
    ),
  },
  Theme: {
    Wrapper: 'text-white bg-black p-8',
  },
});

export default {
  Base,
};
