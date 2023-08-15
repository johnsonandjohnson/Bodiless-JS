import { addProps } from '@bodiless/fclasses';
import { asElementToken } from '@bodiless/vital-elements';

const Welcome = asElementToken({
  Theme: {
    _: addProps({ color: 'blue' }),
  },
  Content: {
    _: addProps({
      title: 'Welcome',
      message: 'Thank you for visiting our spacecraft!',
    }),
  }
});

export default {
  Welcome,
};
