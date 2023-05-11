import { addProps } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';
import { FancyBorderColor, exampleDialog } from '../../Dialog';

export const Welcome = asElementToken({
  ...exampleDialog.Welcome,
  Theme: {
    _: addProps({ color: FancyBorderColor.Red }),
  },
});

export default {
  ...exampleDialog,
  Welcome,
};
