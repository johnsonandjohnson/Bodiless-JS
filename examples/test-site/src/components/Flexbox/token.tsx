import {
  addClasses,
  withDesign,
} from '@bodiless/fclasses';

const asFlexboxWithMargins = withDesign({
  Wrapper: addClasses('-mx-5'),
  ComponentWrapper: addClasses('p-5'),
});

/* eslint-disable import/prefer-default-export */
export {
  asFlexboxWithMargins,
};
