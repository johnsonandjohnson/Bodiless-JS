import { as } from '@bodiless/fclasses';
import { asElementToken } from '../../../../util';
import { cxColor } from '../../Color';
import { cxFontSize } from '../../FontSize';
import { cxTextDecoration } from '../../TextDecoration';

const meta = {
  categories: {
    Type: ['Element'],
    Group: ['Typography'],
  },
};

const Link = asElementToken({
  Core: {
    _: cxFontSize.Base,
  },
  Theme: {
    _: as(
      cxTextDecoration.Bold,
      cxTextDecoration.Underline,
      cxColor.TextPrimaryInteractive,
    ),
  },
  Meta: meta,
});

const H1 = asElementToken({
  Core: {
    _: cxFontSize.XXXL,
  },
  Theme: {
    _: as(
      cxTextDecoration.Bold,
      cxColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-6',
  },
  Meta: meta,
});

const H2 = asElementToken({
  Core: {
    _: cxFontSize.XXL,
  },
  Theme: {
    _: as(
      cxTextDecoration.Bold,
      cxColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: meta,
});

const H3 = asElementToken({
  Core: {
    _: cxFontSize.XL,
  },
  Theme: {
    _: as(
      cxTextDecoration.Medium,
      cxColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5',
  },
  Meta: meta,
});

const H4 = asElementToken({
  Core: {
    _: cxFontSize.XL,
  },
  Theme: {
    _: as(
      cxTextDecoration.Normal,
      cxColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5.75 lg:mb-9',
  },
});

const H5 = asElementToken({
  Core: {
    _: cxFontSize.Base,
  },
  Theme: {
    _: as(
      cxTextDecoration.Medium,
      cxColor.TextPrimaryHeaderCopy,
    ),
  },
  Spacing: {
    _: 'mb-5 lg:mb-4.5',
  },
  Meta: meta,
});

const Body = asElementToken({
  Core: {
    _: cxFontSize.Base,
  },
  Theme: {
    _: as(
      cxTextDecoration.Normal,
      cxColor.TextPrimaryBodyCopy,
    ),
  },
  Spacing: {
    _: 'mb-6',
  },
  Meta: meta,
});

const Eyebrow = asElementToken({
  Core: {
    _: cxFontSize.XS,
  },
  Theme: {
    _: as(
      cxTextDecoration.Uppercase,
      cxTextDecoration.ExtraBold,
      cxColor.TextSecondaryEyebrow,
    ),
  },
  Spacing: {
    _: 'mb-3',
  },
});

// This probably will need a better name as Design team defines the uses of this token.
// They have called it crumbs & reviews now.
const Rest = asElementToken({
  Core: {
    _: cxFontSize.XS,
  },
  Theme: {
    _: as(
      cxTextDecoration.Normal,
      cxColor.TextPrimaryBodyCopy,
    ),
  },
  Meta: meta,
});

export default {
  Link,
  H1,
  H2,
  H3,
  H4,
  H5,
  Body,
  Eyebrow,
  Rest,
};
