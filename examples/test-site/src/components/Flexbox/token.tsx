import {
  addClasses,
  withDesign,
} from '@bodiless/fclasses';

const asFlexboxWithMargins = withDesign({
  Wrapper: addClasses('my-5'),
  ComponentWrapper: addClasses('pr-5'),
});

/* eslint-disable import/prefer-default-export */
export {
  asFlexboxWithMargins,
};
