import { addProps } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';
import { FancyBorderColor } from '../../Dialog';
import { exampleDialogBase } from '../../../base';

export const Welcome = asElementToken({
  ...exampleDialogBase.Welcome,
  Theme: {
    _: addProps({ color: FancyBorderColor.Red }),
  },
});

export default {
  ...exampleDialogBase,
  Welcome,
};
