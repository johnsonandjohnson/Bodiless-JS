import { asElementToken, cxTypographyBase } from '@bodiless/cx-elements';
import { addProps } from '@bodiless/fclasses';

export default {
  ...cxTypographyBase,
  H1: asElementToken(cxTypographyBase.H1, {
    Theme: {
      _: addProps({ 'data-shadowed-by': '__cxstarter__' }),
    },
  }),
};
