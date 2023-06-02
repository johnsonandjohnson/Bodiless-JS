import { as } from '@bodiless/fclasses';
import {
  asElementToken,
  vitalTextDecoration,
  vitalFontSize,
} from '@bodiless/vital-elements';
import { vitalTypographyBase } from '@bodiless/vital-elements/src/base';

const H1 = asElementToken({
  ...vitalTypographyBase.H1,
  Core: {
    _: as(vitalTextDecoration.Normal, vitalFontSize.XXXL),
  },
});

const H2 = asElementToken({
  ...vitalTypographyBase.H2,
  Core: {
    _: as(vitalTextDecoration.ExtraBold, vitalFontSize.XXL),
  },
});

/**
 * Here we export the a object that spread vitalTypographyBase and place our tokens at the bottom
 * of the object so they will override the tokens from the vital typography.
 */
export default {
  ...vitalTypographyBase,
  H1,
  H2,
};
